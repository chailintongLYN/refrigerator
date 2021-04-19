import React, { useState } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'

const classbar = [
    { text: '水果蔬菜', img: require('../images/lemon.png'), color: '#BEE570' },
    { text: '肉蛋食品', img: require('../images/toll.png'), color: '#F8CEB4' },
    { text: '海鲜水产', img: require('../images/tint.png'), color: '#B4DDFF' },
    { text: '速食冷冻', img: require('../images/pizza.png'), color: '#9DBAE1' },
    { text: '零食饮品', img: require('../images/beer.png'), color: '#FFE38F' },
]

const food = [
    [
        { text: '苹果', time: '4月17日', remainingtime: '3', img: require('../images/apple.jpg'), color: '#BEE570' },
    ],
    [
        { text: '鸡蛋', time: '4月17日', remainingtime: '4', img: require('../images/apple.jpg'), color: '#F8CEB4' },
    ],
    [
        { text: '海鲜', time: '4月17日', remainingtime: '4', img: require('../images/apple.jpg'), color: '#B4DDFF' },
    ],
    [
        { text: '速食', time: '4月17日', remainingtime: '5', img: require('../images/apple.jpg'), color: '#9DBAE1' },
    ],
    [
        { text: '零食', time: '4月17日', remainingtime: '5', img: require('../images/apple.jpg'), color: '#FFE38F' },
    ],
]

const foodall = [
    { text: '苹果', time: '4月17日', remainingtime: '3', img: require('../images/apple.jpg'), color: '#BEE570' },
    { text: '鸡蛋', time: '4月17日', remainingtime: '4', img: require('../images/apple.jpg'), color: '#F8CEB4' },
    { text: '海鲜', time: '4月17日', remainingtime: '4', img: require('../images/apple.jpg'), color: '#B4DDFF' },
    { text: '速食', time: '4月17日', remainingtime: '5', img: require('../images/apple.jpg'), color: '#9DBAE1' },
    { text: '零食', time: '4月17日', remainingtime: '5', img: require('../images/apple.jpg'), color: '#FFE38F' },
]

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

let index = 5;

const Home = ({ navigation }) => {
    const [selectTab, setSelectTab] = useState(0)
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
                    <TextInput style={styles.input} placeholder='芒果' />
                </View>
                <Image style={styles.headportrait} source={require('../images/logo.jpg')} />
            </View>

            <View style={styles.classbar}>
                {
                    classbar.map((nav, idx) => (
                        <TouchableOpacity key={idx} onPress={() => { index = idx; setSelectTab(idx); }}>
                            <View style={[styles.class, { backgroundColor: nav.color, }]}>
                                <Image source={nav.img} />
                            </View>
                            <Text style={styles.classtext}>{nav.text}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <ScrollView style={styles.foodbar}>
                {
                    selectTab == index ?
                        food[index].map((nav, idx) => (
                            <View
                                style={styles.food}
                                key={idx}
                                onPress={() => {
                                    navigation.push('Details')
                                }}
                            >
                                <Image
                                    style={[styles.foodimg, { borderColor: nav.color }]}
                                    source={nav.img}
                                />
                                <Text style={styles.foodtext}>{nav.text}</Text>
                                <Text style={styles.foodtime}>{nav.time}进入冰箱</Text>
                                <Text style={[styles.foodreaminingtime, { color: nav.remainingtime <= '3' ? 'red' : '#858585' }]}>保质期还剩{nav.remainingtime}天</Text>
                                <TouchableOpacity style={styles.delete}>
                                    <Image
                                        style={styles.deleteimg}
                                        source={require('../images/delete.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.meal}>
                                    <Text style={{ fontSize: 18 }}>饭</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        :
                        foodall.map((nav, idx) => (
                            <TouchableOpacity
                                style={styles.food}
                                key={idx}
                                onPress={() => {
                                    navigation.push('Details')
                                }}
                            >
                                <Image
                                    style={[styles.foodimg, { borderColor: nav.color }]}
                                    source={nav.img}
                                />
                                <Text style={styles.foodtext}>{nav.text}</Text>
                                <Text style={styles.foodtime}>{nav.time}进入冰箱</Text>
                                <Text style={[styles.foodreaminingtime, { color: nav.remainingtime <= '3' ? 'red' : '#858585' }]}>保质期还剩{nav.remainingtime}天</Text>
                                <TouchableOpacity style={styles.delete}>
                                    <Image
                                        style={styles.deleteimg}
                                        source={require('../images/delete.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.meal}>
                                    <Text style={{ fontSize: 18 }}>饭</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))
                }
                <View style={styles.showall}>
                    <Text
                        style={{ color: '#8E8E8F', fontSize: 16 }}
                        onPress={()=>{setSelectTab(Math.random())}}
                    >显示全部分类</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    showall: {
        alignItems: 'center',
        marginBottom: 15,
    },
    meal: {
        marginTop: 70,
        marginLeft: -48,
        alignItems: 'center',
        backgroundColor: blue,
        width: 49,
        height: 49,
        borderRadius: 100,
        justifyContent: 'center',
    },
    deleteimg: {
        width: 30,
        height: 30,
    },
    delete: {
        marginLeft: ptd(60),
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: blue,
        width: 49,
        height: 49,
        borderRadius: 100,
        justifyContent: 'center',
    },
    foodreaminingtime: {
        marginTop: 85,
        marginLeft: ptd(-90),
    },
    foodtime: {
        marginLeft: ptd(-30),
        marginTop: 55,
    },
    foodtext: {
        marginTop: 18,
        marginLeft: ptd(15),
        fontSize: 18
    },
    foodimg: {
        width: 109,
        height: 109,
        borderWidth: 5,
        borderRadius: 5,
        margin: 9,
        marginLeft: 15,
    },
    food: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        width: w - 50,
        height: 131,
        marginLeft: 25,
        borderRadius: 25,
        borderColor: blue,
        borderWidth: 2,
        marginBottom: 10,
    },
    foodbar: {
        height: 500,
        marginTop: 22,
    },
    classtext: {
        marginTop: 10,
        color: 'black',
        marginLeft: (w - 300) / 6,
    },
    class: {
        width: ptd(60),
        height: 70,
        backgroundColor: '#BEE570',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: (w - ptd(300)) / 6,
    },
    classbar: {
        paddingTop: 20,
        flexDirection: 'row',
        backgroundColor: white,
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
        padding: 0
    },
    searchbar: {
        backgroundColor: blue,
        flexDirection: 'row',
        height: 50
    },
    icon: {
        color: '#9D9E9D',
        paddingRight: 10
    },
    time: {
        color: 'white',
        marginLeft: ptd(30),
        fontSize: 16,
    },
    hello: {
        marginLeft: ptd(25),
        color: 'white',
        fontSize: 16
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }

})

export default Home
