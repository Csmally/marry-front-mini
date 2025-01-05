import { useCallback, useState, useContext } from "react";
import { ChatProvider } from "@/utils/ctxs";
import { Image, Input, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useRequest } from '@/utils/hooks';
import { getRandomHexColor } from "@/utils/tools";
import initChats from '../../initChats';
import styles from './index.module.scss';

const SendChat = () => {
    const { setChat } = useContext(ChatProvider);
    const request = useRequest();
    const [inputValue, setInputValue] = useState('');
    const onInput = useCallback((e) => {
        setInputValue(e.detail.value)
    }, []);
    const sendChat = useCallback(async () => {
        if (!inputValue) {
            Taro.showToast({
                title: '请输入您的祝福内容',
                icon: 'none'
            })
            return;
        } else {
            const newChat = {
                content: inputValue,
                bgColor: getRandomHexColor(),
            }
            const { success } = await request({
                url: 'sendChat',
                method: 'POST',
                data: {
                    chat: newChat
                },
            });
            if (success) {
                setChat([...initChats, newChat]);
                setInputValue('');
            }
        }
    }, [inputValue, request, setChat]);
    return (
        <View className={styles.container}>
            <Input
              placeholder='写下你的祝福并发送'
              className={styles.chatInput}
              type='text'
              confirmType='send'
              placeholderClass={styles.placeholder}
              cursorSpacing={12}
              onInput={onInput}
              value={inputValue}
              onConfirm={sendChat}
            />
            <Image src='https://www.onelight.ink/assets/icons/chatSend.png' className={styles.chatSend} onClick={sendChat} />
        </View>
    )
};

export default SendChat;