import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
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


const CookPage = ({ navigation }) => {
    const [username, setUserName] = useState('')
    const _retrieveData = async () => {
        try {
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();
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
                            navigation.push('CookSearch', {text:value.nativeEvent.text,from:'Cook'})
                        }}
                        style={styles.input}
                        placeholder='搜索菜谱'
                    />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('My') }}>
                    <Image
                        style={styles.headportrait}
                        source={require('../images/logo.jpg')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bodybox}>
                <Text style={[styles.body_, { marginLeft: w / 2 - 136 / 2 - 50 }]}>——</Text>
                <Text style={styles.bodybar}>心得广场</Text>
                <Text style={styles.body_}>——</Text>
            </View>

            <ScrollView style={styles.body}>
                <View style={styles.items}>
                </View>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    foodtext: {
        zIndex: 10,
        position: 'absolute',
        top: 25,
        fontSize: ptd(26),
        left: 25,
    },
    img: {
        borderRadius: 25,
        width: w - 50,
        height: w - 50,
    },
    food: {
        marginLeft: 25,
        marginTop: 10,
        width: w - 50,
        backgroundColor: '#BFC',
        marginBottom: 25,
        elevation: 10,
        borderRadius: 25,
    },
    body: {
        height: 573,
    },
})

export default CookPage
