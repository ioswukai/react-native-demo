/**
 * Created by apple on 2018/3/14.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

export default class InputTextDemo extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <TextInput
                    style={styles.textInputSty}
                    // value={'我是默认文字'}
                    // 键盘类型
                    keyboardType={'number-pad'}
                    // 多行显示
                    // multiline={true}
                    // 是否明文显示(只支持单行)
                    secureTextEntry={true}
                    // 设置站位文字
                    placeholder={'我是站位文字'}
                    // 清除按钮出现时机
                    clearButtonMode={'always'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:84,
        alignItems:'center',
        backgroundColor:'white',
    },
    textInputSty:{
        width:300,
        height:60,
        // 背景
        // backgroundColor:'black',
        // 边框
        borderWidth:1,
        borderColor:'#e8e8e8',
    },
    textSty:{

    },
});