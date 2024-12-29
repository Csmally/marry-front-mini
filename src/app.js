import Taro, { useLaunch } from "@tarojs/taro";
import "./app.scss";

function App({ children }) {
  useLaunch(() => {
    const isLogin = Taro.getStorageSync("isLogin");
    !!isLogin &&
      Taro.switchTab({
        url: "pages/chatPage/index",
      });
  });
  // children 是将要会渲染的页面
  return children;
}

export default App;
