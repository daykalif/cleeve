// components/cell/index.ts

/**
 *   颜色：   金属灰     青芒色      橘黄色
 *   图案：   七龙珠     灌篮高手    圣斗士
 *   尺码：   小号S      中号M      大号L
 *
 *      选择逻辑:
 *          用户选择了颜色：“青芒色”，需要计算下列组合是否为已存在sku可选项：
 *              需要考虑：    青芒色-七龙珠，   的组合是否存在，
 *                          青芒色-灌篮高手，
 *                          青芒色-圣斗士，
 *                          青芒色-小号S，
 *                          青芒色-中号M，
 *                          青芒色-大号L，
 *
 *          如果原先存在：青芒色-小号S的组合，但是用户选择了颜色：青芒色 + 图案：灌篮高手，
 *                  需要考虑：   青芒色+灌篮高手-小号S，   的组合是否存在，
 *                             青芒色+灌篮高手-中号M，
 *                             青芒色+灌篮高手-大号L，
 *
 *                  同时还需要考虑：选择了 图案：灌篮高手 后，颜色还有哪些可以选择；
 *                              灌篮高手-金属灰，
 *                              灌篮高手-青芒色，
 *                              灌篮高手-橘黄色，
 *
 *      总结：用户每做一次选择，需要重新计算所有可能性。
 */
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        /** wjp-flow：第二十三步：定义属性cell */
        cell: Object,
        y: Number,
        x: Number,
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            this.triggerEvent('celltap', {
                //  子组件向父组件传参
                cell: this.properties.cell,
                x: this.properties.x,
                y: this.properties.y
            }, {
                bubbles: true,  // 开启冒泡
                composed: true  // 跨越组件传参
            })
        }
    }
})