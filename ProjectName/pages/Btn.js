import React from 'react'
import { TouchableOpacity , Text} from 'react-native'

const style={
        width:100,
        height:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
}

const Btn = (props) => {
    return (
      <TouchableOpacity 
        style={props.style?props.style:style} 
        onPress={props.onPress}>
      <Text 
        style={{color:props.style?.color?props.style.color:'#000'}}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
    )
    
}

export default Btn