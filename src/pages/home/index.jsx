import { useCallback } from 'react'
import { View, Text, Button, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const login = useCallback((e) => {
    console.log('9898ee', e.detail)
  }, []);
  return (
    <View className='pageContainer'>
      <Text>❤️CYXI❤️</Text>
      <Text>❤️我们订婚啦❤️</Text>
      <Button openType='chooseAvatar' onChooseAvatar={login}>头像</Button>
      <Input type='nickname' />
    </View>
  )
}
