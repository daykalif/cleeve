import {Http} from "../utils/http";

class Categories {
    roots = []
    subs = []

    async getAll() {
        const data = await Http.request({
            url: `category/all`
        })
        // 一级分类数据
        this.roots = data.roots
        // 二级分类数据
        this.subs = data.subs
    }

    getRoots() {
        return this.roots
    }

    getRoot(rootId) {
        return this.roots.find(r => r.id.toString() === rootId.toString())
    }

    // 筛选一级分类下的二级数据
    getSubs(parentId) {
        return this.subs.filter(sub => sub.parent_id.toString() === parentId.toString())
    }
}

export {
    Categories
}