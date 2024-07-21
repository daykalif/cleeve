// components/cart-item/index.ts
import {Cart} from "../../models/cart";
import {parseSpecValue} from "../../utils/sku";

const cart = new Cart();
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
        stock: Cart.SKU_MAX_COUNT,
        skuCount: 1,
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
                specStr, discount, soldOut, online, stockPinch, stock: cartItem.sku.stock, skuCount: cartItem.count,
            });
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /** 点击购物车删除按钮时，触发的事件 */
        onDelete(event) {
            let skuId = this.properties.cartItem.skuId;
            cart.removeItem(skuId);
            this.setData({
                cartItem: null
            });
            // 抛出删除事件，供父组件计算总价
            this.triggerEvent("itemdelete", {skuId});
        },

        /** 勾选/取消勾选 */
        checkedItem(event) {
            const checked = event.detail.checked;
            cart.checkItem(this.properties.cartItem.skuId);
            this.properties.cartItem.checked = checked;
            this.triggerEvent("itemcheck", {});
        },

        /** 点击counter组件，更新cartItem数量 */
        onSelectCount(event) {
            let newCount = event.detail.count;
            cart.replaceCartItemCount(this.properties.cartItem.skuId, newCount);
            this.triggerEvent("countfloat");
        }
    }
})