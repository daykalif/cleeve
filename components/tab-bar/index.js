// components/tab-bar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cartItemCount: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onGoToHome(event) {
            this.triggerEvent('gotohome', {})
        },

        onGoToCart(event) {
            this.triggerEvent('gotocart')
        },

        // step2: tigger点击事件类型
        onAddToCart(event) {
            this.triggerEvent('addtocart')
        },

        onBuy(event) {
            this.triggerEvent('buy')
        }
    }
})
