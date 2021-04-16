/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState ,useEffect} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import{
  View,
  Text,
} from 'react-native';
import Home from './pages/Home'
import Shop from './pages/Shop'
 
const App = () => {
  return (
    <Router>  
      <Scene key='root'>
        <Scene
          key='home'
          component = { Home }
          title = '首页'
        ></Scene>
        <Scene
          key='shop'
          component = { Shop }
          title = '商城'
        ></Scene>
      </Scene>
    </Router>
  );
};


export default App;