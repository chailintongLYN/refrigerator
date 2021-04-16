/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState ,useEffect} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  ToastAnToastAndroid,
  ToastAndroid,
  Platform,
  Modal,
  AsyncStorage,

} from 'react-native';

const T = (props) =>{
  return <Text style={styles.textColor}>{props.children}</Text>
}

const MyBtn = props=>{
  return <TouchableOpacity style={props.style} onPress={props.onPress}>
    <Text style={{color:props.style.color?props.style.color:'#000'}}>{props.children}</Text>
  </TouchableOpacity>
}

const IOS = ()=> <Text>IOS</Text>
const And = ()=> <Text>Android</Text>

// console.log(Platform.OS)

// const Com = Platform.select({
//   'ios':IOS,
//   'android':And,
// })


const App = () => {
  const storeData = async (value)=>{
    await AsyncStorage.setItem('data','abc');
    // const data = await AsyncStorage.getItem('data');
    // console.log(data)
  }
  const getData=()=>{
    AsyncStorage.getItem('data').then(res=>{
      console.log(res)
    })
  }
  const [isVisible,setIsVisible]= useState(false)
  return (
    <ScrollView style={styles.container }>
      <Modal
        visible={isVisible}
        onRequestClose={()=>setIsVisible(false)}      
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text> Modal 弹框</Text>
          <MyBtn 
            onPress = {()=>{setIsVisible(false)}}
            style ={styles.btn}
          >
            关闭modal
          </MyBtn>
        </View>
      </Modal>
      <View style={{marginTop:30,alignItems:'center'}}>
        <MyBtn 
          onPress = {()=>{setIsVisible(true)}}
          style ={styles.btn}>
            打开modal
        </MyBtn>
        <MyBtn 
            onPress = {storeData}
            style ={styles.btn}
          >
            本地存储
        </MyBtn>
        <MyBtn 
          onPress = {getData}
          style ={styles.btn}
        >
          获取数据
        </MyBtn>
      </View>
      {
        Platform.OS == 'ios'?<IOS/>:<And/>
      }
      {/* <Com/> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgStyle:{
    width:200,
    height:100,
    resizeMode:'repeat'
  },
  btn:{
    width:100,
    height:50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'#fff',
    ...Platform.select({
      'ios':{
        backgroundColor:'red'
      },
      'android':{
        backgroundColor:'yellow',
      }
    })
  },
  inpStyle:{
    width:300,
    height:50,
    padding:0,
    borderColor:'#fff',
    borderWidth:2,      
    borderStyle:'solid'
  },
  textColor:{
    color:'#f00',
  },
  container:{
    flex:1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor:'#ccc'
    // 没有backgroundImg
  }
});

export default App;