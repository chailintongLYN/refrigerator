import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Alert, AsyncStorage, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect } from '@react-navigation/native';

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


const LikePage = ({ navigation }) => {
    const [username, setUserName] = useState('')
    const [userimg, setUserImage] = useState('')
    const [data, setData] = useState([]);
    const [alldata, setAllData] = useState([]);
    const [ifrefresh, setIfRefresh] = useState(false);


    const _retrieveData = async () => {
        try {
            setUserImage(await AsyncStorage.getItem('userimg'));
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            _retrieveData();

            AsyncStorage.getItem('username').then((username) => {
                setUserName(username)
                fetch('http://154.8.164.57:1127/getmylike', {
                    method: 'POST',
                    body: JSON.stringify({ username: username }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        if (res.status != 'nosave') {
                            setData(res.results)
                            setAllData(res.results)
                        }
                        else {
                            setData([])
                            setAllData([])
                        }
                    })
            })

        }, [])
    )
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
                        onEndEditing={(value) => {
                            fetch('http://154.8.164.57:1127/findmylike', {
                                method: 'POST',
                                body: JSON.stringify({ username: username, text: value.nativeEvent.text }),
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            }).then(res => res.json())
                                .then((res) => {
                                    setData(res.results)
                                })
                        }}
                        style={styles.input}
                        placeholder='搜索我的收藏'
                    />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('My') }}>
                    <Image
                        style={styles.headportrait}
                        source={{ uri: userimg }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.likelist}
                refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={ifrefresh}
                        onRefresh={() => {
                            setIfRefresh(true)
                            setTimeout(() => {
                                setIfRefresh(false)
                                navigation.navigate('Like');
                            }, 1000)
                        }}
                    />
                }
            >
                {
                    data.map((nav, idx) => (
                        <TouchableOpacity
                            style={[styles.like, { marginBottom: idx == data.length - 1 ? 20 : 0 }]}
                            onPress={() => navigation.push('Menudetails', nav.mealname)}
                            key={idx}
                        >
                            <Image source={{ uri: nav.img }} style={styles.img} />
                            <Text style={styles.text}>{nav.mealname}</Text>
                            {/* <Text style={styles.listtime}>{nav.time}</Text> */}
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
                                                data.splice(idx, 1)
                                                setData([...data])
                                                fetch('http://154.8.164.57:1127/delesave', {
                                                    method: 'POST',
                                                    body: JSON.stringify({ username: username, mealname: nav.mealname }),
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
                            >
                                <Icon1 name='delete-empty' size={35} style={{ color: 'rgb(243,230,82)' }} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
                <View style={styles.showall}>
                    <Text
                        style={{ color: '#8E8E8F', fontSize: 16 }}
                        onPress={() => {
                            setData(alldata)
                        }}
                    >——显示全部——</Text>
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
    delete: {
        width: 55,
        height: 55,
        borderRadius: 100,
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: ptd(42),
        right: ptd(20),
        // marginLeft: ptd(45),
        // marginTop: 52,
    },
    listtime: {
        fontSize: ptd(15),
        color: 'black',
        position: 'absolute',
        top: ptd(75),
        left: ptd(145),
    },
    text: {
        fontSize: ptd(18),
        position: 'absolute',
        top: ptd(32),
        left: ptd(145),
        // marginTop: 42,
    },
    img: {
        margin: 20,
        width: ptd(100),
        height: ptd(100),
        // width: 120,
        // height: 120,
        borderRadius: 10,
    },
    like: {
        position: 'relative',
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
        fontSize: 12,
        marginTop:5
    },
    hello: {
        marginLeft: ptd(25),
        color: white,
        fontSize: 15,
        marginTop:5
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }

})

export default LikePage
