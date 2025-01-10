import { memo, useCallback } from "react";
import { Image, View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { useRequest, useUpload } from '@/utils/hooks';
import styles from './index.module.scss';

const ImagePage = () => {
  const uploader = useUpload();
  const request = useRequest();
  const uploadPhoto = useCallback(async () => {
    const { success, data } = await request({ url: 'getConfigs' });
    const { uploadMediaSwitch } = data;
    if (success && uploadMediaSwitch) {
      Taro.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
        success: (res) => {
          const filePath = res?.tempFiles?.[0]?.tempFilePath;
          uploader({filePath, name: 'lovePhoto', sseSend: true});
        }
      })
    } else {
      Taro.showToast({ title: '稍后开放功能', icon: 'none' });
    }
  }, [request, uploader]);
  return (
    <View className={styles.pageContainer}>
      <Image src='https://www.onelight.ink/assets/icons/takeMedia.png' className={styles.takeMedia} onClick={uploadPhoto} />
    </View>
  )
}

export default memo(ImagePage);
