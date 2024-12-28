import { View } from '@tarojs/components'
import { useLoad, useDidShow, useDidHide } from '@tarojs/taro'
import './index.scss'

const LoginPage = () => {
  useLoad(() => {
    console.log('9898-登录Page loaded.')
  })
  useDidShow(() => {
    console.log('9898-登录Page useDidShow.')
  })
  useDidHide(() => {
    console.log('9898-登录Page useDidHide.')
  })
  return (
    <View className='pageContainer'>
      <View className='storyImg' />
    </View>
  )
}

export default LoginPage
