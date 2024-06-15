// pages/home/home.ts

import {Theme} from "../../model/theme";

Page({
    "data": {
        "topTheme": null
    },

    "onLoad"() {
        Theme.getHomeLocationA((data: any[]) => {
            this.setData({
                "topTheme": data[0]
            })
        })
    },

    "onPullDownRefresh"() {

    },
    "onReachBottom"() {

    },
    "onShareAppMessage"() {

    }
})