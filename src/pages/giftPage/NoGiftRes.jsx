import { memo } from "react";
import { View, Image } from "@tarojs/components";
import styles from './index.module.scss';

const NoGiftRes = () => {
    return (
        <View className={styles.noGiftContainer}>
            <Image src='https://www.onelight.ink/assets/icons/noGift.png' className={styles.noGiftIcon} />
            <View>非常感谢您的到来</View>
            <View>我们明年见</View>
            <View>{'ᜊ>ᴗ<ᜊ'}</View>
        </View>
    )
}

export default memo(NoGiftRes);