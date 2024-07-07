/**
 * @file: spu的数据请求（瀑布流展示）
 */
import {Paging} from "../utils/paging";

class SpuPaging {
    static getLatestPaging() {
        return new Paging({
            url: `spu/latest`
        }, 5)
    }
}

export {
    SpuPaging
}