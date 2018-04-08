/**
 * Created by apple on 2018/3/30.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    NetInfo,
    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 NetInfoDemo*******************************/
/*
    NetInfo 此API提供了获知设备联网或离线的状态信息
    提供了如下的属性和方法：

    isConnected:表示网络是否链接

    下面的fetch被弃用了 使用getConnectionInfo()替代
    fetch():获取网络状态的方法

    addEventListener(eventName,handler):添加事件监听

    removeEventListener(eventName,handler):删除事件监听

    isConnectionExpensive：此方法仅Android可用。用于判断当前活动的连接是否计费。
        如果当前连接是通过移动数据网络，或者通过基于移动数据网络所创建的wifi热点，
        都有可能被判定为计费的数据连接。

    IOS
    以异步的方式判断设备是否联网，以及是否使用了移动数据网络。
     none - 设备处于离线状态。
    wifi - 设备处于联网状态且通过wifi链接，或者是一个iOS的模拟器。
    cell - 设备是通过Edge、3G、WiMax或是LTE网络联网的。
    unknown - 发生错误，网络状况不可知


    Android
    请求网络信息需要先在应用的AndroidManifest.xml文件中添加如下权限字段：

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    Android的联网类型：
    NONE - 设备处于离线状态
    BLUETOOTH - 蓝牙数据连接
    DUMMY - 模拟数据连接
    ETHERNET - 以太网数据连接
    MOBILE - 移动网络数据连接
    MOBILE_DUN - 拨号移动网络数据连接
    MOBILE_HIPRI - 高优先级移动网络数据连接
    MOBILE_MMS - 彩信移动网络数据连接
    MOBILE_SUPL - 安全用户面定位（SUPL）数据连接
    VPN - 虚拟网络连接。需要Android5.0以上
    WIFI - WIFI数据连接
    WIMAX - WiMAX数据连接
    UNKNOWN - 未知数据连接
    其他的连接状态已被Android API隐藏，但可以在需要时使用。
 */
export default class NetInfoDemo extends Component<Props> {

    componentDidMount() {
        // 获取链接类型 fetch被弃用了 使用getConnectionInfo()替代
        NetInfo.getConnectionInfo().done((reachability)=>{
            console.log(reachability);
        });
        // NetInfo.fetch().done((reachability)=>{
        //     console.log(reachability);
        // });

        // 获取是否连接  此处的fetch 不能用getConnectionInfo()替代
        NetInfo.isConnected.fetch().done((isConnected)=>{
            console.log(isConnected);
        });

        // 添加网络状态变化监听 change事件被废弃 使用 connectionChange事件替代
        NetInfo.addEventListener('connectionChange',(reachability)=>{
            console.log(reachability);
        });
        // NetInfo.addEventListener('change',(reachability)=>{
        //     console.log(reachability);
        // });

        // 获取是否连接  change事件被废弃 使用 connectionChange事件替代
        NetInfo.isConnected.addEventListener('connectionChange',(isConnected)=>{
            console.log(isConnected);
        })
        // NetInfo.isConnected.addEventListener('change',(isConnected)=>{
        //     console.log(isConnected);
        // })
    }

    componentWillUnmount() {
        // 删除取是否连接监听
        NetInfo.isConnected.removeEventListener('connectionChange',(isConnected)=>{
            console.log(isConnected);
        })
        // NetInfo.isConnected.removeEventListener('change',(isConnected)=>{
        //     console.log(isConnected);
        // })

        // 删除网络状态变化监听
        NetInfo.removeEventListener('connectionChange',(reachability)=>{
            console.log(reachability);
        });
        // NetInfo.removeEventListener('change',(reachability)=>{
        //     console.log(reachability);
        // });
    }

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <Text> 我是{NavigateBar.getComponentName(this)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgVSty:{},
});