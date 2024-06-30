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
        this.fenceGroup.eachCell(this._changeOtherCellStatus)
    }

    /**
     * 潜在路径分析：
     *      金属灰     青芒色      橘黄色
     *      七龙珠     灌篮高手    圣斗士
     *      小号S      中号M      大号L
     *
     * 如果只选中一个元素，如：青芒色，则需要考虑如下可能，即当前元素与另外几行的俩俩组合
     *                              青芒色 - 七龙珠
     *                              青芒色 - 灌篮高手
     *                              青芒色 - 圣斗士
     *
     *                              青芒色 - 小号S
     *                              青芒色 - 中号M
     *                              青芒色 - 大号L
     *
     *                              对于同一行的元素，金属灰 和 橘黄色 不需要单独去考虑
     *
     * 如果选中了两个元素，如：青芒色 + 灌篮高手，则需要考虑如下可能
     *                              （青芒色 + 灌篮高手） - 小号S
     *                              （青芒色 + 灌篮高手） - 中号M
     *                              （青芒色 + 灌篮高手） - 大号L
     *
     *                              金属灰 - 灌篮高手
     *                              青芒色 - 灌篮高手（不需要再确认）
     *                              橘黄色 - 灌篮高手
     *
     *                              青芒色 - 七龙珠
     *                              青芒色 - 灌篮高手（不需要再确认）
     *                              青芒色 - 圣斗士
     *
     * 如果选中了三个元素，如：青芒色 + 灌篮高手 + 小号S，则需要考虑如下可能
     *                              金属灰 - （灌篮高手 + 小号S）
     *                              青芒色 - （灌篮高手 + 小号S）（不需要再确认）
     *                              橘黄色 - （灌篮高手 + 小号S）
     *
     *                              七龙珠 - （青芒色 + 小号S）
     *                              灌篮高手 - （青芒色 + 小号S）（不需要再确认）
     *                              圣斗士 - （青芒色 + 小号S）
     *
     *                              小号S - （青芒色 + 灌篮高手）（不需要再确认）
     *                              中号M - （青芒色 + 灌篮高手）
     *                              大号L - （青芒色 + 灌篮高手）
     *
     *
     * 总结：
     *      判断当前元素的可选路径的时候，需要判断自身+其他行已选元素的可能性，不需要判断自身所在的当前行的元素可能性。
     *      如果当前只选中了一个元素，去判断当前行的其他元素的可能性时，也满足上面这条的规律。
     *      因此，得出如下普适规律：
     *          1.已选中的Cell，不在需要判断潜在路径
     *          2.对于某个Cell，它的潜在路径应该是，他自己加上其他行的已选Cell
     *          3.对于某个Cell，不需要考虑当前行其他Cell是否已选
     */
    _changeOtherCellStatus(cell, x, y) {

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