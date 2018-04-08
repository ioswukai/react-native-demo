/**
 * Created by apple on 2018/3/15.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
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


export default class QQLoginUIDemo extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                {/**头像*/}
                <Image  source={require('../img/icon.png')} style={styles.iconSty}/>
                {/**账号和密码*/}
                <TextInput
                    placeholder={'请输入用户名'}
                    style={styles.textInputSty}
                    clearButtonMode={'always'}

                />
                <TextInput
                    placeholder={'请输入用密码'}
                    secureTextEntry={true}
                    style={styles.textInputSty}
                    clearButtonMode={'always'}

                />
                {/**登录*/}
                <View style={styles.loginBtnSty}>
                    <Text style={{color:'white'}}>登录</Text>
                </View>
                {/**设置*/}
                <View style={styles.settingSty}>
                    <Text>无法登录</Text>
                    <Text>新用户</Text>
                </View>
                {/**其他的登录方式*/}
                <View style={styles.otherLoginSty}>
                    <Text>其他登录方式</Text>
                    <Image source={require('../img/icon.png')} style={styles.otherImgSty}/>
                    <Image source={require('../img/icon.png')} style={styles.otherImgSty}/>
                    <Image source={require('../img/icon.png')} style={styles.otherImgSty}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:84,
        backgroundColor:'#dddddd',
        // 设置伸缩轴对齐方式
        alignItems:'center',
    },
    iconSty:{
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:2,
        borderColor:'white',
        marginTop:30,
        marginBottom:30,
    },
    textInputSty:{
        height:38,
        backgroundColor:'white',
        marginBottom:1,
        marginLeft:0,
        marginRight:0,
        alignSelf:'stretch',
        paddingLeft:15,
        paddingRight:15,
        // 输入内容居中
        textAlign:'center',


    },
    loginBtnSty:{
        height:35,
        backgroundColor:'blue',
        width:width*0.9,
        marginTop:30,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
    },
    settingSty:{
        // 设置主轴方向
        flexDirection:'row',
        // backgroundColor:'red',
        justifyContent:'space-between',
        width:width*0.9,
    },
    otherLoginSty:{
        // backgroundColor:'red',
        // 设置主轴方向
        flexDirection:'row',
        // 设置伸缩轴对齐
        alignItems:'center',
        // 设置绝对定位
        position:'absolute',
        bottom:10,
        left:20,
    },
    otherImgSty:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:8,
    },
});