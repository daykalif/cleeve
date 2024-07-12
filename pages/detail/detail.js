// pages/detail/detail.ts
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRealm: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        /** wjp-flow：第二步：获取spu-preview component点击传入的pid，并通过pid请求数据 */
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        this.setData({
            spu
        })
    },

    // step4: 设置orderWay
    onAddToCart(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },

    onBuy(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        })
    },

    onGotoHome(event) {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    onGotoCart(event) {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },

    onSpecChange(event) {
        this.setData({
            specs: event.detail
        })
    },

    onReady: function () {
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})