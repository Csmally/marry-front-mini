import { useCallback, useRef, useState } from "react";
import { Image, View } from "@tarojs/components";
import Taro, { useDidHide, useDidShow, useLoad } from '@tarojs/taro';
import { useRequest, useUpload } from '@/utils/hooks';
import styles from './index.module.scss';

const ImagePage = () => {
  const uploader = useUpload();
  const timerRef = useRef(null);
  const isFirstLoadRef = useRef(true);
  const request = useRequest();
  const [showSwitch, setShowSwitch] = useState(true);
  // 请求配置
  const fetchConfigs = useCallback(async () => {
    const { success, data } = await request({ url: 'getConfigs' });
    if (success) {
      const { uploadMediaSwitch } = data;
      if (showSwitch !== uploadMediaSwitch) {
        setShowSwitch(uploadMediaSwitch);
      }
    }
  }, [request, showSwitch]);
  useLoad(() => {
    timerRef.current = new Date().getTime();
  });
  useDidShow(async () => {
    if (isFirstLoadRef.current) {
      fetchConfigs();
      isFirstLoadRef.current = false;
      return;
    }
    const currentTime = new Date().getTime();
    const t = currentTime - timerRef.current;
    const isFetch = t > 2000;
    if (isFetch) {
      fetchConfigs();
      return;
    }
  });
  useDidHide(() => {
    const currentTime = new Date().getTime();
    timerRef.current = currentTime;
  });
  const uploadPhoto = useCallback(() => {
    Taro.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      success: (res) => {
        const filePath = res?.tempFiles?.[0]?.tempFilePath
        uploader({filePath, name: 'lovePhoto', sseSend: true});
      }
    })
  }, [uploader]);
  return (
    <View className={styles.pageContainer}>
      { showSwitch && <Image src='https://www.onelight.ink/assets/icons/takeMedia.png' className={styles.takeMedia} onClick={uploadPhoto} /> }
    </View>
  )
}

export default ImagePage
