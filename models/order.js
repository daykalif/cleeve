import {OrderException} from "../core/order-exception";
import {OrderExceptionType} from "../core/enum";

class Order {
    orderItems
    localItemCount

    constructor(orderItems, localItemCount) {
        this.orderItems = orderItems
        this.localItemCount = localItemCount
    }

    /** 对整个OrderItems进行校验 */
    checkOrderIsOk() {
        this.orderItems.forEach(item => {
            item.isOk();
        });
    }

    /** 校验当前订单 */
    _orderIsOk() {
        this._emptyOrder()
        this._containNotOnSaleItem()
    }

    /** 校验当前订单是否为空 */
    _emptyOrder() {
        if (this.orderItems.length === 0) {
            throw new OrderException('订单中没有任何商品', OrderExceptionType.EMPTY);
        }
    }

    /** 校验当前订单商品是否下架 */
    _containNotOnSaleItem() {
        if (this.orderItems.length !== this.localItemCount) {
            throw new OrderException('服务器返回订单商品数量与实际不相符，可能是有商品已下架', OrderExceptionType.NOT_ON_SALE);
        }
    }
}

export {
    Order
}