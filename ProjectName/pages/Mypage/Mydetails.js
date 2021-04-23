import React from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'

const Mydetails=()=>{
    return(
        <ScrollView>
            <View key={0} style={styles.v1}><Text>detail1</Text></View>
            <View key={1} style={styles.v1}><Text>detail2</Text></View>
            <View key={2} style={styles.v1}><Text>detail3</Text></View>
            <View key={3} style={styles.v1}><Text>detail4</Text></View>
            <View key={4} style={styles.v1}><Text>detail5</Text></View>
            <View key={5} style={styles.v1}><Text>detail5</Text></View>
            <View key={6} style={styles.v1}><Text>detail5</Text></View>
            <View key={7} style={styles.v1}><Text>detail5</Text></View>
            <View key={8} style={styles.v1}><Text>detail5</Text></View>
            <View key={9} style={styles.v1}><Text>detail5</Text></View>
            <View key={10} style={styles.v1}><Text>detail5</Text></View>
            <View key={11} style={styles.v1}><Text>detail5</Text></View>
            <View key={12} style={styles.v1}><Text>detail5</Text></View>
        </ScrollView>
    )
}
export default Mydetails
const styles=StyleSheet.create({
    v1:{
        width:ptd(350),
        height:200,
        backgroundColor:'red',
        marginBottom:30
    }
})