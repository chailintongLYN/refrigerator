import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import {Modal} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {updateUserListAction} from '../actions/manageUserAction';
import time_stamp from '../utils/time';
import FitImage from 'react-native-fit-image';

const EssayItem = ({selectEssay, selectId, userList, updateList}) => {
  const [slectIndex, setSelectIndex] = useState('');
  const [userDetail, setUserDetail] = useState({});
  useEffect(() => {
    const index = userList.findIndex(item => {
      if (item.id === selectId) {
        setUserDetail({
          username: item.username,
          img: item.img,
        });
        return true;
      }
    });

    setSelectIndex(index);

    Image.getSize(selectEssay.img, function (w, h) {
      console.log(w, h);
    });
  }, []);
  //删除该文章
  const confirmDel = () => {
    const subIndex = userList[slectIndex].detail.findIndex(subItem => {
      if (subItem.id === selectEssay.id) return true;
    });

    const preArr = JSON.parse(JSON.stringify(userList));
    preArr[slectIndex].detail.splice(subIndex, 1);
    updateList(preArr);
  };
  return (
    <View style={styles.singleItem}>
      <View style={styles.leftWrapper}>
        <Image
          source={{
            uri: userDetail.img,
          }}
          style={styles.foodImg}
        />
      </View>
      <View style={styles.rightWrapper}>
        <View style={styles.top_wrapper}>
          <Text style={styles.todoTitle}>{userDetail.username}</Text>
          <View style={styles.timeWrapper}>
            <Text style={styles.timeText}>
              {time_stamp(selectEssay.create_time, true)}
            </Text>
            <TouchableOpacity
              style={styles.delText}
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
              <Text>删除</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.text}>{selectEssay.text}</Text>
          <FitImage
            source={{
              uri: selectEssay.img,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  singleItem: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    borderColor: '#999',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftWrapper: {},
  rightWrapper: {
    flex: 1,
  },
  top_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  todoTitle: {
    color: '#111',
    fontSize: 16,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delText: {
    fontSize: 16,
    color: '#111',
  },
  timeText: {
    fontSize: 14,
    color: '#888888',
    marginRight: 25,
  },
  text: {
    fontSize: 14,
    color: '#111',
    lineHeight: 22,
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

export default connect(mapStateToProps, mapDispatchToProps)(EssayItem);
