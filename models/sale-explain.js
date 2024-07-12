import {Http} from "../utils/http";

class SaleExplain {
    static async getFixed() {
        const data = await Http.request({
            url: `sale_explain/fixed`
        })
        return data.map(e => {
            return e.text
        })
    }
}

export {
    SaleExplain
}