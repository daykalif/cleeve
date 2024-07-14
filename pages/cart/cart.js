// pages/cart/cart.ts
import {Cart} from "../../models/cart";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItems: [],
        isEmpty: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面显示(只要页面show一遍就会触发一遍)
     */
    onShow() {
        const cart = new Cart();
        const cartItems = cart.getAllCartItemFromLocal().items;
        if (cart.isEmpty()) {
            this.empty();
        }
        this.setData({
            cartItems
        });
    },

    empty() {
        this.setData({
            isEmpty: true,
        });
        // 购物车tab上的红点（小程序内置的，控制红点出现的位置；0:首页、1:分类、2:购物车、3:我的）
        wx.hideTabBarRedDot({
            index: 2
        });
    }
})