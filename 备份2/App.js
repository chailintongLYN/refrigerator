/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import AppRouter from './src/route/route';

import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './src/store';
import {Provider as AntdProvider} from '@ant-design/react-native';

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AntdProvider>
          <AppRouter />
        </AntdProvider>
      </PersistGate>
    </Provider>
  );
};
