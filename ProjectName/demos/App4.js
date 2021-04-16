// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react/cjs/react.development';
import HomePage from './pages0/Home';
import ShopPage from './pages0/Shop';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor:'#fb7737',
          labelStyle:{
            fontSize:16
          }
        }}
      >
        <Tab.Screen 
          options ={{
            tabBarIcon:({color})=><Text style={{color}}>首页</Text>
          }}
          name="Home" component={HomePage} />
        <Tab.Screen 
          options ={{
            tabBarIcon:({color})=><Text style={{color}}>商城</Text>
          }}
          name="Shop" component={ShopPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;