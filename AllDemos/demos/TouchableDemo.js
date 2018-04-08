/**
 * Created by apple on 2018/3/14.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

// 引入dimensions
import Dimensions from 'Dimensions';
// 取得宽度的两中写法
// 1.直接get('window').width 此时 var width 就不需要大括号了
var width = Dimensions.get('window').width;

// 2.直接get('window') 此时 var width 需要大括号 且大括号里可以写多个{width,height}
// var {width} = Dimensions.get('window');


export default class TouchableDemo extends Component<Props> {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            title:'不透明触摸',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={()=>{this.activeEvent('点击')}}
                    onPressIn={()=>{this.activeEvent('按下')}}
                    onPressOut={()=>{this.activeEvent('抬起')}}
                    onLongPress={()=>{this.activeEvent('长按')}}
                >
                    <View style={styles.innerViewSty}>
                        <Text>常用的事件</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text>{this.state.title}</Text>
                </View>
            </View>
        );
    }

    // 当按下鼠标时
    activeEvent(event) {
        this.setState({
            title:event,
        });
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:84,
        // 设置伸缩轴对齐方式
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    innerViewSty:{
        backgroundColor:'red',
    },
});