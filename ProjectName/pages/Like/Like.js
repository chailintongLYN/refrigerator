import React from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';

const myDate = new Date();
const year = myDate.getFullYear();
let month = (myDate.getMonth() + 1).toString();
if (month.length == 1) {
    month = '0' + month;
}
let day = myDate.getDate();
if (day.length == 1) {
    day = '0' + day;
}

const username = 'XXX';

const likelist = [
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
]

const LikePage = ({ navigation }) => {
    return (
        <View>
            <View style={styles.titlebar}>
                <Text style={styles.hello}>
                    {username}主人，欢迎来到你的冰箱!
                </Text>
                <Text style={styles.time}>{year}年{month}月{day}日</Text>
            </View>

            <View style={styles.searchbar}>
                <View style={styles.searchbox}>
                    <Icon name='search1' size={18} style={styles.icon}></Icon>
                    <TextInput
                        keyboardType={'default'}
                        onEndEditing={() => navigation.push('CookSearch')}
                        style={styles.input}
                        placeholder='搜索我的收藏'
                    />
                </View>
                <Image style={styles.headportrait} source={require('../images/logo.jpg')} />
            </View>
            <ScrollView style={styles.likelist}>
                {
                    likelist.map((nav, idx) => (
                        <TouchableOpacity
                            style={[styles.like, { marginBottom: idx == likelist.length - 1 ? 20 : 0 }]}
                            onPress={() => navigation.push('Menudetails')}
                            key={idx}
                        >
                            <Image source={nav.img} style={styles.img} />
                            <Text style={styles.text}>{nav.text}</Text>
                            <Text style={styles.listtime}>{nav.time}</Text>
                            <TouchableOpacity
                                style={styles.delete}
                                onPress={() => {
                                    Alert.alert("Hold on!", "你确定要删除吗？", [
                                        {
                                            text: '取消',
                                            onPress: () => null,
                                            style: 'cancel'
                                        },
                                        {
                                            text: '确定',
                                            onPress: () => {
                                                likelist.splice(idx,idx+1);
                                                console.log('删除');
                                            }
                                        }
                                    ]);
                                }}
                            >
                                <Image style={{ width: 32, height: 32 }} source={require('../images/delete.png')} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    delete: {
        width: 55,
        height: 55,
        borderRadius: 100,
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 45,
        marginTop: 52,
    },
    listtime: {
        marginTop: 96,
        marginLeft: -120,
        fontSize: 18,
        color: 'black',
    },
    text: {
        fontSize: 20,
        marginTop: 42,
    },
    img: {
        margin: 20,
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    like: {
        flexDirection: 'row',
        backgroundColor: "#FFF",
        elevation: 10,
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 25,
        width: w - 40,
    },
    likelist: {
        marginTop: 25,
        height: h - 190,
    },
    headportrait: {
        width: 48,
        height: 48,
        borderRadius: 100,
        marginLeft: 25,
        marginTop: -5
    },
    searchbox: {
        backgroundColor: '#FFF',
        marginLeft: 43,
        flexDirection: 'row',
        width: w - 138,
        borderRadius: 50,
        height: 38,
        alignItems: 'center',
        paddingLeft: 15
    },
    input: {
        fontSize: 18,
        padding: 0,
    },
    searchbar: {
        backgroundColor: blue,
        flexDirection: 'row',
        height: 50,
    },
    icon: {
        color: '#9D9E9D',
        paddingRight: 10
    },
    time: {
        color: white,
        marginLeft: 65,
        fontSize: 16,
    },
    hello: {
        marginLeft: 20,
        color: white,
        fontSize: 16,
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }

})

export default LikePage
