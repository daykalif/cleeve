const CellStatus = {
    FORBIDDEN: 'forbidden',
    SELECTED: 'selected',
    WAITING: 'waiting'
}

const ShoppingWay = {
    CART: 'cart',
    BUY: 'buy'
}

const SpuListType = {
    // 主题分类数据
    THEME: 'theme',
    // 一级分类spu数据
    ROOT_CATEGORY: 'root_category',
    // 二级分类spu数据
    SUB_CATEGORY: 'sub_category',
    // 所有最新数据
    LATEST: 'latest'
};

export {
    CellStatus,
    ShoppingWay,
    SpuListType
}