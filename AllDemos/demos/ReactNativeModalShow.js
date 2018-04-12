/**
 * Created by apple on 2018/4/12.
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

/*************************第一个例子 ReactNativeModalShow*******************************/
// 导入第三方库
import Modal from "react-native-modal";


export default class ReactNativeModalShow extends Component<Props> {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible:false,
        };
      }

    componentWillUnmount() {
        this.timerSetTimeout && clearTimeout(this.timerSetTimeout);
    }

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                {/*渲染模态组件*/}
                {this.renderModalComponent()}

                {/*控制组件的显示*/}
                {this.renderShowBtn()}

            </View>
        );
    }

    renderShowBtn(){
          let text = '显示模态组件';
          if(this.state.visible){
              // 显示着模态组件
              text = '隐藏模态组件';
          }
          return(
              <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.makeModalShow()}}>
                  <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                      <Text>{text}</Text>
                  </View>
              </TouchableOpacity>
          );
    }

    makeModalShow(){
        console.log('点击了显示modal');
        this.setState({
            visible:!this.state.visible,
        });
    }

    makeModalHide(){
        console.log('点击了隐藏modal');
        this.setState({
            visible:false,
        });
    }

    alertMsg(msg){
        // 把一个定时器的引用挂在this上
        this.timerSetTimeout = setTimeout(()=>{
            alert(msg);
        },100);
    }
    renderModalComponent(){
        return(
            <Modal
                // 应用在modal上的style
                style={{backgroundColor:'red'}}

                // 通过isVisible控制模态组件的显示和隐藏 默认是false
                isVisible={this.state.visible}

                // string or object; Modal内部组件 显示时候的动画效果 默认是 slideInUp
                animationIn={'slideInLeft'}
                // Modal内部组件 显示时候的时间 默认是 300毫秒
                animationInTiming ={300}

                // string or object; Modal内部组件 隐藏时候的动画效果 默认是 slideOutDown
                animationOut={'slideOutRight'}
                // Modal内部组件 隐藏时候的时间 默认是 300毫秒
                animationOutTiming={300}

                // bool 如果键盘出现 上移modal组件 默认是 false
                avoidKeyboard={false}

                // 背景的颜色 默认是 black
                backdropColor={'darksalmon'}
                // 背景的不透明度 默认是0.7
                backdropOpacity={0.5}
                // 背景显示时候的时间 默认是300ms
                backdropTransitionInTiming={300}
                // 背景隐藏时候的时间 默认是300ms
                backdropTransitionOutTiming={300}

                // 安卓点击了返回按钮 事件监听
                onBackButtonPress={()=>{this.alertMsg('安卓点击了返回按钮')}}
                /* 点击背景 事件监听
                    注意：背景会被Modal遮挡一部分（中间的一大部分红色），点击遮挡的部分
                    是不会回调此函数的，只有点击到背景（中间红色除外的边缘部分）才会执行此函数
                */
                onBackdropPress={() => {this.makeModalHide()}}

                /*Modal完全隐藏 事件监听
                 注意如使用alert弹框 此modal会影响alert动画
                 最好不要使用 若果非要使用 可以延时调用100ms 调用
                 */
                onModalHide={()=>{this.alertMsg('Modal完全隐藏')}}
                /*Modal完全显示 事件监听
                 注意如使用alert弹框 此modal会影响alert动画
                 最好不要使用 若果非要使用 可以延时调用100ms 调用
                 */
                onModalShow={()=>{this.alertMsg('Modal完全显示')}}

                // 横扫背景 需配合swipeDirection使用
                onSwipe={() => {this.makeModalHide()}}
                // 扫动的临界值 默认是100
                swipeThreshold={100}
                // 向右横扫
                swipeDirection="right"

                // 动画的时候 隐藏Modal里的内容 以提高性能 默认false
                hideModalContentWhileAnimating={false}
            >
                <View style={{ flex: 1 ,justifyContent:'center',alignItems:'center'}}>

                    <Text>我是modal组件</Text>

                    {/*渲染关闭按钮*/}
                    {this.renderShowBtn()}

                </View>
            </Modal>
        );
    }


}

const styles = StyleSheet.create({
    bgVSty:{},
});