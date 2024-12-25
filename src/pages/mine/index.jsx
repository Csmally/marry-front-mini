import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  return (
    <View className='pageContainer'>
      <Text>❤️CYXI❤️aa</Text>
      <Text>❤️我们订婚啦❤️</Text>
    </View>
  )
}
