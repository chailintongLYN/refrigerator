import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import '../../common/global'

const NewdataPage = ({ navigation }) => {
    return (
        <View style={styles.body}>
            <Image
                style={styles.image}
                source={require('../images/logo.jpg')}
            />
            <View style={styles.inputview}>
                <Text style={styles.userandpsw}>用户名：</Text>
                <TextInput style={styles.input} autoFocus />
            </View>

            <View style={styles.inputview}>
                <Text style={styles.userandpsw}>密码：</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.inputview}>
                <Text style={styles.userandpsw}>再次输入：</Text>
                <TextInput style={styles.input} />
            </View>
            <TouchableOpacity
                style={styles.login}
                onPress={() => {
                    navigation.push('tabnav')
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

export default NewdataPage
