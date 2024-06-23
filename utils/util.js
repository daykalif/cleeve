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

export {
    promisic,
}