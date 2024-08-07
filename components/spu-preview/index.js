/**
 * @file: 瀑布流小卡片
 */
// components/spu-preview/index.ts

Component({
    /**
     * 组件的属性列表，由外部传入
     */
    properties: {
        data: Object
    },
    /** 组件自己定义的属性 */
    data: {
        tags: Array
    },

    observers: {
        data: function (data) {
            if (!data) {
                return
            }
            if (!data.tags) {
                return
            }
            const tags = data.tags.split('$')
            this.setData({
                tags
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 宽度固定340，动态计算高度
        onImgLoad(event) {
            const {width, height} = event.detail
            this.setData({
                w: 340,
                h: 340 * height / width
            })
        },
        onItemTap(event) {
            const pid = event.currentTarget.dataset.pid
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
        }
    }
})
