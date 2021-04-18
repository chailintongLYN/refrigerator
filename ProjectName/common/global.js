import {Dimensions} from 'react-native';

global.w = Dimensions.get('window').width;
global.h = Dimensions.get('window').height;
global.color1 = '#7468BE';
global.blue = '#0EB6FF',
global.white = '#F5F5F5',
global.ptd = (px)=>{
    return px/375*w
}