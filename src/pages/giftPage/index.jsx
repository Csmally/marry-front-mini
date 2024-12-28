import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

const GiftPage = () => {
  useLoad(() => {
    console.log('9898-礼物Page loaded.')
  })
  return (
    <View className='pageContainer'>
      <View className='storyImg' />
    </View>
  )
}

export default GiftPage
