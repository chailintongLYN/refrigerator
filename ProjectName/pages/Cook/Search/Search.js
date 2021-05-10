import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

// const menu = [
//     { text: '苹果', img: require('../../images/apple.jpg') },
//     { text: '苹果', img: require('../../images/apple.jpg') },
//     { text: '鸡蛋', img: require('../../images/apple.jpg') },
//     { text: '鸡蛋', img: require('../../images/apple.jpg') },
//     { text: '海鲜', img: require('../../images/apple.jpg') },
//     { text: '海鲜', img: require('../../images/apple.jpg') },
//     { text: '速食', img: require('../../images/apple.jpg') },
//     { text: '速食', img: require('../../images/apple.jpg') },
//     { text: '零食', img: require('../../images/apple.jpg') },
//     { text: '零食', img: require('../../images/apple.jpg') },
// ]

// const menu = [];

const CookSearchPage = ({ navigation, route }) => {

    const [data, setData] = useState([]);
    const [mealn, setMealN] = useState('');

    let mealname = route.params.text;
    let from = route.params.from
    console.log(from);

    useEffect(() => {
        console.log('effect');

        if (from == 'Home') {
            console.log('home');
            fetch('http://154.8.164.57:1127/findfoods', {
                method: 'POST',
                body: JSON.stringify({ mealname }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(res => res.json())
                .then((res) => {
                    console.log(res.results[0].mealname);
                    setData(res.results)
                })
        }
        else if (from == 'Cook') {
            console.log('cook');
            if (mealname != '') {

                fetch('http://154.8.164.57:1127/getmeal', {
                    method: 'POST',
                    body: JSON.stringify({ mealname }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then(res => res.json())
                    .then((res) => {
                        console.log(res.results[0].mealname);
                        setMealN(res.results[0].mealname)
                        setData(res.results)
                    })
            }
        }
    }, [])

    return (
        <View style={{ backgroundColor: '#F5F5F5', }}>
            <View style={styles.searchbar}>
                <Text style={styles.goback} onPress={() => { navigation.goBack() }}>
                    {'<'}
                </Text>
                <View style={styles.searchbox}>
                    <Icon name='search1' size={18} style={styles.icon}></Icon>
                    <TextInput style={styles.input} placeholder={mealname} />
                </View>
            </View>
            <ScrollView style={styles.menubar}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: w }}>

                    {
                        data != undefined ? data.map((nav, idx) => (
                            <TouchableOpacity
                                style={styles.menu}
                                key={idx}
                                onPress={() => {
                                    navigation.push('Menudetails', mealn)
                                }}
                            >
                                <Image
                                    style={[styles.menuimg]}
                                    source={{ uri: "data:image/jpeg;base64," + nav.img }}
                                />
                                <Text style={styles.menutext}>{nav.mealname}</Text>
                            </TouchableOpacity>
                        ))
                            :
                            <View style={styles.undefined}>
                                <Text style={styles.undefinedtext}>
                                    主人，没有搜索到相关菜品
                        </Text>
                            </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    undefinedtext: {
        color: '#8E8E8F',
        fontSize: 18,
    },
    undefined: {
        alignItems: 'center'
    },
    menutext: {
        position: 'absolute',
        bottom: 20,
        left: 60,
        fontSize: 18,
        zIndex: 10,
    },
    menuimg: {
        width: 109,
        height: 109,
        borderWidth: 5,
        borderRadius: 5,
        margin: 9,
        marginLeft: 15,
    },
    menu: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: (w - 100) / 2,
        height: 168,
        marginRight: 20,
        marginLeft: 30,
        borderRadius: 25,
        // borderColor: blue,
        // borderWidth: 2,
        marginBottom: 20,
        elevation: 10,
        // flexDirection:'row',
    },
    menubar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: h - 94,
        marginTop: 22,
    },
    searchbox: {
        backgroundColor: '#FFF',
        marginLeft: 24,
        flexDirection: 'row',
        width: w - 138,
        borderRadius: 50,
        height: 38,
        alignItems: 'center',
        paddingLeft: 15,
        marginTop: 12,
    },
    input: {
        fontSize: 18,
        padding: 0
    },
    icon: {
        color: '#9D9E9D',
        paddingRight: 10
    },
    goback: {
        fontSize: 42,
        marginLeft: 20,
    },
    searchbar: {
        height: 50,
        flexDirection: 'row',
    }
})

export default CookSearchPage
