/**
 * Created by apple on 2018/4/2.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 GeolocationDemo*******************************/
/*
    Geolocation提供地理定位：

    iOS
    你需要在Info.plist中增加NSLocationWhenInUseUsageDescription字段来启用定位功能。
    如果你使用react-native init创建项目，定位会被默认启用。

    Android
    要请求访问地理位置的权限，你需要在AndroidManifest.xml文件中加入如下一行：
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    Geolocation 提供的静态方法如下：

    getCurrentPosition(successCallBack,errorCallBack,GeoOptions)：用于获取当前的地理位置。
    GeoOptions 参数当前支持的属性有：
    timeout (ms): 获取地理位置时候的超时时长，单位是毫秒，超时会触发失败回调
    maximumAge (ms):重复获取定时时，指定多久再次获取，其单位为毫秒
    enableHighAccuracy (bool):其值为true或者false，指定是否要求高精度的地理位置信息

    watchPosition(successCallBack,errorCallBack,GeoOptions)：持续监测位置运动，每当位置变化之后都调用success回调。

    clearWatch(watchID):依据ID（number）清除监测

    stopObserving():清除所有位置监测


    得到的地理位置信息中 longitude 经度 latitude 纬度  altitude 高程  这几个是我们想要的
*/

// 导入定位API
import Geolocation  from 'Geolocation';

export default class GeolocationDemo extends Component<Props> {
    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.getPosition()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>获取地理位置</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    getPosition(){
        let msg = '获取地理位置';
        Geolocation.getCurrentPosition((data)=>{
            let succ = '成功'+ JSON.stringify(data)
            msg += succ;
            alert(msg);
        },(error)=>{
            let succ = '失败'+ JSON.stringify(error)
            msg += succ;
            alert(msg);
        },{
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });

    }
}

const styles = StyleSheet.create({
    bgVSty:{},
});