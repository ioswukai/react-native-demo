/*************************************** 最新提案 Demo *****************************************/

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

export default class ES6NewestMotion extends Component<Props> {

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
            </View>
        );
    }

    // 组件已经渲染
    componentDidMount() {
        // 1.

    }

    /***************** 1. *****************/

    // 验证

}