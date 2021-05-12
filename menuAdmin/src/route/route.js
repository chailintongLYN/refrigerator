import {NavigationContainer} from '@react-navigation/native';
import Home from '../page/Home';
import UserDetail from '../page/UserDetail';
import AddFood from '../page/AddFood';
import ManageFood from '../page/ManageFood';
import ManageUser from '../page/ManageUser';
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AuthContainer} from './login_routes';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

const AppRouter = ({whetherLogin}) => {
  return (
    <NavigationContainer style={{flex: 1}}>
      {whetherLogin ? MyTabs() : AuthContainer()}
    </NavigationContainer>
  );
};

function MyTabs() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => {
          return {
            ...TransitionPresets.SlideFromRightIOS, //跳转动画   遵循ios标准
          };
        }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={() => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
          };
        }}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFood}
        options={() => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
          };
        }}
      />
      <Stack.Screen
        name="ManageFood"
        component={ManageFood}
        options={() => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
          };
        }}
      />
      <Stack.Screen
        name="ManageUser"
        component={ManageUser}
        options={() => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
          };
        }}
      />
    </Stack.Navigator>
  );
}
const mapStateToProps = state => {
  return {
    whetherLogin: state.manageFoodReducer.whetherLogin,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
