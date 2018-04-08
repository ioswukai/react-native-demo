/**
 * Created by apple on 2018/3/26.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    NavigatorIOS,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';

// 引入第三方react-navigation库
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';


// 自定义的三个页面
class HomePage extends Component<> {
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*两个tab 间的相互切换*/}
                <TouchableOpacity style={{marginBottom:30}} activeOpacity={0.5} onPress={()=>this.props.navigation.navigate('SetStack')}>
                    <Text style={styles.btnSty}>跳转到设置</Text>
                </TouchableOpacity>
                {/*跳转二级子页面*/}
                <TouchableOpacity activeOpacity={0.5} onPress={()=>this.props.navigation.navigate('Details')}>
                    <Text style={styles.btnSty}>跳转到详情</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class SetPage extends Component<> {
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*两个tab 间的相互切换*/}
                <TouchableOpacity style={{marginBottom:30}} activeOpacity={0.5} onPress={()=>this.props.navigation.navigate('HomeStack')}>
                    <Text  style={styles.btnSty}>跳转到首页</Text>
                </TouchableOpacity>
                {/*跳转二级子页面*/}
                <TouchableOpacity activeOpacity={0.5} onPress={()=>this.props.navigation.navigate('SecondDetails')}>
                    <Text style={styles.btnSty}>跳转详情2</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class DetailsScreen extends  Component<>  {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}

class SecondDetailsScreen extends  Component<>  {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>secondDetail!</Text>
            </View>
        );
    }
}

// 自定义的tabImg
class TabBarItem extends Component<> {
    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                   style={ { tintColor:this.props.tintColor,width:37,height:30 } }
            />
        )
    }
}

// 自定义的样式
const styles = StyleSheet.create({
    btnSty:{
        color:'white',
        backgroundColor:'blue',
        height:60,
        width:250,
    },
});

// 创建导航栏StackNavigator
const HomeStackPage =StackNavigator(
    {
        // 注册home导航栏里面的页面
        Home:{
            // top是HomePage页面
            screen: HomePage,
        },

        // 后面的界面可以任意跳转
        Details:{
            // 二级页面Details
            screen: DetailsScreen
        },
        SecondDetails:{
            // 二级页面Details
            screen: SecondDetailsScreen
        },
    },

    //  定义跳转属性参数，即顶部导航栏的一些参数设置和跳转方式。
    {
        /* 配置StackNavigator的一些属性。 如果配置了这个navigationOptions
            需要每一个tabItem都配置,不然点击其他的tabBarItem会没有点击反应的

        */
        navigationOptions:{
            /* 标题，如果设置了这个导航栏和标签栏的title就会变成一样的，
               不推荐使用
            */
            // title:'首页',

            /*
                可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null
            */
            // header:null,

            // 设置导航栏标题，推荐
            headerTitle:'首页',

            /*
                设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。
                可以自定义，也可以设置为null
             */
            headerBackTitle:null,

            /*
                设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"
             */
            headerTruncatedBackTitle:'返回',

            /*
                设置导航条右侧。可以是按钮或者其他视图控件
             */
            // headerRight:{
            // },

            /*
             设置导航条左侧。可以是按钮或者其他视图控件
             */
            // headerLeft:{
            // },

            /*
                设置导航条的样式。背景色，宽高等
             */
            headerStyle:{

            },

            /*
                设置导航栏文字样式
             */
            headerTitleStyle:{
                /*测试中发现，在iphone上标题栏的标题为居中状态，而在Android上则是居左对齐。
                * 所以需要在navigationOptions中设置headerTitleStyle
                * 的alignSelf为 ' center '即可解决。
                * */
                alignSelf:'center',
            },

            /*
                设置导航栏‘返回’文字样式
             */
            headerBackTitleStyle:{

            },

            /*
                设置导航栏前景色
            */
            headerTintColor:'#333333',

            /*
                是否支持滑动返回手势，iOS默认支持，安卓默认关闭
             */
            gesturesEnabled:true,

            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
        },
        /* 定义跳转风格
            card：使用iOS和安卓默认的风格
            modal：iOS独有的使屏幕从底部画出。类似iOS的present效果
            headerMode：返回上级页面时动画效果
            float：iOS默认的效果
            screen：滑动过程中，整个页面都会返回
            none：无动画
        */
        mode:'card',
        /*
            自定义设置跳转效果
            transitionConfig： 自定义设置滑动返回的配置
            onTransitionStart：当转换动画即将开始时被调用的功能
            onTransitionEnd：当转换动画完成，将被调用的功能
        */
        cardStyle:{

        },
        /*
            路由中设置的路径的覆盖映射配置
            initialRouteName：设置默认的页面组件，必须是上面已注册的页面组件
            initialRouteParams：初始路由参数

            注：大家可能对于path不太理解。path属性适用于其他app或浏览器使用url打开本app并进入指定页面。
            path属性用于声明一个界面路径，例如：【/pages/Home】。
            此时我们可以在手机浏览器中输入：app名称://pages/Home来启动该App，并进入Home界面。
        */
        path:{

        }
    }
);

const SetStackPage =StackNavigator(
    {
        // 注册Set导航栏里面的页面
        Set:{
            // top是SetPage页面
            screen: SetPage,
        },

        // 后面的界面可以任意跳转
        Details:{
            // 二级页面Details
            screen: DetailsScreen
        },
        SecondDetails:{
            // 二级页面Details
            screen: SecondDetailsScreen
        },
    },

    //  定义跳转属性参数，即顶部导航栏的一些参数设置和跳转方式。
    {
        /* 配置StackNavigator的一些属性。 如果配置了这个navigationOptions
         需要每一个tabItem都配置,不然点击其他的tabBarItem会没有点击反应的

         */
        navigationOptions:{
            /* 标题，如果设置了这个导航栏和标签栏的title就会变成一样的，
             不推荐使用
             */
            // title:'首页',

            /*
             可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null
             */
            // header:null,

            // 设置导航栏标题，推荐
            headerTitle:'首页',

            /*
             设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。
             可以自定义，也可以设置为null
             */
            headerBackTitle:null,

            /*
             设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"
             */
            headerTruncatedBackTitle:'返回',

            /*
             设置导航条右侧。可以是按钮或者其他视图控件
             */
            // headerRight:{
            // },

            /*
             设置导航条左侧。可以是按钮或者其他视图控件
             */
            // headerLeft:{
            // },

            /*
             设置导航条的样式。背景色，宽高等
             */
            headerStyle:{

            },

            /*
             设置导航栏文字样式
             */
            headerTitleStyle:{
                /*测试中发现，在iphone上标题栏的标题为居中状态，而在Android上则是居左对齐。
                 * 所以需要在navigationOptions中设置headerTitleStyle
                 * 的alignSelf为 ' center '即可解决。
                 * */
                alignSelf:'center',
            },

            /*
             设置导航栏‘返回’文字样式
             */
            headerBackTitleStyle:{

            },

            /*
             设置导航栏前景色
             */
            headerTintColor:'#333333',

            /*
             是否支持滑动返回手势，iOS默认支持，安卓默认关闭
             */
            gesturesEnabled:true,

            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
        },
        /* 定义跳转风格
         card：使用iOS和安卓默认的风格
         modal：iOS独有的使屏幕从底部画出。类似iOS的present效果
         headerMode：返回上级页面时动画效果
         float：iOS默认的效果
         screen：滑动过程中，整个页面都会返回
         none：无动画
         */
        mode:'card',
        /*
         自定义设置跳转效果
         transitionConfig： 自定义设置滑动返回的配置
         onTransitionStart：当转换动画即将开始时被调用的功能
         onTransitionEnd：当转换动画完成，将被调用的功能
         */
        cardStyle:{

        },
        /*
         路由中设置的路径的覆盖映射配置
         initialRouteName：设置默认的页面组件，必须是上面已注册的页面组件
         initialRouteParams：初始路由参数

         注：大家可能对于path不太理解。path属性适用于其他app或浏览器使用url打开本app并进入指定页面。
         path属性用于声明一个界面路径，例如：【/pages/Home】。
         此时我们可以在手机浏览器中输入：app名称://pages/Home来启动该App，并进入Home界面。
         */
        path:{

        }
    }
);

// 创建一个TabNavigator的实体类
export default TabNavigator(
    {
        // 给每个Item起名字
        HomeStack: {
            // 设置item的页面
            screen: HomeStackPage,
            // screen: HomePage,

            // 配置TabNavigator的一些属性
            navigationOptions: ({navigation}) => ({
                // 标题，会同时设置导航条和标签栏的title，不推荐
                // title:'首页',

                // 设置标签栏的title。推荐
                tabBarLabel: '首页',

                // 是否隐藏标签栏。默认不隐藏(true)
                tabBarVisible:true,

                // 设置标签栏的图标。需要给每个都设置
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        // tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../img/icon_home_nor.png')}
                        selectedImage={require('../img/icon_home_press.png')}
                    />
                )
            }),
        },
        SetStack: {
            // 设置item的页面
            screen: SetStackPage,
            // screen: SetPage,

            // 配置TabNavigator的一些属性
            navigationOptions: ({navigation}) => ({
                // 标题，会同时设置导航条和标签栏的title，不推荐
                // title:'首页',

                // 设置标签栏的title。推荐
                tabBarLabel: '设置',

                // 是否隐藏标签栏。默认不隐藏(true)
                tabBarVisible:true,

                // 设置标签栏的图标。需要给每个都设置
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('../img/icon_touzi_nor.png')}
                        selectedImage={require('../img/icon_touzi_press.png')}
                    />
                )
            }),
        },
    },
    {
        // 配置标签栏的一些安卓和iOS的属性
        tabBarOptions:{

            // 整个tabItem的前景色 活跃状态下
            activeTintColor:'orange',
            // 整个tabItem的背景色 活跃状态下
            // activeBackgroundColor:'#06c1ae',
            // 整个tabItem的前景色 不活跃状态下
            inactiveTintColor:'#979797',
            // 整个tabItem的背景色 不活跃状态下
            // inactiveBackgroundColor:'#979797',

            // 是否显示label，默认开启
            showLabel:true,
            // 是否显示图标，默认是关闭
            // label的样式属性
            labelStyle: {
                // 文字大小
                // fontSize: 20,
            },

            showIcon:true,
            // 图标样式
            iconStyle:{

            },

            //标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            indicatorStyle:{
                height:0,
            },

            // 设置tabBar的样式
            style:{
                backgroundColor:'#ffffff',
            },
            // label和icon所在View的样式
            tabStyle:{
                // label和icon的背景色为红色
                // backgroundColor:'red',
            },

            // 是否启用可滚动选项卡
            scrollEnabled:true,
        },

        tabBarComponent:TabBarBottom,
        // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom'）
        tabBarPosition:'bottom',
        // 是否允许在标签之间进行滑动
        swipeEnabled:true,
        // 是否在更改标签时显示动画
        animationEnabled:false,
        // 是否根据需要懒惰呈现标签，而不是提前，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐为true
        lazy:true,
    }
);