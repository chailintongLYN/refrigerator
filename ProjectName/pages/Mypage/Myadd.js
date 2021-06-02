import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';



const Myadd = ({ navigation }) => {

    const [username, setUserName] = useState('')
    const [userimg, setUserImage] = useState('')
    const [imgpath, setImagePath] = useState('http://154.8.164.57:1127/static/upimg/logo.jpg')
    const [imgname, setImageName] = useState('')
    const _retrieveData = async () => {
        try {
            setUserImage(await AsyncStorage.getItem('userimg'));
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    _retrieveData();
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
                setImageName(response.fileName)
                setImagePath(source.uri)
            }
        });
    }

    let datainfo = {
        username: username,
        content: '',
        img: '',
    }
    return (
        <ScrollView style={{ backgroundColor: white }}>
            <View style={styles.head}>
                <Icon name='closecircleo' size={40} style={styles.close} onPress={() => navigation.goBack()} />
                <Text style={{ fontSize: 25, marginLeft: w - 340 }}>新心得</Text>
                <TouchableOpacity style={styles.submit}
                    onPress={async () => {
                        if (datainfo.content != '') {
                            var formData = new FormData();
                            let file = {
                                uri: imgpath,
                                type: 'application/octet-stream',
                                name: imgname,
                            };
                            let uimg = {
                                uri: userimg,
                                type: 'application/octet-stream',
                                name: 'uimg.png',
                            };
                            formData.append('image', file);
                            formData.append('uimg', uimg);
                            formData.append('username', datainfo.username)
                            formData.append('content', datainfo.content)

                            fetch('http://154.8.164.57:1127/uptext', {
                                method: 'POST',
                                // headers: {
                                //     'Content-Type': 'multipart/form-data',
                                // },
                                body: formData,
                            }).then((res) => res.json())
                                .then((res) => {
                                    console.log(res);
                                    if (res.status == 'success') {
                                        navigation.goBack()
                                    }
                                    else {
                                        alert('发表失败')
                                    }
                                })
                        }
                        else {
                            alert('发表内容不能为空')
                        }
                    }}
                >
                    <Text style={{ fontSize: 17, color: 'white' }}>发布</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.user}>
                <Image source={{ uri: userimg }} style={styles.userimg} />
                <Text style={styles.username}>{username}</Text>
            </View>
            <ScrollView style={styles.jilu}>
                <TextInput
                    placeholder='记录你的下厨心得'
                    autoFocus={true}
                    style={styles.inp}
                    multiline={true}
                    onChangeText={(value) => {
                        datainfo.content = value
                    }}
                />
            </ScrollView>

            {/* 放置图片 */}
            <View>
                <Image
                    style={{ width: ptd(200), height: ptd(200), marginTop: ptd(10), marginLeft: (w - ptd(200)) / 2 }}
                    source={{ uri: imgpath }}
                />
            </View>
            <TouchableOpacity style={styles.addimg} onPress={() => take()}>
                <Icon name='picture' size={45} style={{ color: 'white' }} />
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 22 }}>添加图片</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default Myadd
const styles = StyleSheet.create({
    addimg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: w - 50,
        height: 60,
        marginLeft: (w - (w - 50)) / 2,
        backgroundColor: blue,
    },
    jilu: {
        width: w - 50,
        marginLeft: 25,
        marginTop: 10,
        height: 300,
        backgroundColor: 'white'
    },
    inp: {
        fontSize: 20,
        width: w - 50,
    },
    username: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        color: 'black',
    },
    userimg: {
        width: 60,
        height: 60,
        borderRadius: 33,
        marginLeft: w - 425
    },
    user: {
        width: w,
        height: 60,
        flexDirection: 'row',
    },
    submit: {
        width: 80,
        height: 35,
        backgroundColor: blue,
        marginLeft: w - 360,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20

    },
    close: {
        color: 'black',
        marginLeft: w - 425
    },
    head: {
        width: w,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center'
    }
})