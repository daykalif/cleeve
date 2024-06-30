/**
 * @file: 封装函数，将传入函数变成promise形式，返回请求格式
 * @param func
 * @returns {function({}=): Promise<unknown>}
 */
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};

/** wjp-flow：第二十八：实现Combination组合算法（也可以通过数学函数库实现） */
const combination = function (arr, size) {
    var r = [];

    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }

    _([], arr, size);
    return r;
}

export {
    promisic,
    combination
}