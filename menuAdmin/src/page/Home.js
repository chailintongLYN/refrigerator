import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import Banner from '../component/Banner';
import {SvgXml} from 'react-native-svg';
import {manageUserSvg, menuSvg} from '../utils/usual_constant';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flex: 1}}>
        <Banner />
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={[styles.singleItem, {marginBottom: 60}]}>
            {/* <Image style={styles.img} source={require('../assets/menu.png')} /> */}
            <SvgXml style={styles.img} xml={menuSvg} />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('ManageFood');
              }}>
              <Text style={styles.text}>管理菜谱</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.singleItem}>
            {/* <Image
              style={styles.img}
              source={require('../assets/manage_user.png')}
            /> */}
            <SvgXml style={styles.img} xml={manageUserSvg} />

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('ManageUser');
              }}>
              <Text style={styles.text}>管理用户</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  singleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 64,
    height: 64,
    marginRight: 25,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#1296db',
    width: 120,
    height: 45,
    lineHeight: 45,
    textAlign: 'center',
    borderRadius: 25,
  },
});

const mapStateToProps = state => {
  return {
    foodList: state.manageFoodReducer.foodList,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
