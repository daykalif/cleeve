// components/address/index.ts
import boolean from "../../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

Component({

    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        address: Object,
        hasChosen: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChooseAddress(event) {
            this.getUserAddress();
        },

        async getUserAddress() {
            let res;
            try {
                res = await wx.chooseAddress({});
            } catch (e) {
                console.log(e);
            }
            if (res) {
                this.setData({
                    address: res,
                    hasChosen: true,
                })
            }
        }
    }
})