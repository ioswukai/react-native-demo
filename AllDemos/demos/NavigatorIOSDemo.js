/**
 * Created by apple on 2018/3/14.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    DeviceEventEmitter,
    View
} from 'react-native';

// 引入外部组件
import Main from './Component/XMGMain';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

export default class NavigatorIOSDemo extends Component<Props> {

    componentDidMount() {
        // 注册通知
        this.listener = DeviceEventEmitter.addListener('pushToNewsDetail',(e)=>{
            // 跳转新闻详情页
            this.pushToNewsDetail(e);
        });
    }

    componentWillUnmount() {
        // 注销通知
        this.listener.remove();
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <Main/>
            </View>
        );
    }

    // 跳转新闻详情页
    pushToNewsDetail=(dataJson)=>{
        // 跳转
        this.props.navigator.push(
            dataJson
        );
    }
}
