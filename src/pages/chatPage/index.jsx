import { memo, useState } from "react";
import { View } from '@tarojs/components';
import { ChatProvider } from "@/utils/ctxs";
import ChatContainer from './components/chatContainer/index';
import SendChat from "./components/sendChat";
import styles from './index.module.scss';
import initChats from './initChats';

const ChatPage = () => {
  const [chats, setChat] = useState(initChats);
  const ctxValue = {
    chats,
    setChat,
  };
  return (
    <ChatProvider.Provider value={ctxValue}>
      <View className={styles.pageContainer}>
        <ChatContainer />
        <SendChat />
      </View>
    </ChatProvider.Provider>
  )
}

export default memo(ChatPage);
