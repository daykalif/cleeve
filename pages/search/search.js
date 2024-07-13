// pages/search/search.js
import {HistoryKeyword} from "../../models/history-keyword";
import {Tag} from "../../models/tag";
import {Search} from "../../models/search";
import {showToast} from "../../utils/ui";

const history = new HistoryKeyword();
Page({

    data: {},

    onLoad: async function (options) {
        const historyTags = history.get();
        const hotTags = await Tag.getSearchTags();
        this.setData({
            historyTags,
            hotTags
        })
    },

    async onSearch(event) {
        this.setData({
            search: true,
            items: []
        });
        // 搜索框中的keyword 或者 点击tag的keyword
        const keyword = event.detail.value || event.detail.name;
        if (!keyword) {
            showToast('请输入关键字');
            return
        }
        history.save(keyword);

        this.setData({
            historyTags: history.get()
        });

        const paging = Search.search(keyword);
        // 使用lin-ui loading组件
        wx.lin.showLoading({
            color: '#157658',
            type: 'flash',
            fullScreen: true
        });
        const data = await paging.getMoreData();
        wx.lin.hideLoading();
        this.bindItems(data)
    },

    onCancel(event) {
        this.setData({
            search: false
        })
    },

    bindItems(data) {
        if (data.accumulator.length !== 0) {
            this.setData({
                items: data.accumulator
            })
        }
    },

    onDeleteHistory(event) {
        history.clear();
        this.setData({
            historyTags: []
        })
    }
});