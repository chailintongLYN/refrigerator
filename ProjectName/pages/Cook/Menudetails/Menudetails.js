import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

const MenudetailsPage = ({ navigation, route }) => {
    let mealdetail = {
        text: route.params,
        time: '约0分钟',
        details: [
        ],
        step: [
        ],
        img: require('../../images/apple.jpg')
    }
    
    useEffect(async () => {
        console.log('detailseffect')
        let username = await AsyncStorage.getItem('username')
        fetch('http://154.8.164.57:1127/getmealdatas', {
            method: 'POST',
            body: JSON.stringify({ mealname: route.params }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then((res) => {
                setSave(parseInt(res.meal[0].savenumber))
                mealdetail.time = res.meal[0].time
                let i = 0;
                for (const key in res.details[0]) {
                    if (Object.hasOwnProperty.call(res.details[0], key)) {
                        if (res.details[0][key] == 0) continue;
                        // mealdetail.details
                        else if (i != 0) {
                            if (mealdetail.details[i - 1] == undefined) {
                                mealdetail.details.push({})
                            }
                            mealdetail.details[i - 1].name = res.details[0][key].split(' ')[0];
                            mealdetail.details[i - 1].weight = res.details[0][key].split(' ')[1];
                        }
                        i++;
                    }
                }
                i = 0;
                for (const key in res.steps[0]) {
                    if (Object.hasOwnProperty.call(res.steps[0], key)) {
                        if (res.steps[0][key] == 0) continue;
                        else if (i != 0) {
                            if (mealdetail.step[i - 1] == undefined) {
                                mealdetail.step.push({})
                            }
                            mealdetail.step[i - 1].text = res.steps[0][key]
                        }
                    }
                    i++;
                }
                // console.log(res.meal[0].img);
                // mealdetail.img = res.meal[0].img
                setMealDetails({ ...mealdetail })
            })

        fetch('http://154.8.164.57:1127/checklike', {
            method: 'POST',
            body: JSON.stringify({ username: username, mealname: route.params }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
            })

    }, [])
    const [mealdetails, setMealDetails] = useState(mealdetail);
    const [ifsave, setIfSave] = useState(false);
    const [save, setSave] = useState(0);

    return (
        <ScrollView>
            <View style={styles.titlebar}>
                <Text style={styles.titletext}>
                    {mealdetails.text}
                </Text>
                <Icon1 name='access-time' size={32} style={styles.icontime}></Icon1>
                <Text style={styles.timetext}>时间：{mealdetails.time}</Text>
                <TouchableOpacity
                    style={styles.iconsave}
                    onPress={() => {
                        ifsave == true ? setIfSave(false) : setIfSave(true);
                        ifsave == true ? setSave(save - 1) : setSave(save + 1);
                        // ifsave == true ?
                        //     fetch('http://154.8.164.57:1127/getmealdatas', {
                        //         method: 'POST',
                        //         body: JSON.stringify({ mealname: route.params }),
                        //         headers: new Headers({
                        //             'Content-Type': 'application/json'
                        //         })
                        //     }).then(res => res.json())
                        //         .then((res) => {

                        //         }) :
                        //     fetch('http://154.8.164.57:1127/getmealdatas', {
                        //         method: 'POST',
                        //         body: JSON.stringify({ mealname: route.params }),
                        //         headers: new Headers({
                        //             'Content-Type': 'application/json'
                        //         })
                        //     }).then(res => res.json())
                        //         .then((res) => {

                        //         })
                    }}
                >
                    <Icon2 name='star' size={32} style={{ color: ifsave == true ? 'rgb(243,230,82)' : white2 }}></Icon2>
                </TouchableOpacity>
                <Text style={styles.savetext}>收藏：{save}人</Text>
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
                        mealdetails.details.map((nav, idx) => (
                            <View key={idx} style={[styles.detailsbar, { marginBottom: idx == mealdetails.details.length - 1 ? 25 : 0 }]}>
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
                        mealdetails.step.map((nav, idx) => (
                            <View key={idx} style={styles.step}>
                                <Text style={styles.steptitle}>
                                    步骤{idx + 1}：
                                </Text>
                                <Text style={styles.steptext}>
                                    {nav.text}
                                </Text>
                                {/* <Image
                                    style={styles.stepimg}
                                    source={nav.img}
                                /> */}
                            </View>
                        ))
                    }
                    <View style={styles.step}>
                        <Text style={[styles.steptitle, { marginBottom: 10 }]}>最终成品：</Text>
                        <Image
                            style={styles.stepimg}
                            source={mealdetails.img}
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
        marginLeft: 20,
        width: w - 120,
        height: w - 120,
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
        position: 'absolute',
        top: 10,
        right: 20,
    },
    savetext: {
        color: white2,
        position: 'absolute',
        left: 270,
        top: 70,
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconsave: {
        position: 'absolute',
        left: 230,
        top: 65,
    },
    timetext: {
        color: white2,
        position: 'absolute',
        top: 70,
        left: 60,
        fontSize: 18,
        fontWeight: 'bold',
    },
    icontime: {
        position: 'absolute',
        top: 65,
        left: 25,
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
        position: 'relative',
    }
})

export default MenudetailsPage
