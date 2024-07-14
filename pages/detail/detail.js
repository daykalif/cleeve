// pages/detail/detail.ts
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";
import {getWindowHeightRpx} from "../../utils/system";
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItemCount: 0,
        showRealm: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        /** wjp-flow：第二步：获取spu-preview component点击传入的pid，并通过pid请求数据 */
        const pid = options.pid;
        const spu = await Spu.getDetail(pid);

        const explain = await SaleExplain.getFixed();
        const windowHeight = await getWindowHeightRpx();
        const h = windowHeight - 100;

        this.setData({
            spu,
            explain,
            h
        });
        this.updateCartItemCount();
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

    onShopping(event) {
        const chosenSku = event.detail.sku;
        const skuCount = event.detail.skuCount;

        if (event.detail.orderWay === ShoppingWay.CART) {
            const cart = new Cart();
            const cartItem = new CartItem(chosenSku, skuCount);
            cart.addItem(cartItem);
            this.updateCartItemCount();
        }
    },

    /** 更新购物车数量展示，并收起realm的展示 */
    updateCartItemCount() {
        const cart = new Cart();
        this.setData({
            cartItemCount: cart.getCartItemCount(),
            showRealm: false,
        });
    },

    onReady: function () {
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})