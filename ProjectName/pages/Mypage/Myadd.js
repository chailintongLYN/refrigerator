import React from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
import { TextInput } from 'react-native-gesture-handler';

const Myadd=()=>{
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles.head}>
                <Icon name='closecircleo' size={40} style={styles.close}/>
                <Text style={{fontSize:25,marginLeft:w-340}}>新心得</Text>
                <TouchableOpacity style={styles.submit}><Text style={{fontSize:17,color:'white'}}>发布</Text></TouchableOpacity>
            </View>
            <View style={styles.user}>
                <Image source={require('../images/logo.jpg')} style={styles.userimg}/>
                <Text style={styles.username}>小小刀</Text>
            </View>
            <View style={styles.jilu}>
                <TextInput
                    placeholder='记录你的下厨心得'
                    autoFocus={true}
                    style={styles.inp}
                />
            </View>
        </ScrollView>
    )
}
export default Myadd
const styles=StyleSheet.create({
    jilu:{
        width:w-50,
        marginLeft:25,
        marginTop:10
    },
    inp:{
        fontSize:20
    },
    username:{
        fontSize:20,
        marginLeft:10,
        marginTop:10
    },
    userimg:{
        width:60,
        height:60,
        borderRadius:33,
        marginLeft:w-425
    },
    user:{
        width:w,
        height:60,
        flexDirection:'row',
    },
    submit:{
        width:80,
        height:35,
        backgroundColor:blue,
        marginLeft:w-360,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20

    },
    close:{
        color:'black',
        marginLeft:w-425
    },
    head:{
        width:w,
        height:80,
        flexDirection:'row',
        alignItems:'center'
    }
})