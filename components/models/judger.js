import {SkuCode} from "./sku-code";

/**
 * wjp-flow：第二十六：创建judger类，用于管理所有可选sku路径以及用户已选sku路径
 */
class Judger {
    fenceGroup
    // 已存在的sku路径
    pathDict = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDict()
    }

    initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            /** wjp-flow：第三十步：循环调用SkuCode，并拆解sku组合 */
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
            console.log(this.pathDict);
        })
    }
}

export {
    Judger
}