import { memo, useState, useContext, useCallback } from 'react';
import { AppProvider } from "@/utils/ctxs";
import { View, Image } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useRequest } from '@/utils/hooks';
import styles from './index.module.scss';
import GiftModal from './components/giftModal';
import ConfigModal from './components/configModal';

const rootOpenid = "oodv06z3XLHRzrY1la1UR9lkwKJE";

const GiftPage = () => {
  const { requestHeader = {} } = useContext(AppProvider);
  const request = useRequest();
  const [giftModal, setGiftModal] = useState(false);
  const [configModal, setConfigModal] = useState(false);
  const [powerLevel, setPowerLevel] = useState(0);
  const fetchPowerLevel = useCallback(async() => {
    const { success, data } = await request({ url: 'checkPowerLevel' });
    if (success) {
      const { powerLevel: level } = data;
      if (level > 0) {
        setPowerLevel(level)
      }
    }
  }, [request]);
  useLoad(() => {
    fetchPowerLevel();
  });
  return (
    <View className={styles.pageContainer}>
      <View className={styles.controlBar}>
        <Image src='https://www.onelight.ink/assets/icons/gift.png' className={styles.searchGift} onClick={() => setGiftModal(true)} />
        {powerLevel > 0 && <Image src='https://www.onelight.ink/assets/icons/loupe.png' className={styles.configIcon} />}
      </View>
      {configModal && <ConfigModal setShow={setConfigModal} />}
      {giftModal && <GiftModal setShow={setGiftModal} />}
      <View className={styles.controlBar}>
        {requestHeader?.openid === rootOpenid && <Image src='https://www.onelight.ink/assets/icons/settings.png' className={styles.configIcon} onClick={() => setConfigModal(true)} />}
        {powerLevel > 1 && <Image src='https://www.onelight.ink/assets/icons/locked.png' className={styles.configIcon} />}
      </View>
    </View>
  )
}

export default memo(GiftPage);
