import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'
import '../../common/global'

let newdatainfo = {
    username: '',
    password: '',
    psagain: '',
    img: './static/uploaduserimg/logo.jpg',
}

const Newdata = ({ navigation }) => {
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
                        newdatainfo.username = value;
                    }}
                    autoFocus
                />
            </View>

            <View style={styles.inputview}>
                <Text style={styles.userandpsw}>密码：</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        newdatainfo.password = value;
                    }}
                />
            </View>
            <View style={styles.inputview}>
                <Text style={styles.userandpsw}>再次输入：</Text>
                <TextInput
                    textContentType='password'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(value) => {
                        newdatainfo.psagain = value;
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.login}
                onPress={() => {
                    console.log("newdatainfo:",newdatainfo);
                    if (newdatainfo.password != newdatainfo.psagain) {
                        alert('两次输入的密码不一样');
                    }
                    else {
                        AsyncStorage.setItem(
                            'username',
                            newdatainfo.username
                        )
                        fetch('http://154.8.164.57:1127/newdata', {
                            method: 'POST',
                            body: JSON.stringify(newdatainfo),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        }).then(res => res.json())
                            .then((res) => {
                                console.log(res);
                                if (res.status == 'usernamefailed') {
                                    alert('用户名已存在');
                                }
                                else if (res.status == 'failed') {
                                    alert('注册失败');
                                }
                                else {
                                    alert("注册成功");
                                    navigation.push('tabnav');
                                }
                            })
                    }
                }}
            >
                <Text style={styles.text}>注册并登录</Text>
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
        marginTop: 0,
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

export default Newdata
