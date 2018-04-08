/**
 * Created by apple on 2018/3/27.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    WebView,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');

/**************************第一个例子*****************************/
// export default  class  Web extends Component<>{
class  Web extends Component<>{

    render(){
        return(
            <View style={styles.container}>
                <WebView
                    style={styles.webSty}
                    // 不自动调整类容部分
                    automaticallyAdjustContentInsets={false}

                    // 回弹效果
                    bounces={true}

                    // 内部偏移量
                    contentInset={{top:0,left:0,bottom:0,right:0}}

                    // 来源可以是  uri 也可以是 html
                    source={{uri: 'http://weibo.com/vczero'}}
                    // source={{uri: 'hahha'}}

                    // 安卓特有 ios上默认是有js交互的
                    javaScriptEnabled={true}

                    // 安卓特有 是否可以domStorage
                    domStorageEnabled={true}

                    // 在加载webView的时候 注入的js代码字符串
                    injectedJavaScript="alert('欢迎使用React Native')"

                    // 该适合iOS平台，该允许拦截WebView加载的URL地址，进行自定义处理。
                    // 该方法通过返回true或者falase来决定是否继续加载该拦截到请求
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}

                    // 监听网址变化的函数
                    onNavigationStateChange={(state)=>{this.navChange(state)}}

                    // 监听渲染页面出错的函数
                    renderError={(error)=>{this.renderErr(error)}}

                    // 是否开启页面加载的loading动画
                    startInLoadingState={true}

                    // webview组件渲染页面的时候，触发该函数，需要同startInLoadingState一起使用，
                    // 当startInLoadingState为true,此函数才起作用
                    renderLoading={()=>{this.renderLoadingMethod()}}

                    // true表示webview可以滚动 false不可滚动
                    scrollEnabled={true}

                    // 按照页面比例和类容宽高比例，自动缩放页面内容
                    scalesPageToFit={true}

                />
            </View>
        );
    }

    // ios 是否应该加载网址
    onShouldStartLoadWithRequest = (event) => {
        console.log('是否应该加载网址：'+event.url);

        // 判断url 返回true是加载  false 是不加载网址
        // if(event.url=='https://m.weibo.cn/p/1005052762275212') return false;

        /*
         安卓不支持此方法，因为它没有提供这个接口
         我们搞了一个讨巧的方法，不完美。
         1.方案一
         在React Native js代码里面响应onNavigationStateChange,
         然后通过this.refs["webView"].stopLoading()来停止当前WebView的加载，
         达到和onShouldStartLoadWithRequest相似的效果。
         但是stopLoading之后那个被点击的链接会一直处于高亮状态。难受!

         2.方案二
         目前是通过react native的native module封装一套自定义的webview 提供给rn js端使用。
         原生封装拦截所有的url请求，发送通知消息给js。然后在js的事件监听里面做相应处理
         若不需要拦截，调用原生自定义webview提供的自定义的loadUrl方法加载
         原生封装核心代码:

         @Override
         public boolean shouldOverrideUrlLoading(WebView view, String url) {
         Uri uri = Uri.parse(url);
         WritableMap eventData = createWebViewEvent(view, url);
         // 发送消息给js
         dispatchEvent(view, new shouldOverrideUrlLoadingEvent(view.getId(), eventData));
         return true;// return true 表示不请求。也就是拦截了所有url跳转。到js
         }

        */

        return true;
    };

    // 网址发生变化
    navChange(state){
        console.log('webView加载的网址是:'+ state.url);
    }

    // 页面渲染出错
    renderErr(error){
        console.log(error);
    }

    // 组件渲染页面
    renderLoadingMethod(){
        console.log('组件开始渲染页面');
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:74,
        backgroundColor:'white',
    },
    webSty:{
        width:width,
        height:height - 64,
    },

});


/**************************第一个例子*****************************/
export default  class  Web1 extends Component<>{
    render(){
        return(
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <WebView
                    style={styles.webSty}
                    // 不自动调整类容部分
                    automaticallyAdjustContentInsets={false}

                    // 内部偏移量
                    contentInset={{top:-10,left:-10,bottom:0,right:0}}

                    // 来源可以是  uri 也可以是 html
                    source={{html: '<div><img src="http://vczero.github.io/ctrip/star_page.jpg" /></div>>'}}
                    // 图片的高度完全填充
                    // source={{html: '<div><img src="http://vczero.github.io/ctrip/star_page.jpg" height="100%" /></div>>'}}

                    // true表示webview可以滚动 false不可滚动
                    scrollEnabled={false}

                    // 按照页面比例和类容宽高比例，自动缩放页面内容
                    scalesPageToFit={true}

                />
            </View>
        );
    }
}