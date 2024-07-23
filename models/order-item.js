import {Cart} from "./cart";
import {accMultiply} from "../utils/number";

class OrderItem {
    count = 0
    // 单价
    singleFinalPrice
    // 总价 = 单价 * 数量
    finalPrice
    online
    title
    img
    stock
    categoryId
    rootCategoryId
    specs
    skuId

    cart = new Cart()

    constructor(sku, count) {
        this.title = sku.title
        this.img = sku.img
        this.skuId = sku.id
        this.stock = sku.stock
        this.online = sku.online
        this.categoryId = sku.category_id
        this.rootCategoryId = sku.root_catgory_id
        this.specs = sku.specs

        this.count = count

        this.singleFinalPrice = this.ensureSingleFinalPrice(sku)
        this.finalPrice = accMultiply(this.count, this.singleFinalPrice)
    }

    /** 确定单价（折扣价/原价） */
    ensureSingleFinalPrice(sku) {
        if (sku.discount_price) {
            return sku.discount_price
        }
        return sku.price
    }
}

export {
    OrderItem
}