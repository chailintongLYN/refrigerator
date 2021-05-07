import React from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
var layout={
    x:0,
    y:0
}
const Mydetails=({navigation,route})=>{
    const list=route.params.list;
    function con(index,event){
        if(index===route.params.index){
            layout = event.nativeEvent.layout
        }
    }
    React.useEffect(()=>{
        con(),
        window.scrollTo({ x: 0, y:230*route.params.index, animated: true});
    })
    return(
        <View>
            <View style={styles.head}>
                <Icon name='left' size={30} style={{marginLeft:w-420}} onPress={()=>navigation.goBack()}/>
                <Text style={styles.head_text}>心得</Text>
            </View>
            <ScrollView style={{marginTop:30, width:ptd(375)}} ref={(view) => { window = view; }} contentContainerStyle={{alignItems:'center'}}> 
                {
                    list.map((item,index)=>(
                        <View key={index} style={styles.v1} onLayout={event=>con(index,event)}>
                            <Image source={require('../images/logo.jpg')} style={styles.userimg}/>
                            <View style={{marginLeft:w-440}}>
                                <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                                    <Text style={{fontSize:18}}>{item.username}</Text>
                                    <Text style={{marginLeft:w-330,color:'#9D9E9D'}}>{item.time}</Text>
                                    <Text style={styles.delete} onPress={()=>console.log('删除')}>删除</Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{width:ptd(200),fontSize:15}}>{item.content}</Text>
                                    <Image source={require('../images/cooked.png')} style={styles.img}/>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            
        </View>
    )
}
export default Mydetails
const styles=StyleSheet.create({
    img:{
        borderRadius:20,
        marginTop:10
    },
    delete:{
        marginLeft:w-430,
        color:'#9D9E9D'
    },
    userimg:{
        width:50,height:50,
        borderRadius:25,
        marginTop:10
    },
    head_text:{
        fontSize:20,
        marginLeft:w-300
    },
    head:{
        width:ptd(375),
        height:60,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
    },
    v1:{
        width:ptd(310),
        marginBottom:30,
        flexDirection:'row',
        backgroundColor:'white'
    }
})