import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '../page/Login';

const Stack = createStackNavigator();

export const AuthContainer = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={() => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
          };
        }}
      />
    </Stack.Navigator>
  );
};
