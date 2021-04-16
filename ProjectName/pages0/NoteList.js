import React from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';


const NoteList = ({ navigation, route }) => {
    let arr = route.params.arr
    return (
        <View>
            <View style={styles.titlebox}>
                <TouchableOpacity
                    onPress={() => { navigation.push('Home') }}
                >
                    <Text style={{ fontSize: 30, marginTop: 3 }} >←</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 25, marginTop: 6, marginLeft: 130 }}>
                    便签
                </Text>
                <TouchableOpacity onPress={() => { navigation.push('Home') }}>
                    <Text style={{ fontSize: 20, marginLeft: 130, marginTop: 10 }}>编辑</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchbar}>
                <View style={styles.searchbox}>
                    <Icon size={15} name="search1" />
                    <TextInput placeholder='搜索便签'></TextInput>
                </View>
            </View>
            <ScrollView style={{ width: 425 }}>
                {
                    arr.map((nav, idx) => (
                        <TouchableOpacity style={styles.text} key={idx} onPress={() => { let newarr = arr[idx]; navigation.push('writelist', { newarr } )}}>
                            <Text style={styles.text1}>{nav.title}</Text>
                            <Text style={styles.text2}>{nav.time}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    text2: {
        paddingLeft: 5,
        paddingTop: 5
    },
    text1: {
        paddingLeft: 5,
        paddingTop: 5,
        fontSize: 20
    },
    text: {
        height: 80,
        marginLeft: 25,
        marginTop: 15,
        paddingLeft: 25,
        paddingTop: 10,
        backgroundColor: '#DCDCDC',
        borderRadius: 25
    },
    searchbar: {
        alignItems: 'center',
        height: 50,
    },
    searchbox: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 345,
        height: 40,
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 16,
        backgroundColor: '#DCDCDC'
    },
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

export default NoteList
