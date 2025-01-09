import { memo, useCallback, useEffect, useState } from "react";
import { useRequest } from '@/utils/hooks';
import { RootPortal, ScrollView, View } from "@tarojs/components";
import styles from './index.module.scss';

const ConfigModal = (props) => {
    const { setShow } = props;
    const request = useRequest();
    const [users, setUsers] = useState([]);
    const fetchAllUser = useCallback(async () => {
        const { success, data } = await request({ url: 'searchAllUser' });
        if (success) {
            const { list = [] } = data;
            setUsers(list);
        }
    }, [request]);
    useEffect(() => {
        fetchAllUser();
    }, [fetchAllUser]);
    return (
        <RootPortal>
            <View className={styles.modalContainer} onClick={() => setShow(false)}>
                <View className={styles.contentContainer}>
                    <ScrollView scrollY className={styles.scrollViewContainer}>
                        <View className={styles.innerContainer}>
                            {
                                users.map((user, index) => <View className={styles.userTag} key={index}>{user.nickname}</View>)
                            }
                        </View>
                    </ScrollView>
                    <View className={styles.controlBar}>
                        <View className={styles.controlBtn}>扫码</View>
                        <View className={styles.controlBtn}>总控</View>
                    </View>
                </View>
            </View>
        </RootPortal>
    )
}

export default memo(ConfigModal);