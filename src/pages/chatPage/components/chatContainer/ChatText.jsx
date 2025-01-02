import { View } from "@tarojs/components";
import './index.scss';

const ChatText = ({ text = '' }) => {
    return <View className='tag'>{text}</View>
};

export default ChatText;