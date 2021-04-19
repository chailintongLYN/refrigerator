import React from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

// const food = [
//     { text: '苹果', time: '4月17日', remainingtime: '3', img: require('../../images/apple.jpg'), color: '#BEE570' },
//     { text: '苹果', time: '4月17日', remainingtime: '3', img: require('../../images/apple.jpg'), color: '#BEE570' },
//     { text: '鸡蛋', time: '4月17日', remainingtime: '4', img: require('../../images/apple.jpg'), color: '#F8CEB4' },
//     { text: '鸡蛋', time: '4月17日', remainingtime: '4', img: require('../../images/apple.jpg'), color: '#F8CEB4' },
//     { text: '海鲜', time: '4月17日', remainingtime: '4', img: require('../../images/apple.jpg'), color: '#B4DDFF' },
//     { text: '海鲜', time: '4月17日', remainingtime: '4', img: require('../../images/apple.jpg'), color: '#B4DDFF' },
//     { text: '速食', time: '4月17日', remainingtime: '5', img: require('../../images/apple.jpg'), color: '#9DBAE1' },
//     { text: '速食', time: '4月17日', remainingtime: '5', img: require('../../images/apple.jpg'), color: '#9DBAE1' },
//     { text: '零食', time: '4月17日', remainingtime: '5', img: require('../../images/apple.jpg'), color: '#FFE38F' },
//     { text: '零食', time: '4月17日', remainingtime: '5', img: require('../../images/apple.jpg'), color: '#FFE38F' },
// ]

const food = undefined;

const HomeSearchPage = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: '#F5F5F5', }}>
            <View style={styles.searchbar}>
                <Text style={styles.goback} onPress={() => { navigation.goBack() }}>
                    {'<'}
                </Text>
                <View style={styles.searchbox}>
                    <Icon name='search1' size={18} style={styles.icon}></Icon>
                    <TextInput style={styles.input} placeholder='春菜' />
                </View>
            </View>
            <ScrollView style={styles.foodbar}>
                {
                    food != undefined ? food.map((nav, idx) => (
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
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Hold on!", "你确定要删除吗？", [
                                        {
                                            text: '取消',
                                            onPress: () => null,
                                            style: 'cancel'
                                        },
                                        { text: '确定', onPress: () => { console.log('删除') } }
                                    ]);
                                }}
                                style={styles.delete}
                            >
                                <Image
                                    style={styles.deleteimg}
                                    source={require('../../images/delete.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.meal}>
                                <Text style={{ fontSize: 18 }}>饭</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                        :
                        <View style={styles.undefined}>
                            <Text style={styles.undefinedtext}>
                                主人，您的冰箱里貌似没有相关食物
                        </Text>
                        </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    undefinedtext:{
        color:'#8E8E8F',
        fontSize:18
    },
    undefined:{
        alignItems:'center'
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
        marginLeft: 50,
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
        marginLeft: -100,
    },
    foodtime: {
        marginLeft: -68,
        marginTop: 55,
    },
    foodtext: {
        marginTop: 18,
        marginLeft: 72,
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
        // borderColor: blue,
        // borderWidth: 2,
        marginBottom: 10,
        elevation: 10,
    },
    foodbar: {
        height: h - 94,
        marginTop: 22,
    },
    searchbox: {
        backgroundColor: '#FFF',
        marginLeft: 24,
        flexDirection: 'row',
        width: w - 138,
        borderRadius: 50,
        height: 38,
        alignItems: 'center',
        paddingLeft: 15,
        marginTop: 12,
    },
    input: {
        fontSize: 18,
        padding: 0
    },
    icon: {
        color: '#9D9E9D',
        paddingRight: 10
    },
    goback: {
        fontSize: 42,
        marginLeft: 20,
    },
    searchbar: {
        height: 50,
        flexDirection: 'row',
    }
})

export default HomeSearchPage
