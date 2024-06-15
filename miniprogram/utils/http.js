import {config} from "../config/config";
import {data1} from "../mock/home/names";

class Http {
    static request({
                       url,
                       data,
                       method = 'GET',
                       callback
                   }) {
        const res = wx.request({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            },
            success(res) {
                callback(data1 ?? res.data)
            }
        })
    }
}

export {
    Http
}