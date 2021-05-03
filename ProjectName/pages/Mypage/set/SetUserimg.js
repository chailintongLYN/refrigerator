import React from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity, ScrollViewBase} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../../common/global'
const SetUserimg=({navigation})=>{
    return(
        <ScrollView>
            <View style={styles.header}>
                <Icon name='left' size={35} style={{marginLeft:ptd(20)}} onPress={()=>{navigation.goBack()}}/>
                <Text style={{fontSize:25,marginLeft:ptd(105)}}>修改头像</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.img}>
                    <Text>放置图片</Text>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{fontSize:30}}>修改头像</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default SetUserimg;
const styles=StyleSheet.create({
    btn:{
        width:ptd(200),
        height:100,
        marginTop:30,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1
    },
    img:{
        width:ptd(270),
        height:300,
        backgroundColor:blue
    },
    container:{
        width:ptd(375),
        marginTop:30,
        alignItems:'center'
    },
    header:{
        flexDirection:'row',
        width:ptd(375),
        height:60,
        alignItems:'center',
    }
})