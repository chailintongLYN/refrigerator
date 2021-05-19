import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import '../../common/global'
const LoginPage = ({navigation}) => {
    return (
        <View style={styles.body}>
            <Image
                style={styles.image}
                source={require('../images/logo.jpg')}
            />
            <TouchableOpacity
                style={styles.login}
                onPress={()=>{
                    navigation.push('Logon')
                }}
            >
                <Text style={styles.text}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.login}
                onPress={()=>{
                    navigation.push('Newdata')
                }}
            >
                <Text style={styles.text}>注册</Text>
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
    body: {
        width: w,
        height: h,
        backgroundColor: '#FFF'
    },
    image: {
        width: 200,
        height: 200,
        margin: (w - 200) / 2,
    },
    login: {
        width: (w - 80),
        height: 55,
        marginLeft: 40,
        borderRadius: 50,
        backgroundColor: '#7468BE',
        borderColor: '#BBBBBB',
        marginBottom: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#FEFDFD'
    }
})

export default LoginPage