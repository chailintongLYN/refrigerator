import React, {useRef, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import Banner from '../component/Banner';
import {updateListAction} from '../actions/manageFoodAction';
import {connect} from 'react-redux';

const AddFood = ({navigation, foodList, updateList}) => {
  const [foodDetail, setFoodDetail] = useState({
    des: '',
    title: '',
  });
  const clickRef = useRef(false);

  //确认添加
  const confirmAdd = () => {
    if (clickRef.current) {
      return;
    }
    const preArr = JSON.parse(JSON.stringify(foodList));

    clickRef.current = true;

    const addItem = {
      id: new Date().getTime(),
      img: 'https://bkimg.cdn.bcebos.com/pic/9a504fc2d5628535be38f9fb9eef76c6a6ef630b?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
      ...foodDetail,
    };

    //添加
    preArr.unshift(addItem);
    updateList(preArr);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <Banner />
        <View style={styles.addContent}>
          <View
            style={[
              styles.singleWrapper,
              {
                paddingRight: 30,
              },
            ]}>
            <Text style={styles.titleItem}>菜名:</Text>
            <TextInput
              placeholder="请输入菜名"
              style={styles.foodName}
              onChangeText={e => {
                setFoodDetail({
                  ...foodDetail,
                  title: e,
                });
              }}
            />
          </View>
          <View style={[styles.singleWrapper]}>
            <Text style={styles.titleItem}>用料:</Text>
            <TouchableOpacity>
              <Text style={styles.addMaterial}>添加用料</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.singleWrapper, {alignItems: 'flex-start'}]}>
            <Text style={styles.titleItem}>步骤:</Text>
            <TextInput
              multiline={true}
              textAlignVertical="top"
              style={styles.step}
              placeholder="请填写步骤"
              numberOfLines={8}
              onChangeText={e => {
                setFoodDetail({
                  ...foodDetail,
                  des: e,
                });
              }}
            />
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={confirmAdd}>
            <Text style={styles.confirmAdd}>确认添加</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  singleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  step: {
    borderColor: '#EEE',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flex: 1,
    borderRadius: 8,
  },
  addContent: {
    padding: 20,
  },
  titleItem: {
    marginRight: 10,
  },
  foodName: {
    borderColor: '#eee',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 16,
    flex: 1,
    borderRadius: 25,
  },
  addMaterial: {
    width: 100,
    height: 30,
    fontSize: 14,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 25,
    lineHeight: 30,
    color: '#333',
  },
  confirmAdd: {
    backgroundColor: '#CC0033',
    width: 100,
    textAlign: 'center',
    lineHeight: 35,
    fontSize: 14,
    color: '#fff',
    borderRadius: 25,
  },
});

const mapStateToProps = state => {
  return {foodList: state.manageFoodReducer.foodList};
};
const mapDispatchToProps = dispatch => {
  return {
    updateList: res => {
      dispatch(updateListAction(res));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFood);
