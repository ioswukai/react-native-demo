/**
 * Created by apple on 2018/3/19.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Message extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>消息</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:49,
        alignItems:'center',
        justifyContent:'center',
    },
});