// pages/cart/cart.ts
import {Cart} from "../../models/cart";
import {Calculator} from "../../models/calculator";

const cart = new Cart();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItems: [],
        isEmpty: false,
        allChecked: false,
        totalPrice: 0,
        totalSkuCount: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        // 从服务器同步sku数据
        const cartData = await cart.getAllSkuFromServer();
        this.setData({
            cartItems: cartData.items,
        });
    },

    /**
     * 生命周期函数--监听页面显示(只要页面show一遍就会触发一遍)
     */
    onShow() {
        const cart = new Cart();
        // cartItems来自cart类中的_cartData
        const cartItems = cart.getAllCartItemFromLocal().items;
        if (cart.isEmpty()) {
            this.empty();
            return;
        }
        this.setData({
            cartItems
        });
        this.notEmpty();
        // 切换购物车tab显隐时，需要刷新全选状态
        this.isAllChecked();
        // 计算购物车数量和总价
        this.refreshCartData();
    },

    empty() {
        this.setData({
            isEmpty: true,
        });
        // 隐藏购物车tab上的红点（小程序内置的，控制红点出现的位置；0:首页、1:分类、2:购物车、3:我的）
        wx.hideTabBarRedDot({
            index: 2
        });
    },

    notEmpty() {
        this.setData({
            isEmpty: false,
        });
        // 显示购物车tab上的红点（小程序内置的，控制红点出现的位置；0:首页、1:分类、2:购物车、3:我的）
        wx.showTabBarRedDot({
            index: 2
        });
    },

    // 缓存中判断所有cartItem是否选中
    isAllChecked() {
        const allChecked = cart.isAllChecked();
        this.setData({
            allChecked
        });
    },

    // cartItem点击checkbox后，设置全选状态
    onSingleCheck() {
        this.isAllChecked();
        this.refreshCartData();
    },

    // 删除cartItem后，设置全选状态
    onDeleteItem() {
        this.isAllChecked();
        this.refreshCartData();
    },

    // 点击全选状态
    onCheckAll(event) {
        const checked = event.detail.checked;
        cart.checkAll(checked);
        this.setData({
            cartItems: this.data.cartItems
        });
        this.refreshCartData();
    },

    // 购物车数量，总价的计算
    refreshCartData() {
        // 获取所有勾选的cartItems
        const cartItems = cart.getCheckedItems();

        // 只需要计算勾选的cartItem的数量总和和价格总和
        const calculator = new Calculator(cartItems);
        calculator.calc();
        this.setCalcData(calculator);
    },

    // 绑定数据
    setCalcData(calculator) {
        const totalPrice = calculator.getTotalPrice();
        const totalSkuCount = calculator.getTotalSkuCount();
        this.setData({
            totalPrice,
            totalSkuCount,
        });
    },

    onCountFloat(event) {
        this.refreshCartData();
    },

    // 跳转结算页面
    onSettle(event) {
        if (this.data.totalSkuCount <= 0) {
            return;
        }
        wx.navigateTo({
            url: '/pages/order/order'
        })
    }
})