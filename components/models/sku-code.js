import {combination} from "../../utils/util";

class SkuCode {
    code    // 一个完整的sku code
    spuId   // 商品id
    totalSegments = []  // 当前code包含所有可拆解的sku code组合

    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    /** wjp-flow：第二十七：拆解sku code组合 */
    _splitToSegments() {
        // 2$1-44#3-9#4-14

        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]

        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length

        for (let i = 1; i <= length; i++) {
            /** wjp-flow：第二十九：segments记录一次组合*/
            const segments = combination(specCodeArray, i)

            /**
                // [["1-42"],["3-11"],["4-16"]]
                // [["1-42", "3-11"],["1-42", "4-16"],["3-11", "4-16"]]
                // [["1-42", "3-11", "4-16"]]
                console.log('segments', segments);
             */

            const newSegments = segments.map(segs => {
                return segs.join('#')
            })
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
    }
}

export {
    SkuCode
}