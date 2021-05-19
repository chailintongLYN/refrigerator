import React from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity, ScrollViewBase} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../../common/global'
import { TextInput } from 'react-native-gesture-handler';

const SetPassword=({navigation})=>{
    return(
        <ScrollView>
            <View style={styles.header}>
                <Icon name='left' size={35} style={{marginLeft:ptd(20)}} onPress={()=>{navigation.goBack()}}/>
                <Text style={{fontSize:25,marginLeft:ptd(105)}}>修改头像</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.inputview}>
                    <Text style={{fontSize:20}}>旧密码：</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputview}>
                    <Text style={{fontSize:20}}>新密码：</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputview}>
                    <Text style={{fontSize:20}}>再次输入：</Text>
                    <TextInput style={styles.input}/>
                </View>
            </View>
        </ScrollView>
    )
}
export default SetPassword
const styles=StyleSheet.create({
    inputview: {
        flexDirection: 'row',
        borderBottomColor: '#7468BE',
        borderBottomWidth: 3,
        width: w - 80,
        height: 40,
        marginBottom: 45,
    },
    input: {
        height: 40,
        fontSize: 24,
        padding: 0,
    },
    container:{
        width:ptd(375),
        marginTop:100,
        alignItems:'center'
    },
    header:{
        flexDirection:'row',
        width:ptd(375),
        height:60,
        alignItems:'center',
    }
})