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

/*************************第一个例子 SetTimeoutDemo*******************************/
/*
    定时器是一个应用中非常重要的部分。React Native实现了和浏览器一致的定时器Timer。
    setTimeout, clearTimeout   : 设置一个定时任务  和 销毁定时任务计时器，
                                  比如：打开app后5秒开始获取用户的位置信息


    setInterval, clearInterval  : 设定循环执行的任务 和 销毁循环执行的任务计时器
                                   比如：首页轮播图，每隔几秒换一张


    setImmediate, clearImmediate  : 主要用于设置立即执行的任务 和 销毁立即执行的任务计时器
                                    比如：我们希望程序启动后，立即发送日历到服务端，便于统计数据


    requestAnimationFrame, cancelAnimationFrame  :用来做动画，能够在动画刷新后执行，
    也就是说上一个动画流会完整的执行。通常，我们使用递归和requestAnimationFrame来实现动画。



    requestAnimationFrame(fn)和setTimeout(fn, 0)不同，前者会在每帧刷新之后执行一次，
    而后者则会尽可能快的执行（在iPhone5S上有可能每秒1000次以上）。



    setImmediate则会在当前JavaScript执行块结束的时候执行，就在将要发送批量响应数据到原生之前。
    注意如果你在setImmediate的回调函数中又执行了setImmediate，
    它会紧接着立刻执行，而不会在调用之前等待原生代码。
    Promise的实现就使用了setImmediate来执行异步调用。


    TimerMixin
    我们发现很多React Native应用发生致命错误（闪退）是与计时器有关。具体来说，是在某个组件被卸载（unmount）之后，
    计时器却仍然被激活。为了解决这个问题，我们引入了TimerMixin。如果你在组件中引入TimerMixin，
    就可以把你原本的setTimeout(fn, 500)改为this.setTimeout(fn, 500)(只需要在前面加上this.)，
    然后当你的组件卸载时，所有的计时器事件也会被正确的清除。
    这个库并没有跟着React Native一起发布。你需要在项目文件夹下输入npm i react-timer-mixin --save来单独安装它。
    var TimerMixin = require('react-timer-mixin');
    var Component = React.createClass({
        mixins: [TimerMixin],
        componentDidMount: function() {
            this.setTimeout(
                () => { console.log('这样我就不会导致内存泄露!'); },
                500
            );
        }
    });

    我们强烈建议您使用react-timer-mixin提供的this.setTimeout(...)来代替setTimeout(...)。这可以规避许多难以排查的BUG。

    !!!译注：Mixin属于ES5语法，对于ES6代码来说，无法直接使用Mixin。如果你的项目是用ES6代码编写，同时又使用了计时器，
    那么你只需铭记在unmount组件时清除（clearTimeout/clearInterval）所有用到的定时器，
    那么也可以实现和TimerMixin同样的效果


    InteractionManager
    原生应用感觉如此流畅的一个重要原因就是在互动和动画的过程中避免繁重的操作。
    在React Native里，我们目前受到限制，因为我们只有一个JavaScript执行线程。
    不过你可以用InteractionManager来确保在执行繁重工作之前所有的交互和动画都已经处理完毕。

    应用可以通过以下代码来安排一个任务，使其在交互结束之后执行：
    InteractionManager.runAfterInteractions(() => {
        // ...需要长时间同步执行的任务...
    });
    我们来把它和之前的几个任务安排方法对比一下：

    requestAnimationFrame(): 用来执行在一段时间内控制视图动画的代码
    setImmediate/setTimeout/setInterval(): 在稍后执行代码。注意这有可能会延迟当前正在进行的动画。
    runAfterInteractions(): 在稍后执行代码，不会延迟当前进行的动画。
    触摸处理系统会把一个或多个进行中的触摸操作认定为'交互'，并且会将runAfterInteractions()的回调函数延迟执行，
    直到所有的触摸操作都结束或取消了。

    InteractionManager还允许应用注册动画，在动画开始时创建一个交互“句柄”，然后在结束的时候清除它。
    var handle = InteractionManager.createInteractionHandle();
    // 执行动画... (`runAfterInteractions`中的任务现在开始排队等候)
    // 在动画完成之后
    InteractionManager.clearInteractionHandle(handle);
    // 在所有句柄都清除之后，现在开始依序执行队列中的任务
*/
export default class SetTimeoutDemo extends Component<Props> {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            width:0,
        };
      }

    render() {
          let css = [];
          css.push(styles.progress);
          if(this.state.width){
              // 设置了宽度
              css.push({width:this.state.width,marginTop:50});
          }

        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doSetTimeout()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>使用setTimeout定时1秒后执行打印</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doSetInterval()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>使用setInterval每秒执行打印</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doSetImmediate()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>使用setImmediate立刻打印</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doRequestAnimationFrame()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>使用requestAnimationFrame开发进度条</Text>
                    </View>
                </TouchableOpacity>

                {/*绘制进度条*/}
                <View style={css}/>
            </View>
        );
    }

    doSetTimeout(){
        // 把一个定时器的引用挂在this上
        this.timerSetTimeout = setTimeout(()=>{
            // 定时1秒后执行打印
            console.log('我是定时1秒后执行的打印');
        },1000);
    }

    doSetInterval(){
        this.timerSetInterval = setInterval(()=>{
            // 每秒执行打印
            console.log('我是每秒执行的打印');
        },1000);
    }

    doSetImmediate(){
        this.timerSetImmediate = setImmediate(()=>{
            // 立刻打印
            console.log('我是立刻打印的信息');
        })
    }

    doRequestAnimationFrame(){
        // 做一个动画的进度条
        // 设置一个requestAnimationFrame
        this.timerRequestAnimationFrame =requestAnimationFrame(()=>{
            // 调用函数  更改宽度
            this.doAnimation();
        });
    }

    doAnimation=()=>{
        // 更改宽度 刷新页面
        this.setState({
            width:this.state.width + 5,
        });

        // 做下一次的动画
        if (this.state.width<290){

            // 先销毁上一次的
            this.timerRequestAnimationFrame && cancelAnimationFrame(this.timerRequestAnimationFrame);

            // 小于290则递归调用 doRequestAnimationFrame 做下一次动画
            this.doRequestAnimationFrame();
        }
        console.log('宽度是：',this.state.width);

        // 判断定时器是否销毁
        // this.props.navigator.pop();
    }

    // 一定要记得销毁定时器 否则内存泄漏
    componentWillUnmount() {
        // 如果存在this.timerSetTimeout，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timerSetTimeout && clearTimeout(this.timerSetTimeout);

        this.timerSetInterval && clearInterval(this.timerSetInterval);

        this.timerSetImmediate && clearImmediate(this.timerSetImmediate);

        this.timerRequestAnimationFrame && cancelAnimationFrame(this.timerRequestAnimationFrame);

        console.log('SetTimeoutDemo 组件被销毁');
    }
}


const styles = StyleSheet.create({
    bgVSty:{},
    progress:{
        height:10,
        width:0,
        marginLeft:10,
        backgroundColor:'#F5CCF5',
        marginTop:10,
    },
});