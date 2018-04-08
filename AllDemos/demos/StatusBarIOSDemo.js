/**
 * Created by apple on 2018/3/30.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    // 这个在高版本被剔除了无法使用
    StatusBarIOS,
    StatusBar,
    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 StatusBarIOSDemo  StatusBar*******************************/
/*
 StatusBarIOS 本模块用于设置iOS状态的显隐与样式。他的静态方法有三个
 setStyle(style: StatusBarStyle, animated?: boolean) :设置状态栏的样式，style可以是'defalut'
 和'light-content'中的一个。animated参数是可选的，表示是否有过渡动画，是个bool值

 setHidden(hidden: boolean, animation?: StatusBarAnimation)：用于隐藏状态栏，
 hidden是bool值，true就是隐藏，animated参数是可选的，表示是否有过渡动画，是个bool值

 setNetworkActivityIndicatorVisible(visible: boolean)：是否显示网络状态，visible是bool值,true显示

 ！！！！ StatusBarIOS已经被高版本弃用了 使用StatusBar替代 用法同StatusBarIOS

 */

export default class StatusBarIOSDemo extends Component<Props> {

    componentDidMount() {
        StatusBar.setBarStyle('light-content');
        StatusBar.setHidden(false);
        // StatusBar.setHidden(true);
        StatusBar.setNetworkActivityIndicatorVisible(true);

        // StatusBarIOS已经被高版本弃用了 使用StatusBar替代 所以下面代码跑步起来
        // StatusBarIOS.setBarStyle('light-content');
        // StatusBarIOS.setHidden(true);
        // StatusBarIOS.setNetworkActivityIndicatorVisible(true);
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