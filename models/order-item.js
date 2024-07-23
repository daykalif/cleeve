import {Cart} from "./cart";
import {accMultiply} from "../utils/number";
import {OrderException} from "../core/order-exception";
import {OrderExceptionType} from "../core/enum";

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

    isOk() {
        this._checkStock()
        this._beyondMaxSkuCount()
    }

    /** 确认此次购买的数量库存是否足够支持 */
    _checkStock() {
        if (this.stock === 0) {
            throw new OrderException('当前商品已售罄', OrderExceptionType.SOLD_OUT)
        }
        if (this.count > this.stock) {
            throw new OrderException('购买商品数量超过最大库存', OrderExceptionType.BEYOND_STOCK)
        }
    }

    /** 确认此次购买的数量是否超过商品最大购买数量 */
    _beyondMaxSkuCount() {
        if (this.count > Cart.SKU_MAX_COUNT) {
            throw new OrderException('超过商品最大购买数量', OrderExceptionType.BEYOND_SKU_MAX_COUNT)
        }
    }
}

export {
    OrderItem
}