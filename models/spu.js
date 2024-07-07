import {Http} from "../utils/http";
import {spuData} from "../mock/home/spu";

class Spu {
    /** wjp-flow：第一步：创建spu数据请求方法 */
    static getDetail(id) {
        const data = Http.request({
            url: `spu/id/${id}/detail`
        });
        return data ?? spuData;
        // return spuData ?? data;
    }

    // 无规格
    static isNoSpec(spu) {
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true
        }
        return false
    }
}

export {
    Spu
}