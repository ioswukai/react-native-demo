/**
 * Created by apple on 2018/3/14.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

// 引入Dimensions类库
import  Dimensions from 'Dimensions';

export default class DimensionsDemo extends Component<Props> {
    render() {
        return (
            <View style={styles2.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <View style={styles2.bgVSty}>
                    <Text> 当前屏幕的宽度{Dimensions.get('window').width}</Text>
                    <Text> 当前屏幕的高度{Dimensions.get('window').height}</Text>
                    <Text> 当前屏幕的分辨率{Dimensions.get('window').scale}</Text>
                </View>
            </View>
        );
    }
}

const  styles2 = StyleSheet.create({
    container:{
        // 占满整个窗口
        flex:1,
        // 上边距
        paddingTop:84,
        backgroundColor:'white',
    },
    bgVSty:{
        // 设置主轴居中
        justifyContent:'center',
        // 确定伸缩轴居中
        alignItems:'center',
        // 背景
        backgroundColor:'red',
    },
});