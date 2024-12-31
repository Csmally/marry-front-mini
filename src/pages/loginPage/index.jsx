import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Image, Input, View } from '@tarojs/components';
import { AppProvider } from '@/utils/ctxs';
import Taro, { useRouter } from '@tarojs/taro';
import { useRequest } from '@/utils/hooks';
import './index.scss'

const LoginPage = () => {
  const { from = 'init' } = useRouter().params;
  const { requestHeader, userInfo, setRequestHeader } = useContext(AppProvider);
  const [showLoginUp, setShowLoginUp] = useState(false)
  const [avatar, setAvatar] = useState('https://www.onelight.ink/assets/images/emptyUser.jpeg');
  const [nickname, setNickname] = useState('');
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(true);
  const request = useRequest();
  useEffect(() => {
    if (userInfo.openid) {
      setAvatar(userInfo.avatar);
      setNickname(userInfo.nickname);
      setIsUploadAvatar(true);
    }
  }, [userInfo.openid]);
  const toLogin = useCallback(() => {
    setShowCongratulations(false)
    setTimeout(() => {
      setShowLoginUp(true)
    }, 350);
  }, [setShowCongratulations])
  const onChooseAvatar = useCallback((e) => {
    setAvatar(e.detail.avatarUrl)
    setIsUploadAvatar(true)
  }, []);
  const onInput = useCallback((e) => {
    setNickname(e.detail.value)
  }, [])
  const login = useCallback(() => {
    if (from === 'init') {
      console.log('9898userInfo', { avatar, nickname, openid: requestHeader?.openid })
    } else {
      Taro.login({
        success: async (res) => {
          const { data, success } = await request({url: 'login', data: {loginCode: res.code}, method: 'POST'});
          if (success) {
            const { openid, token } = data;
            // 全局状态管理存储requestHeader
            setRequestHeader({ openid, token });
            Taro.switchTab({
              url: "pages/chatPage/index",
            })
          }
        }
      })
    }
  }, [avatar, from, nickname, request, requestHeader?.openid, setRequestHeader])
  return (
    <View className='pageContainer'>
      <View className='title' />
      <View className='name'>杨璇 & 成怡</View>
      {
        showLoginUp ? (
          <View className='loginBar'>
            {
              nickname && isUploadAvatar ? (
                <>
                  <Image src={avatar} className='avatar' />
                  <View className='hasNickname'>{nickname}</View>
                </>
              ) : (
                <>
                  <Button openType='chooseAvatar' plain style={{ border: 'none' }} onChooseAvatar={onChooseAvatar}>
                    <Image src={avatar} className='avatar' />
                  </Button>
                  <Input value={nickname} placeholder='请输入昵称' type='nickname' className='nickname' onInput={onInput} />
                </>
              )
            }
            {
              nickname && isUploadAvatar && (
                <View className='congratulations' onClick={login}>
                  送上祝福
                </View>
              )
            }
          </View>
        ) : (
        <View className='content' style={{ opacity: showCongratulations ? 1 : 0 }}>
          <View className='storyImg' />
          <View className='congratulations' onClick={toLogin}>
              送上祝福
          </View>
        </View>
        )
      }
    </View>
  )
}

export default LoginPage
