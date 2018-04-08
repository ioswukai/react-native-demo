/**
 * Created by apple on 2018/4/2.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    // 震动库
    Vibration,
    // 震动库
    VibrationIOS,

    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 VibrationIOSDemo*******************************/
/*
    VibrationIOS 提供震动功能 只有一个方法
    vibrate(); 如果调用这个方法，设备会出现1秒的震动效果，如果设备不支持VibrationIOS也不会有副作用

    模拟器是没有震动效果的 真机才有震动效果

    Vibration 用法同VibrationIOS 需要注意的是
    注意对于android来说需要在AndroidManifest.xml中添加
    <uses-permission android:name="android.permission.VIBRATE"/>权限。
*/
export default class VibrationIOSDemo extends Component<Props> {
    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.vibration()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>震动一下</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    vibration(){
        // VibrationIOS.vibrate();
        Vibration.vibrate();
    }
}

const styles = StyleSheet.create({
    bgVSty:{},
});