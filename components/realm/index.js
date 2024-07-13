// components/realm/index.ts
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";
import {Cart} from "../../models/cart";

Component({

    /** 组件的属性列表，由外部传入 */
    properties: {
        /** wjp-flow：第四步：realm中定义接收数据的字段spu */
        spu: Object,
        // step6: realm中定义接收用户点击的字段：“加入购物车”/“立即购买”
        orderWay: String,
    },

    /** 组件的初始数据，组件自己定义的属性 */
    data: {
        judger: Object,
        previewImg: String,
        currentSkuCount: Cart.SKU_MIN_COUNT,
    },

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
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu);
            } else {
                this.processHasSpec(spu);
            }
            this.triggerSpecEvent();
        }
    },


    /** 组件的方法列表 */
    methods: {
        // 处理无规格情况
        processNoSpec(spu) {
            this.setData({
                noSpec: true,
            })
            this.bindSkuData(spu.sku_list[0])
            this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
        },
        // 处理有规格情况
        processHasSpec(spu) {
            /** wjp-flow：第十三步：创建FenceGroup，调用initFences方法 */
            const fenceGroup = new FenceGroup(spu)
            // fenceGroup.initFences1()
            fenceGroup.initFences()

            /** wjp-flow：第三十一步：new Judger对象，计算出所有的可选sku组合*/
            this.data.judger = new Judger(fenceGroup);

            const defaultSku = fenceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku);
                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount);
            } else {
                this.bindSpuData();
            }
            this.bindTipData();
            /** wjp-flow：第十九步：绑定fenceGroup数据，供realm组件使用*/
            this.bindFenceGroupData(fenceGroup);
        },

        // 绑定spu数据
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
            })
        },
        // 绑定sku数据
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock,   // 库存
            })
        },

        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntact(),
                currentValues: this.data.judger.getCurrentValues(),
                missingKeys: this.data.judger.getMissingKeys(),
            })
        },

        // 绑定规格矩阵
        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },

        // 判断当前数量是否超出库存量
        setStockStatus(stock, currentCount) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentCount)
            })
        },

        // 比较选购库存量与当前库存量
        isOutOfStock(stock, currentCount) {
            return stock < currentCount
        },

        onSelectCount(event) {
            // 数值编辑组件的count值
            const currentCount = event.detail.count
            this.data.currentSkuCount = currentCount

            // 完整sku路径时才会校验库存
            if (this.data.judger.isSkuIntact()) {
                const sku = this.data.judger.getDeterminateSku()
                this.setStockStatus(sku.stock, currentCount)
            }
        },

        // 点击cell单元格
        onCellTap(event) {
            const data = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y

            const cell = new Cell(data.spec)
            cell.status = data.status

            const judger = this.data.judger
            judger.judge(cell, x, y)

            const skuIntact = judger.isSkuIntact()
            if (skuIntact) {
                const currentSku = judger.getDeterminateSku()
                this.bindSkuData(currentSku)
                this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
            }
            this.bindTipData();
            this.bindFenceGroupData(judger.fenceGroup);
            this.triggerSpecEvent();
        },

        // 将已选择的sku抛给detail页面，用于展示已选规格
        triggerSpecEvent() {
            const noSpec = Spu.isNoSpec(this.properties.spu)
            if (noSpec) {
                this.triggerEvent('specchange', {
                    noSpec
                })
            } else {
                this.triggerEvent('specchange', {
                    noSpec: Spu.isNoSpec(this.properties.spu),
                    skuIntact: this.data.judger.isSkuIntact(),
                    currentValues: this.data.judger.getCurrentValues(),
                    missingKeys: this.data.judger.getMissingKeys()
                })
            }
        },

        // 用户点击realm组件中的"加入购物车"，触发的事件
        onBuyOrCart(event) {
            // 判断商品是否有规格
            if (Spu.isNoSpec(this.properties.spu)) {
                this.shoppingNoSpec();
            } else {
                this.shoppingVarious();
            }
        },

        shoppingNoSpec() {
            this._triggerShoppingEvent(this.getNoSpecSku())
        },

        // 将无规格sku加入购物车
        getNoSpecSku() {
            return this.properties.spu.sku_list[0]
        },

        // 将用户确定的sku加入购物车
        shoppingVarious() {
            const intact = this.data.judger.isSkuIntact();
            if (!intact) {
                // 获取用户未选择的规格文本，如用户未选择：“颜色”
                const missKeys = this.data.judger.getMissingKeys();
                wx.showToast({
                    icon: 'none',
                    title: `请选择：${missKeys.join('，')}`,
                    duration: 3000
                });
                return;
            }
            this._triggerShoppingEvent(this.data.judger.getDeterminateSku());
        },

        // 触发加入购物车事件
        _triggerShoppingEvent(sku) {
            this.triggerEvent('shopping', {
                orderWay: this.properties.orderWay,
                spuId: this.properties.spu.spuId,
                skuId: sku,
                skuCount: this.data.currentSkuCount,
            })
        },
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

