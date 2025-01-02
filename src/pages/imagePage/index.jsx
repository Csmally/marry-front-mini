import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import styles from './index.module.scss'

const ImagePage = () => {
  useLoad(() => {
    console.log('9898-图片Page loaded.')
  })
  return (
    <View className={styles.pageContainer}>
    </View>
  )
}

export default ImagePage
