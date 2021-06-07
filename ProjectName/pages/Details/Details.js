import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import '../../common/global'

const goodtext = '苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素',
    badtext = '苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，';

const Details = ({ navigation, route }) => {
    const name = route.params.text,
        remainingday = route.params.remainingday,
        time = route.params.time,
        img = route.params.img
    return (
        <ScrollView style={{ backgroundColor: "#FFF", }}>
            <View style={styles.titlebar}>
                <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
                    <Text style={styles.gobackicon}>{'<'}</Text>
                </TouchableOpacity>
            </View>
            <Image
                style={styles.img}
                source={{ uri: img }}
            />
            <View style={styles.bodytitle}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Text style={styles.time}>
                    {time}进入冰箱
                </Text>
                <Text style={[styles.remainingtime, { color: remainingday <= 3 ? 'red' : 'black' }]}>
                    {remainingday < 0 ? '已过期' : '保质期还剩' + remainingday + '天'}
                </Text>
                {/* <TouchableOpacity style={styles.meal}>
                    <Text style={{ fontSize: 30 }}>饭</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delete}>
                    <Image
                        style={styles.deleteimg}
                        source={require('../images/delete.png')}
                    />
                </TouchableOpacity> */}
            </View>
            <View style={styles.goodtexttitle}>
                <Text style={{ fontSize: 32 }}>
                    营养小贴士
                </Text>
            </View>
            <View style={styles.goodtext}>
                <Text style={{ fontSize: 20, color: '#98EF6A', margin: 12 }}>
                    {goodtext}
                </Text>
            </View>
            <View style={[styles.goodtexttitle, { backgroundColor: '#F8AFAF', }]}>
                <Text style={{ fontSize: 32, color: '#EF0505' }}>
                    禁忌
                </Text>
            </View>
            <View style={styles.goodtext}>
                <Text style={{ fontSize: 20, color: '#101010', margin: 12 }}>
                    {badtext}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    goodtext: {
        width: ptd(360),
        marginLeft: (w - ptd(360)) / 2,
        borderColor: '#BBBBBB',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 21,
        marginBottom: 32,
    },
    goodtexttitle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginLeft: (w - ptd(200)) / 2,
        width: ptd(200),

        marginTop: 45,
        marginLeft: (w - 210) / 2,
        width: 210,
        borderRadius: 50,
        borderColor: '#BBBBBB',
        height: 82,
        backgroundColor: '#BFC',
    },
    deleteimg: {
        width: 40,
        height: 40,
    },
    delete: {
        alignItems: 'center',
        backgroundColor: blue,
        width: 68,
        height: 68,
        borderRadius: 100,
        justifyContent: 'center',
        position: 'absolute',
        top: ptd(25),
        left: ptd(56),
    },
    meal: {
        alignItems: 'center',
        backgroundColor: blue,
        width: 68,
        height: 68,
        borderRadius: 100,
        justifyContent: 'center',
        position: 'relative',
        left: ptd(56),
        top: ptd(12),
    },
    remainingtime: {
        position: 'absolute',
        top: ptd(45),
        left: ptd(30),
        fontSize: ptd(20),
    },
    time: {
        fontSize: ptd(13),
        position: 'absolute',
        top: ptd(15),
        right: ptd(50),
    },
    name: {
        fontSize: ptd(28),
    },
    bodytitle: {
        width: w - 50,
        height: ptd(55),
        flexDirection: 'row',
        position: 'relative',
        marginTop: 20,
        marginLeft: 25,
    },
    img: {
        marginTop: 5,
        marginLeft: (w - ptd(340)) / 2,
        width: ptd(340),
        height: ptd(340),
        borderRadius: 25,
        borderColor: blue,
        borderWidth: 3,
    },
    titlebar: {
        height: ptd(50),
    },
    goback: {
        marginLeft: ptd(10),
        marginTop: ptd(12),
        width: ptd(36),
        height: ptd(36),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: blue,
        borderRadius: 100,
    },
    gobackicon: {
        marginTop: ptd(-8),
        fontSize: ptd(45),
        color: '#FFF'
    }
})


export default Details
