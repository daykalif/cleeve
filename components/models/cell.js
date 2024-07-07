/**
 * @file: 存储一个单元格信息，包含title，id，status等
 *        同时提供getCellCode方法，用于获取cell code
 */
import {CellStatus} from "../../core/enum";

class Cell {
    title
    id
    status = CellStatus.WAITING
    spec

    /** wjp-flow：第十七步：创建cell */
    constructor(spec) {
        this.title = spec.value  // value:'金色'
        this.id = spec.value_id  // value_id:27
        this.spec = spec
    }

    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }
}

export {
    Cell
}