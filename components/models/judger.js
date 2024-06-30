import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";

/**
 * wjp-flow：第二十六：创建judger类，用于管理所有可选sku路径以及用户已选sku路径
 */
class Judger {
    fenceGroup
    // 已存在的sku路径
    pathDict = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            /** wjp-flow：第三十步：循环调用SkuCode，并拆解sku组合 */
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
            console.log(this.pathDict);
        })
    }

    judge(cell, x, y) {
        this._changeCellStatus(cell, x, y)
    }

    _changeCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
        }
    }
}

export {
    Judger
}