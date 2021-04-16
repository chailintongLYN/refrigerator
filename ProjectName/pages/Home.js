import React from 'react'
import{Text, View} from 'react-native'
import Btn from './Btn'
const Home = () => {
    let num = 0
    return (
        <View>
            <Text>首页</Text>
            <Text style= {{fontSize:50}}> {num}</Text>
            <Btn onPress={()=>setNum(num+1)}>计数按钮</Btn>
        </View>
    )
}

export default Home
