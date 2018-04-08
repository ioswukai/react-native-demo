/**
 * Created by apple on 2018/3/29.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Platform,

    View
} from 'react-native';

import Dimensions from 'Dimensions';
var {width} = Dimensions.get('window');

type Props = {};
export default class NavigateBar extends Component<Props> {
    static defaultProps = {
        // 可以不设置 默认显示 当前route的title
        title:'',
        // 必须设置 组件
        component:null,
        // 默认是需要返回按钮
        needBackBtn:true,
        // 默认是pop事件，可以自定义
        backAction:null,
    }

    // 返回当前页面的name
    static getComponentName(theComponent){

        let titleName = '';
        let component = theComponent;
        if (!component){
            // 没有传递组件
            return;
        }

        // 取得组件的navigator
        let navigator = component.props.navigator;
        // 取得navigator当前所有的路由
        let routes = navigator.getCurrentRoutes();
        // 取得当前的路由
        let currentRoute = routes[routes.length - 1];

        /* 取得当前路由的名称
         组件的名称取决于 你push的时候给传递的字段名
         如：上一个页面这样写
         this.props.navigator.push({
         name:demoName,
         component:demo,
         });
         那么此处取currentComponentName就应该是
         let currentComponentName = rotue.name;

         又比如：上一个页面这样写
         this.props.navigator.push({
         title:demoName,
         component:demo,
         });
         那么此处取currentComponentName就应该是
         let currentComponentName = rotue.title;
         */
        let currentTitleName = currentRoute.name;

        if(!currentTitleName){
            // 如果前面写错了 不是传递的name 取值title试试
            currentTitleName = currentRoute.title;
        }
        // 设置路由的title
        titleName = currentTitleName;

        return titleName;
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            titleName:'',
        };
      }

      // 组件加载完
    componentDidMount() {
        let  titleName = '';
        if(this.props.title){
            // 设置了 显示当前
            titleName = this.props.title;
        }else {
            titleName = NavigateBar.getComponentName(this.props.component);
        }

        // 更改状态机
        this.setState({
            titleName:titleName,
        });
    }

    // 渲染页面
    render(){
        if (this.props.needBackBtn){
            return(
                <View style={styles.navOutViewSty}>
                    <TouchableOpacity onPress={()=>{this.clickBackBtn()}} style={styles.rightViewSty}>
                        <View style={styles.leftVSty}>
                            {/*返回按钮图片*/}
                            <Image source={{uri:'back_black'}} style={{width:9,height:16,}}/>
                            {/*返回文本*/}
                            <Text style={{color:'#333333',fontSize:16,marginLeft:5,}}>返回</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={ styles.titleVSty}>
                        {/*标题*/}
                        <Text style={{color:'#333333',fontSize:16,fontWeight:'bold'}}>{this.state.titleName}</Text>
                    </View>
                </View>
            );
        }

        return(
            <View style={styles.navOutViewSty}>
                <View style={ styles.titleVSty}>
                    {/*标题*/}
                    <Text style={{color:'#333333',fontSize:16,fontWeight:'bold'}}>{this.state.titleName}</Text>
                </View>
            </View>
        );
    };

    // 点击了返回
    clickBackBtn(){
        let component = this.props.component;
        let navigator = component.props.navigator;
        // console.log(component);
        // console.log(component.props.navigator);

        if (!component){
            // 没有传递组件
            return;
        }

        if(!(this.props.backAction)){
            // 没有自定义返回事件 返回上级页面
            navigator.pop();
            return;
        }

        // 自定义了返回事件
        this.props.backAction();

    }

    // 销毁
    componentWillUnmount() {
        console.log('CustomNavigateBar 组件被销毁');
    }
}

const styles = StyleSheet.create({
    navOutViewSty:{
        // 使用绝对布局
        position:'absolute',
        top:0,
        // ios导航栏默认高度是64 安卓是50
        height: Platform.OS === 'ios' ? 64:50,
        width:width,
        backgroundColor:'orange',
        // 设置主轴方向
        flexDirection:'row',
        // 垂直居中
        alignItems:'center',
        paddingTop: Platform.OS === 'ios' ? 15:0,
    },
    leftVSty:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        width:65,
        height: Platform.OS === 'ios' ? 49:50,
    },
    titleVSty:{
        width:width-2*(50+15),
        height: Platform.OS === 'ios' ? 49:50,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:Platform.OS === 'ios' ? 15:0,
        left:65,
    }
});