import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../../common/global'
const Myset = ({ navigation }) => {
    const [userimg, setUserImage] = useState('')

    const _retrieveData = async () => {
        try {
            setUserImage(await AsyncStorage.getItem('userimg'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            _retrieveData();
        }, [])
    )
    return (
        <ScrollView>
            <View style={styles.header}>
                <Icon name='left' size={35} style={{ marginLeft: ptd(15) }} onPress={() => { navigation.goBack() }} />
                <Text style={{ fontSize: 25, marginLeft: ptd(120) }}>设置</Text>
            </View>
            <View style={styles.contain}>
                <TouchableOpacity style={[styles.setitem]} onPress={() => { navigation.navigate('SetUserimg') }}>
                    <Text style={{ fontSize: 20, marginLeft: (ptd(330) - w / 2) }}>修改头像</Text>
                    <Image source={{ uri: userimg }} style={{ width: 50, height: 50, marginLeft: ptd(50), borderRadius: 25 }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.setitem, { justifyContent: 'center' }]} onPress={() => { navigation.navigate('SetPassword') }}>
                    <Text style={{ fontSize: 20 }}>修改密码</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.setitem,{justifyContent:'center'}]}>
                    <Text style={{fontSize:20}}>修改用户名</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={[styles.setitem, { justifyContent: 'center' }]}
                    onPress={()=>{
                        navigation.push('Logon')
                    }}
                >
                    <Text style={{ fontSize: 20 }}>退出登录</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default Myset
const styles = StyleSheet.create({
    contain: {
        width: ptd(375),
        alignItems: 'center',
        marginTop: 20
    },
    setitem: {
        width: ptd(350),
        height: 100,
        marginBottom: 30,
        borderRadius: 50,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: ptd(375),
        height: 60,
    }
})