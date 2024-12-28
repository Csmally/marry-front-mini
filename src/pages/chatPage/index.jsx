import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

const ChatPage = () => {
  useLoad(() => {
    console.log('9898-弹幕Page loaded.')
  })
  return (
    <View className='pageContainer'>
      <View className='storyImg' />
    </View>
  )
}

export default ChatPage
