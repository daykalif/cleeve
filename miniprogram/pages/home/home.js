// pages/home/home.js

import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";

Page({
    data: {
        themeA: null,
        bannerB: null,
    },

    async initAllData() {
        const themeA = await Theme.getHomeLocationA();
        const bannerB = await Banner.getHomeLocationB();

        this.setData({
            themeA: themeA[0],
            bannerB,
        })
    },

    async onLoad() {
        await this.initAllData();
    },

    onPullDownRefresh() {

    },
    onReachBottom() {

    },
    onShareAppMessage() {

    }
})