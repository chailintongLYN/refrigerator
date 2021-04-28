import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
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

const likelist = [
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
    { text: '西红柿炒鸡蛋', time: '2021年4月19日', img: require('../images/apple.jpg') },
]

const LikePage = ({ navigation }) => {
    const [username, setUserName] = useState('')
    const [data, setData] = useState(likelist);

    const _retrieveData = async () => {
        try {
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();
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
                <TouchableOpacity onPress={()=>{navigation.navigate('My')}}>
                    <Image
                        style={styles.headportrait}
                        source={require('../images/logo.jpg')}
                    />
                </TouchableOpacity>
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
                                                setData(likelist.splice(idx, idx + 1))
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
        position:'absolute',
        top:ptd(42),
        right:ptd(20),
        // marginLeft: ptd(45),
        // marginTop: 52,
    },
    listtime: {
        fontSize: ptd(15),
        color: 'black',
        position:'absolute',
        top:ptd(75),
        left:ptd(145),
    },
    text: {
        fontSize: ptd(18),
        position:'absolute',
        top:ptd(32),
        left:ptd(145),
        // marginTop: 42,
    },
    img: {
        margin: 20,
        width:ptd(100),
        height:ptd(100),
        // width: 120,
        // height: 120,
        borderRadius: 10,
    },
    like: {
        position:'relative',
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
        position: 'absolute',
        right: 25,
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
