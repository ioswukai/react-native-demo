/**
 * Created by apple on 2018/3/16.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    Image,
    View,
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

/***------------第一个例子------------***/
// export default class ScrollViewDemo extends Component<Props> {
class ScrollViewDemo extends Component<Props> {

    render() {
        return (
        <ScrollView
            // 标记组件
            ref="scrollView"
            // 横向排列子组件
            // horizontal={true}
            // 隐藏水平滚动条
            // showsHorizontalScrollIndicator={false}
            // 分页效果
            pagingEnabled={true}
            // 不带弹性
            // bounces={false}
            // 不可滚动
            // scrollEnabled={false}
            // 设置ScrollView样式
            contentContainerStyle={styles.contentContainerSty}
        >
            {/*ScrollView 要点
             a.ScrollView必须要有一个确定的高度，才能正常工作，他实际上
             所做的就是将一系列不确定高度的子组件，装进一个确定高度的容器（
             通过滚动操作），通常有两种做法
             1. 直接给ScrollView进行设置高度（不建议）
             2. ScrollView中不要加{flex：1} 因为只要内容有高度，
             scrollView就有了高度

             b.ScrollView内部的其他响应者无法阻止ScrollView本身成为响应者，
             既：ScrollView的响应是在他所有子组件的最上层
             */}
            {this.renderChildView()}
        </ScrollView>
        );
    }

    renderChildView(){
        // 数组
        var allChild =[];
        var colors =['red','green','blue','yellow','purple'];
        // 遍历
        for (var  i =0 ;i<5;i++){
            allChild.push(
                <View key = {i} style={{backgroundColor:colors[i],width:375,height:120}}>
                    <Text>{i}</Text>
                </View>
            );
        }

        // 返回
        return allChild;
    }
}

const styles = StyleSheet.create({
    contentContainerSty:{
        paddingVertical:100,
    },
});



/***------------第二个例子------------***/

import BadgeData from './BadgeData.json';

// 引入dimensions
import  Dimensions from 'Dimensions';

// 设置屏幕宽度
var {width} = Dimensions.get('window');

export default class ScrollViewDemo1 extends Component<Props> {

    // 设置固定值 Props
    static  defaultProps={
        // 每隔多少时间
        duration:1000,
    };

    // 设置state
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 当前的页码
            currentPage:0,
        };
      }

      // 将要显示
    componentWillMount() {
    }

    // 渲染
    render() {
        return (
            <View style={styles1.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    // 隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    // 自动分页
                    pagingEnabled={true}
                    contentContainerStyle={styles1.contentSty}
                    // 当一帧滚动结束
                    onMomentumScrollEnd={(e)=>this.svScrolled(e)}
                    // 当开始拖拽
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    // 停止拖拽
                    onScrollEndDrag={this.onScrollEndDrag}
                    automaticallyAdjustContentInsets={false}
                >
                    {this.randerAllImage()}

                </ScrollView>

                // 返回指示器
                <View style={styles1.pageVSty}>
                    // 返回5个原点
                    {this.randerPageCircle()}
                </View>

            </View>
        );
    }

    // 已经显示了 实现一些复杂的操作
    componentDidMount() {
        // 开启定时器
        this.startTimer();
    }

    // 卸载组件
    componentWillUnmount() {
        // 停止定时器
        this.stopTimer();
    }

    // 自定义方法
    // 返回所有的图片
    randerAllImage(){
        // 定义数组
        var  allImages = [];
        // 遍历
        for (var i =0 ; i<BadgeData.data.length; i++){
            // 取出单个图片对象
            var badge = BadgeData.data[i];
            // console.log(badge);
            // 创建组件装入数组
            allImages.push(
                <Image key = {i} source={{uri:badge.icon}} style={styles1.bannerSty}/>
            );
        }
        return allImages;
    }

    // 返回所有的圆点
    randerPageCircle(){
        // 定义个数组 放置所有的原点
        var indicatorArr = [];

        var style ;
        // 遍历
        for (var i =0 ; i<BadgeData.data.length; i++){
            // 判断样式
            style = (i==this.state.currentPage)?{backgroundColor:'orange'}:{backgroundColor:'white'};

            // 把原点装入数组
            indicatorArr.push(
                // 原点  一个style放两个样式 使用中括号以逗号相隔   [样式1,样式2]
                <View key={i} style={[styles1.indicatorSty,style]}/>
            );
        }
        return indicatorArr;
    }

    // 当一帧滚动结束的时候调用   e就是ScrollView 是 onMomentumScrollEnd传递下来的
    svScrolled(e){
        // 1.求出水平方向的偏移量
        var offSetX = e.nativeEvent.contentOffset.x;
        // var offSetY = e.nativeEvent.contentOffset.y;
        // console.log(offSetY);



        // 2.求出当前的页数
        var  currentPage = Math.floor(offSetX/width);
        // console.log(currentPage);

        // 3.更新状态机，重新绘制UI
        this.setState({
            currentPage:currentPage,
        });
    }

    // 开启定时器
    startTimer(){
            // 1.拿到ScrollView
            var scrollView = this.refs.scrollView;
            var imgCount = BadgeData.data.length;

            // 2. 添加定时器
            this.timer = setInterval(()=>{
                // console.log('1');

                // 2.1 设置原点
                var activePage = 0;
                // 2.2 判断
                if((this.state.currentPage+1) >= imgCount){
                    // 越界
                    activePage = 0;
                }else {
                    //
                    activePage = this.state.currentPage+1;
                }

                // 2.3 更新状态机
                this.setState({
                    currentPage:activePage,
                });

                // 2.4 让ScrollView滚动起来
                var offSetX = activePage * width;
                scrollView.scrollResponderScrollTo({x:offSetX,animated:true});

            }, this.props.duration);
    }

    // 停止定时器
    stopTimer=()=>{
        console.log('调用了销毁定时器');
        this.timer && clearInterval(this.timer);

    }

    // 调用开始拖拽 重写父类的方法
    onScrollBeginDrag =()=>{
        // 停止定时器
        this.stopTimer();
    }

    // 调用停止拖拽 重写父类的方法
    onScrollEndDrag=()=>{
        // 开启定时器
        this.startTimer();
    }

}

const styles1 = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:84,
        backgroundColor:'white',
    },
    contentSty:{
        height:200,
        // backgroundColor:'#F5FCFF',
        backgroundColor:'red',
    },
    bannerSty:{
        width:width,
        height:200,
        resizeMode:'contain',
    },
    pageVSty:{
        width:width,
        height:25,
        // 设置透明
        backgroundColor:'rgba(0,0,0,0.2)',
        // 定位
        position:'absolute',
        top:200+64+36-25,
        // 设置主轴的方向
        flexDirection:'row',
        // 设置伸缩轴方向对齐
        alignItems:'center',
    },
    indicatorSty:{
        height:8,
        width:8,
        borderRadius:4,
        marginLeft:4,
    },
});
