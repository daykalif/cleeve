// components/address/index.ts
import {Address} from "../../models/address";

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

    lifetimes: {
        // 组件初始化-生命周期函数
        attached() {
            const address = Address.getLocal();
            if (address) {
                this.setData({
                    address,
                    hasChosen: true
                });
            }
        }
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
                });
                Address.setLocal(res);
            }
        }
    }
})