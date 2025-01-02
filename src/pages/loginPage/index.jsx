import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Image, Input, View } from '@tarojs/components';
import { AppProvider } from '@/utils/ctxs';
import Taro, { useRouter } from '@tarojs/taro';
import { useRequest, useUpload } from '@/utils/hooks';
import './index.scss'

const LoginPage = () => {
  const { from = 'init' } = useRouter().params;
  const { requestHeader, userInfo, setUserInfo, setRequestHeader } = useContext(AppProvider);
  const [showLoginUp, setShowLoginUp] = useState(false)
  const [avatar, setAvatar] = useState('https://www.onelight.ink/assets/images/emptyUser.jpeg');
  const [nickname, setNickname] = useState('');
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(true);
  const request = useRequest();
  const uploader = useUpload();
  useEffect(() => {
    if (userInfo?.openid) {
      setAvatar(userInfo.avatar);
      setNickname(userInfo.nickname);
      setIsUploadAvatar(true);
    }
  }, [userInfo?.openid]);
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
  const login = useCallback(async () => {
    if (from === 'init') {
      const { success, data } = await uploader({filePath: avatar, name: 'userAvatar'});
      if (success) {
        const { avatar: avatar1 } = data;
        const { data: data1, success: success1 } = await request({
          url: 'addUser',
          method: 'POST',
          data: {
            avatar: avatar1,
            nickname,
            openid: requestHeader?.openid
          },
        });
        if (success1) {
          const { user } = data1;
          setUserInfo(user);
          Taro.switchTab({
            url: "/pages/chatPage/index",
          })
        }
      }
    } else {
      Taro.login({
        success: async (res) => {
          const { data, success } = await request({url: 'login', data: {loginCode: res.code}, method: 'POST'});
          if (success) {
            const { openid, token } = data;
            // 全局状态管理存储requestHeader
            setRequestHeader({ openid, token });
            Taro.showToast({ title: '感谢您的参加', icon: 'none' })
            Taro.switchTab({
              url: "/pages/chatPage/index",
            })
          }
        }
      })
    }
  }, [avatar, from, nickname, request, requestHeader?.openid, setRequestHeader, setUserInfo, uploader])
  return (
    <View className='pageContainer'>
      <View className='title' />
      <View className='name'>杨璇 & 成怡</View>
      {
        showLoginUp ? (
          <View className='loginBar'>
            { 
              from === 'init' ? (
                <>
                  <Button openType='chooseAvatar' plain style={{ border: 'none' }} onChooseAvatar={onChooseAvatar}>
                    <Image src={avatar} className='avatar' />
                  </Button>
                  <Input value={nickname} placeholder='请输入昵称' type='nickname' className='nickname' onInput={onInput} />
                </>
              ) : (
                <>
                  <Image src={avatar} className='avatar' />
                  <View className='hasNickname'>{nickname}</View>
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
