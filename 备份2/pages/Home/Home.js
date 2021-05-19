import React, { useEffect, useState } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import '../../common/global'

const classbar = [
    { text: '水果蔬菜', img: require('../images/lemon.png'), color: '#BEE570' },
    { text: '肉蛋食品', img: require('../images/toll.png'), color: '#F8CEB4' },
    { text: '海鲜水产', img: require('../images/tint.png'), color: '#B4DDFF' },
    { text: '速食冷冻', img: require('../images/pizza.png'), color: '#9DBAE1' },
    { text: '零食饮品', img: require('../images/beer.png'), color: '#FFE38F' },
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

let index = 5;

const Home = ({ navigation }) => {
    const [username, setUserName] = useState('')
    const [userimg, setUserImage] = useState('')

    const [data, setData] = useState([])

    const _retrieveData = async () => {
        try {
            setUserImage(await AsyncStorage.getItem('userimg'));
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();

    useEffect(() => {
        console.log('effect');
        fetch('http://154.8.164.57:1127/getmysavefood', {
            method: 'POST',
            body: JSON.stringify({ username: username }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then((res) => {
                var foodall = res.results
                for (let i = 0; i < foodall.length; i++) {
                    if (foodall[i].type == '水果蔬菜') {
                        foodall[i].color = '#BEE570'
                    }
                    else if (foodall[i].type == '肉蛋食品') {
                        foodall[i].color = '#F8CEB4'
                    }
                    else if (foodall[i].type == '海鲜水产') {
                        foodall[i].color = '#B4DDFF'
                    }
                    else if (foodall[i].type == '速食冷冻') {
                        foodall[i].color = '#9DBAE1'
                    }
                    else if (foodall[i].type == '零食饮品') {
                        foodall[i].color = '#FFE38F'
                    }
                    else {
                        foodall[i].color = '#FF0000'
                    }
                    foodall[i].time = foodall[i].time.slice(5, 10)
                    foodall[i].remainingday = foodall[i].remainingday - ((Number(month) - Number(foodall[i].time.slice(0, 2))) * 30 + Number(day) - Number(foodall[i].time.slice(3, 5)))
                }
                setData(foodall)
            })
    },[])

    const food = [
        { text: '黄瓜', time: '4月17日', remainingday: '3', img: require('../images/apple.jpg'), color: '#BEE570' },
        { text: '苹果', time: '4月17日', remainingday: '3', img: require('../images/apple.jpg'), color: '#BEE570' },
        { text: '鸡蛋', time: '4月17日', remainingday: '4', img: require('../images/apple.jpg'), color: '#F8CEB4' },
        { text: '鸡蛋', time: '4月17日', remainingday: '4', img: require('../images/apple.jpg'), color: '#F8CEB4' },
        { text: '海鲜', time: '4月17日', remainingday: '4', img: require('../images/apple.jpg'), color: '#B4DDFF' },
        { text: '海鲜', time: '4月17日', remainingday: '4', img: require('../images/apple.jpg'), color: '#B4DDFF' },
        { text: '速食', time: '4月17日', remainingday: '5', img: require('../images/apple.jpg'), color: '#9DBAE1' },
        { text: '速食', time: '4月17日', remainingday: '5', img: require('../images/apple.jpg'), color: '#9DBAE1' },
        { text: '零食', time: '4月17日', remainingday: '5', img: require('../images/apple.jpg'), color: '#FFE38F' },
        { text: '零食', time: '4月17日', remainingday: '5', img: require('../images/apple.jpg'), color: '#FFE38F' },
    ]

    const [selectTab, setSelectTab] = useState(-1)

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
                        onEndEditing={(value) => { navigation.push('HomeSearch', { sevalue: value.nativeEvent.text, username }); }}
                        style={styles.input}
                        placeholder='芒果'
                    />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('My') }}>
                    <Image
                        style={styles.headportrait}
                        source={{ uri: userimg }}
                    />
                </TouchableOpacity>
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
                    // selectTab == index ?
                    // data.filter((food) => {
                    //     switch (index) {
                    //         case 0:
                    //             return food.color == '#BEE570';
                    //             break;
                    //         case 1:
                    //             return food.color == '#F8CEB4';
                    //             break;
                    //         case 2:
                    //             return food.color == '#B4DDFF';
                    //             break;
                    //         case 3:
                    //             return food.color == '#9DBAE1';
                    //             break;
                    //         case 4:
                    //             return food.color == '#FFE38F';
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    // }).map((nav, idx) => (
                    //     <TouchableOpacity
                    //         style={styles.food}
                    //         key={idx}
                    //         onPress={() => {
                    //             navigation.push('Details',
                    //             {
                    //                 text: nav.text,
                    //                 time: nav.time,
                    //                 img: nav.img,
                    //                 remainingday:nav.remainingday
                    //             }
                    //         )
                    //         }}
                    //     >
                    //         <Image
                    //             style={[styles.foodimg, { borderColor: nav.color }]}
                    //             source={{ uri: "data:image/jpeg;base64," + nav.img }}
                    //         />
                    //         <Text style={styles.foodtext}>{nav.text}</Text>
                    //         <Text style={styles.foodtime}>{nav.time}进入冰箱</Text>
                    //         <Text style={[styles.foodreaminingtime, { color: nav.remainingday <= 3 ? 'red' : '#858585' }]}>保质期还剩{nav.remainingday}天</Text>
                    //         <TouchableOpacity
                    //             onPress={() => {
                    //                 Alert.alert("Hold on!", "你确定要删除吗？", [
                    //                     {
                    //                         text: '取消',
                    //                         onPress: () => null,
                    //                         style: 'cancel'
                    //                     },
                    //                     {
                    //                         text: '确定',
                    //                         onPress: () => {
                    //                             console.log('删除');

                    //                             data.splice(idx, idx + 1)
                    //                             setData([...data])
                    //                         }
                    //                     }
                    //                 ]);
                    //             }}
                    //             style={styles.delete}
                    //         >
                    //             {/* <Image
                    //                 style={styles.deleteimg}
                    //                 source={require('../images/delete.png')}
                    //             /> */}
                    //             <Icon1 name='delete-empty' size={35} style={{ color: 'rgb(251,252,154)' }} />
                    //         </TouchableOpacity>
                    //         <TouchableOpacity
                    //             style={styles.meal}
                    //             onPress={() => {
                    //                 navigation.navigate('Cook')
                    //             }}
                    //         >
                    //             <Text style={{ fontSize: 18, color: 'rgb(243,230,82)', fontWeight: 'bold' }}>饭</Text>
                    //         </TouchableOpacity>
                    //     </TouchableOpacity>
                    // ))
                    // :
                    data.map((nav, idx) => (
                        <TouchableOpacity
                            style={styles.food}
                            key={idx}
                            onPress={() => {
                                navigation.push('Details',
                                    {
                                        text: nav.text,
                                        time: nav.time,
                                        img: nav.img,
                                        remainingday: nav.remainingday
                                    }
                                )
                            }}
                        >
                            <Image
                                style={[styles.foodimg, { borderColor: nav.color }]}
                                // source={nav.img}
                                source={{ uri: nav.img }}
                            />
                            <Text style={styles.foodtext}>{nav.text}</Text>
                            <Text style={styles.foodtime}>{nav.time}进入冰箱</Text>
                            <Text style={[styles.foodreaminingtime, { color: nav.remainingday <= '3' ? 'red' : '#858585' }]}>保质期还剩{nav.remainingday}天</Text>
                            <TouchableOpacity
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
                                                console.log('删除');
                                                data.splice(idx, 1)
                                                setData([...data])
                                                fetch('http://154.8.164.57:1127/deletefooddata', {
                                                    method: 'POST',
                                                    body: JSON.stringify({ foodid: nav.foodid }),
                                                    headers: new Headers({
                                                        'Content-Type': 'application/json'
                                                    })
                                                }).then(res => res.json())
                                                    .then((res) => {
                                                        console.log(res);
                                                    })
                                            }
                                        }
                                    ]);
                                }}
                                style={styles.delete}
                            >
                                {/* <Image
                                        style={styles.deleteimg}
                                        source={require('../images/delete.png')}
                                    /> */}
                                <Icon1 name='delete-empty' size={35} style={{ color: 'rgb(243,230,82)' }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {

                                    navigation.navigate('CookSearch', { text: nav.text, from: 'Home' })
                                }}
                                style={styles.meal}
                            >
                                <Text style={{ fontSize: 18, color: 'rgb(243,230,82)', fontWeight: 'bold' }}>饭</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
                <View style={styles.showall}>
                    <Text
                        style={{ color: '#8E8E8F', fontSize: 16 }}
                        onPress={() => { setSelectTab(Math.random()) }}
                    >——显示全部分类——</Text>
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
        // marginTop: 70,
        // marginLeft: -48,
        position: 'absolute',
        right: ptd(25),
        bottom: ptd(12),
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
        // marginLeft:0,
        // marginLeft: ptd(60),
        // marginTop: ptd(10),
        position: 'absolute',
        top: ptd(12),
        right: ptd(25),
        alignItems: 'center',
        backgroundColor: blue,
        width: 49,
        height: 49,
        borderRadius: 100,
        justifyContent: 'center',
    },
    foodreaminingtime: {
        // marginTop: 85,
        // marginLeft: ptd(-90),
        position: 'absolute',
        top: ptd(85),
        left: ptd(145),
    },
    foodtime: {
        // marginLeft: ptd(-30),
        // marginTop: 55,
        position: 'absolute',
        top: ptd(60),
        left: ptd(145),
    },
    foodtext: {
        position: 'absolute',
        top: ptd(25),
        left: ptd(160),
        // marginTop: 18,
        // marginLeft: ptd(15),
        fontSize: 18
    },
    foodimg: {
        width: ptd(109),
        height: ptd(109),
        borderWidth: 5,
        borderRadius: 5,
        margin: 9,
        marginLeft: 15,
    },
    food: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        width: ptd(335),
        marginLeft: (w - ptd(335)) / 2,
        borderRadius: 25,
        marginBottom: 20,
        elevation: 15,
        position: 'relative',
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
        height: ptd(60),
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
        color: white,
        position: 'absolute',
        right: 25,
        fontSize: 16,
    },
    hello: {
        marginLeft: ptd(25),
        color: white,
        fontSize: 16
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }

})

export default Home
