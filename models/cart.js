import {Sku} from "./sku";

class Cart {
    static SKU_MIN_COUNT = 1;
    // 对于某一个sku可买最大数量
    static SKU_MAX_COUNT = 77;
    // 加入购物车所有sku最大总量
    static CART_ITEM_MAX_COUNT = 99;
    // 缓存的key
    static STORAGE_KEY = 'cart';

    // 代理模式的应用，真实数据存储在缓存中，实际操作的是_cartData
    _cartData = null;

    constructor() {
        // 单例模式
        if (typeof Cart.instance === 'object') {
            return Cart.instance;
        }
        Cart.instance = this;
        return this;
    }

    getAllCartItemFromLocal() {
        return this._getCartData();
    }

    /** 判断购物车是否为空 */
    isEmpty() {
        const cartData = this._getCartData();
        return cartData.items.length === 0;
    }

    /** 向购物车中添加商品 */
    addItem(newItem) {
        if (this.beyondMaxCartItemCount()) {
            throw new Error('超过购物车最大数量');
        }
        // 将商品推入购物车
        this._pushItem(newItem);
        // 将购物车数据同步至缓存
        this._refreshStorage();
    }

    /** 判断购物车数量是否超限 */
    beyondMaxCartItemCount() {
        const cartData = this._getCartData();
        return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT;
    }

    /** 真正将商品加入购物车 */
    _pushItem(newItem) {
        // 已经存储的cardData
        const cardData = this._getCartData();
        const oldItem = this.findEqualItem(newItem.skuId);
        if (!oldItem) {
            // 将数据追加到购物车的上部
            cardData.items.unshift(newItem);
        } else {
            //  如果加入的新商品在购物车中已经存在，则是对购物车的旧数据进行数量的增加
            this._combineItems(oldItem, newItem);
        }
    }

    /** 获取cartData */
    _getCartData() {
        if (this._cartData !== null) {
            return this._cartData;
        }
        let cardData = wx.getStorageSync(Cart.STORAGE_KEY);
        if (!cardData) {
            cardData = this._initCartDataStorage();
        }
        this._cartData = cardData;
        return cardData;
    }

    /** 初始化缓存 */
    _initCartDataStorage() {
        const cartData = {
            items: []
        }
        wx.setStorageSync(Cart.STORAGE_KEY, cartData)
        return cartData;
    }

    /** 寻找购物车中相同的cartItem */
    findEqualItem(skuId) {
        let oldItem = null;
        const items = this._getCartData().items;
        for (let i = 0; i < items.length; i++) {
            if (this._isEqualItem(items[i], skuId)) {
                oldItem = items[i];
                break;
            }
        }
        return oldItem;
    }

    /** 判等 */
    _isEqualItem(oldItem, skuId) {
        return oldItem.skuId === skuId;
    }

    /** 对相同cartItem进行数量的增加 */
    _combineItems(oldItem, newItem) {
        this._plusCount(oldItem, newItem.count);
    }

    /** 数量相加方法 */
    _plusCount(item, count) {
        item.count += count;
        if (item.count >= Cart.SKU_MAX_COUNT) {
            item.count = Cart.SKU_MAX_COUNT;
        }
    }

    /** 刷新缓存（将购物车数据同步至缓存） */
    _refreshStorage() {
        wx.setStorageSync(Cart.STORAGE_KEY, this._cartData);
    }

    /** 删除购物车商品 */
    removeItem(skuId) {
        const oldItemIndex = this._findEqualItemIndex(skuId);
        const cartData = this._getCartData();
        cartData.items.splice(oldItemIndex, 1);
        this._refreshStorage();
    }

    /** 寻找cartItem在购物车中序号 */
    _findEqualItemIndex(skuId) {
        const cartData = this._getCartData();
        return cartData.items.findIndex(item => {
            return item.skuId === skuId;
        });
    }

    /** 获取购物车数量 */
    getCartItemCount() {
        return this._getCartData().items.length;
    }

    /** 判断一个cart的sku是否售罄 */
    static isSoldOut(item) {
        return item.sku.stock === 0;
    }

    /** 判断一个cart的sku是否上架 */
    static isOnline(item) {
        return item.sku.online;
    }

    /** 判断一个cart的sku库存量是否小于10 */
    static stockPinch(item) {
        return item.sku.stock < 10 && item.sku.online && item.sku.stock > 0
    }

    /** 更新cartItem的checkbox状态 */
    checkItem(skuId) {
        const oldItem = this.findEqualItem(skuId);
        oldItem.checked = !oldItem.checked;
        this._refreshStorage();
    }

    /** 模型类中判断cartItems是否全部选中 */
    isAllChecked() {
        let allChecked = true;
        const cartItems = this._getCartData().items;
        for (let item of cartItems) {
            if (!item.checked) {
                allChecked = false;
                break;
            }
        }
        return allChecked;
    }

    /** 点击全选按钮，更新缓存 */
    checkAll(checked) {
        const cartData = this._getCartData();
        // 改变代理对象_cartData的checked状态
        cartData.items.forEach(item => {
            item.checked = checked;
        });
        // 改变缓存中checked状态
        this._refreshStorage();
    }

    /** 获取所有勾选的cart items */
    getCheckedItems() {
        const cartItems = this._getCartData().items;
        const checkedCartItems = [];
        cartItems.forEach(item => {
            if (item.checked) {
                checkedCartItems.push(item);
            }
        });
        return checkedCartItems;
    }

    /** 更新cartItems数量 */
    replaceCartItemCount(skuId, newCount) {
        const oldItem = this.findEqualItem(skuId);
        if (!oldItem) {
            console.error('异常情况，更新CartItem中的数量不应当找不到相应数据');
            return;
        }
        if (newCount < 1) {
            console.error('异常情况，CartItem的Count不可能小于1');
            return;
        }
        oldItem.count = newCount;
        if (oldItem.count >= Cart.SKU_MAX_COUNT) {
            oldItem.count = Cart.SKU_MAX_COUNT;
        }
        this._refreshStorage();
    }

    /** 从服务端更新缓存的sku数据 */
    async getAllSkuFromServer() {
        const cartData = this._getCartData();
        if (cartData.items.length === 0) {
            return null;
        }
        const skuIds = this.getSkuIds();
        const serverData = await Sku.getSkusByIds(skuIds);
        this._refreshByServerData(serverData);
        this._refreshStorage();
        return this._getCartData();
    }

    /** 获取缓存中skuIds */
    getSkuIds() {
        const cartData = this._getCartData();
        if (cartData.items.length === 0) {
            return [];
        }
        return cartData.items.map(item => item.skuId);
    }

    /** 刷新cartData，更新为服务端最新数据 */
    _refreshByServerData(serverData) {
        const cartData = this._getCartData();
        cartData.items.forEach(item => {
            this._setLatestCartItem(item, serverData);
        });
    }

    _setLatestCartItem(item, serverData) {
        let removed = true;
        for (let sku of serverData) {
            if (sku.id === item.skuId) {
                removed = false;
                item.sku = sku;
                break;
            }
        }
        // sku已下架，后端会有2种情况：第一种是sku.online = false；第二种是不返回已下架的sku；（此处后端返回第二种）
        // 前端也有2种处理方案：第一种是sku.online设为false；第二种是删除sku；（前端应使用第一种）
        if (removed) {
            item.sku.online = false;
        }
    }

    /** 获取所有checked的sku id */
    getCheckedSkuIds() {
        const cartData = this._getCartData()
        if (cartData.items.length === 0) {
            return []
        }
        const skuIds = []
        cartData.items.forEach(item => {
            if (item.checked) {
                skuIds.push(item.sku.id);
            }
        });
        return skuIds
    }

    /** 根据skuId查找当前想要购买的sku数量 */
    getSkuCountBySkuId(skuId) {
        const cartData = this._getCartData();
        const item = cartData.items.find(item => item.skuId === skuId);
        if (!item) {
            console.error('在订单里找不到');
        }
        return item.count;
    }
}

export {
    Cart
}