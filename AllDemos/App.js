/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Text,
  View
} from 'react-native';


// 引入Dimensions类库
import  Dimensions from 'Dimensions';
let {width} = Dimensions.get('window');
let headerH = 45;

// 引入Navigator 库
import {Navigator} from 'react-native-deprecated-custom-components';

// 自定义组件
import NavigateBar from './demos/CustomNavigateBar'


// 组件
import ViewDemo from './demos/ViewDemo'
import TextDemo from './demos/TextDemo'
import TextInputDemo from './demos/TextInputDemo'
import ImageDemo from './demos/ImageDemo'
import TouchableDemo from './demos/TouchableDemo'
import ScrollViewDemo from './demos/ScrollViewDemo'
import Web from './demos/WebViewDemo'
import NavigatorIOSDemo from './demos/NavigatorIOSDemo'
import TabBarIOSDemo from './demos/TabBarIOSDemo'
import ListViewDemo from './demos/ListViewDemo'
import QQLoginUIDemo from './demos/QQLoginUIDemo'
import MovieListDemo from './demos/MovieListDemo'
import CustomCalendarDemo from './demos/CustomCalendarDemo';


// API
import FlexboxDemo from './demos/FlexboxDemo'
import LifeCycleDemo from './demos/LifeCycleDemo'
import Inherits from './demos/InheritsDemo'
import XMLHttpRequestDemo from './demos/XMLHttpRequestDemo';
import SetTimeoutDemo from './demos/SetTimeoutDemo';
import DimensionsDemo from './demos/DimensionsDemo'
import Storage from './demos/AsyncStorageDemo'
import Alert from './demos/AlertIOSDemo';
import PixelRatioDemo from './demos/PixelRatioDemo';
import AppStateIOSDemo from './demos/AppStateIOSDemo';
import StatusBarIOSDemo from './demos/StatusBarIOSDemo';
import NetInfoDemo from './demos/NetInfoDemo';
import CamerRollDemo from './demos/CamerRollDemo';
import VibrationIOSDemo from './demos/VibrationIOSDemo';
import GeolocationDemo from './demos/GeolocationDemo';
import CustomNativeAPIComponent from './demos/CustomNativeAPIComponent';
import CustomNativeUIComponent from './demos/CustomNativeUIComponent';


// 第三方组件demo
import NavigationDemo from './demos/ReactNavigationDemo'
import BannerDemo from './demos/BannerDemo';
import ReactNativeModalShow from './demos/ReactNativeModalShow';

// ECMAScript6入门
/*let和const命令*/
import ES6LetAndConstCommand from './demos/ES6LetAndConstCommandDemo';
/*变量的解构赋值*/
import ES6VarJieGouFuZhi from './demos/ES6VarJieGouFuZhiDemo';
/*字符串的扩展*/
import ES6StringExtension from './demos/ES6StringExtensionDemo';
/*正则的扩展*/
import ES6RegularExtension from './demos/ES6RegularExtensionDemo';
/*数值的扩展*/
import ES6NumberExtension from './demos/ES6NumberExtensionDemo';
/*函数的扩展*/
import ES6FunctionExtension from './demos/ES6FunctionExtensionDemo';
/*数组的扩展*/
import ES6ArrayExtension from './demos/ES6ArrayExtensionDemo';



/*最新提案*/
import ES6NewestMotion from './demos/ES6NewestMotionDemo';


// ECMAScript6入门demo
const DEMO_NAME_ES6_ARR = [
    'let和const命令',
    '变量的解构赋值',
    '字符串的扩展',
    '正则的扩展',
    '数值的扩展',
    '函数的扩展',
    '数组的扩展',
    '对象的扩展',

    '最新提案',
];


// 组件类型demo
const DEMO_NAME_COMPONENT_ARR = [
    'ViewDemo',
    'TextDemo',
    'TextInputDemo',
    'ImageDemo',
    'TouchableDemo',
    'ScrollViewDemo',
    'WebViewDemo',
    'NavigatorIOSDemo',
    'TabBarIOSDemo',
    'ListViewDemo',
    'QQLoginUIDemo',
    'MovieListDemo',
    'CustomCalendarDemo',
];

// API类型demo
const DEMO_NAME_API_ARR = [
    'FlexboxDemo',
    'LifeCycleDemo',
    '类的继承',
    'XMLHttpRequestDemo',
    'SetTimeoutDemo',
    'DimensionsDemo',
    'AsyncStorageDemo',
    'AlertIOSDemo',
    'PixelRatioDemo',
    'AppStateIOSDemo',
    'StatusBarIOSDemo',
    'NetInfoDemo',
    'CamerRollDemo',
    'VibrationIOSDemo',
    'GeolocationDemo',
    'CustomNativeAPIComponent',
    'CustomNativeUIComponent',
];

// 第三方库类型demo
const DEMO_NAME_Third_ARR = [
    'ReactNavigationDemo',
    'BannerDemo',
    'ReactNativeModalShow',
];


const DEMO_NAME_ARR = [
    {
        key:'ECMAScript6入门Demo',
        data:DEMO_NAME_ES6_ARR,
    },
    {
        key:'组件类型demo',
        data:DEMO_NAME_COMPONENT_ARR,
    },
    {
        key:'API类型demo',
        data:DEMO_NAME_API_ARR,
    },
    {
        key:'第三方库类型demo',
        data:DEMO_NAME_Third_ARR,
    },
];

type Props = {};
export default class App extends Component<Props> {
    render() {
        // 设置控件的名称 和组件
        let defaultName = 'HomePage';
        let defaultComponent = HomePage;

        return (
            // 返回Navigator 组件
            <Navigator
                // 设置Navigator的大小
                style={{flex:1}}

                /*这个指定了默认的页面，也就是启动app之后会看到界面的第一屏。
                 需要填写两个参数: name 跟 component。
                 （注意这里填什么参数纯粹是自定义的，因为这个参数也是你自己发自己收，
                 自己在renderScene方法中处理。我们这里示例用了两个参数，
                 但其实真正使用的参数只有component ）

                 回调的json对象
                 */
                initialRoute={{name:defaultName,component:defaultComponent}}

                /*这个是页面之间跳转时候的动画 回调函数*/
                configureScene={(route)=>{
                    /*取出Navigator类里的SceneConfigs配置对象里的的PushFromRight动画*/
                    return Navigator.SceneConfigs.PushFromRight;
                }}

                /*页面渲染时候的回调函数*/
                renderScene={(route, navigator)=>{
                    /*这里是每个人最疑惑的，我们先看到回调里的两个参数:route, navigator。
                    通过打印我们发现route里其实就是我们传递的name,component这两个货，
                    navigator是一个Navigator的对象，为什么呢，因为它有push pop jump...等方法，
                    这是我们等下用来跳转页面用的那个navigator对象。
                    */
                    let Component = route.component;

                    /*这里有一个判断，也就是如果传递进来的component存在，那我们就是返回一个这个component，
                    结合前面 initialRoute 的参数，我们就是知道，这是一个会被render出来给用户看到的component，
                    */
                    /* navigator={navigator} 然后navigator作为props传递给了这个component。
                    因此在以后的页面里 我们就可以通过props.navigator来拿到这个navigator，从而可以实现跳转等操作
                    */
                    /*{...route.passProps} 这个语法是把 route.passProps 里的每个key 作为props的一个属性；
                    同时需要注意passProps这参数名是我们自定义的，往后在页面跳转 需要给下级页面传递参数的时候，
                    可以将所有需要传递的参数放到这个passProps字典里，比如：
                    navigator.push({
                        name: 'SecondPageComponent',
                        component: SecondPageComponent,
                        params: {
                            id: '我是要传递的id'
                         }
                     });
                     上级页面这样写 那么在SecondPageComponent中，就可以直接通过this.props.id 来获得
                     '我是要传递的id'  这个对象
                     */

                    return <Component {...route.passProps} navigator={navigator} />
                }} />

    );
    }
}

class HomePage extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 设置加载标志
            loaded: false,
        };
      }

      // 加载组件
    componentDidMount() {
        // console.log('调用setTimeout了');
        // 模拟数据加载
        this.time = setTimeout(()=>{
            this.fetchData();
        },500);
    }

    /** 卸载 组件*/
    componentDidUnMount() {
        this.timer && clearTimeout(this.timer);
    }

    // 得到数据
    fetchData(){
        // console.log('调用fetchData了');
        this.setState({
            loaded: true,
        });
    }

    // 渲染内容
    render(){
        // console.log('render里的'+this);

        // 无数据显示加载中
        if (!this.state.loaded){
            return this.renderLoadingView();
        }

        // 有数据 加载列表
        return(
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                    needBackBtn={false}
                />

                {/*渲染日历的月份*/}
                <SectionList
                    renderSectionHeader={this.renderHeader}
                    // 每个item的对象都是一个FlatList
                    renderItem={this.renderDemoItem}
                    sections={DEMO_NAME_ARR}
                    // 为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，
                    // 以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
                    keyExtractor={this._keyExtractor}
                    // 不让自动调整
                    automaticallyAdjustContentInsets={false}
                    style={{marginTop:64}}
                />
            </View>
        );
    }

    // 组装UI
    renderLoadingView=()=> {
        return (
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                    needBackBtn={false}
                />
                <Text>
                    Loading demos...
                </Text>
            </View>
        );
    };

    // 生成特定的不重复的key
    _keyExtractor=(item, index)=>{
        return index.toString();
    };

    // 组装header
    renderHeader=(info)=>{
        let text = info.section.key;
        return(
            <View style={[styles.sectionSty]}>
                <Text style={styles.sectionTextSty}>{text}</Text>
            </View>
        );
    };

    // 组装cell
    renderDemoItem=(info)=>{
        // 打印消息
        // console.log(info);
        // 取出对应的item
        let text = info.item;
        // 取出item对应的索引
        let itemIndex = info.index;
        // 取出item所在section的data数组长度
        let dataLength = info.section.data.length;

        // 设置最后一行的样式
        let styleLast = {};
        // 最后一个行
        if (itemIndex == dataLength-1){
            styleLast = {
                marginBottom:10,
            };
        }

        // 渲染
        return (
            // 设置触摸事件
        <TouchableOpacity style={styleLast} activeOpacity={0.5} onPress={()=> this.gotoDemoWithName(text)}>
            {/*cell*/}
            <View style={styles.cellView}>
                {/*contentV*/}
                <View style={styles.bgView}>
                    <Text style={styles.title}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
        );
    }

    // 跳转页面
    gotoDemoWithName(demoName) {
        let demo = ViewDemo;
        let passProps = {};

        if(demoName ==='FlexboxDemo'){
            demo = FlexboxDemo;

        } else if(demoName ==='TextDemo'){
            demo = TextDemo;
            
        }else if (demoName ==='NavigatorIOSDemo'){
            demo = NavigatorIOSDemo;
            
        }else if (demoName ==='TextInputDemo'){
            demo = TextInputDemo;

        }else if (demoName ==='TouchableDemo'){
            demo = TouchableDemo;

        }else if (demoName ==='MovieListDemo'){
            demo = MovieListDemo;

        }else if (demoName ==='DimensionsDemo'){
            demo = DimensionsDemo;

        }else if (demoName ==='ImageDemo'){
            demo = ImageDemo;
            
        }else if (demoName ==='QQLoginUIDemo'){
            demo = QQLoginUIDemo;
            
        }else if (demoName ==='LifeCycleDemo'){
            demo = LifeCycleDemo;

        }else if (demoName ==='ScrollViewDemo'){
            demo = ScrollViewDemo;

        }else if (demoName ==='ListViewDemo'){
            demo = ListViewDemo;

        }else if (demoName ==='TabBarIOSDemo'){
            demo = TabBarIOSDemo;

        }else if (demoName ==='ReactNavigationDemo'){
            demo = NavigationDemo;

        }else if (demoName ==='类的继承'){
            demo = Inherits;

        }else if (demoName ==='WebViewDemo'){
            demo = Web;

        }else if (demoName ==='AsyncStorageDemo'){
            demo = Storage;

        }else if (demoName ==='AlertIOSDemo'){
            demo = Alert;

        }else if (demoName ==='PixelRatioDemo'){
            demo = PixelRatioDemo;

        }else if (demoName ==='AppStateIOSDemo'){
            demo = AppStateIOSDemo;

        }else if (demoName ==='StatusBarIOSDemo'){
            demo = StatusBarIOSDemo;

        }else if (demoName ==='NetInfoDemo'){
            demo = NetInfoDemo;

        }else if (demoName ==='CamerRollDemo'){
            demo = CamerRollDemo;

        }else if (demoName ==='VibrationIOSDemo'){
            demo = VibrationIOSDemo;

        }else if (demoName ==='GeolocationDemo'){
            demo = GeolocationDemo;

        }else if (demoName ==='XMLHttpRequestDemo'){
            demo = XMLHttpRequestDemo;

        }else if (demoName ==='SetTimeoutDemo'){
            demo = SetTimeoutDemo;

        }else if (demoName ==='CustomNativeAPIComponent'){
            demo = CustomNativeAPIComponent;

        }else if (demoName ==='CustomNativeUIComponent'){
            demo = CustomNativeUIComponent;

        }else if (demoName ==='CustomCalendarDemo'){
            demo = CustomCalendarDemo;

        }else if (demoName ==='BannerDemo'){
            demo = BannerDemo;

        }else if (demoName ==='ReactNativeModalShow'){
            demo = ReactNativeModalShow;

        }


        else if (demoName ==='let和const命令'){
            demo = ES6LetAndConstCommand;

        }else if (demoName ==='变量的解构赋值'){
            demo = ES6VarJieGouFuZhi;

        }else if (demoName ==='字符串的扩展'){
            demo = ES6StringExtension;

        }else if (demoName ==='正则的扩展'){
            demo = ES6RegularExtension;

        }else if (demoName ==='数值的扩展'){
            demo = ES6NumberExtension;

        }else if (demoName ==='函数的扩展'){
            demo = ES6FunctionExtension;

        }else if (demoName ==='数组的扩展'){
            demo = ES6ArrayExtension;

        }






        else if (demoName ==='最新提案'){
            demo = ES6NewestMotion;

        }



        // 配置跳转页面数据
        let componentData = {};
        componentData.name = demoName;
        componentData.component = demo;

        if (demoName ==='AsyncStorageDemo'){
            // 此页面需要传递参数
            componentData.passProps ={
                name:demoName,
            };
        }
        this.props.navigator.push(componentData);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        marginTop:64,
        // backgroundColor: 'white',
    },
    sectionSty:{
        width:width,
        height:headerH,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'darkcyan',
    },
    sectionTextSty:{
        fontSize:20,
        color:'white',
    },
    cellView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        borderBottomWidth:1,
        borderBottomColor:'gray',
    },
    bgView:{
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor:'#C7EDCC',
    },
    title: {
        flex:1,
        fontSize: 20,
        margin:20,
        color:'#333333',
    },
});