/**
 * wjp-flow：第九步：具体处理矩阵转置的类
 *
 *  方案1. 利用数学函数库，JS 体积 太大，mathjs 1MB
 *  方案2. 不用数学函数库，借助矩阵思维，自己实现（循环+遍历）
 */
class Matrix {
    m   // m是二维数组

    constructor(martix) {
        this.m = martix
    }

    get rowsNum() {
        return this.m.length
    }

    get colsNum() {
        return this.m[0].length
    }

    /** wjp-flow：第十一步：遍历矩阵数据，拿到所有的element */
    each(cb) {
        for (let j = 0; j < this.colsNum; j++) {    // j:列号
            for (let i = 0; i < this.rowsNum; i++) {    // i:行号
                const element = this.m[i][j]
                cb(element, i, j)
            }
        }
    }

    /** wjp-flow：第十四步：利用数学转置的逻辑处理矩阵，要区分i和j */
    transpose() {
        const desArr = []
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }
}

export {
    Matrix
}