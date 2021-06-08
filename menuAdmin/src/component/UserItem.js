import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { Modal } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { updateUserListAction } from '../actions/manageUserAction';

const UserItem = ({ selectUser, userList, updateList }) => {
  const navigation = useNavigation();

  //去详情
  const toDetail = () => {
    navigation.navigate('UserDetail', {
      id: selectUser.id,
      username: selectUser.username,
    });
  };

  //删除用户
  const confirmDel = (username) => {
    console.log(username);
    fetch('http://154.8.164.57:1127/deleteuser', {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      headers: new Headers({
        'Content-Type': 'applocation/json'
      })
    }).then(res => res.json())
      .then((res) => {
        console.log('res', res);
        const index = userList.findIndex(subItem => {
          if (subItem.id === selectUser.id) return true;
        });
        const preArr = JSON.parse(JSON.stringify(userList));
        preArr.splice(index, 1);
        updateList(preArr);
      })
  };

  return (
    <TouchableOpacity
      style={styles.singleItem}
      activeOpacity={0.6}
      onPress={toDetail}>
      <View style={styles.rightWrapper}>
        <Image
          source={{
            uri: selectUser.img,
          }}
          style={styles.foodImg}
        />
        <Text style={styles.todoTitle}>{selectUser.username}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          Modal.alert('', '确认删除吗', [
            {
              text: '取消',
              onPress: () => console.log('cancel'),
              style: 'cancel',
            },
            { text: '删除', onPress: () => confirmDel(selectUser.username) },
          ]);
        }}>
        <Text style={styles.delWrapper}>删除</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  singleItem: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 35,
    marginBottom: 12,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightWrapper: {
    flexDirection: 'row',
  },
  foodImg: {
    height: 44,
    width: 44,
    marginRight: 30,
    borderRadius: 22,
  },
  todoTitle: {
    color: '#111',
    fontSize: 16,
  },
  delWrapper: {
    backgroundColor: '#999',
    fontSize: 14,
    color: '#fff',
    width: 70,
    height: 28,
    textAlign: 'center',
    borderRadius: 15,
    lineHeight: 28,
  },
  timeText: {
    fontSize: 14,
    color: '#888888',
    marginRight: 25,
  },
});

const mapStateToProps = state => {
  return {
    userList: state.manageUserReducer.userList,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateList: res => {
      dispatch(updateUserListAction(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
