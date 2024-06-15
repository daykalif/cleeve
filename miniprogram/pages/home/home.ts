// pages/home/home.ts
import {config} from "../../config/config";
import {data1} from "../../mock/home/names";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        topTheme: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.request({
            url: `${config.apiBaseUrl}theme/by/names`,
            method: 'GET',
            data: {
                names: 't-1'
            },
            header: {
                appkey: 'ma6OHiFMc6gVyd5h'
            },
            success: (res) => {
                const data = data1 ?? res.data;
                this.setData({
                    // @ts-ignore
                    topTheme: data[0]
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})