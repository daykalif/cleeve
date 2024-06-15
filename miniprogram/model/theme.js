import {Http} from "../utils/http";
import {data1} from "../mock/home/names";

class Theme {
    static async getHomeLocationA(callback) {
        const data = await Http.request({
            url: 'theme/by/names',
            data: {
                names: 't-1'
            }
        })
        return data1 ?? data;
    }
}

export {
    Theme
}