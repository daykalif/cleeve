// pages/home/home.js

import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";

Page({
    data: {
        themeA: null,
        bannerB: null,
        grid: [],
        activityD: null,
        themeE: null,
        themeESpu: [],
    },

    async initAllData() {
        const theme = new Theme();
        await theme.getThemes();
        const themeA = theme.getHomeLocationA();
        const themeE = theme.getHomeLocationE();
        const themeF = theme.getHomeLocationF()

        let themeESpu = [];
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }


        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD()

        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
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