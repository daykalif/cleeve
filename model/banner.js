/**
 * 第二部分B
 * @file: 轮播图 banner
 */
import {Http} from "../utils/http";
import {bannerDataB, bannerDataG} from "../mock/home/banner";

class Banner {
    static locationB = 'b-1';
    static locationG = 'b-2';

    static async getHomeLocationB() {
        const data = await Http.request({
            url: `banner/name/${Banner.locationB}`
        });
        return bannerDataB ?? data;
    }

    static async getHomeLocationG() {
        const data = await Http.request({
            url: `banner/name/${Banner.locationG}`
        });
        return bannerDataG ?? data;
    }
}

export {
    Banner
}