import {Http} from "../utils/http";
import {namesData} from "../mock/home/names";

class Theme {
    static async getHomeLocationA(callback) {
        const data = await Http.request({
            url: 'theme/by/names',
            data: {
                names: 't-1'
            }
        })
        return namesData ?? data;
    }
}

export {
    Theme
}