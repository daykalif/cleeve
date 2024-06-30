// components/realm/index.ts
import {Spu} from "../../models/spu";
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

Component({

    /** 组件的属性列表，由外部传入 */
    properties: {
        /** wjp-flow：第四步：realm中定义接收数据的字段spu */
        spu: Object,
    },

    /** 组件的初始数据，组件自己定义的属性 */
    data: {},

    /**
     * 获取组件属性数据有2种方法
     * 第一种是observers监听器处理数据，observers可以保证数据的传入
     * 第二种是小程序自定义组件的生命周期函数
     *      lifetimes: {
     *         attached() { // 但是通过生命周期获取的数据无法保证数据是否真实传入
     *         },
     *         ready() {
     *         },
     *         created() {
     *         },
     *     },
     */

    observers: {
        /** wjp-flow：第五步：增加observers监听器 */
        'spu': function (spu) {
            if (!spu) {
                return;
            }
            /** wjp-flow：第十三步：创建FenceGroup，调用initFences方法 */
            const fenceGroup = new FenceGroup(spu)
            // fenceGroup.initFences1()
            fenceGroup.initFences()

            /** wjp-flow：第三十一步：new Judger对象，计算出所有的可选sku组合*/
            const judger = new Judger(fenceGroup)

            /** wjp-flow：第十九步：绑定fenceGroup数据，供realm组件使用*/
            this.bindInitData(fenceGroup)
        }
    },


    /** 组件的方法列表 */
    methods: {
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        }
    }
})