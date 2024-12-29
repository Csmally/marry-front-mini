import { useCallback, useState } from 'react'
import { View } from '@tarojs/components'
import { useLoad, useDidShow, useDidHide } from '@tarojs/taro'
import './index.scss'

const LoginPage = () => {
  const [showLoginUp, setShowLoginUp] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(true)
  const toLogin = useCallback(() => {
    setShowCongratulations(false)
    setTimeout(() => {
      setShowLoginUp(true)
    }, 350);
  }, [setShowCongratulations])
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
      <View className='title' />
      <View className='name'>杨璇 & 成怡</View>
      {
        showLoginUp ? (
          <View className='loginBar'>
            <View>fs</View>
            <View>fsdfasf</View>
            <View>fsdfasf</View>
          </View>
        ) : (
        <View className='content' style={{ opacity: showCongratulations ? 1 : 0 }}>
          <View className='storyImg' />
          <View className='congratulations' onClick={toLogin}>
              送上祝福
          </View>
        </View>
        )
      }
    </View>
  )
}

export default LoginPage
