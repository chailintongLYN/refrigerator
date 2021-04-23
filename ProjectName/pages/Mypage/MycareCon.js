import React from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'

const MtCareCon=({navigation,route})=>{
    var conlist=route.params.conlist.attcook;
    
    return( 
        <ScrollView>
            <View style={styles.head}>
                <Icon name='left' size={30} style={{marginTop:20}} onPress={()=>{navigation.goBack()}}/>
                <View style={styles.head_user}>
                    <Image source={require('../images/logo.jpg')} style={styles.usrimg}/>
                    <Text style={{fontSize:25,marginLeft:30,fontWeight:'bold'}}>{route.params.conlist.attuser}</Text>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={{fontSize:20,marginTop:5}}>{route.params.conlist.attstate}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {
                    conlist.map((item,index)=>(
                        <TouchableOpacity 
                            style={[styles.mycooked,{marginBottom:index==conlist.length-1?20:0}]} 
                            key={index} 
                            onPress={()=>navigation.navigate('Mydetails')}
                        >
                            <Image source={require('../images/cooked.png')} style={styles.cooked_img}/>
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
export default MtCareCon

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
    btn:{
        width:ptd(80),
        height:40,
        backgroundColor:blue,
        alignItems:'center',
        borderRadius:20,
        marginLeft:ptd(70)
    },
    usrimg:{
        width:90,
        height:90,
        borderRadius:45,
        marginLeft:20
    },
    head_user:{
        flexDirection:'row',
        alignItems:'center',
        width:ptd(345),
        height:120,
        borderRadius:30,
        borderWidth:1,
        backgroundColor:'white',
        marginTop:20
    },
    head:{
        width:ptd(345),
        height:200,
        marginLeft:(w-ptd(345))/2
    }
})