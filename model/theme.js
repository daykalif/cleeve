/**
 * 第一部分
 * @file: 主题 theme
 */
import {Http} from "../utils/http";
import {namesData} from "../mock/home/names";

class Theme {
    themes = [];
    static locationA = 't-1';
    static locationE = 't-2';
    static locationF = 't-3';
    static locationH = 't-4';

    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        const data = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
        this.themes = namesData ?? data;
    }

    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }

    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }

    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
    }

    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
    }
}

export {
    Theme
}