/**
 * @file: fence所要的数据就是规格值
 *
 * 处理fence的数据
 *
 * 以下就是一组fence，以颜色为例：
 *      金属灰 ｜ 青芒色 ｜ 橘黄色
 */
import {Cell} from "./cell";

class Fence {
    // valueTitles = []
    cells = []
    specs   // 一组fence数组，如：[金属灰, 青芒色, 橘黄色]

    constructor(specs) {
        this.specs = specs
    }

    /** wjp-flow：第十六步：将转置矩阵的 */
    init() {
        this.specs.forEach(s => {
            // this.pushValueTitle(s.value)
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

    // /** wjp-flow：第十步：实现fence, 此处的fence暂时只以title作为内容创建*/
    // pushValueTitle(title) {
    //     this.valueTitles.push(title)
    // }
}

export {
    Fence
}