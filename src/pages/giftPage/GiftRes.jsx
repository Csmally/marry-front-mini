import { View } from "@tarojs/components";
import { memo } from "react"
import NoGiftRes from "./NoGiftRes";
import GiftQrCode from "./GiftQrCode";

// type: 0-展示查询中，1展示未中奖，2展示中奖二维码
const GiftRes = (props) => {
    const { type } = props;
    switch (type) {
        case 0:
            return <View>查询中...</View>;
        case 1:
            return <NoGiftRes />;
        case 2:
            return <GiftQrCode />;
        default:
            return <NoGiftRes />;
    };
}

export default memo(GiftRes);