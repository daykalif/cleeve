// pages/home/home.js

import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({
    data: {
        themeA: null,
        bannerB: null,
        grid: [],
        activityD: null,
        themeE: null,
        themeESpu: [],
        spuPaging: null,
        loadingType: 'loading',
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
        const activityD = await Activity.getHomeLocationD();

        const bannerG = await Banner.getHomeLocationG();
        const themeH = theme.getHomeLocationH()

        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH,
        })
    },

    /** 加载瀑布流第一页数据 */
    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return;
        }
        // 瀑布流数据，传递给spu-preview组件（下列方法由LinUi提供）
        wx.lin.renderWaterFlow(data.items)
    },

    async onLoad() {
        await this.initAllData();
        await this.initBottomSpuList();
    },

    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    onPullDownRefresh() {

    },

    onShareAppMessage() {

    }
})