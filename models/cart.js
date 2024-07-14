class Cart {
    static SKU_MIN_COUNT = 1;
    // 对于某一个sku可买最大数量
    static SKU_MAX_COUNT = 77;
    // 加入购物车所有sku最大总量
    static CART_ITEM_MAX_COUNT = 99;

    // 代理模式的应用，真实数据存储在缓存中，实际操作的是_cartData
    _cartData = [];

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

    }

    _getCartData() {

    }
}

export {
    Cart
}