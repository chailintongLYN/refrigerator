import React ,{useState} from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';



const Myadd=({navigation})=>{
    const [img,setImg]=useState('../images/apple.jpg');
    const options = {
        title: '请选择',
        cancelButtonTitle: '返回',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '从图库中选择',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const take = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                setImg(source.uri)
            }
        });
    }
    return(
        <ScrollView style={{backgroundColor:white}}>
            <View style={styles.head}>
                <Icon name='closecircleo' size={40} style={styles.close} onPress={()=>navigation.goBack()}/>
                <Text style={{fontSize:25,marginLeft:w-340}}>新心得</Text>
                <TouchableOpacity style={styles.submit}><Text style={{fontSize:17,color:'white'}}>发布</Text></TouchableOpacity>
            </View>
            <View style={styles.user}>
                <Image source={require('../images/logo.jpg')} style={styles.userimg}/>
                <Text style={styles.username}>小小刀</Text>
            </View>
            <ScrollView style={styles.jilu}>
                <TextInput
                    placeholder='记录你的下厨心得'
                    autoFocus={true}
                    style={styles.inp}
                    multiline={true}
                />
            </ScrollView>
           
            {/* 放置图片 */}
            <View>
                <Image 
                    style={{ width: ptd(200), height: ptd(225), marginTop: ptd(10),marginLeft:(w-ptd(200))/2}}
                    source={{uri:img}}
                />
            </View>
             <TouchableOpacity style={styles.addimg} onPress={()=>take()}>
                <Icon name='picture' size={45} style={{color:'white'}}/>
                <Text style={{fontSize:20,color:'white',fontWeight:'bold',marginLeft:22}}>添加图片</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default Myadd
const styles=StyleSheet.create({
    addimg:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:w-50,
        height:60,
        marginLeft:(w-(w-50))/2,
        backgroundColor:blue,
        marginTop:20
    },
    jilu:{
        width:w-50,
        marginLeft:25,
        marginTop:10,
        height:300,
        backgroundColor:'white'
    },
    inp:{
        fontSize:20,
        width:w-50,
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