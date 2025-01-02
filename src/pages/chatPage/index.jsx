import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import ChatContainer from './components/chatContainer/index'
import './index.scss'

const ChatPage = () => {
  useLoad(() => {
    console.log('9898-弹幕Page loaded.')
  })
  return (
    <View className='pageContainer'>
      <ChatContainer />
    </View>
  )
}

export default ChatPage
