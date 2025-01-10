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
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [canUpload, setCanUpload] = useState(false);
  const fetchPowerLevel = useCallback(async() => {
    const { success, data } = await request({ url: 'checkPowerLevel' });
    if (success) {
      const { isAdminUser: a } = data;
      if (a) {
        setIsAdminUser(true);
      }
    }
  }, [request]);
  const changeLockStatus = useCallback(async() => {
    const { success, data } = await request({
      url: 'editConfigs',
      method: 'POST',
      data: { uploadMediaSwitch: !canUpload },
    });
    if (success) {
      const { uploadMediaSwitch = false } = data;
      setCanUpload(uploadMediaSwitch);
    }
  }, [canUpload, request]);
  useLoad(async() => {
    fetchPowerLevel();
    if (requestHeader?.openid === rootOpenid) {
      const { success, data } = await request({ url: 'getConfigs' });
      if (success) {
        const { uploadMediaSwitch = false } = data;
        setCanUpload(uploadMediaSwitch);
      }
    }
  });
  return (
    <View className={styles.pageContainer}>
      <View className={styles.controlBar}>
        <Image src='https://www.onelight.ink/assets/icons/gift.png' className={styles.searchGift} onClick={() => setGiftModal(true)} />
        {isAdminUser && <Image src='https://www.onelight.ink/assets/icons/loupe.png' className={styles.configIcon} />}
      </View>
      {configModal && <ConfigModal setShow={setConfigModal} />}
      {giftModal && <GiftModal setShow={setGiftModal} />}
      <View className={styles.controlBar}>
        {
          requestHeader?.openid === rootOpenid && (
            <>
              <Image src='https://www.onelight.ink/assets/icons/settings.png' className={styles.configIcon} onClick={() => setConfigModal(true)} />
              <Image src={`https://www.onelight.ink/assets/icons/${canUpload ? 'unlocked' : 'locked'}.png`} className={styles.configIcon} onClick={changeLockStatus} />
            </>
          )
        }
      </View>
    </View>
  )
}

export default memo(GiftPage);
