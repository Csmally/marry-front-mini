import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import styles from './index.module.scss'

const GiftPage = () => {
  useLoad(() => {
    console.log('9898-礼物Page loaded.')
  })
  return (
    <View className={styles.pageContainer}>
    </View>
  )
}

export default GiftPage
