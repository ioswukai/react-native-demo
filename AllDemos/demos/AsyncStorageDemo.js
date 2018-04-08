/**
 * Created by apple on 2018/3/28.
 */


/*
 我们推荐您在AsyncStorage的基础上做一层抽象封装，而不是直接使用AsyncStorage。
 译注：推荐由React Native中文网封装维护的react-native-storage模块，提供了较多便利功能。




 AsyncStorage 类似iOS里的NSUserDefault ，它是一个简单的、具有异步特性的键值对的存储系统。相对这个app而言
  它是全局的，应该用它来取代本地的存储。

 AsyncStorage提供了很多方法，每一个方法都要一个回调函数，而每一个回调函数的第一个参数都是错误对象，如果存在错误，
 就展示错误信息，否则就是null。所有的方法执行后，都会返回一个Promise对象。具体的方法如下所示：

 根据key来获得value，获取的结果会在回调函数中。
 static getItem(key:string,callback:(error,result))

 设置键值对
 static setItem(key:string,value:string,callback:(error))

 根据key移除某一项value
 static removeItem(key:string,callback:(error))

 合并现有的key和value
 static mergeItem(key:string,value:string,callback:(error))

 清除所有的项目
 static clear(callback:(error))

 清除所有进行中的查询操作。
 static flushGetRequests()

 获得所有的key
 static getAllKeys(callback:(error,result))

 获取多项，其中keys是字符串数组
 static multiGet(keys,callback:(errors,result))

 设置多项，其中keyValuePairs是字符串的二维数组
 static multiSet(keyValuePairs,callback:(errors))

 删除多项，其中keys是字符串数组
 static multiRemove(keys,callback:(errors))

 多个键值对合并，其中keyValuePairs是字符串的二维数组
 static multiRemove(keyValuePairs,callback:(errors))

 */

/**示例*/
import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ListView,
    ImageBackground,
    // 导入 AsyncStorage
    AsyncStorage,
    View
} from 'react-native';

import Detail from './AsyncDetail';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');

var column = 2;
var hMargin = 10;
var cellW = (width-3*hMargin)/2.0;
var cellH = 130;

// 商品的数据源
var Model = [
    {
        id: '1',
        title: '佳沛新西兰进口猕猴桃',
        desc: '12个装',
        price: 99,
        url: 'http://vczero.github.io/ctrip/guo_1.jpg'
    },
    {
        id:'2',
        title: '墨西哥进口牛油果',
        desc: '6个装',
        price: 59,
        url: 'http://vczero.github.io/ctrip/guo_2.jpg'
    },
    {
        id:'3',
        title: '美国加州进口车厘子',
        desc: '1000g',
        price: 91.5,
        url: 'http://vczero.github.io/ctrip/guo_3.jpg'
    },
    {
        id:'4',
        title: '新疆特产西梅',
        desc: '1000g',
        price: 69,
        url: 'http://vczero.github.io/ctrip/guo_4.jpg'
    },
    {
        id:'5',
        title: '陕西大荔冬枣',
        desc: '2000g',
        price: 59.9,
        url: 'http://vczero.github.io/ctrip/guo_5.jpg'
    },
    {
        id:'6',
        title: '南非红心西柚',
        desc: '2500g',
        price: 29.9,
        url: 'http://vczero.github.io/ctrip/guo_6.jpg'
    }
];

// 输出的组件
export default  class  Storage extends Component<>{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 记录选中商品的个数
            count:0,
        };
    }

    // 组件加载结束
    componentDidMount() {
        /* 跳转到后面的页面 改变数据源后  返回本页面
           本页面不会调用componentDidMount  所以不能及时更改状态
        */

        /* 为了及时更新组件的状态 目前提供了三种方案 推荐方案二和方案三
         *  参考博客：https://blog.csdn.net/wirenc/article/details/52680515
         *  1.监听didfocus事件，focus到当前路由的时候重新加载数据 缺点：是不太稳定且通知耗性能！！！
         *  2.Navigator参数传递：往下一个路由push的时候传递参数（一个回调），
         *    在组件pop之前先调用此回调刷新数据
         *  3.采用redux/event等方式完成跨组件通讯 以后在学 暂时不处理
         * */

        /*****更新组件的状态，方案一 *******/
        // 注册监听navigator的scene显示事件
        // 1. 取到navigator对象
        let navigator = this.props.navigator;

        // 2. 定义回调函数
        let focusCb = (event)=>{
            // 取出当前页面的名称
            let currentComponentName = NavigateBar.getComponentName(this);
            // 取出组件自己的名称
            let componentName = this.props.name;
            if (currentComponentName===componentName){
                // 当前跳转的是本控件 调用数据源方法 刷新界面
                this.getDataFromAsyncStorage();
            }

            // 打印信息
            // console.log('List:事件类型',{
            //     route:JSON.stringify(event.data.route),
            //     target:event.target,
            //     type:event.type,
            //     currentComponentName:currentComponentName,
            //     componentName:componentName,
            // });

        }

        // 3.添加通知的监听
        this.listeners = [
            // 注册scene将要显示
            // navigator.navigationContext.addListener('willfocus', focusCb),
            // 注册scene显示完毕
            navigator.navigationContext.addListener('didfocus', focusCb),
        ];

    }

    // 组件将要销毁
    componentWillUnmount() {
        // 销毁通知的监听
        this.listeners && this.listeners.forEach(listener=>listener.remove());
    }

    // 从AsyncStorage取得数据
    getDataFromAsyncStorage(){
        // 清除所有数据
        // AsyncStorage.clear((error)=>{
        //     if (error){
        //         console.log('清除数据出错');
        //     }
        // });

        AsyncStorage.getAllKeys((error,result)=>{
            if (error){
                // 存储取数据出错 给用户提示错误信息

            }

            // console.log(result);
            // 跟新状态机，将存储的商品条数反映到按钮上
            this.setState({
                count:result.length,
            });
        });
    }
    // 渲染组件
    render(){
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        var dataSource = ds.cloneWithRows(Model);
        return(
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                {/*返回列表组件*/}
                <ListView
                    renderRow={this.renderRow}
                    dataSource={dataSource}
                    contentContainerStyle={styles.contentSty}
                    automaticallyAdjustContentInsets={false}
                    renderFooter={this.renderFooter}
                >
                </ListView>
            </View>
        );
    }

    // 渲染cell
    renderRow=(rowData)=>{
        return(
            <TouchableOpacity  activeOpacity={0.5} onPress={()=>{this.clickRow(rowData)}} >
                <View style={styles.cellSty}>
                    <ImageBackground source={{uri:rowData.url}} style={styles.imgSty}/>
                    <Text style={styles.titleSty} numberOfLines={1}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // 点击了cell
    clickRow(rowData){
        // console.log('点击cell得到的rowData'+rowData);

        // 将rowData object转换成json str
        var jsonData = JSON.stringify(rowData);
        // console.log(jsonData);

        var  count = this.state.count;
        count++;

        // 更改状态机
        this.setState({
            count:count,
        });

        // AsyncStorage  存储
        AsyncStorage.setItem('SP-'+this.getId()+'-SP',jsonData,(error)=>{
            if (error){
                // 存储出错
            }else {
                // 存储成功
                // alert(rowData.title+'存储成功');
            }
        });
    }

    // 生成随机的ID，GUID
    // GUID生成的代码来自于Stoyan Stefanov
    getId=()=>{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c)=>{
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    // 渲染footer
    renderFooter=()=>{
        {/*返回下面的按钮组件*/}
        var count = this.state.count;
        var str = null;
        if (count){
            str ='，共'+count+'件商品'
        }

        return(
            <View style={{width:width,marginTop:35}}>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.clickBtn()}}>
                    <View style={styles.btnBgSty}>
                        <Text style={styles.textSty}>去结算{str}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    // 点击了去结算按钮
    clickBtn(){
        this.props.navigator.push({
            title:'购物车',
            component:Detail,
        });
    }



}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:64,
        backgroundColor:'#e8e8e8',
    },
    contentSty:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    cellSty:{
        width:cellW,
        height:cellH,
        borderColor:'red',
        borderWidth:1,
        borderRadius:5,

        marginTop:hMargin,
        marginLeft:hMargin,

        alignItems:'center',
        justifyContent:'center',
    },
    imgSty:{
        width:cellW-5,
        height:cellH-5,
    },
    titleSty:{
        position:'absolute',
        bottom:5,
    },
    btnBgSty:{
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
        height:50,
        marginLeft:40,
        marginRight:40,
        borderRadius:25,
    },
    textSty:{
        color:'white',
        fontSize:18,
    },
});