import React from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

const menudetails = {
    text: '外加里嫩~炸豆腐丸子',
    time: '约12-15分钟',
    savenum: '411',
    details: [
        { name: '北豆腐', weight: '133.3g' },
        { name: '香菜', weight: '26.6g' },
        { name: '胡萝卜', weight: '26.6g' },
        { name: '水发木耳', weight: '13.3g' },
        { name: '鸡蛋', weight: '3-4个' },
        { name: '盐', weight: '13.3g' },
        { name: '生抽', weight: '13.3g' },
        { name: '五香粉', weight: '13.3g' },
    ],
    step: [
        { text: '豆腐用勺子捣碎', img: require('../../images/apple.jpg') },
        { text: '豆腐用勺子捣碎', img: require('../../images/apple.jpg') },
        { text: '豆腐用勺子捣碎', img: require('../../images/apple.jpg') },
        { text: '豆腐用勺子捣碎', img: require('../../images/apple.jpg') },
    ],
    img: require('../../images/apple.jpg')
}

const MenudetailsPage = ({ navigation }) => {
    return (
        <ScrollView>
            <View style={styles.titlebar}>
                <Text style={styles.titletext}>
                    {menudetails.text}
                </Text>
                <Icon1 name='access-time' size={32} style={styles.icontime}></Icon1>
                <Text style={styles.timetext}>时间：{menudetails.time}</Text>
                <Icon2 name='star' size={32} style={styles.iconsave}></Icon2>
                <Text style={styles.savetext}>收藏：{menudetails.savenum}人</Text>
                <TouchableOpacity style={styles.iconclose} onPress={() => navigation.goBack()}>
                    <Icon2 name='closecircle' size={46} color={white2}></Icon2>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.details}>
                    <Text style={styles.detailstitle}>
                        用料：
                    </Text>
                    {
                        menudetails.details.map((nav, idx) => (
                            <View key={idx} style={[styles.detailsbar, { marginBottom: idx == menudetails.details.length - 1 ? 25 : 0 }]}>
                                <Text style={styles.detailsname} >
                                    {nav.name}
                                </Text>
                                <Text style={styles.detailsweight} >
                                    {nav.weight}
                                </Text>
                            </View>
                        ))
                    }
                </View>
                <View style={{ marginBottom: 20, }}>
                    {
                        menudetails.step.map((nav, idx) => (
                            <View key={idx} style={styles.step}>
                                <Text style={styles.steptitle}>
                                    步骤{idx + 1}：
                                </Text>
                                <Text style={styles.steptext}>
                                    {nav.text}
                                </Text>
                                <Image
                                    style={styles.stepimg}
                                    source={nav.img}
                                />
                            </View>
                        ))
                    }
                    <View style={styles.step}>
                        <Text style={[styles.steptitle,{marginBottom:10}]}>最终成品：</Text>
                        <Image
                            style={styles.stepimg}
                            source={menudetails.img}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    stepimg: {
        borderRadius: 10,
        width: w - 80,
        height: w - 80,
    },
    steptext: {
        marginTop: 10,
        fontSize: 18,
        marginBottom: 10,
    },
    step: {
        marginTop: 25,
        marginLeft: 40,
        width: w - 80,
    },
    steptitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    detailsbar: {
        flexDirection: 'row',
        borderBottomColor: '#BBBBBB',
        borderBottomWidth: 2,
        width: w - 120,
        marginLeft: 20,
        // borderStyle:('dashed',
    },
    detailsweight: {
        position: 'absolute',
        fontSize: 18,
        // marginLeft: 220,
        right: 18,
        marginTop: 15,
        marginBottom: 12,

    },
    detailsname: {
        marginTop: 15,
        fontSize: 18,
        marginBottom: 12,

    },
    detailstitle: {
        fontSize: 22,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    details: {
        // backgroundColor: '#BFC',
        marginTop: 50,
        marginLeft: 40,
        width: w - 80,
        borderRadius: 10,
        elevation: 10,
    },
    iconclose: {
        color: white2,
        marginLeft: -45,
        marginTop: 10,
    },
    savetext: {
        color: white2,
        marginTop: 70,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconsave: {
        color: white2,
        marginTop: 64,
        marginLeft: 32,
    },
    timetext: {
        color: white2,
        marginTop: 70,
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    icontime: {
        marginLeft: -215,
        marginTop: 65,
        color: white2,
    },
    titletext: {
        color: white2,
        marginTop: 10,
        marginLeft: 14,
        fontSize: 22,
        fontWeight: 'bold',
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 118,
        marginLeft: 18,
        width: w - 36,
        marginTop: 10,
        borderRadius: 10,
        elevation: 10,
    }
})

export default MenudetailsPage
