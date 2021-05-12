import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import FoodItem from '../component/FoodItem';
import Banner from '../component/Banner';

const ManageFood = ({navigation, foodList}) => {
  const [showList, setShowList] = useState([]);

  const [keyWord, setkeyWord] = useState('');

  useEffect(() => {
    const preList = JSON.parse(JSON.stringify(foodList));
    const newArr = preList.filter(item => {
      return item.title.indexOf(keyWord) !== -1;
    });
    setShowList(newArr);
  }, [foodList, keyWord]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Banner />
      <View style={styles.headerWrapper}>
        <View style={styles.inputwrapper}>
          <View style={styles.inputContent}>
            <Icon
              name="search"
              style={styles.searchIcon}
              size={20}
              color="#999"
            />
            <TextInput
              style={styles.searchInput}
              value={keyWord}
              onChangeText={val => {
                setkeyWord(val);
              }}
              placeholder="搜索菜谱"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddFood');
          }}>
          <Image
            style={{height: 25, width: 25, marginLeft: 8}}
            source={require('../assets/add.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={{height: 15, width: '100%'}} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[styles.commonWrapper]}>
          <View style={styles.list}>
            {showList.map((item, index) => {
              return <FoodItem key={item.id} item={item} />;
            })}
          </View>
        </View>
        <View style={{height: 25, width: '100%'}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  singleTab: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 50,
  },
  selecTabStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#f2c34c',
    color: '#f2c34c',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  inputwrapper: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  commonWrapper: {paddingLeft: 16, paddingRight: 16},
  inputContent: {
    height: 38,
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#f5f8f5',
  },

  nowView: {
    width: 30,
    height: 30,
  },
  list: {},
  folderWrapper: {
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 35,
  },
  singleFodler: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
  },
  leftContent: {
    flexDirection: 'row',
  },
  rightContent: {
    flexDirection: 'row',
  },
  leftImg: {
    width: 20,
    height: 24,
    marginRight: 22,
  },
  rightArrow: {
    width: 12,
    height: 18,
  },
  leftText: {
    color: '#111',
    fontSize: 18,
  },
  rightText: {
    color: '#b3b3b3',
    fontSize: 12,
    marginRight: 12,
  },
  searchInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingLeft: 40,
    top: 0,
    left: 0,
  },
  searchIcon: {
    marginTop: 8,
    marginLeft: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageFood);
