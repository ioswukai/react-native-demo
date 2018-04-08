/**
 * Created by apple on 2018/3/15.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

export default class LifeCycleDemo extends Component<Props> {
    // 生命周期调用顺序
    // 实例化阶段
    // 1.设置默认的 不可改变的props
    static defaultProps = {
            age:18,
    };

    // 2.构造 设置可改变的state
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            person:'张三',
        };
      }

      /* 3.组件将要渲染，根据业务逻辑对state进行操作,整个生命周期只被调用一次*/
    componentWillMount() {

    }

    // 4.组件渲染,根据state，来生成虚拟DOM
    render() {
        return (
            <View ref="topView" style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={()=>{this.activeEvent('李四')}}
                >
                    <View style={styles.innerViewSty}>
                        <Text ref="textTitle">更改person的名字</Text>
                    </View>
                </TouchableOpacity>

                <Text>{this.state.person}</Text>
                <Text>年龄{this.props.age}</Text>
            </View>
        );
    }

    /*5.组件已经渲染，根据生成的虚拟DOM结构，来处理真实DOM，
       （处理的方案是：将组件的结构映射到虚拟DOM对象[JSON数据结构]，
       通过Diff算法，找到要变更的内容，最后把这个修改更新到真实的
       DOM节点，组件的更新并不是渲染整个DOM树，而只是更新需要修改的
       DOM节点，这样的话就提升了性能，比原生的DOM会快很多）

       一般在此函数中做复杂的操作，比如说网络请求，异步操作，
       以及一些非常耗性能的操作。

       整个生命周期中只调用一次
       */
    componentDidMount() {

    }

    // 更新阶段

    /**1.当组件接受到新的prop时，会触发该函数，
     * 在该函数中，通常可以调用this.setState方法来完成对state的修改；
     * */
    componentWillReceiveProps(object,nextProps) {

    }


    /**2.该方法拦截新的props或者是state，然后根据事先设定好的判断逻辑，
     * 做出最后要不要更新组件的决定,如果返回YES后，紧接着就会触发render
     * 方法，重新生成了新的虚拟DOM
     * */
    shouldComponentUpdate(nextProps,nextState) {
        return true;
    }

    /**3.该方法在组件的更新将要开始时调用，之后会调用render方法更新同步真实的DOM，
     * 类似iOS中 ViewWillAppear ViewWillDisappear 页面的出现和消失都会调用它
     * 但是不要在这里操作，会影响渲染
     *
     *  ！！！！ 尽量尽量 不要碰Update里的方法
     */
    componentWillUpdate(nextProps,nextState){

    }

    /**4.该方法在组件的更新已经同步到真实的DOM中后调用，
     *   通常在此方法中做一些DOM操作
     *
     *   每回更新动作完成  rander（）方法更新界面 之后就会调用
     *   类似ios中 ViewDidAppear ViewDidDisappear  页面的出现和消失都会调用它
     *
     *   ！！！！ 尽量尽量 不要碰Update里的方法
     * */
    componentDidUpdate() {

    }


    // 销毁阶段
    /**当组件需要从DOM中移除的时候调用此方法,
     * 通常会做一些取消事件绑定，移除虚拟DOM
     * 中对应组件数据结构，销毁一些无效的定时器等操作
     * */
    componentWillUnmount() {

    }


    // 自定义函数

    /**事件方法 当按下鼠标时*/
    activeEvent(name) {
        this.setState({
            person:name,
        });

        // 拿到特定的node组件 需要给组件设置ref标签 通过this.refs.标签名 获得节点 如上面的topView
        console.log(this.refs.topView);
        console.log(this.refs.textTitle);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:84,
        // 设置伸缩轴对齐方式
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
});