import { useCallback, useState } from 'react'
import { Button, Image, Input, View } from '@tarojs/components'
import request from '@/utils/request'
import Taro, { useLoad, useDidShow, useDidHide } from '@tarojs/taro'
import './index.scss'

const LoginPage = () => {
  const [showLoginUp, setShowLoginUp] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(true)
  const [avatar, setAvatar] = useState('https://www.onelight.ink/assets/images/emptyUser.jpeg')
  const [nickname, setNickname] = useState('')
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
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
    console.log('9898data--avatar', avatar)
    console.log('9898data--nickname', nickname)
    Taro.login({
      success: async (res) => {
        const r = await request({url: 'login', data: {loginCode: res.code}, method: 'POST'});
        console.log('9898--rr', r);
      }
    })
  }, [avatar, nickname])
  return (
    <View className='pageContainer'>
      <View className='title' />
      <View className='name'>杨璇 & 成怡</View>
      {
        showLoginUp ? (
          <View className='loginBar'>
            <Button openType='chooseAvatar' plain style={{ border: 'none' }} onChooseAvatar={onChooseAvatar}>
              <Image src={avatar} className='avatar' />
            </Button>
            <Input value={nickname} placeholder='请输入昵称' type='nickname' className='nickname' onInput={onInput}/>
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
