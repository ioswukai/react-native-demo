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

/**----------第一个示例程序-------------*/

// export default class FlexboxDemo extends Component<Props> {
class FlexboxDemo extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <View style={styles.bgVSty}>
                    <Text style={{backgroundColor:'red',height:30,}}> 第一个 </Text>
                    <Text style={{backgroundColor:'green',height:40,}}> 第二个 </Text>
                    <Text style={{backgroundColor:'blue',height:50,}}> 第三个 </Text>
                    <Text style={{backgroundColor:'yellow',height:60,}}> 第四个 </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:84,
        backgroundColor:'white',
    },
    bgVSty:{
        // 改变主轴的方向
        flexDirection:'row',
        // 设置主轴对齐方式
        justifyContent:'space-around',
        // 确定伸缩轴方向
        alignItems:'center',
        backgroundColor:'gray',
    },

});

/**----------第二个示例程序-------------*/
// export default class FlexboxDemo1 extends Component<Props> {
class FlexboxDemo1 extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <View style={styles1.bgVSty}>
                    <Text style={{backgroundColor:'red',width:80,}}> 第一个 </Text>
                    <Text style={{backgroundColor:'green',width:90,}}> 第二个 </Text>
                    <Text style={{backgroundColor:'blue',width:100,}}> 第三个 </Text>
                    <Text style={{backgroundColor:'yellow',width:110,}}> 第四个 </Text>
                </View>
            </View>
        );
    }
}

const  styles1 = StyleSheet.create({
    bgVSty:{
        backgroundColor:'orange',
        // 改变主轴的方向
        flexDirection:'row',
        // 设置主轴对齐方式
        justifyContent:'flex-start',
        // 确定伸缩轴方向
        alignItems:'center',
        // 显示不下 换一行
        flexWrap:'wrap',
    },
});

/**----------第三个示例程序-------------*/
export default class FlexboxDemo2 extends Component<Props> {
// class FlexboxDemo2 extends Component<Props> {

        render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <View style={styles2.bgVSty}>
                    <Text style={{backgroundColor:'red',flex:1, height:60,alignSelf:'flex-start'}}> 第一个 </Text>
                    <Text style={{backgroundColor:'green',flex:3,height:70,alignSelf:'flex-end'}}> 第二个 </Text>
                    <Text style={{backgroundColor:'blue',flex:2,height:80}}> 第三个 </Text>
                    <Text style={{backgroundColor:'yellow',flex:1,height:90}}> 第四个 </Text>
                </View>
            </View>
        );
    }
}

const  styles2 = StyleSheet.create({
    bgVSty:{
        backgroundColor:'purple',
        // 改变主轴的方向
        flexDirection:'row',
        // 设置主轴对齐方式
        justifyContent:'flex-start',
        // 确定伸缩轴方向
        alignItems:'center',
    },
});