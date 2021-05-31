import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity, ScrollViewBase, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../../common/global'
import ImagePicker from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';


const SetUserimg = ({ navigation }) => {
    const [username, setUserName] = useState('')
    const [imgname, setImageName] = useState('')
    const [imgpath, setImagePath] = useState('')
    const _retrieveData = async () => {
        try {
            setUserName(await AsyncStorage.getItem('username'));
            setImagePath(await AsyncStorage.getItem('userimg'));
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

    const options = {
        title: '请选择',
        cancelButtonTitle: '返回',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '从图库中选择',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    }
    const take = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                setImageName(response.fileName)
                const source = { uri: response.uri };
                setImagePath(source.uri)

            }
        })
    }
    return (
        <ScrollView>
            <View style={styles.header}>
                <Icon name='left' size={35} style={{ marginLeft: ptd(20) }} onPress={() => { navigation.goBack() }} />
                <Text style={{ fontSize: 25, marginLeft: ptd(105) }}>修改头像</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image source={{ uri: imgpath }} style={styles.userimg} />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => take()}>
                    <Text style={{ fontSize: 30, color: 'white' }}>修改头像</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        var formData = new FormData();
                        let file = {
                            uri: imgpath,
                            type: 'application/octet-stream',
                            name: imgname,
                        };
                        formData.append('image', file);
                        formData.append('username', username);
                        fetch('http://154.8.164.57:1127/upuserimg', {
                            method: 'POST',
                            body: formData,
                        }).then((res) => res.json())
                            .then((res) => {
                                console.log(res);
                                if (res.status == 'success') {
                                    alert('修改成功')
                                    AsyncStorage.setItem('userimg', res.results)
                                }
                                else {
                                    alert('修改失败')
                                }
                            })
                    }}
                >
                    <Text style={{ fontSize: 30, color: 'white' }}

                    >保存</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default SetUserimg;
const styles = StyleSheet.create({
    btn: {
        width: ptd(200),
        height: 100,
        marginTop: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue
    },
    userimg: {
        width: ptd(270),
        height: 300,
    },
    img: {
        width: ptd(270),
        height: 300,
        backgroundColor: blue
    },
    container: {
        width: ptd(375),
        marginTop: 30,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        width: ptd(375),
        height: 60,
        alignItems: 'center',
    }
})