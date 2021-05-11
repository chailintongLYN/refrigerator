import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {blueColor} from '../utils/usual_constant';

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>冰箱新食客</Text>
      <Text style={styles.bannerText}>后台管理系统</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: blueColor,
    width: '100%',
    padding: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
  },
});

export default Banner;
