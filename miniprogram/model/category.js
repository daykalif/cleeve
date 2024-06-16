import {Http} from "../utils/http";
import {categoryData} from "../mock/home/category";

class Category {

    static async getHomeLocationC() {
        const data = await Http.request({
            url: `category/grid/all`
        })
        return categoryData ?? data;
    }
}

export {
    Category
}