import React from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
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
    {text:'西红柿炒鸡蛋',time:'2021年4月19日',img:require('../images/apple.jpg')},
    {text:'西红柿炒鸡蛋',time:'2021年4月19日',img:require('../images/apple.jpg')},
    {text:'西红柿炒鸡蛋',time:'2021年4月19日',img:require('../images/apple.jpg')},
    {text:'西红柿炒鸡蛋',time:'2021年4月19日',img:require('../images/apple.jpg')},
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
                    likelist.map((nav,idx)=>(
                        <View key={idx} style={[styles.like,{marginBottom:idx==likelist.length-1?20:0}]}>
                            <Image source={nav.img} style={styles.img}/>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        margin:20,
        width:120,
        height:120,
        borderRadius:10,
    },
    like:{
        // backgroundColor: "#BFC",
        elevation:10,
        marginTop:20,
        borderRadius:25,
    },
    likelist: {
        marginLeft:20,
        marginTop:25,
        width:w-40,
        height:h-190,
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
        color: white,
        marginLeft: 65,
        fontSize: 16,
    },
    hello: {
        marginLeft: 20,
        color: white,
        fontSize: 16
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }

})

export default LikePage
