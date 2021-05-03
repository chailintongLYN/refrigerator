import React from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'

const attention=[
    {
        attuser:'用户名',
        attuserimg:require('../images/logo.jpg'),
        attstate:'已关注',
        attcook:[
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
        ]
    },
    {
        attuser:'用户名',
        attuserimg:require('../images/logo.jpg'),
        attstate:'已关注',
        attcook:[
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
        ]
    },{
        attuser:'用户名',
        attuserimg:require('../images/logo.jpg'),
        attstate:'已关注',
        attcook:[
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
            {username:'小小刀',userimg:require('../images/logo.jpg'),content:'今天吃生蚝啊，清蒸生蚝好好吃',time:'2021-04-19',img:require('../images/cooked.png')},
        ]
    }
]
const MycarePage = ({navigation}) => {
    return (
        <ScrollView>
            <View style={styles.head}>
                <Icon name='left' size={35} style={{marginLeft:ptd(50)}} onPress={()=>{navigation.goBack()}}/>
                <Text style={{fontSize:20,marginLeft:85,fontWeight:'bold'}}>你关注的人</Text>
            </View>
            <ScrollView style={styles.attionlist} contentContainerStyle={{alignItems:'center'}}>
                {
                    attention.map((item,index)=>(
                        <TouchableOpacity style={styles.attionitem} onPress={()=>{navigation.navigate('MycareCon',{conlist:item})}} key={index}>
                            <Image source={item.attuserimg} style={styles.attimg}/>
                            <Text style={{fontSize:20 ,marginLeft:20}}>{item.attuser}</Text>
                            <TouchableOpacity style={styles.attbtn}>
                            <Text style={{fontSize:17,color:'white',marginTop:8}}>{item.attstate}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </ScrollView>
    )
}
export default MycarePage

const styles=StyleSheet.create({
    attimg:{
        width:80,
        height:80,
        borderRadius:40,
        marginLeft:20
    },
    attbtn:{
        width:ptd(70),
        height:40,
        backgroundColor:'#9D9E9D',
        borderRadius:20,
        alignItems:'center',
        marginLeft:ptd(80)
    },
    attionitem:{
        width:ptd(320),
        height:100,
        flexDirection:'row',
        backgroundColor:'white',
        marginBottom:20,
        alignItems:'center',
        borderRadius:100,
        borderWidth:2
    },
    head:{
        flexDirection:'row',
        alignItems:'center',
        width:ptd(375),
        height:60,
    },
    attionlist:{
        width:ptd(375),
        height:500,
        marginTop:20,
    }
})