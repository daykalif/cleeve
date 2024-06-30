import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

/**
 * wjp-flow：第二十六：创建judger类，用于管理所有可选sku路径以及用户已选sku路径
 */
class Judger {
    fenceGroup
    // 字典：已存在的sku路径
    pathDict = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)

    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            /** wjp-flow：第三十步：循环调用SkuCode，并拆解sku组合 */
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict);
    }

    judge(cell, x, y) {
        this._changeCellStatus(cell, x, y)
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            // console.log('path', path)
            if (!path) {
                return
            }
            const isIn = this._isInDict(path)
            if (isIn) {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            } else {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
            }
        })
    }

    // 判断当前潜在路径是否在字典中
    _isInDict(path) {
        return this.pathDict.includes(path)
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

    // 寻找潜在路径
    _findPotentialPath(cell, x) {
        const joiner = new Joiner('#')

        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            // 查找每一行，哪个元素是已选的，而不是当前行哪个元素是已选的，所以不传x
            const selected = this.skuPending.findSelectedCellByX(i)

            // 当前行
            if (x === i) {
                // 当前行的已选cell需要跳过判断
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                // 其他行
                if (selected) {
                    //  如果存在其他行，并且有已选元素，则需要加入到potential path中去
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }

        return joiner.getStr()
    }

    // 拼接一个cell code：key_id-value_id
    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    // 点击cell，改变cell状态
    _changeCellStatus(cell, x, y) {
        // 用户执行正选操作
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            this.skuPending.insertCell(cell, x)
        }
        // 用户执行反选操作
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.skuPending.removeCell(x)
        }
    }
}

export {
    Judger
}