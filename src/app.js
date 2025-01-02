import { useState } from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import { AppProvider } from "@/utils/ctxs";
import { useRequest } from '@/utils/hooks';
import "./app.scss";

function App({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [requestHeader, setRequestHeader] = useState({});
  const request = useRequest();
  useLaunch(() => {
    Taro.login({
      success: async (res) => {
        const { data, success } = await request({url: 'login', data: {loginCode: res.code}, method: 'POST'});
        if (success) {
          const { openid, token, user } = data;
          // 全局状态管理存储requestHeader
          setRequestHeader({ openid, token });
          if (user) {
            // 全局状态管理存储userInfo
            setUserInfo(user);
            Taro.switchTab({
              url: "/pages/chatPage/index",
            })
          }
        }
      },
    })
  });
  const ctxValue = {
    userInfo,
    requestHeader,
    setUserInfo,
    setRequestHeader,
  }
  // children 是将要会渲染的页面
  return (
    <AppProvider.Provider value={ctxValue}>
      {children}
    </AppProvider.Provider>
  );
}

export default App;
