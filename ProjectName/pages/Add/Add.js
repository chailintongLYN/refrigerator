import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';

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
    const _retrieveData = async () => {
        try {
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();

    const [img, setImg] = useState('../images/apple.jpg')
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
                const source = { uri: response.uri };
                setImg(source.uri)
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
                        source={require('../images/logo.jpg')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bodybox}>
                <View style={styles.items}>
                    <Text style={styles.itemsname}>物品名称：</Text>
                    <TextInput style={styles.nameinput} />
                </View>
                <View style={styles.items}>
                    <Text style={styles.itemsname}>类别：</Text>
                    <ModalDropdown
                        defaultValue={'水果蔬菜'}
                        style={styles.modalbutton}
                        textStyle={{ fontSize: ptd(18) }}
                        dropdownStyle={styles.dropdown}
                        dropdownTextHighlightStyle={{ color: white }}
                        dropdownTextStyle={
                            {
                                position: 'relative',
                                borderRadius: 50,
                                fontSize: ptd(18),
                                color: 'black',
                                backgroundColor: blue,
                            }
                        }
                        options={['水果蔬菜', '肉蛋食品', '海鲜水产', '速食冷冻', '零食饮品']}
                    />
                </View>
                <View style={styles.items}>
                    <Text style={styles.itemsname}>保质期：</Text>
                    <TextInput style={[styles.nameinput, { width: 60, position: 'relative', left: ptd(68) }]} placeholder='' />
                    <Text style={[styles.itemsname, { position: 'relative', left: ptd(75) }]}>天</Text>
                </View>
                <View style={styles.items}>
                    <Text style={styles.itemsname}>拍照：</Text>
                    <TouchableOpacity style={styles.tackphotos}>
                        <Text
                            style={{ fontSize: ptd(20) }}
                            onPress={take}
                        >
                            点击拍照
                            </Text>
                    </TouchableOpacity>
                </View>
                <Image
                    style={{ width: ptd(225), height: ptd(225), marginTop: ptd(10) }}
                    source={{ uri: img }}
                />
                <View style={styles.items}>
                    <TouchableOpacity style={styles.confirm}>
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
        marginLeft: ptd(50),
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
        // backgroundColor: '#BFC',
        alignItems: 'center',
        width: w - 100,
        marginTop: 25,
        flexDirection: 'row',
    },
    bodybox: {
        alignItems: 'center',
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
