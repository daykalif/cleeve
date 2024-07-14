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
}

export {
    Cart
}