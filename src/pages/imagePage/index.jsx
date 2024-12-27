import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

const ImagePage = () => {
  useLoad(() => {
    console.log('Page loaded.')
  })
  return (
    <View className='pageContainer'>
      <View className='storyImg' />
    </View>
  )
}

export default ImagePage
