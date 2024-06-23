/**
 * @file: 首页瀑布流数据请求
 */
import {Http} from "./http";

// Paging类不关心细节，只需要提供数据（嗨， 我需要下一页的数据了，你能给我吗）
// Paging需要保存状态，需以实例化的形式（new Paging）提供给调用方
class Paging {
    start
    count
    req
    url // 备份原始url，请求更多的时候需要拼接原始url
    locker = false  // 请求锁
    moreData = true // 单独定义一个变量叫做moreData
    accumulator = []    // 累加器

    // 初始化数据加载的信息
    constructor(req, count = 10, start = 0) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }

    /** 获取锁的状态 */
    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    /** format支持分页的url，如：v1/spu/latest?start=0&count=10 */
    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`

        if (url.includes('?')) {     // v1/spu/latest + '?' + params;
            url += '&' + params
        } else {    // v1/spu/latest?other=xxx + '&' + params;
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    /** 根据当前页面与总页码数，判读是否还有更多 */
    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    /** 累加请求的数据，供页面展示 */
    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    /** 调用真实数据请求 */
    async _actualGetData() {
        // 获取当前请求体
        const req = this._getCurrentReq()

        // 请求数据
        let paging = await Http.request(req)

        /** ----请求失败的情况---- */
        // 如果没有paging，则需要处理异常请求
        if (!paging) {
            return null
        }

        /** ----请求成功的情况---- */
        /** 没有数据 */
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }

        /** 有数据 */
        // 是否还有更多数据
        this.moreData = Paging._moreData(paging.total_page, paging.page)

        // 如果有更多数据，则需要修改请求的start值
        if (this.moreData) {
            this.start += this.count
        }

        // 调用数据累加
        this._accumulate(paging.items)

        // 返回数据
        return {
            empty: false,
            items: paging.items,      // 当前请求回来的数据
            moreData: this.moreData,
            accumulator: this.accumulator   // 将历史请求数据全部累加起来，并返回给页面
        }
    }

    /** 释放锁 */
    _releaseLocker() {
        this.locker = false
    }

    /** 请求数据的逻辑 */
    async getMoreData() {
        // 如果没有数据了，则不进行请求；
        if (!this.moreData) {
            return
        }
        // 判断当前的请求锁是否锁住（获取一下锁的状态，并判断一下锁的状态），如果是锁住的状态，那么这一次请求不应该发送；
        if (!this._getLocker()) {
            return
        }

        // 如果请求锁没有锁住，则正常发送请求；
        const data = await this._actualGetData()

        // 请求完成，放开锁；
        this._releaseLocker()
        return data
    }
}

export {
    Paging
}
