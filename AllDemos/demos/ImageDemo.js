/**
 * Created by apple on 2018/3/14.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    View,
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

/****---------------第一个例子-------------------***/

// export default class ImageDemo extends Component<Props> {
class ImageDemo extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <View style={styles.bgVSty}>
                    {/**从项目中加载图片*/}
                    <Text style={styles.titleSty}>1.从项目中加载图片</Text>
                    <Image source={require('../img/icon.png')} style={styles.imageSty}/>

                    {/**从资源包中加载图片*/}
                    <Text style={styles.titleSty}>2.从APP中加载图片</Text>
                    <Image source={{uri:'bd_logo1'}} style={styles.imageSty}/>

                    {/**从网络中加载图片*/}
                    <Text style={styles.titleSty}>3.从网络中加载图片</Text>
                    <Image source={{uri:'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg'}} style={styles.imageSty}/>

                    {/**用图片设置背景图*/}
                    <Text style={styles.titleSty}>4.用图片设置背景图</Text>
                    <ImageBackground source={{uri:'bd_logo1'}} style={styles.imageBgSty}>
                        <Text style={styles.textSty}>我是文字</Text>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:84,
    },
    bgVSty:{
        justifyContent:'center',
        alignItems:'center',
    },
    titleSty:{
        marginTop:20,
    },
    textSty:{
        fontSize:20,
        color:'red',
    },
    imageSty:{
        width:100,
        height:100,
        backgroundColor:'red',

        // 设置图片的内容模式 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。

        /* 默认是cover 在保持图片宽高比的前提下缩放图片，
        直到宽度和高度都大于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。
        译注：这样图片完全覆盖甚至超出容器，容器中不留任何空白。*/
        // resizeMode:'cover',
        /* contain 在保持图片宽高比的前提下缩放图片，
        直到宽度和高度都小于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。
        译注：这样图片完全被包裹在容器中，容器中可能留有空白*/
        // resizeMode:'contain',
        /*stretch拉伸图片且不维持宽高比，直到宽高都刚好填满容器。*/
        resizeMode:'stretch',
    },
    imageBgSty:{
        width:100,
        height:100,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    }
});

/****---------------第二个例子-------------------***/

// 导入json数据
import BadgeData from './BadgeData.json';

// 定义一些全局的变量
import Dimensions from 'Dimensions';
var {width} = Dimensions.get('window');
var  cols = 3;
var  boxW  = 100;
var  vMargin = (width - cols*boxW)/(cols +1);
var  hMargin = 25;

export default class ImageDemo1 extends Component<Props> {
// class ImageDemo1 extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <View style={styles1.bgVSty}>
                    {/*返回6个包 此处调用函数需要用大括号*/}
                    {this.renderAllBadges()}
                </View>
            </View>
        );
    }

    // 返回所有的包
    renderAllBadges(){
        // 定义数组装所有的值组件
        var allBadge = [];
        // 变量json数据
        for (var i=0;i<BadgeData.data.length; i++){
            // 取出单独的数据对象
            var badge = BadgeData.data[i];
            // 直接转入数组
            allBadge.push(
                <View key={i}  style={styles1.outViewSty}>
                    <Image style={styles1.imageSty} source={{uri:badge.icon}}/>
                    <Text style={styles1.textSty}>{badge.title}</Text>
                </View>
            );
        }
        // 返回数组
        return allBadge;
    }

}


const styles1 = StyleSheet.create({
    bgVSty:{
        backgroundColor:'#F5FCFF',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    outViewSty:{
        backgroundColor:'red',
        alignItems:'center',
        width:boxW,
        // height:boxW,
        marginLeft:vMargin,
        marginTop:hMargin,
    },
    imageSty:{
        width:80,
        height:80,
    },
    textSty:{
        color:'yellow',
        marginTop:10,
        marginBottom:10,
    },
});