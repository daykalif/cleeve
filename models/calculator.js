/**
 * @file: 计算类
 */
class Calculator {
    totalPrice = 0;
    totalSkuCount = 0;
    cartItems = [];

    constructor(cartItems) {
        this.cartItems = cartItems;
    }

    /** 计算totalPrice和totalSkuCount */
    calc() {
        this.cartItems.forEach(item => {
            this.push(item)
        })
    }

    push(cartItem) {
        let partTotalPrice = 0;
        if (cartItem.sku.discount_price) {
            partTotalPrice = cartItem.count * cartItem.sku.discount_price;
        } else {
            partTotalPrice = cartItem.count * cartItem.sku.price;
        }
        this.totalPrice += partTotalPrice;
        this.totalSkuCount += cartItem.count;
    }

    getTotalPrice() {
        return this.totalPrice;
    }

    getTotalSkuCount() {
        return this.totalSkuCount;
    }
}

export {
    Calculator
}