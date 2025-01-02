import { useCallback } from "react";
import { View } from "@tarojs/components";
import { useRequest } from '@/utils/hooks';
import styles from './index.module.scss';

const ChatText = ({ chat }) => {
    const request = useRequest();
    const sendChat = useCallback(() => {
        request({
            url: 'sendChat',
            method: 'POST',
            data: { chat },
        });
    }, [chat, request]);
    return <View onClick={sendChat} className={styles.tag} style={{background: chat.bgColor}}>{chat.content}</View>
};

export default ChatText;