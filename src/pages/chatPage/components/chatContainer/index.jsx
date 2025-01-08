import { memo, useCallback, useContext, useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { ChatProvider } from "@/utils/ctxs";
import ChatText from "./ChatText";
import styles from './index.module.scss';

const ChatContainer = () => {
    const { chats } = useContext(ChatProvider);
    const [show, setShow] = useState(true);
    const changeShowStatus = useCallback(() => {
        setShow(!show);
    }, [show]);
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }, []);
    return (
        <View>
            <View className={styles.titleBar}>
                <Image onClick={changeShowStatus} src={`https://www.onelight.ink/assets/icons/${show ? 'chatRetract.png' : 'chatExpand.png'}`} className={styles.chatStatusIcon} />
                <View className={show ? styles.showTitle : styles.hideTitle}>快速发送</View>
            </View>
            <View className={show ? styles.showChatBox : styles.hideChatBox}>    
                {
                    chats.map((chat, index) => <ChatText key={index} chat={chat} />)
                }
            </View>
        </View>
    )
};

export default memo(ChatContainer);