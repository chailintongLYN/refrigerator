import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          console.log(100);
          navigation.goBack();
        }}
        style={styles.back}>
        <Image
          style={styles.backImg}
          source={require('../assets/left_arrow.png')}
        />
      </TouchableOpacity>
      <Text style={styles.text} numberOfLines={1}>
        {title}的心得
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  backImg: {height: 22, width: 22},
  back: {
    height: '100%',
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  text: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    color: '#111',
    fontSize: 16,
    lineHeight: 45,
    paddingLeft: 45,
    paddingRight: 45,
  },
});

export default Header;
