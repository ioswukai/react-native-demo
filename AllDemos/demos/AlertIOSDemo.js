/**
 * Created by apple on 2018/3/30.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    AlertIOS,
    ActionSheetIOS,

    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 AlertIOS*******************************/
/*
 AlertIOS的静态方法有两个
 alert(title,message,buttons)
 prompt(title,value,buttons)  buttons是按钮对象数组，格式如下
    [
        {
        text:'取消',
             onPress:function(){
            alert('你点击了取消按钮');
            }
        },
    ]

 默认情况下，数组里面的最后一个元素是高亮的显示的，如果数组按钮长度过长，按钮就会垂直排布。
 */
// export default class AlertIOSDemo extends Component<Props> {
class AlertIOSDemo extends Component<Props> {

        render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.tip()}}>
                    <Text style={styles.bgVSty}> 提示对话框</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.input()}}>
                    <Text  style={styles.bgVSty}> 输入对话框</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //  提示对话框
    tip(){
        AlertIOS.alert('提示','选择学习React Native',[
            {
                text:'取消',
                onPress:function(){
                    alert('你点击了取消按钮');
                }
            },
            {
                text:'确认',
                onPress:function(){
                    alert('你点击了确认按钮');
                }
            },
        ])
    }

    //  输入对话框
    input(){
        AlertIOS.prompt('提示','使用React Native开发',[
            {
                text:'取消',
                onPress:function(){
                    alert('你点击了取消按钮');
                }
            },
            {
                text:'确认',
                onPress:function(){
                    alert('你点击了确认按钮');
                }
            },
        ])
    }
}


/*************************第二个例子 AlertSheetIOS*******************************/
/*
 AlertSheetIOS 的静态方法有两个
 showActionSheetWithOptions(options字符串数组,点击按钮回调函数 返回索引)
 showShareActionSheetWithOptions({需要分享的网址 url:''},失败回调,成功回调)
 */
// export default class AlertSheet extends Component<Props> {
class AlertSheet extends Component<Props> {

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.tip()}}>
                    <Text style={styles.bgVSty}> showActonsSheetWithOptons</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.share()}}>
                    <Text  style={styles.bgVSty}> showShareActonsSheetWithOptons</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //  提示对话框
    tip(){
        ActionSheetIOS.showActionSheetWithOptions({
            // （字符串数组） - 一组按钮的标题（必选）
            options:[
                '拨打电话',
                '发送邮件',
                '发送短息',
                '取消',
            ],
            // 整型 - 选项中取消按钮所在的位置（索引）
            cancelButtonIndex:3,
            // 整型 - 选项中默认选中按钮所在的位置（索引）
            destructiveButtonIndex:1,
            // 字符串 - 弹出框顶部的标题
            title:'我是标的',
            // 字符串 - 弹出框顶部标题下方的信息
            message:'我是信息',
        },function (index){
            // 回调函数
            alert(index);
        });
    }

    //  输入对话框
    share(){
        ActionSheetIOS.showShareActionSheetWithOptions({
            //  需要分享的网址
            url:'https://code.facebook.com',
        },function (err) {
            // 分享失败的回调函数
            alert(err);
        },function (success) {
            // 分享成功的回调函数
            alert(success);
        });
    }
}

/*************************第三个例子 Alert*******************************/
/*
 Alert 启动一个提示对话框，包含对应的标题和信息。
 你还可以指定一系列的按钮，点击对应的按钮会调用对应的onPress回调并且关闭提示框。
 默认情况下，对话框会仅有一个'确定'按钮。
 本接口可以在iOS和Android上显示一个静态的提示框。
 如果要在显示提示框的同时接受用户输入一些信息，那你可能需要AlertIOS。

 在iOS上你可以指定任意数量的按钮。每个按钮还都可以指定自己的样式，
 此外还可以指定提示的类别。参阅AlertIOS来了解更多细节。

 在Android上最多能指定三个按钮，这三个按钮分别具有“中间态”、“消极态”和“积极态”的概念：
 如果你只指定一个按钮，则它具有“积极态”的属性（比如“确定”）；
 两个按钮，则分别是“消极态”和“积极态”（比如“取消”和“确定”）；
 三个按钮则意味着“中间态”、“消极态”和“积极态”（比如“稍候再说”，“取消”，“确定”）。

 Alert 的静态方法只有一个
 alert(title: string, message?: string, button?: Buttons, type?: AlertType) #

 */
export default class AlertDemo extends Component<Props> {
// class AlertDemo extends Component<Props> {

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.tip()}}>
                    <Text style={styles.bgVSty}> 普通的弹框</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.share()}}>
                    <Text  style={styles.bgVSty}> 多个按钮的弹框</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //  提示对话框
    tip(){
        Alert.alert(
            '我是标题',
            '我是消息',
            [
                {text: '取消', onPress: () => alert('点击了取消')},
                {text: '确定', onPress: () => alert('点击了确定')},
            ]
        )
    }

    //  输入对话框
    share(){
        Alert.alert(
            '我是标题',
            '我是消息',
            '..............'.split('').map((dot, index) => ({
                text: 'Button ' + index,
                onPress: () => alert('点击了按钮 ' + index)
            }))
        )
    }
}





const styles = StyleSheet.create({
    bgVSty:{
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        height:30,
        borderWidth:1,
        padding:6,
        borderColor:'#e8e8e8',
    },
});