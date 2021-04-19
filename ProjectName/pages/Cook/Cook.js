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

const foodrecommend=[
    {text:'西红柿炒鸡蛋',img:require('../images/apple.jpg')},
    {text:'菜名XX',img:require('../images/apple.jpg')},
    {text:'菜名XX',img:require('../images/apple.jpg')},
    {text:'菜名XX',img:require('../images/apple.jpg')},
];

const CookPage = ({navigation}) => {
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
                        placeholder='芒果'
                    />
                </View>
                <Image style={styles.headportrait} source={require('../images/logo.jpg')} />
            </View>

            <View style={styles.bodybox}>
                <Text style={[styles.body_,{marginLeft:w/2-136/2-50}]}>——</Text>
                <Text style={styles.bodybar}>冰箱推荐</Text>
                <Text style={styles.body_}>——</Text>
            </View>

            <ScrollView style={styles.body}>
                {foodrecommend.map((nav,idx)=>(
                    <TouchableOpacity 
                    key={idx} 
                    style={styles.food}
                    onPress={()=>navigation.push('Menudetails')}
                    >
                        <Text style={styles.foodtext}>
                            {nav.text}
                        </Text>
                        <Image source={nav.img} style={styles.img} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    foodtext:{
        zIndex:10,
        position:'absolute',
        top:25,
        fontSize:32,
        left:25,
    },
    img:{
        borderRadius:25,
        width:415,
        height:415,
    },
    food:{
        marginLeft:(w-415)/2,
        marginTop:10,
        width:415,
        backgroundColor: '#BFC',
        marginBottom:25,
        elevation:10,
        borderRadius:25,
    },
    body:{
        height:573,
    },
    body_: {
        marginTop: 18,
        color: '#E6E6E6',
        fontSize: 32,
        fontWeight:'bold'
    },
    bodybox: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    bodybar: {
        marginTop: 20,
        color: blue,
        fontSize: 32,
        fontWeight: 'bold'
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
        color: '#0F4C66',
        marginLeft: 65,
        fontSize: 16,
    },
    hello: {
        marginLeft: 20,
        color: '#0F4C66',
        fontSize: 16
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }

})

export default CookPage
