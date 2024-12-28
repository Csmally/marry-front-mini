
import Taro, { useDidHide, useDidShow, useLaunch } from '@tarojs/taro'

import './app.scss'

function App({ children }) {
  useLaunch(() => {
    console.log('9898-App useLaunch.')
    const isLogin = Taro.getStorageSync('login');
    console.log('9898-登录态', typeof isLogin)
    // Taro.switchTab({
    //   url: 'pages/chatPage/index'
    // })
  })
  useDidShow(() => {
    console.log('9898-App useDidShow.')
  })
  useDidHide(() => {
    console.log('9898-App useDidHide.')
  })

  // children 是将要会渲染的页面
  return children
}
  


export default App
