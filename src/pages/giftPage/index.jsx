import { memo, useState, useContext, useCallback } from 'react';
import { AppProvider } from "@/utils/ctxs";
import { View, Image } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useRequest } from '@/utils/hooks';
import styles from './index.module.scss';
import GiftModal from './components/giftModal';
import ConfigModal from './components/configModal';
import ClearGiftModal from './components/clearGiftModal';

const rootOpenid = "oodv06z3XLHRzrY1la1UR9lkwKJE";

const GiftPage = () => {
  const { requestHeader = {} } = useContext(AppProvider);
  const request = useRequest();
  const [giftModal, setGiftModal] = useState(false);
  const [configModal, setConfigModal] = useState(false);
  const [clearGiftModal, setClearGiftModal] = useState(false);
  const [giftUserId, setGiftUserId] = useState('');
  const [giftType, setGiftType] = useState(0);
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
  const clearGift = useCallback(() => {
    Taro.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: async (res) => {
        const { success, data } = await request({ url: 'checkClearGift', data: { openid: res.result }});
        const { openModal = false, type } = data;
        if (success && openModal) {
          setGiftUserId(res.result);
          setGiftType(type);
          setClearGiftModal(true);
        }
      },
      fail: () => {
        Taro.showToast({ title: '二维码有误', icon: 'none' });
      }
    })
  }, [request]);
  const initGiftData = useCallback(() => {
    setClearGiftModal(false);
    setGiftType(0);
    setGiftUserId('');
  }, []);
  return (
    <View className={styles.pageContainer}>
      <View className={styles.controlBar}>
        <Image src='https://www.onelight.ink/assets/icons/gift.png' className={styles.searchGift} onClick={() => setGiftModal(true)} />
        {isAdminUser && <Image src='https://www.onelight.ink/assets/icons/loupe.png' className={styles.configIcon} onClick={clearGift} />}
      </View>
      {configModal && <ConfigModal setShow={setConfigModal} />}
      {giftModal && <GiftModal setShow={setGiftModal} />}
      {clearGiftModal && <ClearGiftModal initGiftData={initGiftData} giftType={giftType} giftUserId={giftUserId} />}
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
