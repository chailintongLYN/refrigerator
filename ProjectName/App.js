// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// 引入页面
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import LogonPage from './pages/Logon/Logon';
import NewdataPage from './pages/Newdata/Newdata';
import Details from './pages/Details/Details';
import Mypage from './pages/Mypage/Mypage';
import Mypages from './pages/Mypage/Mypages'
import MycarePage from './pages/Mypage/Mycare';
import LikePage from './pages/Like/Like';
import HomeSearchPage from './pages/Home/Search/Search';
import CookPage from './pages/Cook/Cook';
import CookSearchPage from './pages/Cook/Search/Search';
import MenudetailsPage from './pages/Cook/Menudetails/Menudetails';
import MycareCon from './pages/Mypage/MycareCon'
import Mydetails from './pages/Mypage/Mydetails'
import Myfollows from './pages/Mypage/Myfollows'
import MysetPage from './pages/Mypage/set/Myset'
import Myadd from './pages/Mypage/Myadd'
import SetUserimgPage from './pages/Mypage/set/SetUserimg'
import SetPasswordPage from './pages/Mypage/set/SetPassword'
import AddPage from './pages/Add/Add';
import Otherdetails from './pages/Mypage/Otherdetails'
import Otherfollows from './pages/Mypage/Otherfollows'
import OthercarePage from './pages/Mypage/Otherscare'
// import Myset from './pages/Mypage/Myset'
// 引入图标
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Tab = createBottomTabNavigator();


const TabNav = ({ navigation }) => {
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
          title: '心得广场',
          tabBarIcon: ({ color }) => <Icon1 size={25} name="fire" color={color} />
        }}
        name='Cook'
        component={CookPage}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          title: '添加',
          tabBarButton: () =>
            <TouchableOpacity
              style={{
                // marginLeft:20
                marginRight: 25,
                marginLeft: 25,
                marginTop: -5,
              }}
              onPress={() => {
                // navigation.push('tabnav')
                navigation.navigate('Add')
              }}
            >
              <Icon2 size={36} name="add" color={'red'} ></Icon2>
              <Text
                style={{
                  color: 'red',
                  marginLeft: ptd(4),
                  marginTop: ptd(-2),
                }}
              >添加</Text>
            </TouchableOpacity>,
          tabBarIcon: ({ color }) => <Icon2 size={36} name="add" color={color} />
        }}
        name='Add'
        component={AddPage}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          title: '爱吃',
          tabBarIcon: ({ color }) => <Icon3 size={20} name="star" color={color} />
        }}
        name='Like'
        component={LikePage}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <Icon1 size={25} name="face" color={color} />
        }}
        name='My'
        component={Mypage}
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
            headerShown: false,
          }}
          name="Mypages" component={Mypages}
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
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name='CookSearch'
          component={CookSearchPage}
        />
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name='Menudetails'
          component={MenudetailsPage}
        />
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name='Mycare'
          component={MycarePage}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name='MycareCon'
          component={MycareCon}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name='Mydetails'
          component={Mydetails}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name='Myfollows'
          component={Myfollows}
        />
        <RootStack.Screen
          options={{
            headerShown:false
        }}
          name='Myset'
          component={MysetPage}
        />
        <RootStack.Screen
          options={{
            headerShown:false
        }}
          name='SetUserimg'
          component={SetUserimgPage}
        />
        <RootStack.Screen options={{headerShown:false}} name='SetPassword' component={SetPasswordPage}/> 
        <RootStack.Screen options={{headerShown:false}} name='Myadd' component={Myadd}/> 
        <RootStack.Screen options={{headerShown:false}} name='Otherdetails' component={Otherdetails}/> 
        <RootStack.Screen options={{headerShown:false}} name='Otherfollows' component={Otherfollows}/> 
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name='Othercare'
          component={OthercarePage}
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