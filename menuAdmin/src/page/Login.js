import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {updateLoginStatus} from '../actions/manageFoodAction';
import {themColor} from '../utils/usual_constant';
import {connect} from 'react-redux';

const Login = ({navigation, loginAction}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.loginWrapper}>
        <View style={styles.bg}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View style={styles.bottomContent}>
          <View style={styles.inputWrapper}>
            <Text style={styles.title}>用户名:</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.title}>密码:</Text>
            <TextInput secureTextEntry={true} style={styles.input} />
          </View>
          <TouchableOpacity
            style={{width: '80%'}}
            onPress={loginAction}
            activeOpacity={0.6}>
            <Text style={styles.loginText}>登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
  },
  bg: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  bottomContent: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '80%',
    borderBottomColor: themColor,
    borderBottomWidth: 2,
    marginBottom: 35,
  },
  title: {
    fontSize: 16,
    color: themColor,
    lineHeight: 45,
  },
  input: {
    position: 'absolute',
    height: 45,
    width: '100%',
    paddingLeft: 70,
    paddingRight: 8,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  loginText: {
    width: '100%',
    backgroundColor: themColor,
    borderRadius: 25,
    height: 45,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 45,
  },
});

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => {
      dispatch(updateLoginStatus(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
