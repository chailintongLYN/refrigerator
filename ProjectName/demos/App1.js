/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState ,useEffect} from 'react';
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
  Platform

} from 'react-native';

const T = (props) =>{
  return <Text style={styles.textColor}>{props.children}</Text>
}

const MyBtn = props=>{
  return <TouchableOpacity style={props.style}>
    <Text style={{color:props.style.color?props.style.color:'#000'}}>{props.children}</Text>
  </TouchableOpacity>
}

let time = 0;

const IOS = ()=> <Text>IOS</Text>
const IOS = ()=> <Text>Android</Text>

const App = () => {
  console.log('hello')
  const [inpValue,setInpValue] = useState('')
  useEffect(()=>{
    const back = ()=>{
      console.log('123')
      // Alert.alert("Hold on!","你确定要退出吗？",[
      //   {
      //     text:'取消',
      //     onPress: ()=> null,
      //     style: 'cancel'
      //   },
      //   { text: '确定',onPress: ()=> BackHandler.exitApp()}
      // ]);

      //2s中之内连续点击两次返回按钮退出应用
      if (Date.now() - time >2000) {
        ToastAndroid.show('是否要退出应用',20)
        time = Date.now();
        return true;
      }
      else{
        BackHandler.exitApp()
      }
    }
    BackHandler.addEventListener('hardwareBackPress',back)
  })
  return (
    <ScrollView style={styles.container }>
      {/* 交互按钮 */}
      <Button 
        onPress={()=>{}}
        title='按钮'
        color='#841584'
      />
      <MyBtn style ={styles.btn}>
        hello
      </MyBtn>
      <View style={{alignItems:'center',marginTop:30}}>
        <TouchableOpacity
          style={styles.btn}
        >
          <Text style={{color:'#841584'}}>提交</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{height:300,borderColor:'red',borderWidth:1}}>
        <View style={{height:800}}>
          <T>文本</T>
        </View>
        <View style={{height:800}}>
          <T>文本</T>
        </View>
      </ScrollView>
      <View style={{height:500}}>
        <T>文本</T>
      </View>
      {/* 文本输入 */}
      {/* 属性：
          value
          onChangeText
          onSubmitEditing
          onFocus
      */}
      <TextInput 
        style={styles.inpStyle}
        value={inpValue}
        onChangeText={(val)=>setInpValue(val)}
      ></TextInput>
      {/* 宽高不带单位的，转成dp */}
      {/* 引入网路图片,需要设置宽高 */}
      <Image 
        style={{width:50,height:100}}
        source={
          {uri:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'}
        }/>
      {/* <Image source={require('../ProjectName/babel.config')}/> */}
      {/* resizeMode:属性 
          cover ： 缩放 保持原宽高比 直到宽高大于等于容器的尺寸
          contain 缩放 保持原宽高比 直到宽高小于等于容器的尺寸
          stretch 拉伸 不维持原宽高比
          repeat 平铺
          center 居中不拉伸 */}
      {/* 添加图片背景 没有  只能用ImageBackground组件
          背景图的使用*/}
      <ImageBackground
        source={
          { uri: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }
        }
        style ={styles.imgStyle}
      >
        <T>封装 T 组件</T>
        <T>hello RN 1</T>
        <T>hello RN 2</T>
        <T>hello RN 3</T>
      </ImageBackground>
        {/* <ImageBackground source={
        {uri:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'}
        } 
        style={styles.imgStyle}
        reslzeMode = 'cover'
      >
      </ImageBackground> */}
      
      {/* 列表组件 */}
      {/* onRefresh 下拉刷新 
          refreshing 下拉刷新时的图标
          onEndReached 上拉加载
          onEndReachedThreshold (0-1之间的数) 距离底部多上距离触发上拉加载函数
      */}

      
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
    backgroundColor:'#fff'
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