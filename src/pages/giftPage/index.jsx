import { View, Image } from '@tarojs/components'
import styles from './index.module.scss'

const GiftPage = () => {
  return (
    <View className={styles.pageContainer}>
      <Image src='https://www.onelight.ink/assets/icons/gift.png' className={styles.searchGift} />
    </View>
  )
}

export default GiftPage
