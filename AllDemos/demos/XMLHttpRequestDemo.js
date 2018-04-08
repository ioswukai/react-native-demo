/**
 * Created by apple on 2018/4/3.
 */


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

/*************************第一个例子 XMLHttpRequestDemo*******************************/
/*
    XMLHttpRequest基于iOS网络API实现。需要注意与网页环境不同的地方就是安全机制：你可以访问任何网站，
    没有跨域的限制。
    作为开发者来说，你通常不应该直接使用XMLHttpRequest，因为它的API用起来非常冗长。
    不过这一API的实现完全兼容浏览器，因而你可以使用很多npm上已有的第三方库，
    例如frisbee或是axios。(不过我们还是推荐你使用fetch)

    Fetch
    fetch是一个更好的网络API，它由标准委员会提出，并已经在Chrome中实现。它在React Native中也默认可以使用。

    WebSocket 套接字 长连接
    WebSocket是一种基于TCP连接的全双工通讯协议。
*/

let URLStr = 'http://www.baidu.com/';
export default class XMLHttpRequestDemo extends Component<Props> {
    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doXMLHttpRequest()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>使用XMLHttpRequest请求百度</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doFetch()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>使用fetch请求百度</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doWebSocket()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>使用WebSocket请求百度</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    doXMLHttpRequest(){
        // 实例化请求对象
        let request = new XMLHttpRequest();

        // 请求结果回调处理
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log('success', request.responseText);
            } else {
                console.warn('error');
            }
        };

        // 设置请求网址和请求方式
        request.open('GET', URLStr);
        // 发送网络请求
        request.send();

        // XMLHttpRequest请求的另一种写法
        this.doAnotherXMLHttpRequest();
    }

    doAnotherXMLHttpRequest(){
        // 实例化请求对象
        let request = new XMLHttpRequest();

        // 设置函数回调
        function onLoad() {
            console.log(request.status);
            console.log(request.responseText);
        };

        function onTimeout() {
            console.log('Timeout');
            console.log(request.responseText);
        };

        function onError() {
            console.log('General network error');
            console.log(request.responseText);
        };

        // 设置实例回调属性
        request.onload = onLoad;
        request.ontimeout = onTimeout;
        request.onerror = onError;

        // 设置请求网址和请求方式
        request.open('GET', URLStr);
        // 发送网络请求
        request.send();
    }


    doFetch(){
        this.postRequest(URLStr,{a:'haha'},(result)=>{
            // 打印结果
            console.log(result);
        })
    }

    // 封装一个fetch的POST方法
    postRequest=(url,params,callBack)=>{
        // 自定义HTTP请求中的一些部分，这个参数是可选的
        let opts = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        };
        // 译注：如果你的服务器无法识别上面POST的数据格式，那么可以尝试传统的form格式，代码如下：
        // let opts = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: 'key1=value1&key2=value2'
        // };

        // 发起网络请求  异步操作
        // 使用then和catch指定回调函数：
        // 注意：Promise可能会被拒绝，此时会抛出一个错误。你需要自己catch这个错误，否则可能没有任何提示。
        // 设置请求配置
        fetch(url,opts)

            // 得到response对象并处理对象 得到想要的数据responseText
            .then((response) => response.text())

            // 对处理后的数据responseText进行操作
            .then((responseText) => {
                // 将得到的数据回调回去
                if(callBack){
                    callBack(responseText);
                }
            })

            // 捕获异常
            .catch((error) => {
                console.log(error);
            });
    }


    doWebSocket(){
        /*WebSocket 是套接字 这么没有后台实验不了*/
        // let ws = new WebSocket('ws://host.com/path');

        let  ws = new WebSocket(URLStr);

        ws.onopen = () => {
            // 建立连接
            ws.send('something');
        };

        ws.onmessage = (e) => {
            // 收到了消息
            console.log(e.data);
        };

        ws.onerror = (e) => {
            // 有错误发生
            console.log(e.message);
        };

        ws.onclose = (e) => {
            // 连接关闭
            console.log(e.code, e.reason);
        };
    }
}

const styles = StyleSheet.create({
    bgVSty:{},
});