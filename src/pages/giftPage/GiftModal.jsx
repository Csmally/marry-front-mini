import { useRequest } from '@/utils/hooks';
import { RootPortal, View } from "@tarojs/components"
import { memo, useCallback, useEffect, useState } from "react"
import GiftRes from "./GiftRes";
import styles from './index.module.scss';

const GiftModal = (props) => {
    const { setShow } = props;
    const request = useRequest();
    const [url, setUrl] = useState('');
    // type: 0-展示查询中，1展示未中奖，2展示中奖二维码
    const [type, setType] = useState(0);
    const fetchGiftRes = useCallback(async () => {
        const { success, data } = await request({ url: 'checkGift' });
        if (success) {
            const { giftType, giftUrl } = data;
            setType(giftType);
            if (giftUrl) {
                setUrl(giftUrl);
            }
        } else {
            setType(1);
        }
    }, [request]);
    useEffect(() => {
        fetchGiftRes();
    }, [fetchGiftRes])
    return (
        <RootPortal>
            <View className={styles.modalContainer} onClick={() => setShow(false)}>
                <View className={styles.giftResContainer}>
                    <GiftRes type={type} url={url} />
                </View>
            </View>
        </RootPortal>
    )
}

export default memo(GiftModal);