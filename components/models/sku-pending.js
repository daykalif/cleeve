import {Cell} from "./cell";

/** 存储用户选择状态的类 */
class SkuPending {
    pending = []

    constructor(size) {

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
}

export {
    SkuPending
}