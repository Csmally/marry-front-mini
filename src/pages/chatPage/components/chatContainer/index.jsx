import { useCallback, useContext, useState } from "react";
import { View } from "@tarojs/components";
import { ChatProvider } from "@/utils/ctxs";
import ChatText from "./ChatText";
import styles from './index.module.scss';

const ChatContainer = () => {
    const { chats } = useContext(ChatProvider);
    const [show, setShow] = useState(true);
    const changeShowStatus = useCallback(() => {
        setShow(!show);
    }, [show]);
    return (
        <View>
            <View className={styles.titleBar}>
                <View onClick={changeShowStatus}>{show ? '收起' : '展开'}</View>
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

export default ChatContainer;