import {Http} from "../utils/http";
import {spuData} from "../mock/home/spu";

class Spu {
    /** wjp-flow：第一步：创建spu数据请求方法 */
    static getDetail(id) {
        const data = Http.request({
            url: `spu/id/${id}/detail`
        });
        return data ?? spuData;
    }
}

export {
    Spu
}