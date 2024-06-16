/**
 * 第二部分
 * @file: 轮播图 banner
 */
import {Http} from "../utils/http";
import {bannerData} from "../mock/home/banner";

class Banner {
    static locationB = 'b-1'

    static async getHomeLocationB() {
        const data = await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
        return bannerData ?? data;
    }
}

export {
    Banner
}