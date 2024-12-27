import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

const GiftPage = () => {
  useLoad(() => {
    console.log('Page loaded.')
  })
  return (
    <View className='pageContainer'>
      <View className='storyImg' />
    </View>
  )
}

export default GiftPage
