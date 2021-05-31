import React ,{ useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
import { useFocusEffect } from '@react-navigation/native';


const MycarePage = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [userimg, setUserimg] = useState('')
    const [list,setList]=useState([])
    const [isattention,setIsattention]=useState('已关注')
    const _retrieveData = async () => {
        try {
            setUserimg(await AsyncStorage.getItem('userimg'));
            setUsername(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();
    useFocusEffect(
        React.useCallback(() => {
            console.log('mypage');
            AsyncStorage.getItem('username').then((username) => {
                // console.log(username);
                setUsername(username);
                fetch('http://154.8.164.57:1127/getcare', {
                    method: 'POST',
                    body: JSON.stringify({ username: username }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        // console.log(res);
                        setList(res.results);
                        
                    })
            })
        }, [])
    )
    console.log(list);
    function attentionClick(followname){
        if(isattention==='关注'){
            console.log('变成已关注');
            AsyncStorage.getItem('username').then((username) => {
                fetch('http://154.8.164.57:1127/addcare', {
                    method: 'POST',
                    body: JSON.stringify({ username: username,followname:followname }),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        // console.log(res);
                        setIsattention('已关注')
                        
                    })
            })
        }else{
            console.log('变成关注')
            AsyncStorage.getItem('username').then((username) => {
                // console.log(username);
                setUsername(username);
                fetch('http://154.8.164.57:1127/delecare', {
                    method: 'POST',
                    body: JSON.stringify({ username: username ,followname:followname}),
                    headers: new Headers({
                        'Content-Type': 'applocation/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        // console.log(res);
                        // setList(res.results);
                        setIsattention('关注')
                        
                    })
            })
        }
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.head}>
                <Icon name='left' size={35} style={{marginLeft:ptd(50)}} onPress={()=>{navigation.goBack()}}/>
                <Text style={{fontSize:20,marginLeft:85,fontWeight:'bold'}}>你关注的人</Text>
            </View>
            <ScrollView style={styles.attionlist} contentContainerStyle={{alignItems:'center'}}>
                {
                    list!=undefined?
                    list.map((item,index)=>(
                        <TouchableOpacity style={styles.attionitem} onPress={()=>{navigation.navigate('Mypages',{conlist:item})}} key={index}>
                            <Image source={{uri:item.followimg}} style={styles.attimg}/>
                            <Text style={{fontSize:20 ,marginLeft:20}}>{item.followname}</Text>
                            <TouchableOpacity style={styles.attbtn} onPress={()=>attentionClick(item.followname)}>
                                <Text style={{fontSize:17,color:'white',marginTop:8}}>{isattention}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                    :
                    <Text>主人，您还没有关注任何人~</Text>
                }
            </ScrollView>
        </View>
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