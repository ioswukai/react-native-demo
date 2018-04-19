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

export default class ViewDemo extends Component<Props> {
    render() {
        return (
            // 必须是一个根view 不能返回多个组件
        <View style={styles.container}>
            {/*渲染导航栏*/}
            <NavigateBar
                component = {this}
            />

            <Text style={styles.textSty}> 我是{this.props.titleName}</Text>
            {/*如果放多个 就必须嵌套*/}
            <View style={styles.bgVSty}>
                <View style={styles.subVSty}>
                    <Text style={styles.textSty}> 我是里面右边的view</Text>
                </View>
                <View style={styles.subVSty}>
                    <Text style={styles.textSty}> 我是里面左边的view</Text>

                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // 占满整个屏幕
        flex:1,
        paddingTop:84,
        backgroundColor:'red',
    },
    bgVSty:{
        flexDirection:'row',
        backgroundColor:'yellow',
        justifyContent:'space-around'
    },
    subVSty:{
        backgroundColor:'green',
    },
    textSty:{
        margin:15,
    },

});