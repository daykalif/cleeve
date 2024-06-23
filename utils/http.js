/**
 * @file: 封装http请求
 * @description: 封装wx请求，并通过自定义promisic方法，返回promise后的数据格式
 */
import {config} from "../config/config";
import {promisic} from "./util";

class Http {
    static async request({
                             url,
                             data,
                             method = 'GET',
                         }) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey,
                clientkey: "I2Pu5Um7kvDtpb7u",
            }
        })
        return res.data;
    }
}

export {
    Http
}