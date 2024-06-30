import {Cell} from "./cell";

/** 存储用户选择状态的类 */
class SkuPending {
    // 用户已选择的状态
    pending = []

    constructor() {

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

    findSelectedCellByX(x) {
        return this.pending[x]
    }

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