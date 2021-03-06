import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
import { useFocusEffect } from '@react-navigation/native';

const Myfollows = ({ navigation }) => {
    const [attention,setAttention]=useState([]);
    const [isattention,setIsattention]=useState('')
    useFocusEffect(
        React.useCallback(() => {
            console.log('myfollow');
            AsyncStorage.getItem('username').then((username) => {
                console.log(username);
                // setUsername(username);
                fetch('http://154.8.164.57:1127/getfans', {
                    method: 'POST',
                    body: JSON.stringify({ username: username }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {

                        console.log(res);
                        setAttention(res.results);
                    })
            })
        }, [])
    )


    // console.log(JSON.parse(attention[0].attuserimg))
    return (
        <View>
            <View style={styles.head}>
                <Icon name='left' size={35} style={{ marginLeft: ptd(50) }} onPress={() => { navigation.goBack() }} />
                <Text style={{ fontSize: 20, marginLeft: 85, fontWeight: 'bold' }}>ζηη²δΈ</Text>
            </View>
            <ScrollView style={styles.attionlist} contentContainerStyle={{ alignItems: 'center' }}>
                {
                    attention != undefined ?
                        attention.map((item, index) => (
                            <TouchableOpacity
                                style={styles.attionitem}
                                onPress={() => {
                                    navigation.push('Mypages'
                                        , { username: item.username,userimg:item.userimg}
                                    )
                                }}
                                key={index}
                            >
                                <Image source={{uri:item.userimg}} style={styles.attimg} />
                                <Text style={{ fontSize: 20, marginLeft: 20 }}>{item.username}</Text>
                                {/* <TouchableOpacity
                                    style={styles.attbtn}
                                    onPress={() => {
                                        console.log('ε³ζ³¨');
                                    }}
                                >
                                    <Text style={{ fontSize: 17, color: 'white', marginTop: 8 }}>{isattention}</Text>
                                </TouchableOpacity> */}
                            </TouchableOpacity>
                        ))
                        :
                        <Text>δΈ»δΊΊοΌζ¨θΏζ²‘ζδ»»δ½η²δΈ</Text>
                }
            </ScrollView>
        </View>
    )
}
export default Myfollows

const styles = StyleSheet.create({
    attimg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginLeft: 20
    },
    attbtn: {
        width: ptd(70),
        height: 40,
        backgroundColor: blue,
        borderRadius: 20,
        alignItems: 'center',
        marginLeft: ptd(80),
        // flex:1
    },
    attionitem: {
        width: ptd(320),
        height: 100,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        width: ptd(375),
        height: 60,
    },
    attionlist: {
        // marginLeft:(w-ptd(320))/2,
        marginTop: 20,
    }
})