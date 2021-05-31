import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity, ScrollViewBase, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../../common/global'
import { TextInput } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const SetPassword = ({ navigation }) => {
    const [username, setUserName] = useState('')

    const _retrieveData = async () => {
        try {
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();

    useFocusEffect(
        React.useCallback(() => {
        }, [])
    )
    let datainfo = {
        username: username,
        password: '',
        newpasswd: '',
        again: '',
    }
    return (
        <ScrollView>
            <View style={styles.header}>
                <Icon name='left' size={35} style={{ marginLeft: ptd(20) }} onPress={() => { navigation.goBack() }} />
                <Text style={{ fontSize: 25, marginLeft: ptd(105) }}>修改密码</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.inputview}>
                    <Text style={{ fontSize: 20 }}>旧密码：</Text>
                    <TextInput
                        style={styles.input}
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            datainfo.password = value
                        }}
                    />
                </View>
                <View style={styles.inputview}>
                    <Text style={{ fontSize: 20 }}>新密码：</Text>
                    <TextInput
                        style={styles.input}
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            datainfo.newpasswd = value
                        }}
                    />
                </View>
                <View style={styles.inputview}>
                    <Text style={{ fontSize: 20 }}>再次输入：</Text>
                    <TextInput
                        style={styles.input}
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            datainfo.again = value
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        console.log(datainfo);
                        if (datainfo.password != '' && datainfo.newpasswd != '' && datainfo.again != '') {
                            if (datainfo.newpasswd == datainfo.again) {
                                fetch('http://154.8.164.57:1127/changemypassword', {
                                    method: 'POST',
                                    body: JSON.stringify(datainfo),
                                    headers: new Headers({
                                        'Content-Type': 'application/json'
                                    })
                                }).then(res => res.json())
                                    .then((res) => {
                                        if (res.status == 'success') {
                                            alert('修改成功')
                                        }
                                        else if (res.status == 'passwdfailed') {
                                            alert('密码不不正确')
                                        }
                                        else{
                                            alert('修改失败')
                                        }
                                    })
                            }
                            else {
                                alert('两次输入的密码不一样')
                            }
                        }
                        else {
                            alert('输入密码不能为空')
                        }
                    }}
                >
                    <Text
                        style={{ fontSize: 30, color: 'white' }}
                    >确认</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default SetPassword
const styles = StyleSheet.create({
    btn: {
        width: ptd(200),
        height: 100,
        marginTop: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue
    },
    inputview: {
        flexDirection: 'row',
        borderBottomColor: '#7468BE',
        borderBottomWidth: 3,
        width: w - 80,
        height: 40,
        marginBottom: 45,
    },
    input: {
        height: 40,
        fontSize: 24,
        padding: 0,
    },
    container: {
        width: ptd(375),
        marginTop: 100,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        width: ptd(375),
        height: 60,
        alignItems: 'center',
    }
})