import {Cart} from "./models/cart";

App({
    globalData: {},
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                console.log(res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        })


        // 应用启动时判断购物车是否为空
        const cart = new Cart();
        if (!cart.isEmpty()) {
            wx.showTabBarRedDot({
                index: 2
            });
        }
    },
})