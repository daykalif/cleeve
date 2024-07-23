// pages/order/order.ts

import {Cart} from "../../models/cart";
import {Sku} from "../../models/sku";
import {OrderItem} from "../../models/order-item";

const cart = new Cart();

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        let orderItems;

        const skuIds = cart.getCheckedSkuIds();
        orderItems = this.getCartOrderItems(skuIds);

    },

    /** 获取cart order-items */
    async getCartOrderItems(skuIds) {
        // 下单时同步最新的sku数据
        const skus = await Sku.getSkusByIds(skuIds);
        const orderItems = this.packageOrderItems(skus);
        return orderItems;
    },

    /** 组装order-items */
    packageOrderItems(skuIds) {
        skuIds.map(sku => {
            const count = cart.getSkuCountBySkuId(skuIds);
            return new OrderItem(sku, count);
        });
    },
});