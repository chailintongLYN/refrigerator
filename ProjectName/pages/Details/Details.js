import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import global from '../../common/global'

const name = '苹果',
    time = '4月12日',
    remainingtime = '3',
    goodtext = '苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素，苹果可以补充维生素',
    badtext = '苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，苹果和牛奶搭配，';

const Details = ({ navigation }) => {
    return (
        <ScrollView style={{ backgroundColor: "#FFF", }}>
            <View style={styles.titlebar}>
                <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
                    <Text style={styles.gobackicon}>{'<'}</Text>
                </TouchableOpacity>
            </View>
            <Image
                style={styles.img}
                source={require('../images/apple.jpg')}
            />
            <View style={styles.bodytitle}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Text style={styles.time}>
                    {time}进入冰箱
                </Text>
                <Text style={[styles.remainingtime, { color: remainingtime <= '3' ? 'red' : 'black' }]}>
                    保质期还剩{remainingtime}天
                </Text>
                <TouchableOpacity style={styles.meal}>
                    <Text style={{ fontSize: 30 }}>饭</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delete}>
                    <Image
                        style={styles.deleteimg}
                        source={require('../images/delete.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.goodtexttitle}>
                <Text style={{fontSize:32}}>
                    营养小贴士
                </Text>
            </View>
            <View style={styles.goodtext}>
                <Text style={{fontSize:20,color:'#98EF6A',margin:12}}>
                    {goodtext}
                </Text>
            </View>
            <View style={[styles.goodtexttitle,{backgroundColor: '#F8AFAF',}]}>
                <Text style={{fontSize:32,color:'#EF0505'}}>
                    禁忌
                </Text>
            </View>
            <View style={styles.goodtext}>
                <Text style={{fontSize:20,color:'#101010',margin:12}}>
                    {badtext}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    goodtext:{
        width:ptd(360),
        marginLeft:(w-ptd(360))/2,
        borderColor:'#BBBBBB',
        borderWidth:1,
        borderRadius:10,
        marginTop:21,
        marginBottom:32,
    },
    goodtexttitle: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:40,
        marginLeft:(w-ptd(200))/2,
        width:ptd(200),
        borderRadius:50,
        borderColor:'#BBBBBB',
        height:82,
        backgroundColor: '#BFC',
    },
    deleteimg: {
        width: 40,
        height: 40,
    },
    delete: {
        marginLeft: 15,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: blue,
        width: 68,
        height: 68,
        borderRadius: 100,
        justifyContent: 'center',
    },
    meal: {
        marginTop: 15,
        marginLeft: 80,
        alignItems: 'center',
        backgroundColor: blue,
        width: 68,
        height: 68,
        borderRadius: 100,
        justifyContent: 'center',
    },
    remainingtime: {
        marginLeft: -210,
        marginTop: 50,
        fontSize: 24,
    },
    time: {
        fontSize: 16,
        marginTop: 20,
        marginLeft: 30,
    },
    name: {
        fontSize: 34,
    },
    bodytitle: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 25,
    },
    img: {
        marginTop: 5,
        marginLeft: (w - ptd(340)) / 2,
        width: ptd(340),
        height: 400,
        borderRadius: 25,
        borderColor: blue,
        borderWidth: 3,
    },
    titlebar: {
        height: 50,
    },
    goback: {
        marginLeft: 10,
        marginTop: 15,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: blue,
        borderRadius: 100,
    },
    gobackicon: {
        marginTop: -8,
        fontSize: 45,
        color: '#FFF'
    }
})


export default Details
