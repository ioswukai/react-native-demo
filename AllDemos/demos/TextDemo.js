

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

/*************************第一个例子 TextDemo*******************************/

export default class TextDemo extends Component<Props> {
    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doSomething()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>我是{NavigateBar.getComponentName(this)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    doSomething(){

    }
}

const styles = StyleSheet.create({
    bgVSty:{},
});