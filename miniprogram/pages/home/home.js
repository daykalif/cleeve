// pages/home/home.js

import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";

Page({
    data: {
        themeA: null,
        bannerB: null,
        grid: [],
    },

    async initAllData() {
        const themeA = await Theme.getHomeLocationA();
        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLocationC()

        this.setData({
            themeA: themeA[0],
            bannerB,
            grid,
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