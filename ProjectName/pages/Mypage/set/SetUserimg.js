import React,{useState} from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity, ScrollViewBase} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../../common/global'
import ImagePicker from 'react-native-image-picker';


const SetUserimg=({navigation})=>{
    const [img,setImg]=useState('../../images/logo.jpg')
    const options={
        title:'请选择',
        concelButtonTitle:'返回',
        takePhotoButtonTitle:'拍照',
        chooseFromLibraryButtonTitle:'从图库中选择',
        storageOptions:{
            skipBackup:true,
            path:'images',
        },
    }
    const take=()=>{
        ImagePicker.showImagePicker(options,(response)=>{
            if(response.didCancel){
                return
            }else if(response.error){
                console.log('Error:',response.error);
            }else if(response.customButton){
                console.log('custom:',response.customButton);
            }else{
                const source={uri:response.uri};
                setImg(source.uri)
            }
        })
    }
    return(
        <ScrollView>
            <View style={styles.header}>
                <Icon name='left' size={35} style={{marginLeft:ptd(20)}} onPress={()=>{navigation.goBack()}}/>
                <Text style={{fontSize:25,marginLeft:ptd(105)}}>修改头像</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image source={{uri:img}} style={styles.userimg}/>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{fontSize:30,color:'white'}} onPress={(()=>take())}>修改头像</Text>
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
        backgroundColor:blue
    },
    userimg:{
        width:ptd(270),
        height:300,
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