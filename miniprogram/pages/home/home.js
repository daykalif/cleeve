// pages/home/home.js

import {Theme} from "../../model/theme";

Page({
    data: {
        topTheme: null,
    },

    onLoad: async function () {
        const data = await Theme.getHomeLocationA();
        this.setData({
            topTheme: data[0]
        })
    },

    "onPullDownRefresh"() {

    },
    "onReachBottom"() {

    },
    "onShareAppMessage"() {

    }
})