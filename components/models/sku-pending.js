/**
 * @file: 存储用户选择状态的类
 */
import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    // 用户已选择的状态
    pending = []
    // 一个sku产品有几种规格（如：颜色，图案，尺码，就是3个规格，size即为3）
    size

    constructor(size) {
        this.size = size
    }

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    // 正选
    insertCell(cell, x) {   // x:行号
        this.pending[x] = cell
    }

    // 反选
    removeCell(x) {
        this.pending[x] = null
    }

    // 查找已选spec值
    getCurrentSpecValues() {
        return this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
    }

    // 查找缺少的spec key
    getMissingSpecKeysIndex() {
        const keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]) {
                keysIndex.push(i)
            }
        }
        return keysIndex
    }

    getSkuCode() {
        const joiner = new Joiner('#')
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }

    // 判断是否选择了一个有效的sku所有属性，如果有未选属性，则表示这个sku选择不完整
    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index) {
        return !this.pending[index]
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }

    // 判断当前cell是否已选择
    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {
    SkuPending
}