import Taro from "@tarojs/taro";

const request = (options) => {
    const { url = '', data = {}, method = 'GET' } = options;
    return new Promise((res, rej) => {
        Taro.request({
            url: `${process.env.TARO_APP_BASE_URL}${url}`,
            data,
            method,
            success: (r) => res(r.data),
            fail: (error) => rej(error),
        })
    })
};

export default request;