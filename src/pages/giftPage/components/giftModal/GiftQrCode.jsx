import { memo, useEffect, useState, useContext } from "react";
import { AppProvider } from "@/utils/ctxs";
import { View, Image } from "@tarojs/components";
import QR from "wx-base64-qrcode";
import styles from './index.module.scss';

const GiftQrCode = () => {
    const { requestHeader = {} } = useContext(AppProvider);
    const [qrUrl, setQrUrl] = useState('');
    useEffect(() => {
        const base64Str = QR.createQrCodeImg(requestHeader?.openid, 100);
        setQrUrl(base64Str);
    }, [requestHeader?.openid]);
    return (
        <View className={styles.giftContainer}>
            <View>{'๑>ᴗO๑'}</View>
            <View>恭囍恭囍</View>
            {qrUrl && <Image src={qrUrl} className={styles.qrCode} />}
        </View>
    )
}

export default memo(GiftQrCode);