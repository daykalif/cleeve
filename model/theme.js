/**
 * 第一部分A,E
 * @file: 主题 theme
 */
import {Http} from "../utils/http";
import {namesData, withSpuData} from "../mock/home/names";

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
        this.themes = data ?? namesData;
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

    /**
     * 何时需要加static？
     *
     * 如果数据不需要保存状态，则加static
     * 如果要保存状态，则优先做成实例的方法
     */

    /**
     * 何时需要加async？
     *
     * 需要强制保证返回的是promise的时候
     */
    // 如果方法里面未涉及到类的对象以及实例属性，则编辑器会自动推断应该用static
    static getThemeSpuByName(name) {
        const data = Http.request({
            url: `theme/name/${name}/with_spu`
        });
        return data ?? withSpuData;
    }

    static getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.locationE)
    }
}

export {
    Theme
}