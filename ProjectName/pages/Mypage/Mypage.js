import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
import { useFocusEffect } from '@react-navigation/native';

// const mycook = [
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃llllllalallalalallalalalalalallalalalala的哈哈哈哈哈哈哈哈哈哈哈哈哈', time: '2021-04-19', img: require('../images/cooked.png') },
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃', time: '2021-04-19', img: require('../images/cooked.png') },
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃', time: '2021-04-19', img: require('../images/cooked.png') },
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃', time: '2021-04-19', img: require('../images/cooked.png') },
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃', time: '2021-04-19', img: require('../images/cooked.png') },
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃', time: '2021-04-19', img: require('../images/cooked.png') },
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃', time: '2021-04-19', img: require('../images/cooked.png') },
//     { username: '小小刀', userimg: require('../images/logo.jpg'), content: '今天吃生蚝啊，清蒸生蚝好好吃', time: '2021-04-19', img: require('../images/cooked.png') },

// ]


const Mypage = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [userimg, setUserimg] = useState('')
    const [number, setNumber] = useState({});
    const [text,setText]=useState([]);

    const _retrieveData = async () => {
        try {
            setUserimg(await AsyncStorage.getItem('userimg'));
            setUsername(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();

    useFocusEffect(
        React.useCallback(() => {
            console.log('mypage');
            AsyncStorage.getItem('username').then((username) => {
                // console.log(username);
                setUsername(username);
                fetch('http://154.8.164.57:1127/getmydata', {
                    method: 'POST',
                    body: JSON.stringify({ username: username }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        console.log(res);
                        setNumber(res.number[0]);
                        setText(res.text)
                    })
            })
        }, [])
    )
    // console.log(data.number[0]);
    // console.log(data.text);
    // console.log(data);
    // var number=data.number[0];
    console.log(number);
    console.log(text)
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.bgc}>
                <Icon name='setting' size={40} style={{ color: 'white', marginLeft: ptd(300), marginTop: 25 }} onPress={() => { navigation.navigate('Myset') }} />
            </View>
            <View style={styles.titlebar}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: userimg }} style={styles.userimg} />
                    <Text style={styles.username}>{username}</Text>
                    <Icon name='camera' size={40} style={{ color: blue, marginLeft: ptd(115), marginTop: 25 }} onPress={() => navigation.navigate('Myadd')} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.mysearch} onPress={() => { navigation.navigate('Mycare') }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{number.followsnumber}</Text>
                        <Text style={{ fontSize: 17, marginTop: 15, color: '#9D9E9D' }}>关注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mysearch} onPress={() => { navigation.navigate('Myfollows') }}>
                        <Text style={styles.title_number}>{number.fansnumber}</Text>
                        <Text style={styles.search_name}>我的粉丝</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mysearch} onPress={() => navigation.navigate('Mydetails', { index: 0, list: text })}>
                        <Text style={styles.title_number}>{number.textnumber}</Text>
                        <Text style={styles.search_name}>我的心得</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ marginTop: 20, width: ptd(375) }} contentContainerStyle={{ alignItems: 'center' }}>
                {
                    text.map((item, index) => (
                        <TouchableOpacity
                            style={[styles.mycooked, { marginBottom: index == text.length - 1 ? 20 : 0 }]}
                            key={index}
                            onPress={() => navigation.navigate('Mydetails', { index: index, list: text, userimg: userimg })}
                        >
                            <Image source={{uri:item.img}} style={styles.cooked_img} />
                            {/* <Image source={{ uri: item.img }} style={styles.cooked_img} /> */}
                            <View>
                                <Text style={styles.content}>{item.content}</Text>
                                <Text style={{ marginLeft: 10, color: '#9D9E9D', marginTop: 10 }}>{item.ctime}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        fontSize: 18,
        marginTop: 40,
        marginLeft: 10,
        width: ptd(210),
        fontWeight: 'bold',
        height: 25,
        overflow: "hidden",
    },
    cooked_img: {
        width: ptd(80),
        height: 90,
        marginTop: 17,
        marginLeft: ptd(10),
        resizeMode: "contain"
    },
    mycooked: {
        width: ptd(340),
        height: 120,
        marginTop: 20,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
    },
    title_number: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 25
    },
    search_name: {
        fontSize: 17,
        marginTop: 15,
        color: '#9D9E9D'

    },
    mysearch: {
        marginLeft: ptd(50),
        height: 70
    },
    username: {
        color: blue,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 10
    },
    userimg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginLeft: 10,
        marginTop: -10
    },
    titlebar: {
        width: ptd(335),
        height: 200,
        backgroundColor: 'white',
        marginTop: -95,
        marginLeft: (w - ptd(335)) / 2,
        borderBottomWidth: 10,
        borderBottomColor: blue,
        borderRadius: 15,
    },
    bgc: {
        height: 170,
        backgroundColor: blue
    }
})

export default Mypage
