// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages0/Home';
import { createStackNavigator } from '@react-navigation/stack';
import WriteList from './pages0/WriteList'
import NoteList from './pages0/NoteList';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home" component={HomePage}
        />

        <RootStack.Screen
          options={{
            title: '',
            headerShown: false,
          }}
          name='writelist' component={WriteList} />

        <RootStack.Screen
          options={{
            title: '',
            headerShown: false,
          }}
          name='notelist' component={NoteList} />
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