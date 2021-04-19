// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/Home/Home';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/Login/Login';
import LogonPage from './pages/Logon/Logon';
import NewdataPage from './pages/Newdata/Newdata';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Details from './pages/Details/Details';
import HomeSearchPage from './pages/Home/Search/Search';


const Tab = createBottomTabNavigator();

const ShopPage = () => {
  return (
    <View>
      <Text>Shop</Text>
    </View>
  )
}
const VipPage = () => {
  return (
    <View>
      <Text>Vip</Text>
    </View>
  )
}
const ShopcarPage = () => {
  return (
    <View>
      <Text>Shopcar</Text>
    </View>
  )
}
const MyPage = () => {
  return (
    <View>
      <Text>My</Text>
    </View>
  )
}

const TabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: blue,
        labelStyle: {
          fontSize: 14
        }
      }}
    >
      <Tab.Screen
        options={{
          title: '主页',
          tabBarIcon: ({ color }) => <Icon1 size={25} name="home" color={color} />
        }}
        name='Home'
        component={HomePage}
      >
      </Tab.Screen>
      <Tab.Screen
        options={{
          title: '做饭',
          tabBarIcon: ({ color }) => <Icon1 size={25} name="fire" color={color} />
        }}
        name='Shop'
        component={ShopPage}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          title: '添加',
          tabBarIcon: ({ color }) => <Icon2 size={36} name="add" color={color} />
        }}
        name='Vip'
        component={VipPage}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          title: '爱吃',
          tabBarIcon: ({ color }) => <Icon3 size={20} name="star" color={color} />
        }}
        name='Shopcar'
        component={ShopcarPage}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <Icon1 size={25} name="face" color={color} />
        }}
        name='My'
        component={MyPage}
      ></Tab.Screen>

    </Tab.Navigator>
  )
}

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login" component={LoginPage}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="Logon" component={LogonPage}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="Newdata" component={NewdataPage}
        />
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name='tabnav'
          component={TabNav}
        />
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name='Details'
          component={Details}
        />
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name='HomeSearch'
          component={HomeSearchPage}
        />
      </RootStack.Navigator>
    </NavigationContainer>
    // <Tab.Navigator
    //   tabBarOptions={{
    //     activeTintColor:'#fb7737',
    //     labelStyle:{
    //       fontSize:16
    //     }
    //   }}
    // >
    //   <Tab.Screen 
    //     options ={{
    //       tabBarIcon:({color})=><Text style={{color}}></Text>
    //     }}
    //     name="Home" component={HomePage} />
    // </Tab.Navigator>
  );
}

export default App;