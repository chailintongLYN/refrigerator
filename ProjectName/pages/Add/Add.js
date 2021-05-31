import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import { useFocusEffect } from '@react-navigation/native';

const myDate = new Date();
const year = myDate.getFullYear();
let month = (myDate.getMonth() + 1).toString();
if (month.length == 1) {
    month = '0' + month;
}
let day = myDate.getDate();
if (day.length == 1) {
    day = '0' + day;
}

const AddPage = ({ navigation }) => {

    const [username, setUserName] = useState('')
    const [userimg, setUserImage] = useState('')
    const [imgpath, setImagePath] = useState('http://154.8.164.57:1127/static/upimg/logo.jpg')
    const [imgname, setImageName] = useState('')
    const _retrieveData = async () => {
        try {
            setUserName(await AsyncStorage.getItem('username'));
            setUserImage(await AsyncStorage.getItem('userimg'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            _retrieveData();
        }, [])
    )
    let datainfo = {
        username: username,
        text: '',
        type: '',
        remainingday: '',
        img: '',
    }
    const options = {
        title: '请选择',
        cancelButtonTitle: '返回',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '从图库中选择',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const take = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                console.log(response.path);
                setImageName(response.fileName)
                const source = { uri: response.uri };
                setImagePath(source.uri)
            }
        });
    }

    return (
        <ScrollView>
            <View style={styles.titlebar}>
                <Text style={styles.hello}>
                    {username}主人，欢迎来到你的冰箱!
                </Text>
                <Text style={styles.time}>{year}年{month}月{day}日</Text>
            </View>

            <View style={styles.searchbar}>
                <View style={styles.searchbox}>
                    <Icon name='search1' size={18} style={styles.icon}></Icon>
                    <TextInput
                        keyboardType={'default'}
                        onEndEditing={() => navigation.push('CookSearch')}
                        style={styles.input}
                        placeholder='芒果'
                    />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('My') }}>
                    <Image
                        style={styles.headportrait}
                        source={{ uri: userimg }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bodybox}>
                <View style={styles.items}>
                    <Text style={styles.itemsname}>物品名称：</Text>
                    <TextInput
                        style={styles.nameinput}
                        onChangeText={(value) => {
                            datainfo.text = value
                        }}
                    />
                </View>
                <View style={styles.items}>
                    <Text style={styles.itemsname}>类别：</Text>
                    <ModalDropdown
                        defaultValue={'请选择'}
                        style={styles.modalbutton}
                        textStyle={{ fontSize: ptd(18) }}
                        dropdownStyle={styles.dropdown}
                        dropdownTextHighlightStyle={{ color: white }}
                        dropdownTextStyle={
                            {
                                position: 'relative',
                                borderRadius: 50,
                                fontSize: ptd(18),
                                color: '#FFFFFF',
                                backgroundColor: blue,
                            }
                        }
                        options={['水果蔬菜', '肉蛋食品', '海鲜水产', '速食冷冻', '零食饮品']}
                        onSelect={(value) => {
                            switch (value) {
                                case 0:
                                    datainfo.type = '水果蔬菜';
                                    break;
                                case 1:
                                    datainfo.type = '肉蛋食品';
                                    break;
                                case 2:
                                    datainfo.type = '海鲜水产';
                                    break;
                                case 3:
                                    datainfo.type = '速食冷冻';
                                    break;
                                case 4:
                                    datainfo.text = '零食饮品';
                                    break;
                                default:
                                    break;
                            }
                        }}
                    />
                </View>
                <View style={styles.items}>
                    <Text style={styles.itemsname}>保质期：</Text>
                    <TextInput
                        style={[styles.nameinput, { width: 60, position: 'relative', left: ptd(68) }]}
                        onChangeText={(value) => {
                            datainfo.remainingday = value
                        }}
                    />
                    <Text style={[styles.itemsname, { position: 'relative', left: ptd(75) }]}>天</Text>
                </View>
                <View style={[styles.items, { borderBottomColor: white }]}>
                    <Text style={styles.itemsname}>拍照（可选）：</Text>
                    <TouchableOpacity style={styles.tackphotos}>
                        <Text
                            style={{ fontSize: ptd(20), color: '#FFFFFF' }}
                            onPress={take}
                        >
                            点击拍照
                            </Text>
                    </TouchableOpacity>
                </View>
                <Image
                    style={{ width: ptd(225), height: ptd(225), marginTop: ptd(10) }}
                    source={{ uri: imgpath }}
                // onLoad={() => {
                //     datainfo.img = img;
                // }}
                />
                <View style={[styles.items, { borderBottomColor: white2 }]}>
                    <TouchableOpacity
                        style={styles.confirm}
                        onPress={async () => {
                            if (datainfo.text != '' && datainfo.type != '' && datainfo.remainingday != '') {
                                var formData = new FormData();
                                let file = {
                                    uri: imgpath,
                                    type: 'application/octet-stream',
                                    name: imgname,
                                };
                                formData.append('image', file);
                                formData.append('username', datainfo.username)
                                formData.append('text', datainfo.text)
                                formData.append('type', datainfo.type)
                                formData.append('remainingday', datainfo.remainingday)

                                fetch('http://154.8.164.57:1127/updata', {
                                    method: 'POST',
                                    // headers: {
                                    //     'Content-Type': 'multipart/form-data',
                                    // },
                                    body: formData,
                                }).then((res) => res.json())
                                    .then((res) => {
                                        console.log(res);
                                        if (res.status == 'success') {
                                            alert('添加成功')
                                        }
                                        else {
                                            alert('添加失败')
                                        }
                                    })
                            }
                            else {
                                alert('物品名称或类别或保质期不能为空')
                            }
                        }}
                    >
                        <Text style={{ fontSize: ptd(20), color: '#FFFFFF' }}>确认添加</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        width: w - 285,
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    modalbutton: {
        color: '#FFFFFF',
        position: 'relative',
        left: ptd(45),
        width: w - 285,
        height: ptd(36),
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        fontSize: ptd(18),
    },
    confirm: {
        position: 'relative',
        left: ptd(145),
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: ptd(155),
        height: ptd(66),
    },
    tackphotos: {
        marginLeft: ptd(20),
        borderRadius: ptd(50),
        alignItems: 'center',
        backgroundColor: blue,
        width: ptd(125),
        height: ptd(50),
        justifyContent: 'center',
    },
    shelflife: {
        flexDirection: 'row',
    },
    nameinput: {
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 25,
        width: w - 205,
        borderWidth: 1,
        borderColor: '#BBBBBB',
    },
    itemsname: {
        fontSize: 20,
    },
    items: {
        borderBottomWidth: ptd(2),
        borderBottomColor: blue,
        alignItems: 'center',
        width: w - 100,
        marginTop: 25,
        flexDirection: 'row',
        paddingBottom: ptd(10),
    },
    bodybox: {
        alignItems: 'center',
        backgroundColor: white,
    },
    headportrait: {
        width: 48,
        height: 48,
        borderRadius: 100,
        marginLeft: 25,
        marginTop: -5
    },
    searchbox: {
        backgroundColor: '#FFF',
        marginLeft: 43,
        flexDirection: 'row',
        width: w - 138,
        borderRadius: 50,
        height: 38,
        alignItems: 'center',
        paddingLeft: 15
    },
    input: {
        fontSize: 18,
        padding: 0
    },
    searchbar: {
        backgroundColor: blue,
        flexDirection: 'row',
        height: 50
    },
    icon: {
        color: '#9D9E9D',
        paddingRight: 10
    },
    time: {
        color: white,
        position: 'absolute',
        right: 25,
        fontSize: 16,
    },
    hello: {
        marginLeft: 20,
        color: white,
        fontSize: 16
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }

})

export default AddPage
