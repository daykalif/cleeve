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
}

export {
    Cell
}