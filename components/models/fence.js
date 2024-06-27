/**
 * @file: fence所要的数据就是规格值
 *
 * 处理fence的数据
 *
 * 以下就是一组fence，以颜色为例：
 *      金属灰 ｜ 青芒色 ｜ 橘黄色
 */
class Fence {
    valueTitles = []

    constructor(specs) {

    }

    /** wjp-flow: 第十步：实现fence, 此处的fence暂时只以title作为内容创建*/
    pushValueTitle(title) {
        this.valueTitles.push(title)
    }
}

export {
    Fence
}