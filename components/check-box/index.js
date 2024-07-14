// components/check-box/index.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        checked: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onCheck(event) {
            let checked = this.properties.checked;
            // 设置组件内部checked状态
            this.setData({
                checked: !checked
            });
            // 将checked状态传递给父组件，用于“全选”逻辑
            this.triggerEvent('check', {
                checked: !checked
            }, {
                bubbles: true,
                composed: true
            })
        }
    }
})