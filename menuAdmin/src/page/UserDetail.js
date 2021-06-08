import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import EssayItem from '../component/EssayItem';
import Header from '../component/Header';

const UserDetail = ({ navigation, userList, route }) => {
  const idRef = useRef('');
  const [showList, setShowList] = useState({});
  useEffect(() => {
    const params = route.params;
    idRef.current = params.id;
    _init(params.username);
  }, []);

  const _init = (username) => {
    fetch('http://154.8.164.57:1127/getmydata', {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      headers: new Headers({
        'Content-Type': 'applocation/json'
      })
    }).then(res => res.json())
      .then((res) => {
        console.log('text', res.text);
        console.log('res', res);
        userList = res
        const slectList = userList.find(item => {
          if (item.textid === idRef.current) {
            return true;
          }
        });
        setShowList(slectList);
        console.log(showList);
      })
  };

  useEffect(() => {
    _init(route.params.username);
  }, [userList]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
       <Header title={showList.username} />
       <View style={styles.detailWrapper}>
         {showList.text &&
          (showList.text.length === 0 ? (
            <Text style={styles.tip}>该用户还没有发表任何心得</Text>
          ) : (
            showList.text.map(item => {
              return (
                <EssayItem
                  key={item.id}
                  selectId={idRef.current}
                  selectEssay={item}
                />
              );
            })
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  inputwrapper: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputContent: {
    height: 38,
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#f5f8f5',
  },
  commonWrapper: { paddingLeft: 16, paddingRight: 16 },
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
  detailWrapper: {
    padding: 20,
  },
  tip: {
    color: '#99CCCC',
    fontSize: 16,
  },
});

const mapStateToProps = state => {
  return { userList: state.manageUserReducer.userList };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
