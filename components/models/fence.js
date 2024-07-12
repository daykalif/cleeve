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
    specs   // 一组fence数组，如：[
            //                      {key_id: 1, key: "颜色", value_id: 42, value: "青芒色"},
            //                      {key_id: 1, key: "颜色", value_id: 44, value: "橘黄色"}
            //                  ]
    title
    id

    constructor(specs) {
        this.specs = specs
        console.log('specs',specs);
        this.title = specs[0].key  // key:'颜色'
        this.id = specs[0].key_id  // key_id:1
    }

    /** wjp-flow：第十六步：将转置矩阵的 */
    init() {
        this._initCells()
    }

    // 初始化Cells
    _initCells() {
        this.specs.forEach(s => {
            /** wjp-flow：第十八步：cells去重 */
            const existed = this.cells.some(c => {
                return c.id === s.value_id
            })
            if (existed) {
                return
            }

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