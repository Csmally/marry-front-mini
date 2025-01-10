import Taro from "@tarojs/taro";
import { memo, useCallback, useEffect, useState } from "react";
import { useRequest } from '@/utils/hooks';
import { RootPortal, ScrollView, View, Image } from "@tarojs/components";
import styles from './index.module.scss';

const ConfigModal = (props) => {
    const { setShow } = props;
    const request = useRequest();
    const [users, setUsers] = useState([]);
    const [choosedUser, setChoosedUser] = useState([]);
    const fetchAllUser = useCallback(async () => {
        const { success, data } = await request({ url: 'searchAllUser' });
        if (success) {
            const { list = [] } = data;
            setUsers(list);
        }
    }, [request]);
    const chooseUser = useCallback((user) => {
        const index = choosedUser.indexOf(user.openid);
        if (index > -1) {
            const newArr = choosedUser.filter(i => i !== user.openid);
            setChoosedUser(newArr);
        } else {
            setChoosedUser([...choosedUser, user.openid]);
        }
    }, [choosedUser]);
    const isChoosedUser = useCallback((user) => {
        const index = choosedUser.indexOf(user.openid);
        return index > -1;
    }, [choosedUser]);
    const changePower = useCallback(async () => {
        if (!choosedUser?.length) {
            Taro.showToast({ title: '请选择用户', icon: 'none' });
            return;
        }
        const adminUsers = choosedUser.map(u => ({ openid: u }));
        await request({
            method: 'POST',
            url: 'editUserPower',
            data: { users: adminUsers },
        });
        setShow(false);
    }, [choosedUser, request, setShow]);
    useEffect(() => {
        fetchAllUser();
    }, [fetchAllUser]);
    return (
        <RootPortal>
            <View className={styles.modalContainer}>
                <View className={styles.contentContainer}>
                    <View className={styles.closeBar}>
                        <Image src='https://www.onelight.ink/assets/icons/close.png' className={styles.closeIcon} onClick={() => setShow(false)} />
                    </View>
                    <ScrollView scrollY className={styles.scrollViewContainer}>
                        <View className={styles.innerContainer}>
                            {
                                users.map((user, index) => <View onClick={() => chooseUser(user)} className={isChoosedUser(user) ? styles.userChoosedTag : styles.userTag} key={index}>{user.nickname}</View>)
                            }
                        </View>
                    </ScrollView>
                    <View className={styles.controlBar} onClick={changePower}>添加权限</View>
                </View>
            </View>
        </RootPortal>
    )
}

export default memo(ConfigModal);