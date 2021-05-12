import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import {Modal} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {updateListAction} from '../actions/manageFoodAction';

const FoodItem = ({item, foodList, updateList}) => {
  const confirmDel = () => {
    const index = foodList.findIndex(subItem => {
      if (subItem.id === item.id) return true;
    });
    const preArr = JSON.parse(JSON.stringify(foodList));
    preArr.splice(index, 1);
    updateList(preArr);
  };
  return (
    <TouchableOpacity style={styles.singleItem} activeOpacity={1}>
      <View style={styles.rightWrapper}>
        <Image
          source={{
            uri: item.img,
          }}
          style={styles.foodImg}
        />
        <Text style={styles.todoTitle}>{item.title}</Text>
      </View>

      <TouchableOpacity
        style={styles.timeWrapper}
        onPress={() => {
          Modal.alert('', '确认删除吗', [
            {
              text: '取消',
              onPress: () => console.log('cancel'),
              style: 'cancel',
            },
            {text: '删除', onPress: () => confirmDel()},
          ]);
        }}>
        <Image
          style={{height: 25, width: 25}}
          source={require('../assets/del.png')}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  singleItem: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 12,
    padding: 16,
    justifyContent: 'space-between',
    borderColor: '#999',
    borderWidth: 1,
    flexDirection: 'row',
  },
  rightWrapper: {
    flexDirection: 'row',
  },
  foodImg: {
    height: 45,
    width: 45,
    marginRight: 30,
  },
  todoTitle: {
    color: '#111',
    fontSize: 16,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#888888',
    marginRight: 25,
  },
});

const mapStateToProps = state => {
  return {
    foodList: state.manageFoodReducer.foodList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateList: res => {
      dispatch(updateListAction(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);
