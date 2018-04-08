/**
 * Created by apple on 2018/3/30.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    PixelRatio,

    View
} from 'react-native';
/*
像素密度PixelRatio 提供了一些静态方法供我们使用
 get():获取像素密度。
 PixelRatio.get()===1
 mdpi Android devices (160 dpi )

 PixelRatio.get()===1.5
 hdpi Android devices (240 dpi )

 PixelRatio.get()===2
 iPhone 4,4s,5,5c,5s,6,7
 xhdpi Android devices (320 dpi )

 PixelRatio.get()===3
 iPhone 6P 7P
 xxhdpi Android devices (480 dpi )

 PixelRatio.get()===3.5
 Nexus 6

 getPixelSizeForLayoutSize(number):获取一个布局元素的像素大小，其返回值是一个四舍五入的整形。
 该方法的定义也比较简单，相关代码如下
 function getPixelSizeForLayoutSize(layoutSize){
    return Math.round(layoutSize * PixelRatio.get());
 }

 getFontScale():获取字体比例。该函数的定义如下
 function getFontScale(){
    return Dimensions.get('window').fontScale || PixelRatio.get();
 }

    自适应图片：我们希望一个图片既可以在普通设备上，也可以在高清设备上，可以通过getPixelSizeForLayoutSize
    来实现

 */


// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

export default class PixelRatioDemo extends Component<Props> {
    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                {/*最细边框*/}
                <View style={{borderWidth:1,borderColor:'red',height:40,margin:20,}}/>
                <View style={{borderWidth:1/PixelRatio.get(),borderColor:'red',height:40,margin:20}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgVSty:{},
});