// components/address/index.ts
import {Address} from "../../models/address";
import {AuthAddress} from "../../core/enum";

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
        showDialog: false,
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
        async onChooseAddress(event) {
            const authStatus = await this.hasAuthorizedAddress();
            console.log('authStatus-->', authStatus);
            if (authStatus === AuthAddress.DENY) {
                this.setData({
                    showDialog: true
                });
                return;
            }
            await this.getUserAddress();
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
        },

        // 获取用户授权的地址信息
        async hasAuthorizedAddress() {
            // 获取用户授权的信息
            const setting = await wx.getSetting({});
            const addressSetting = setting.authSetting['scope.address'];
            // 未获取到用户授权操作（从来没有授权过）
            if (addressSetting === undefined) {
                return AuthAddress.NOT_AUTH;
            }
            // 用户未授权过
            if (addressSetting === false) {
                return AuthAddress.DENY;
            }
            // 用户授权过
            if (addressSetting === true) {
                return AuthAddress.AUTHORIZED;
            }
        },

        // 授权dialog
        onDialogConfirm(event) {
            wx.openSetting();
        }
    }
})