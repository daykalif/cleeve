/**
 * 第四部分D
 * @file: 活动
 */
import {Http} from "../utils/http";
import {activityData} from "../mock/home/activity";

class Activity {
    static locationD = 'a-2'

    static async getHomeLocationD() {
        const data = await Http.request({
            url: `activity/name/${Activity.locationD}`
        })
        return data ?? activityData;
    }
}

export {
    Activity
}