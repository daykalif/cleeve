// components/cart-item/index.ts
import {Cart} from "../../models/cart";
import {parseSpecValue} from "../../utils/sku";

Component({

    /**
     * 组件的属性列表
     */
    properties: {
        cartItem: Object,
    },

    /**
     * 组件的初始数据
     */
    data: {
        specStr: String,
        discount: Boolean,
        soldOut: Boolean,
        online: Boolean,
        stockPinch: Boolean,
    },

    observers: {
        cartItem: function (cartItem) {
            if (!cartItem) {
                return;
            }
            // 将规格合并成一个字符串
            const specStr = parseSpecValue(cartItem.sku.specs);
            const discount = !!cartItem.sku.discount_price;
            const soldOut = Cart.isSoldOut(cartItem);
            const online = Cart.isOnline(cartItem);
            const stockPinch = Cart.stockPinch(cartItem);
            this.setData({
                specStr,
                discount,
                soldOut,
                online,
                stockPinch,
            });
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {}
})