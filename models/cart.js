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

    /** 向购物车中添加商品 */
    addItem(newItem) {
        if (this.beyondMaxCartItemCount()) {
            throw new Error('超过购物车最大数量');
        }
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

    /** 寻找相同的cartItem */
    findEqualItem() {

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
}

export {
    Cart
}