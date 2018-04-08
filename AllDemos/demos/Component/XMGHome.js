/**
 * Created by apple on 2018/3/19.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    DeviceEventEmitter,
    TouchableOpacity,
    ScrollView,
    ListView,
    View
} from 'react-native';

// 引入banner的josn
import LocalBanner from './LocalBanner.json';
import ListData from './ListData.json';
import NewsDetail from './XMGNewsDetail';


// 引入dimensions
import  Dimensions from 'Dimensions';
// 设置屏幕宽度
var {width} = Dimensions.get('window');

export default class Home extends Component<Props> {

    static  defaultProps={
        url_banner_api:'https://www.heyunchou.com/frag/100082970/612_100082970.inc',
        url_list_api:'https://www.heyunchou.com/account/130407.do',
    };

    // 初始化方法
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // ListView头部的数据源
            headerDataArr:[],

            // cell的数据源
            dataSource : new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!==r2
            }),
        };
      }

    // 请求网路数据
    componentDidMount() {
        this.loadDataFromNet();
    }

    // 通过fetch取数据
    loadDataFromNet(){

        // 取得banner数据
        this.getBannerData();

        // 取得List数据
        this.getListData();
    }

    // 取得banner数据
    getBannerData(){
        fetch(this.props.url_banner_api)
        // 将得到的数据 转换成json
            .then((response)=>response.json())
            // 处理得到的json数据
            .then((responseData)=>{
                // 拿到网络数据
                var jsonData =responseData;
                // 调用处理网络数据
                this.dealWithBannerData(jsonData);
            })
            .catch((error)=>{
                if(error){
                    var jsonData =LocalBanner;
                    // 调用处理网络数据
                    this.dealWithBannerData(jsonData);
                    // 添加测试断点 看是否拿到数据
                    // debugger;
                    // 特殊处理 出现异常  加载本地
                    console.warn(error);
                }
            })
    }
    // 处理banner网络数据
    dealWithBannerData(jsonData){
        // console.log('得到了banner的网路数据'+jsonData);

        // 更新状态机
        this.setState({
            // ListView 头部banner的数据源
            headerDataArr:jsonData,
        })
    }

    // List数据
    getListData(){
        fetch(this.props.url_list_api)
        // 将得到的数据 转换成json
            .then((response)=>response.json())
            // 处理得到的json数据
            .then((responseData)=>{
                // 拿到网络数据
                var jsonData =responseData.list;

                // 调用处理网络数据
                this.dealWithListData(ListData);
            })
            .catch((error)=>{
                if(error){
                    var jsonData =ListData;
                    // 调用处理网络数据
                    this.dealWithListData(jsonData);
                    // console.warn(error);
                }
            })
    }

    // 处理list数据
    dealWithListData(jsonData){
        // console.log('得到了List的网络数据'+jsonData);

        var  data = jsonData.list;
        // 更新状态机
        this.setState({
            // ListView cell的数据源
            dataSource:this.state.dataSource.cloneWithRows(data),
        })
    }

    // 处理页面
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={styles.contentSty}

                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                />
            </View>
        );
    }

    // 单独的cell
    renderRow=(rowData)=>{
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.pushToNewsDetail(rowData)}}>
                <View style={styles.cellViewSty}>
                    {/*左边*/}
                    <Image style={styles.imageSty} source={{uri:rowData.img}}/>
                    {/*右边*/}
                    <View style={styles.rightViewSty}>
                        <Text style={styles.titleSty}>{rowData.title}</Text>
                        <Text style={styles.subTitleSty}>标的类型：{rowData.subTitle}</Text>
                        <Text style={styles.flowTitleSty}>{rowData.flowTitle}跟帖</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    // 头部
    renderHeader=()=>{
        // 判断
        if (this.state.headerDataArr.length == 0){
            return;
        }
        // console.log('传递时banner的网路数据'+this.state.headerDataArr);
        return(<BannerSV
            // 传递数据对象
            imageDataArr = {this.state.headerDataArr}
            />);
    }

    // 跳转新闻详情
    pushToNewsDetail(data){
        // 生成跳转对象
        var dataJson = {
            component:NewsDetail,
            title:data.title,
            backButtonTitle:'返回',
            passProps:{data}
        };

        // 通知主页面跳转
        DeviceEventEmitter.emit('pushToNewsDetail',dataJson);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:49,
    },
    contentSty:{

    },
    cellViewSty:{
        // 确定主轴方向
        flexDirection:'row',
        padding:10,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:0.5,
    },
    imageSty:{
        width:90,
        height:90,
    },
    rightViewSty:{
        marginLeft:8,
        width:260,
    },
    titleSty:{
        fontSize:16,
        marginBottom:5,

    },
    subTitleSty:{
        color:'gray',
    },
    flowTitleSty:{
        // 绝对定位
        position:'absolute',
        right:10,
        bottom:0,

        // 边框
        borderColor:'gray',
        borderWidth:0.5,
        borderRadius:5,

        padding:3,

        color:'gray',
    },
});


// Banner滚动视图
class BannerSV extends Component<Props> {

    // 设置固定值 Props
    static  defaultProps={
        // 每隔多少时间
        duration:1000,

        // 所有的Image对象数组
        imageDataArr:[]
    };

    // 设置state
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 当前的页码
            currentPage:0,
            // 当前的标题
            title:this.props.imageDataArr[0].title,
        };
    }

    // 将要显示
    componentWillMount() {
    }

    // 渲染
    render() {
        // console.log('渲染时banner的网路数据'+this.props.imageDataArr);
        return (
            <View style={styles1.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    // 隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    // 自动分页
                    pagingEnabled={true}
                    // 当一帧滚动结束
                    onMomentumScrollEnd={(e)=>this.svScrolled(e)}
                    // 当开始拖拽
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    // 停止拖拽
                    onScrollEndDrag={this.onScrollEndDrag}

                    contentContainerStyle={styles1.contentSty}
                    automaticallyAdjustContentInsets={false}
                >
                    {this.randerAllImage()}

                </ScrollView>

                // 返回指示器
                <View style={styles1.pageVSty}>
                    {/**对对应的标题*/}
                    <Text style={{color:'white'}}> {this.state.title}</Text>
                    {/**返回5个原点*/}
                    <View style={{flexDirection:'row',marginRight:10}}>
                        {this.randerPageCircle()}
                    </View>
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
        // console.log('BannerSV 组件被销毁');
    }

    // 自定义方法
    // 返回所有的图片
    randerAllImage(){
        // 定义数组
        var  allImages = [];
        // 遍历
        for (var i =0 ; i<this.props.imageDataArr.length; i++){
            // 取出单个图片对象
            var badge = this.props.imageDataArr[i];
            // console.log(badge);
            // 创建组件装入数组
            allImages.push(
                <Image key = {i} source={{uri:'https://www.heyunchou.com'+badge.image}} style={styles1.bannerSty}/>
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
        for (var i =0 ; i<this.props.imageDataArr.length; i++){
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
            title:this.props.imageDataArr[currentPage].title,
        });
    }

    // 开启定时器
    startTimer(){
        // 1.拿到ScrollView
        var scrollView = this.refs.scrollView;
        var imgCount = this.props.imageDataArr.length;

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
        // console.log('调用了销毁定时器');
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
        marginBottom:10,
    },
    contentSty:{
    },
    bannerSty:{
        width:width,
        height:200,
        // resizeMode:'contain',
    },
    pageVSty:{
        width:width,
        height:25,
        // 设置透明
        backgroundColor:'rgba(0,0,0,0.2)',
        // 定位
        position:'absolute',
        top:200-25,
        // 设置主轴的方向
        flexDirection:'row',
        // 设置主轴的对齐方式
        justifyContent:'space-between',
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
