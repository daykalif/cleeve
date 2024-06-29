class Cell {
    title
    id

    /** wjp-flow：第十七步：创建cell */
    constructor(spec) {
        this.title = spec.value  // value:'金色'
        this.id = spec.value_id  // value_id:27
    }
}

export {
    Cell
}