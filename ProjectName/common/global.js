import {Dimensions} from 'react-native';

global.w = Dimensions.get('window').width;
global.h = Dimensions.get('window').height;
global.color1 = '#7468BE';
global.blue = 'rgb(112,99,188)',
global.white = '#F5F5F5',
global.white2 = '#FFF3F3',
global.ptd = (px)=>{
    return px/375*w
}