import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage ,TextInput,FlatList,ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';

const myDate = new Date();
const year = myDate.getFullYear();
let month = (myDate.getMonth() + 1).toString();
if (month.length == 1) {
    month = '0' + month;
}
let day = myDate.getDate();
if (day.length == 1) {
    day = '0' + day;
}

var pagenow=1;
const CookPage = ({ navigation }) => {
    const [totalPage,setTotalpage]=useState(1);
    const [username, setUserName] = useState('')
    const [userimg, setUserImage] = useState('')
    const [data,setData]=useState([]);
    const _retrieveData = async () => {
        try {
            setUserImage(await AsyncStorage.getItem('userimg'));
            setUserName(await AsyncStorage.getItem('username'));
            // We have data!!
        } catch (error) {
            // Error retrieving data
        }
    };
    //获取数据
    const getDate=(pagenow)=>{
        console.log('cook');
        AsyncStorage.getItem('username').then((username) => {
            console.log(username);
            setUserName(username);
            fetch('http://154.8.164.57:1127/gettext', {
                method: 'POST',
                body: JSON.stringify({ username: username,currentpage:pagenow }),
                headers: new Headers({
                    'Content-Type': 'applocation/json'
                })
            }).then(res => res.json())
                .then((res) => {
                    // console.log('res',res);
                    setData(data.concat(res.meal));

                    let foot=0;
                    if(res.len%12===0){
                        var pnumber=parseInt(res.len/12)
                        setTotalpage(parseInt(res.len/12));
                        console.log('neitotalpage',pnumber);
                        if(pagenow>=pnumber){
                            foot=1;
                        }
                    }else{
                        var pnumber=parseInt(res.len/12)+1
                        setTotalpage(parseInt(res.len/12)+1)
                        if(pagenow>=pnumber){
                            foot=1;
                        }
                    }
                })
        })
    }
    console.log('waitotalpage',totalPage);
    //请求数据
    useFocusEffect(
        React.useCallback(() => {
            _retrieveData();
            getDate(pagenow)

        }, [])
    )
    const _separator=()=>{
        return <View style={{height:1,backgroundColor:'#999999'}}/>;
    }

     const _renderFooter=()=>{
            return(
                <View style={styles.footer}>
                    {pagenow<totalPage?<Text>正在加载更多数据...</Text>:<Text>暂时没有更多数据了...</Text>}
                    <ActivityIndicator />
                </View>
            )
    }


     const _onEndReached=()=>{
         console.log(222)
        // if(showFoot!=0){
        //     return ;
        // }
        //如果当前的页大于总页数，那就是到最后一页，返回
        if((pagenow!=1)&&(pagenow>=totalPage)){
            return ;
        }else{
            pagenow++;
        }
        // setShowfoot(2);
        getDate(pagenow);

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titlebar}>
                <Text style={styles.hello}>
                    {username}主人，欢迎来到你的冰箱!
                </Text>
                <Text style={styles.time}>{year}年{month}月{day}日</Text>
            </View>

            <View style={styles.searchbar}>
                <View style={styles.searchbox}>
                    <Icon name='search1' size={18} style={styles.icon}></Icon>
                    <TextInput
                        keyboardType={'default'}
                        onEndEditing={(value) => {
                            navigation.push('CookSearch', { text: value.nativeEvent.text, from: 'Cook' })
                        }}
                        style={styles.input}
                        placeholder='搜索菜谱'
                    />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('My') }}>
                    <Image
                        style={styles.headportrait}
                        source={{ uri: userimg }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bodybox}>
                <Text style={[styles.body_,]}>——</Text>
                <Text style={styles.bodybar}>心得广场</Text>
                <Text style={styles.body_}>——</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({item,index})=>
                    <TouchableOpacity style={styles.items} onPress={()=>navigation.navigate('Otherdetails',{index:index,list:data,username:item.username,userimg:item.uimg})}>
                            <Image source={{uri:item.img}} style={styles.item_img}/>
                            <Text style={styles.item_text}>{item.content}</Text>
                            <View style={styles.item_user}>
                                <Image source={{uri:item.uimg}} style={styles.item_userimg}/>
                                <Text style={styles.item_username}>{item.username}</Text>
                            </View>
                        </TouchableOpacity>
                }
                numColumns ={2}
                ListFooterComponent={_renderFooter()}
                onEndReached={_onEndReached}
                onEndReachedThreshold={0.1}
            />
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        fontSize: 15,
        color: 'black',
    },
    xinde:{
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'space-between',
        marginTop:20,
        width:w-40,
    },
    items:{
        position:'relative',
        marginTop:10,
        marginLeft:40,
    },
    item_user:{
        flexDirection:'row',
        width:w-300,
        alignContent:'center',
        marginTop:5

    },
    item_username: {
        fontSize: 13,
        marginLeft: 5,
        marginTop: 3,
        fontWeight: '100'
    },
    item_userimg: {
        width: 25,
        height: 25,
        borderRadius: 12.5
    },
    item_text: {
        width: w - 300,
        fontSize: 15,
        fontWeight: 'bold',
        height: 35,
        marginTop: 5,
        overflow: 'hidden',
    },
    item_img: {
        width: w - 300,
        height: 150,
        borderRadius: 20
    },
    foodtext: {
        zIndex: 10,
        position: 'absolute',
        top: 25,
        fontSize: ptd(26),
        left: 25,
    },
    img: {
        borderRadius: 25,
        width: w - 50,
        height: w - 50,
    },
    food: {
        marginLeft: 25,
        marginTop: 10,
        width: w - 50,
        backgroundColor: '#BFC',
        marginBottom: 25,
        elevation: 10,
        borderRadius: 25,
    },
    bodybar: {
        fontSize: 30,
        marginLeft: w - 430,
        marginRight: w - 430,
        color: blue
    },
    bodybox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headportrait: {
        width: 48,
        height: 48,
        borderRadius: 100,
        marginLeft: 25,
        marginTop: -5
    },
    searchbox: {
        backgroundColor: '#FFF',
        marginLeft: 43,
        flexDirection: 'row',
        width: w - 138,
        borderRadius: 50,
        height: 38,
        alignItems: 'center',
        paddingLeft: 15
    },
    input: {
        fontSize: 18,
        padding: 0
    },
    searchbar: {
        backgroundColor: blue,
        flexDirection: 'row',
        height: 50
    },
    icon: {
        color: '#9D9E9D',
        paddingRight: 10
    },
    time: {
        color: white,
        position: 'absolute',
        right: 25,
        fontSize: 16,
    },
    hello: {
        marginLeft: ptd(25),
        color: white,
        fontSize: 16
    },
    titlebar: {
        flexDirection: 'row',
        backgroundColor: blue,
        height: 40,
    }
})

export default CookPage



// import React, {Component} from "react";
// import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";

// const REQUEST_URL = 'https://api.github.com/search/repositories?q=javascript&sort=stars&page=';
// let pageNo = 1;//当前第几页
// let totalPage=5;//总的页数
// let itemNo=0;//item的个数
// export default class CookPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             //网络请求状态
//             error: false,
//             errorInfo: "",
//             dataArray: [],
//             showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
//             isRefreshing:false,//下拉控制
//         }
//     }

//     //网络请求——获取第pageNo页数据
//     fetchData(pageNo) {
//         //这个是js的访问网络的方法
//         fetch(REQUEST_URL+pageNo)
//             .then((response) => response.json())
//             .then((responseData) => {
//                 let data = responseData.items;
//                 let dataBlob = [];
//                 let i = itemNo;
//                 console.log(responseData);

//                 data.map(function (item) {
//                     dataBlob.push({
//                         key: i,
//                         value: item,
//                     })
//                     i++;
//                 });
//                 itemNo = i;
//                 console.log("itemNo:"+itemNo);
//                 let foot = 0;
//                 if(pageNo>=totalPage){
//                     foot = 1;//listView底部显示没有更多数据了
//                 }

//                 this.setState({
//                     //复制数据源
//                     dataArray:this.state.dataArray.concat(dataBlob),
//                     isLoading: false,
//                     showFoot:foot,
//                     isRefreshing:false,
//                 });
//                 data = null;
//                 dataBlob = null;
//             })
//             .catch((error) => {
//                 this.setState({
//                     error: true,
//                     errorInfo: error
//                 })
//             })
//             .done();
//     }

//     componentDidMount() {
//         //请求数据
//         this.fetchData( pageNo );
//     }

//     //加载等待页
//     renderLoadingView() {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator
//                     animating={true}
//                     color='red'
//                     size="large"
//                 />
//             </View>
//         );
//     }

//     //加载失败view
//     renderErrorView() {
//         return (
//             <View style={styles.container}>
//                 <Text>
//                     Fail
//                 </Text>
//             </View>
//         );
//     }

//     //返回itemView
//     _renderItemView({item}) {
//         return (
//             <View>
//                 <Text style={styles.title}>name: {item.value.name}</Text>
//                 <Text style={styles.content}>stars: {item.value.stargazers_count}</Text>
//                 <Text style={styles.content}>description: {item.value.description}</Text>
//             </View>
//         );
//     }

//     renderData() {
//         return (

//             <FlatList
//                 data={this.state.dataArray}
//                 renderItem={this._renderItemView}
//                 ListFooterComponent={this._renderFooter.bind(this)}
//                 onEndReached={this._onEndReached.bind(this)}
//                 onEndReachedThreshold={1}
//                 ItemSeparatorComponent={this._separator}
//             />

//         );
//     }

//     render() {
//         //第一次加载等待的view
//         if (this.state.isLoading && !this.state.error) {
//             return this.renderLoadingView();
//         } else if (this.state.error) {
//             //请求失败view
//             return this.renderErrorView();
//         }
//         //加载数据
//         return this.renderData();
//     }
//     _separator(){
//         return <View style={{height:1,backgroundColor:'#999999'}}/>;
//     }
//     _renderFooter(){
//         if (this.state.showFoot === 1) {
//             return (
//                 <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
//                     <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
//                         没有更多数据了
//                     </Text>
//                 </View>
//             );
//         } else if(this.state.showFoot === 2) {
//             return (
//                 <View style={styles.footer}>
//                     <ActivityIndicator />
//                     <Text>正在加载更多数据...</Text>
//                 </View>
//             );
//         } else if(this.state.showFoot === 0){
//             return (
//                 <View style={styles.footer}>
//                     <Text></Text>
//                 </View>
//             );
//         }
//     }

//     _onEndReached(){
//         //如果是正在加载中或没有更多数据了，则返回
//         if(this.state.showFoot != 0 ){
//             return ;
//         }
//         //如果当前页大于或等于总页数，那就是到最后一页了，返回
//         if((pageNo!=1) && (pageNo>=totalPage)){
//             return;
//         } else {
//             pageNo++;
//         }
//         //底部显示正在加载更多数据
//         this.setState({showFoot:2});
//         //获取数据
//         this.fetchData( pageNo );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     title: {
//         fontSize: 15,
//         color: 'blue',
//     },
//     footer:{
//         flexDirection:'row',
//         height:24,
//         justifyContent:'center',
//         alignItems:'center',
//         marginBottom:10,
//     },
//     content: {
//         fontSize: 15,
//         color: 'black',
//     }
// });