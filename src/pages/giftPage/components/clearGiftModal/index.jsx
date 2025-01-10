import { memo, useCallback } from "react";
import { RootPortal, View } from "@tarojs/components";
import { useRequest } from '@/utils/hooks';
import styles from './index.module.scss';

const ClearGiftRes = (props) => {
    const { giftType } = props;
    if (giftType === 0) return <View className={styles.giftText}>查询中。。。</View>;
    if (giftType === 1) return <View className={styles.giftText}>弹幕中奖</View>;
    if (giftType === 2) return <View className={styles.giftText}>相册中奖</View>;
    return null;
}

const ClearGiftModal = (props) => {
    const { initGiftData, giftType, giftUserId } = props;
    const request = useRequest();
    const confirmClearGift = useCallback(async() => {
        await request({ url: 'confirmClearGift', data: { openid: giftUserId } });
        initGiftData();
    }, [giftUserId, initGiftData, request]);
    return (
        <RootPortal>
            <View className={styles.modalContainer}>
                <View className={styles.giftResContainer}>
                    <ClearGiftRes giftType={giftType} />
                    <View className={styles.confirmBtn} onClick={confirmClearGift}>确认兑奖</View>
                </View>
            </View>
        </RootPortal>
    )
}

export default memo(ClearGiftModal);