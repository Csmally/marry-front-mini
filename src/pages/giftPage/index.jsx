import { memo, useState } from 'react';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import GiftModal from './GiftModal';

const GiftPage = () => {
  const [show, setShow] = useState(false);
  return (
    <View className={styles.pageContainer}>
      {show && <GiftModal setShow={setShow} />}
      <Image src='https://www.onelight.ink/assets/icons/gift.png' className={styles.searchGift} onClick={() => setShow(true)} />
    </View>
  )
}

export default memo(GiftPage);
