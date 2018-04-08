/**
 * Created by apple on 2018/3/30.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    AppState,
    // 这个在高版本被剔除了无法使用
    // AppStateIOS,

    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 AppStateIOSDemo*******************************/
/*
 AppStateIOS能告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你。
 通常在处理推送通知的时候用来决定内容和对应的行为。

 以下是AppStateIOS的静态属性和方法

 currentState:要获取当前的状态，你可以使用AppStateIOS.currentState，
 这个变量会一直保持更新，不过在启动的过程中，currentState可能为null，
 直到AppStateIOS从原生代码得到通知为止

 addEventListener(type,handler):静态方法，用于添加时间监听
 removeEventListener(type,handler):静态方法，用于删除时间监听

 iOS App States
 active - 应用正在前台运行
 background - 应用正在后台运行。用户既可能在别的应用中，也可能在桌面。
 inactive - 这是一个过渡状态，发生在前后台切换时期，比如（双击HOME键）进入多任务窗口或是此时有来电。
 */
// export default class AppStateIOSDemo extends Component<Props> {
class AppStateIOSDemo extends Component<Props> {

    // 因为这个AppStateIOS在高版本被剔除了无法使用 所以此demo无法跑起来
        // 构造
      constructor(props) {
        super(props);
        let theState  = AppStateIOS.currentState;
          if (!theState){
            theState = '我是最最初始的状态';
        }
        // 初始状态
        this.state = {
            currentAppState: theState,
        };
      }

    componentDidMount() {
        AppStateIOS.addEventListener('change',this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppStateIOS.removeEventListener('change',this._handleAppStateChange);
    }

    // 状态改变了
    _handleAppStateChange=(currentAppState)=>{
        this.setState({ currentAppState, });
    }

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <Text> 当前app的运行状态是我是{this.state.currentAppState}</Text>
            </View>
        );
    }
}

/*************************第二个例子 AppStateDemo*******************************/
/*
 AppState（此组件能用于Android）能告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你。
 通常在处理推送通知的时候用来决定内容和对应的行为。

 用我完全同AppStateIOS
 */
export default class AppStateDemo extends Component<Props> {
// class AppStateDemo extends Component<Props> {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentAppState: AppState.currentState,
        };
    }

    componentDidMount() {
        AppState.addEventListener('change',this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change',this._handleAppStateChange);
    }

    // 状态改变了
    _handleAppStateChange=(currentAppState)=>{
        this.setState({ currentAppState, });
    }

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <Text> 当前app的运行状态是我是{this.state.currentAppState}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgVSty:{},
});