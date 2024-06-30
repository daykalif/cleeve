// components/realm/index.ts
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
        },

        onCellTap(event) {
            const data = event.detail.cell
            console.log('data', data);
        }
    }
})

/**
 * fenceGroup.fences的数据展示:
 * [
 *     {
 *         "cells": [
 *             {
 *                 "title": "青芒色",
 *                 "id": 42,
 *                 "status": "waiting"
 *             },
 *             {
 *                 "title": "橘黄色",
 *                 "id": 44,
 *                 "status": "waiting"
 *             }
 *         ],
 *         "specs": [
 *             {
 *                 "key_id": 1,
 *                 "key": "颜色",
 *                 "value_id": 42,
 *                 "value": "青芒色"
 *             },
 *             {
 *                 "key_id": 1,
 *                 "key": "颜色",
 *                 "value_id": 44,
 *                 "value": "橘黄色"
 *             }
 *         ],
 *         "title": "颜色",
 *         "id": 1
 *     },
 *     {
 *         "cells": [
 *             {
 *                 "title": "圣斗士",
 *                 "id": 11,
 *                 "status": "waiting"
 *             },
 *             {
 *                 "title": "七龙珠",
 *                 "id": 9,
 *                 "status": "waiting"
 *             }
 *         ],
 *         "specs": [
 *             {
 *                 "key_id": 3,
 *                 "key": "图案",
 *                 "value_id": 11,
 *                 "value": "圣斗士"
 *             },
 *             {
 *                 "key_id": 3,
 *                 "key": "图案",
 *                 "value_id": 9,
 *                 "value": "七龙珠"
 *             }
 *         ],
 *         "title": "图案",
 *         "id": 3
 *     },
 *     {
 *         "cells": [
 *             {
 *                 "title": "大号  L",
 *                 "id": 16,
 *                 "status": "waiting"
 *             },
 *             {
 *                 "title": "小号 S",
 *                 "id": 14,
 *                 "status": "waiting"
 *             }
 *         ],
 *         "specs": [
 *             {
 *                 "key_id": 4,
 *                 "key": "尺码",
 *                 "value_id": 16,
 *                 "value": "大号  L"
 *             },
 *             {
 *                 "key_id": 4,
 *                 "key": "尺码",
 *                 "value_id": 14,
 *                 "value": "小号 S"
 *             }
 *         ],
 *         "title": "尺码",
 *         "id": 4
 *     }
 * ]
 */

