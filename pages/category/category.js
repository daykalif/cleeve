// pages/category/category.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    // 跳转搜索页
    onGotoSearch(event) {
        wx.navigateTo({
            url: `/pages/search/search`
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})