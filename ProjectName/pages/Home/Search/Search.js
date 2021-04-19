import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const HomeSearchPage = () => {
    return (
        <View style={{ backgroundColor: '#F5F5F5', }}>
            <View style={styles.searchbar}>
                <Text style={styles.goback}>
                    {'<'}
                </Text>
                <View style={styles.searchbox}>
                    <Icon name='search1' size={18} style={styles.icon}></Icon>
                    <TextInput style={styles.input} />
                </View>
            </View>
            <ScrollView>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    searchbox: {
        backgroundColor: '#FFF',
        marginLeft: 24,
        flexDirection: 'row',
        width: w - 138,
        borderRadius: 50,
        height: 38,
        alignItems: 'center',
        paddingLeft: 15,
        marginTop:12,
    },
    input: {
        fontSize: 18,
        padding: 0
    },
    icon: {
        color: '#9D9E9D',
        paddingRight: 10
    },
    goback: {
        fontSize: 42,
        marginLeft: 20,
    },
    searchbar: {
        height: 50,
        flexDirection:'row',
    }
})

export default HomeSearchPage
