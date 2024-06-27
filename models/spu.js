import {Http} from "../utils/http";

class Spu {
    /** wjp-flow：第一步：创建spu数据请求方法 */
    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        });
    }
}

export {
    Spu
}