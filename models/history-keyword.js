class HistoryKeyword {
    // 缓存最大能保存的关键词数量
    static MAX_ITEM_COUNT = 20;
    static KEY = 'keywords';

    keywords = [];

    constructor() {
        // 使用单例模式
        if (typeof HistoryKeyword.instance === 'object') {
            return HistoryKeyword.instance
        }
        HistoryKeyword.instance = this;

        this.keywords = this._getLocalKeywords();
        return this
    }

    // 往缓存中写入数据，除了需要设置保存的最大值，还需要去重
    save(keyword) {
        // 找出keywords中是否已经存在了该关键词
        const items = this.keywords.filter(k => {
            return k === keyword
        });
        // 如果有这个关键词了，就表示重复了，return掉
        if (items.length !== 0) {
            return
        }
        // 如果超出最大值，则去除关键词的最后一项，并将新关键词插入数组第一项
        if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
            this.keywords.pop()
        }
        this.keywords.unshift(keyword);
        // 重新保存缓存
        this._refreshLocal()
    }

    get() {
        return this.keywords
    }

    clear() {
        this.keywords = [];
        this._refreshLocal()
    }

    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords)
    }

    _getLocalKeywords() {
        const keywords = wx.getStorageSync(HistoryKeyword.KEY);
        if (!keywords) {
            wx.setStorageSync(HistoryKeyword.KEY, []);
            return []
        }
        return keywords
    }
}

export {
    HistoryKeyword
}