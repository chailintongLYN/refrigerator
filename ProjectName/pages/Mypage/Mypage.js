import React, { useState } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'

const mycook=[
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
    {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
]

const Mypage=({navigation})=>{
    return (
        <ScrollView>
            <View style={styles.bgc}>
                <Icon name='setting' size={40}  style={{color:'white',marginLeft:ptd(300),marginTop:25}}/>
            </View>
            <View style={styles.titlebar}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../images/logo.jpg')} style={styles.userimg}/>
                    <Text style={styles.username}>小小刀</Text>
                    <Icon name='camera' size={40} style={{color:blue,marginLeft:ptd(115),marginTop:25}}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.mysearch} onPress={()=>{navigation.navigate('Mycare')}}>
                        <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>3</Text>
                        <Text style={{fontSize:17,marginTop:15,color:'#9D9E9D'}}>关注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mysearch} onPress={()=>{navigation.navigate('Myfollows')}}>
                        <Text style={styles.title_number}>3</Text>
                        <Text style={styles.search_name}>我的粉丝</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mysearch}>
                        <Text style={styles.title_number}>3</Text>
                        <Text style={styles.search_name}>我的心得</Text>
                    </TouchableOpacity>
                </View> 
            </View>
            <ScrollView style={{marginTop:30}}>
                {/* <View style={styles.mycooked}>
                    <Image source={require('../images/cooked.png')} style={styles.cooked_img}/>
                    <View>
                        <Text style={styles.content}>今天吃生蚝啊，清蒸生蚝好好吃,啦啦啦啦啦啦啦啦</Text>
                        <Text style={{marginLeft:10,color:'#9D9E9D'}}>2021-04-19</Text>
                    </View>
                </View> */}
                {
                    mycook.map((item,index)=>(
                        <TouchableOpacity 
                            style={[styles.mycooked,{marginBottom:index==mycook.length-1?20:0}]} 
                            key={index} 
                            onPress={()=>navigation.navigate('Mydetails')}
                        >
                            <Image source={item.img} style={styles.cooked_img}/>
                            <View>
                                <Text style={styles.content}>{item.content}</Text>
                                <Text style={{marginLeft:10,color:'#9D9E9D'}}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView> 
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    content:{
        fontSize:16,
        marginTop:25,
        marginLeft:10,
        width:ptd(210),
        height:60,
        overflow:"hidden",
    },
    cooked_img:{
        width:ptd(80),
        height:90,
        marginTop:17,
        marginLeft:ptd(10),
        resizeMode:"contain"
    },
    mycooked:{
        width:ptd(340),
        height:120,
        marginLeft:(w-ptd(340))/2,
        marginTop:20,
        flexDirection:'row',
        borderRadius:20,
        backgroundColor:'white',
        elevation:10,
    },
    title_number:{
        fontSize:20,
        fontWeight:"bold",
        marginLeft:25
    },
    search_name:{
        fontSize:17,
        marginTop:15,
        color:'#9D9E9D'

    },
    mysearch:{
        marginLeft:ptd(50),
        height:70
    },
    username:{
        color:blue,
        fontSize:20,
        fontWeight:"bold",
        marginTop:30,
        marginLeft:10
    },
    userimg:{
        width:120,
        height:120,
        borderRadius:60,
        marginLeft:10,
        marginTop:-10
    },
    titlebar:{
        width:ptd(335),
        height:200,
        backgroundColor:'white',
        marginTop:-95,
        marginLeft:(w-ptd(335))/2,
        borderBottomWidth:10,
        borderBottomColor:blue,
        borderRadius:15,
    },
    bgc:{
        height:170,
        backgroundColor:blue
    }
})

export default Mypage
