import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage ,TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
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

const list=[
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃llllllalallalalallalalalalalallalalalala的哈哈哈哈哈哈哈哈哈哈哈哈哈',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
]

const CookPage = ({ navigation }) => {
    const [username, setUserName] = useState('')
    const [userimg, setUserImage] = useState('')
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

    useFocusEffect(
        React.useCallback(() => {
            console.log('cook');
            AsyncStorage.getItem('username').then((username) => {
                console.log(username);
                setUserName(username);
                fetch('http://154.8.164.57:1127/gettext', {
                    method: 'POST',
                    body: JSON.stringify({ username: username }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        console.log(res);
                        console.log(1)
                    })
            })
        }, [])
    )
    return (
        <View style={{flex:1}}>
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
                            navigation.push('CookSearch', { text: value.nativeEvent.text, from: 'Cook' })
                        }}
                        style={styles.input}
                        placeholder='搜索菜谱'
                    />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('My') }}>
                    <Image
                        style={styles.headportrait}
                        source={{ uri: userimg }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bodybox}>
                <Text style={[styles.body_,]}>——</Text>
                <Text style={styles.bodybar}>心得广场</Text>
                <Text style={styles.body_}>——</Text>
            </View>

            <ScrollView>
                <View style={styles.xinde}>
                    {
                        list.map((item,index)=>(
                            <TouchableOpacity style={styles.items} onPress={()=>navigation.navigate('Mydetails',{index:index,list:list})}>
                                <Image source={require('../images/cook1.jpg')} style={styles.item_img}/>
                                <Text style={styles.item_text}>{item.content}</Text>
                                <View style={styles.item_user}>
                                    <Image source={require('../images/logo.jpg')} style={styles.item_userimg}/>
                                    <Text style={styles.item_username}>{item.username}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    xinde:{
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop:20,
        width:w-40,
    },
    items:{
        position:'relative',
        marginTop:10,
        marginLeft:40,
    },
    item_user:{
        flexDirection:'row',
        width:w-300,
        alignContent:'center',
        marginTop:5

    },
    item_username:{
        fontSize:13,
        marginLeft:5,
        marginTop:3,
        fontWeight:'100'
    },
    item_userimg:{
        width:25,
        height:25,
        borderRadius:12.5
    },
    item_text:{
        width:w-300,
        fontSize:15,
        fontWeight:'bold',
        height:35,
        marginTop:5,
        overflow:'hidden',
    },
    item_img:{
        width:w-300,
        height:150,
        borderRadius:20
    },
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
    bodybar:{
        fontSize:30,
        marginLeft:w-430,
        marginRight:w-430,
        color:blue
    },
    bodybox:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
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

export default CookPage
