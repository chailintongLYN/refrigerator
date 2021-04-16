import React, { useState } from 'react';

import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet, TextInput, Alert,AsyncStorage,  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const navs = [
  { text: '记账本', img: require('./imgs/icon_home_hot.png'), path: 'hot' },
  { text: '写清单', img: require('./imgs/icon_home_seckill.png'), path: 'seckill' },
  { text: '听写', img: require('./imgs/icon_home_new.png'), path: 'new' },
  { text: '画涂鸦', img: require('./imgs/icon_home_green.png'), path: 'green' },
]

let arr = [
  { title: '哈哈', time: '10:58', text: '哈哈' },
  { title: '哈哈', time: '10:58', text: '哈哈' },
  { title: '哈哈', time: '10:58', text: '哈哈' },
  { title: '哈哈', time: '10:58', text: '哈哈' },
  { title: '哈哈', time: '10:58', text: '哈哈' },
  { title: '哈哈', time: '10:58', text: '哈哈' }
]


const HomeScreen = ({ navigation }) => {

  const [selectTab, setSelectTab] = useState(0)
  const [data, setData] = useState(arr)
  _retrieveData = async () => {
    try {
      const title = await AsyncStorage.getItem('title');
      const text = await AsyncStorage.getItem('text');
      // We have data!!
      await AsyncStorage.removeItem('title');
      await AsyncStorage.removeItem('text');
      if (title !== null) {
        const myDate = new Date();
        let mins = myDate.getMinutes().toString();
        if (mins.length == 1) {
          mins = '0' + mins;
          console.log(mins)
        }
        let hours = myDate.getHours().toString();
        if (hours.length == 1) {
          hours = '0' + hours;
        }
        const nowtime = hours + ':' + mins;
        setData(arr.push({ title: title, time: nowtime, text: text }))
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _retrieveData();

  return (
    <ScrollView>
      <ScrollView horizontal={true} style={styles.titlenav1}>
        <Text style={selectTab == 0 ? styles.titlenav2 : styles.titlenav3}
          onPress={() => {
            setSelectTab(0)
          }}
          key='0'
        >全部</Text>
        <Text style={selectTab == 1 ? styles.titlenav2 : styles.titlenav3}
          onPress={() => {
            setSelectTab(1)
          }}
          key='1'
        >文件夹</Text>
        {/* <Text style={{ marginLeft: 100, lineHeight: 60 , fontSize: 20}}>文件夹</Text> */}
      </ScrollView >
      {selectTab == 0 ? <View>
        <View style={styles.searchbar}>
          <View style={styles.searchbox}>
            <Icon size={15} name="search1" />
            <TextInput placeholder='搜索便签'></TextInput>
          </View>
        </View>
        <View style={styles.navsbox}>
          {
            navs.map((nav, idx) => (
              <TouchableOpacity key={idx} style={styles.nav} onPress={() => { if (idx == 0) { navigation.push('notelist', { arr }) } else if (idx == 1) { navigation.push('writelist') } }}>
                <Image style={{ width: 50, height: 50 }} source={nav.img}></Image>
                <Text>{nav.text}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <ScrollView style={{ width: 425 }}>
          {
            arr.map((nav, idx) => (
              <TouchableOpacity style={styles.text} key={idx}
                onPress={() => { let newarr = arr[idx]; navigation.push('writelist', { newarr }) }}
                onLongPress={() => {
                  Alert.alert("Hold on!","你确定要删除吗？",[
                      {
                        text:'取消',
                        onPress: ()=> null,
                        style: 'cancel'
                      },
                      { text: '确定',onPress: ()=>{arr.splice(idx, idx + 1); navigation.push('Home');}}
                    ]);
                }}
              >
                <Text style={styles.text1}>{nav.title}</Text>
                <Text style={styles.text2}>{nav.time}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View> :
        <View>
          <View style={styles.writetab}>
            <Icon size={20} name='search1' style={{ marginTop: 5 }}></Icon>
            <Text style={{ fontSize: 20, marginLeft: 15 }}>便签</Text>
            <Text style={{ fontSize: 20, marginLeft: 280, color: 'gray' }} onPress={() => navigation.push('notelist', { arr })}>{arr.length} {'>'}</Text>
          </View>
          <View style={styles.writetab}>
            <Icon size={20} name='search1' style={{ marginTop: 5 }}></Icon>
            <Text style={{ fontSize: 20, marginLeft: 15 }}>最近删除</Text>
            <Text style={{ fontSize: 20, marginLeft: 240, color: 'gray' }}>6 {'>'}</Text>
          </View>
        </View>}
    </ScrollView>
  )
}


const HomePage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => <Text style={{ paddingRight: 50 }}>编辑</Text>,
          headerLeft: () => <Text style={{ fontSize: 30, fontWeight: '500' }}>便签</Text>,
        }}
        name="Home"
        component={HomeScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  titlenav3: {
    marginLeft: 100,
    marginRight: 25,
    lineHeight: 60,
    color: 'gray',
    fontSize: 20
  },
  titlenav1: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFF5'
  },
  writetab: {
    height: 80,
    flexDirection: 'row',
    paddingLeft: 36,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFF5'
  },
  titlenav2: {
    marginLeft: 100,
    lineHeight: 60,
    marginRight: 25,
    fontSize: 20,
    color: 'orange',
    borderBottomColor: 'orange',
    borderBottomWidth: 3
  },
  text2: {
    paddingLeft: 5,
    paddingTop: 5
  },
  text1: {
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 20
  },
  text: {
    height: 80,
    marginLeft: 25,
    marginTop: 15,
    paddingLeft: 25,
    paddingTop: 10,
    backgroundColor: '#DCDCDC',
    borderRadius: 25
  },
  navsbox: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  nav: {
    width: '25%',
    alignItems: 'center',
    paddingTop: 20
  },
  top: {
    lineHeight: 50
  },
  searchbar: {
    alignItems: 'center',
    height: 50,
  },
  searchbox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 345,
    height: 40,
    paddingLeft: 11,
    paddingRight: 11,
    borderRadius: 16,
    backgroundColor: '#DCDCDC'
  },
})


export default HomePage