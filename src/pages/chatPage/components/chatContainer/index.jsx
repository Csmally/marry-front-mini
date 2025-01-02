import { View } from "@tarojs/components";
import { useState } from "react";
import ChatText from "./ChatText";
import './index.scss';

const ChatContainer = () => {
    const [chats, setChats] = useState([
        '永远幸福',
        '永远开心',
        '永远开心',
        '长长久久',
        '恭喜发财'
    ])
    return (
        <View className='container'>
            <View className='title'>快速发送</View>
            <View className='chatBox'>    
                {
                    chats.map((chat, index) => <ChatText key={index} text={chat} />)
                }
            </View>
        </View>
    )
};

export default ChatContainer;