import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const myDate = new Date();
let month = (myDate.getMonth() + 1).toString();
if (month.length == 1) {
    month = '0' + month;
}
let day = myDate.getDate();
if (day.length == 1) {
    day = '0' + day;
}

const HomeSearchPage = ({ navigation, route }) => {

    let info = {
        username: route.params.username,
        sevalue: route.params.sevalue
    }
    const [data, setData] = useState([]);

    useEffect(() => {
        if (info.sevalue != '') {
            fetch('http://154.8.164.57:1127/getfoods', {
                method: 'POST',
                body: JSON.stringify(info),
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
        }
    }, [])

    return (
        <View style={{ backgroundColor: '#F5F5F5', }}>
            <View style={styles.searchbar}>
                <Text style={styles.goback} onPress={() => { navigation.goBack() }}>
                    {'<'}
                </Text>
                <View style={styles.searchbox}>
                    <Icon name='search1' size={18} style={styles.icon}></Icon>
                    <TextInput
                        style={styles.input}
                        placeholder={route.params.sevalue}
                        onEndEditing={(value) => { navigation.push('HomeSearch', { sevalue: value.nativeEvent.text, username: route.params.username }); }}
                    />
                </View>
            </View>
            <ScrollView style={styles.foodbar}>
                {
                    data != [] ? data.map((nav, idx) => (
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
    undefinedtext: {
        color: '#8E8E8F',
        fontSize: 18
    },
    undefined: {
        alignItems: 'center'
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
        marginLeft: w-330,
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
        marginLeft: w-315,
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
        width: w - 100,
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
