import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'
import '../../common/global'

let logoninfo = {
    username: '',
    password: '',
    img: './static/uploaduserimg/logo.jpg',
}

const LogonPage = ({ navigation }) => {
    return (
        <View style={styles.body}>
            <Image
                style={styles.image}
                source={require('../images/logo.jpg')}
            />
            <View style={styles.inputview}>
                <Text style={styles.userandpsw}>用户名：</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => {
                        logoninfo.username = value;
                    }}
                    autoFocus
                />
            </View>

            <View style={styles.inputview}>
                <Text style={styles.userandpsw}>密码：</Text>
                <TextInput
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        logoninfo.password = value;
                    }}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity
                style={styles.login}
                onPress={async () => {

                    //这一行后台开启了要注释掉
                    // navigation.push('tabnav');

                    await AsyncStorage.setItem(
                        'username',
                        logoninfo.username
                    )
                    console.log(logoninfo)
                    fetch('http://154.8.164.57:1127/userimg', {
                        method: 'POST',
                        body: JSON.stringify(logoninfo),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }).then(res => res.json())
                        .then((res) => {
                            AsyncStorage.setItem(
                                'userimg',
                                res.results
                            )
                            console.log(res.results);
                            if (res.status == 'success') {
                                alert("登录成功")
                                navigation.push('tabnav');
                            }
                            else {
                                alert('登录失败')
                            }
                        })


                }}
            >
                <Text style={styles.text}>登录</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputview: {
        flexDirection: 'row',
        marginLeft: 40,
        borderBottomColor: '#7468BE',
        borderBottomWidth: 3,
        width: w - 80,
        height: 40,
        marginBottom: 45,
    },
    userandpsw: {
        color: color1,
        fontSize: 24
    },
    input: {
        height: 40,
        fontSize: 24,
        padding: 0,
    },
    body: {
        width: w,
        height: h,
        backgroundColor: '#FFF'
    },
    image: {
        width: 200,
        height: 200,
        margin: (w - 200) / 2,
        marginBottom: 65
    },
    login: {
        marginTop: 25,
        width: (w - 80),
        height: 55,
        marginLeft: 40,
        borderRadius: 50,
        backgroundColor: '#7468BE',
        borderColor: '#BBBBBB',
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#FEFDFD'
    }
})

export default LogonPage
