import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
import { useFocusEffect } from '@react-navigation/native';

const Mypages = ({ navigation,route }) => {
    const [number, setNumber] = useState({});
    const [username,setUsername]=useState('');
    const [text, setText] = useState([]);
    const [isattention, setIsattention] = useState('')
    const userimg=route.params.userimg;
    console.log('mypages传递',route.params);
    useFocusEffect(
        React.useCallback(()=>{
            fetch('http://154.8.164.57:1127/getmydata',{
                method:'POST',
                body:JSON.stringify({username:route.params.username}),
                header:new Headers({
                    'Content-Type':'applocation/json'
                })
            }).then(res=>res.json())
                    .then((res)=>{
                        console.log('res',res);
                        setNumber(res.number[0]);
                        setText(res.text)
                    })

            AsyncStorage.getItem('username').then((username) => {
                setUsername(username);
                fetch('http://154.8.164.57:1127/iffollow', {
                    method: 'POST',
                    body: JSON.stringify({ username: username, followname: route.params.username }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        console.log('是否关注',res);
                        if(res.results){
                            setIsattention('已关注')
                        }else{
                            setIsattention('关注')
                        }

                    })
            })
            
        },[])
    )

    function attentionClick(followname) {
        if (isattention === '关注') {
            console.log('变成已关注');
            AsyncStorage.getItem('username').then((username) => {
                setUsername(username);
                fetch('http://154.8.164.57:1127/addcare', {
                    method: 'POST',
                    body: JSON.stringify({ username: username, followname: followname }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        // console.log(res);
                        setIsattention('已关注')

                    })
            })
        } else {
            console.log('变成关注')
            AsyncStorage.getItem('username').then((username) => {
                // console.log(username);
                setUsername(username);
                fetch('http://154.8.164.57:1127/delecare', {
                    method: 'POST',
                    body: JSON.stringify({ username: username, followname: followname }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        // console.log(res);
                        // setList(res.results);
                        setIsattention('关注')

                    })
            })
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.bgc}>
                <Icon name='left' size={40} style={styles.back} onPress={() => navigation.goBack()} />
                <TouchableOpacity style={styles.attion}>
                    <Text style={styles.attion_text} onPress={()=>attentionClick(route.params.username)}>{isattention}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.titlebar}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{uri:userimg}} style={styles.userimg} />
                    <Text style={styles.username}>{route.params.username}</Text>
                    <Icon name='camera' size={40} style={{ color: blue, marginLeft: ptd(115), marginTop: 25 }} onPress={() => navigation.navigate('Myadd')} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.mysearch} onPress={() => { navigation.navigate('Mycare') }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{number.followsnumber}</Text>
                        <Text style={{ fontSize: 17, marginTop: 15, color: '#9D9E9D' }} >关注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mysearch} onPress={() => { navigation.navigate('Myfollows') }}>
                        <Text style={styles.title_number}>{number.fansnumber}</Text>
                        <Text style={styles.search_name}>我的粉丝</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mysearch} onPress={() => navigation.navigate('Mydetails', { index: 0, list: text })}>
                        <Text style={styles.title_number}>{text.length}</Text>
                        <Text style={styles.search_name}>我的心得</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ marginTop: 20, width: ptd(375) }} contentContainerStyle={{ alignItems: 'center' }}>
                {
                    text!=undefined?
                    text.map((item, index) => (
                        <TouchableOpacity
                            style={[styles.mycooked, { marginBottom: index == text.length - 1 ? 20 : 0 }]}
                            key={index}
                            onPress={() => navigation.navigate('Otherdetails', { index: index, list:text })}
                        >
                            <Image source={{uri:item.img}} style={styles.cooked_img} />
                            <View>
                                <Text style={styles.content}>{item.content}</Text>
                                <Text style={{ marginLeft: 10, color: '#9D9E9D', marginTop: 10 }}>
                                {item.ctime.substring(0,10)} {item.ctime.substring(12,19)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                    :
                    <Text>主人，您还没有发表心得</Text>
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    attion_text: {
        fontSize: 18,
        color: blue,
        fontWeight: 'bold'
    },
    attion: {
        backgroundColor: 'white',
        width: 80,
        height: 40,
        marginTop: 20,
        marginLeft: w - 175,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        marginLeft: 20,
        marginTop: 20,
        color: 'white'
    },
    content: {
        fontSize: 16,
        marginTop: 25,
        marginLeft: 10,
        width: ptd(210),
        height: 60,
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
        backgroundColor: blue,
        flexDirection: 'row',
    }
})

export default Mypages
