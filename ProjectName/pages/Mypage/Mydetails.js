import React from 'react'
import { Text, View, StyleSheet, Image, Button,ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import '../../common/global'

var layout={
    x:0,
    y:0
}
 function clickdingwei() {
    window.scrollTo({ x: 0, y:layout.y, animated: true});
  }
const Mydetails=({navigation})=>{
    return(
        <ScrollView ref={(view) => { window = view; }}>
            <TouchableOpacity onPress={()=>clickdingwei()}><Text>点击跳转</Text></TouchableOpacity>
            <ScrollView>
                
                <View key={0} style={styles.v1}><Text>detail1</Text></View>
                <View key={1} style={styles.v1}><Text>detail2</Text></View>
                <View key={2} style={styles.v1}><Text>detail3</Text></View>
                <View key={3} style={styles.v1}><Text>detail4</Text></View>
                <View key={4} style={styles.v1}><Text>detail5</Text></View>
                <View key={5} style={styles.v1}><Text>detail5</Text></View>
                <View key={6} style={styles.v1}><Text>detail5</Text></View>
                <View key={7} style={styles.v1} onLayout={event=>{layout = event.nativeEvent.layout}}><Text>想跳转的位置</Text></View>
                <View key={8} style={styles.v1}><Text>detail5</Text></View>
                <View key={9} style={styles.v1}><Text>detail5</Text></View>
                <View key={10} style={styles.v1}><Text>detail5</Text></View>
                <View key={11} style={styles.v1}><Text>detail5</Text></View>
                <View key={12} style={styles.v1}><Text>detail5</Text></View>
            </ScrollView>
            
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