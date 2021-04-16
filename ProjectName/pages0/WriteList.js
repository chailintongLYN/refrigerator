import React from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import AsyncStorage from '@react-native-community/async-storage';

const WriteList = ({ navigation, route }) => {
    let arr = '';
    if (route.params != undefined) {
        arr = route.params.newarr;
    }
    let title, text;
    return (
        <View>
            <View style={styles.titlebox}>
                <TouchableOpacity
                    onPress={() => { navigation.push('Home') }}
                >
                    <Text style={{ fontSize: 30 }} >←</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={
                        () => {
                            navigation.push('Home');
                            AsyncStorage.setItem(
                                'title',
                                title
                            );
                            AsyncStorage.setItem(
                                'text',
                                text
                            );
                        }
                    }

                >
                    <Text style={{ fontSize: 30, marginLeft: 325 }}>√</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 20 }}>
                <TextInput placeholder='输入标题' autoFocus style={{ fontSize: 30 }}
                    value={arr.title}
                    onChangeText={(value) => {
                        title = value
                    }}
                />
                <TextInput placeholder='文本内容' style={{ fontSize: 18 }}
                    value={arr.text}
                    onChangeText={(value) => {
                        text = value
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titlebox: {
        height: 50,
        paddingLeft: 20,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
})

export default WriteList
