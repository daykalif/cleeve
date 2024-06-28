import {Matrix} from "./matrix";
import {Fence} from "./fence";

/**
 * @file: 管理一组fence，并将数据交给fence渲染
 *
 * 原始数据skuList：                  [
 *      金属灰     七龙珠     小号S      [0,0],[0,1],[0,2]]
 *      青芒色     灌篮高手   中号M      [1,0],[1,1],[1,2]
 *      青芒色     圣斗士     大号L      [2,0],[2,1],[2,2]
 *      橘黄色     七龙珠     小号S      [3,0],[3,1],[3,2]
 *                                  ]
 *
 * 期望数据：
 *      金属灰     青芒色      青芒色      橘黄色
 *      七龙珠     灌篮高手    圣斗士     七龙珠
 *      小号S      中号M      大号L      小号S
 *
 *
 * 矩阵转置的方式：
 *      1.直接调用矩阵的js函数库（js函数库体积大，或者没有人维护）
 *      2.利用数据结构的二维数组自己实现
 *
 * 瞬时间旋转90度：
 *    旋转前：
 *      【 1  0  2】
 *      【-2  1  3】
 *    旋转后：
 *      【-2  1】
 *      【1   0】
 *      【3   2】
 *
 *
 * 矩阵转置示例：
 *    转置前：
 *      【 1  0  2】
 *      【-2  1  3】
 *     转置后：
 *      【1  -2】
 *      【0   1】
 *      【2   3】
 */

class FenceGroup {
    spu
    skuList = []

    /** wjp-flow：第六步：初始化fence-group中spu和skuList */
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    // initFences1() {
    //     /** wjp-flow：第七步：调用矩阵处理方法 */
    //     const matrix = this._createMatrix(this.skuList)
    //     const fences = []
    //     let currentJ = -1;
    //
    //     /** wjp-flow：第十二步：调用matrix的each方法，获取到期望的矩阵数据，保存于fences */
    //     matrix.each((element, i, j) => {
    //         // 开启一个新列，需要创建一个新的Fence
    //         if (currentJ !== j) {
    //             currentJ = j
    //             fences[currentJ] = this._createFence(element)
    //             // createFence
    //         }
    //         fences[currentJ].pushValueTitle(element.value)
    //     })
    //     console.log(fences)
    // }

    _createFence(element) {
        const fence = new Fence()
        return fence
    }

    /** wjp-flow：第八步：调用矩阵转置方法 */
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

    /** wjp-flow：第十五步：调用自己实现的矩阵转置方法 */
    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []

        const AT = matrix.transpose()
        console.log('转置以后的数据：', AT)
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
        console.log('完整的fences：', fences)
    }
}

export {
    FenceGroup
}