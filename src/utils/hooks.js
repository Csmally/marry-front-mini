import { useCallback, useContext } from 'react';
import Taro from "@tarojs/taro";
import { AppProvider } from '@/utils/ctxs';

const useRequest = () => {
    const { requestHeader = {}, setRequestHeader } = useContext(AppProvider);
    const request = useCallback((options) => {
        const { url = '', data = {}, method = 'GET', header = {} } = options;
        return new Promise((res) => {
            Taro.request({
                url: `${process.env.TARO_APP_BASE_URL}${url}`,
                data,
                method,
                header: {...header, ...requestHeader},
                success: (r) => {
                    const { data: resData = {} } = r;
                    const { toastCode = 0, message = '请求成功', code } = resData;
                    if (toastCode !== 0) {
                        Taro.showToast({ title: message, icon: 'none' })
                    }
                    if (code === 401) {
                        setRequestHeader({});
                        Taro.reLaunch({
                            url: "/pages/loginPage/index?from=inner",
                        })
                    }
                    res(resData)
                },
                fail: () => {
                    Taro.showToast({ title: '稍后再试', icon: 'none' });
                    res({
                        code: -1,
                        data: {},
                        success: false,
                    })
                }
            })
        })
    }, [requestHeader, setRequestHeader]);
    return request;
}

export { useRequest };