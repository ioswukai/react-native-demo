/**
 * Created by apple on 2018/3/27.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

/*
结论：
1.父类里的this指针就相当于是子类实例的this指针，
  所以在父类里可以直接通过this指针访问子类的 props state 和所有的方法

2.子类里可以直接通过this指针 调用父类的方法，也可通过super指针调用父类
  的方法，而后者主要用在重写父类方法的时候，仍需调用父类的方法

3.子类无法访问父类的props和state属性，访问后的值是undefined

4.子类可以重写父类的props和state属性，其中props比较特别，可以不用在子类
  props里声明，直接设置，如
    <SubClass
        // 设置子类的props属性
        // 不赋值  '子类'  则name为undefined 而不是 name:'我是父类默认的名字'
        // name = '子类'

重写父类的state属性，如
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 重写父类的gender
            gender:'重写后我是女性了',

*/


/************创建父类***************/
class SuperClass extends Component{


    /************属性***************/
    // 静态属性
    static  defaultProps={
        // 实例对象的名字
            name:'我是父类默认的名字',
            phone:'157 xxxx 9923',
            component:null,
    };

    // state属性
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 实例对象需要说的话
            words:'我是所有类的父类',
            // 性别留给子类重写
            gender:'默认是男性',
        };
      }


    /************生命周期方法***************/
    // 组件将要加载的方法
    componentWillMount() {

    }

    // 渲染的方法
    render(){
        // 返回UI
        return(
            // 必须是一个根view
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this.props.component}
                />
                <Text style={styles.textSty}>类的继承</Text>
            </View>
        );
    }

    // 组件已经加载的方法
    componentDidMount() {
        // 调用方法
        this.superSayMethod();
    }

    // 自定义方法
    callBySubClass(){
        console.log('子类调用了父类的callBySubClass（）方法')
    }

    superSayMethod(){
        // 父类直接访问子类的方法
        this.subClassMathod();

        // 父类访问自己的属性和方法
        console.log('父类访问自己的属性：'+'props.name = '+this.props.name+'  '+'props.phone = '+this.props.phone+'  '+'state.gender = '+this.state.gender+'  '+'state.words = '+this.state.words);

        // 父类直接访问子类的属性（state，props） 不需要在父类里定义子类属性
        console.log('父类直接访问子类的属性：'+'state.job='+this.state.job+' '+'props.age='+this.props.age);

    }

    // 组件销毁的方法
    componentWillUnmount() {
        console.log(this.props.name+'组件已经被销毁了');
    }
}

/************创建子类 继承自 SuperClass ***************/
class SubClass extends SuperClass{
    /************属性***************/
        // 静态属性
    static  defaultProps={
        // 实例对象的岁数
        age:0,
        component:null,
    };

    // state属性
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 重写父类的gender
            gender:'重写后我是女性了',

            // 从事的工作
            job:'只为家人工作',
        };
    }


    /************生命周期方法***************/
    // 组件将要加载的方法
    componentWillMount() {

    }

    // 渲染的方法
    render(){
        // 返回UI
        return(
            // 必须是一个根view
            <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this.props.component}
                />
                <Text style={styles.textSty}>类的继承</Text>
            </View>
        );
    }

    // 组件已经加载的方法
    componentDidMount() {
        /**************调用父类的方法****************/
        // 子类直接调用父类的方法
        this.callBySubClass();

        // 子类调用重写后的父类方法
        this.superSayMethod();
    }

    // 重写父类的方法
    superSayMethod(){
        /**************调用父类的方法****************/
        // 子类通过super调用父类的方法
        super.superSayMethod();
        // 如果通过this调用 则会出现递归现象 导致内存溢出
        // this.superSayMethod();

        /***************执行完后 调用自己的方法**************/
        this.subDescriptionSelf();
    }

    // 子类自定义的方法
    subClassMathod(){
        console.log('我是子类的方法,被父类调用了');
    }
    subDescriptionSelf(){
        /**************调用父类的属性****************/
        // 1.1 调用父类的state属性  已被重写
        console.log('父类的state属性 已被重写 gender = '+this.state.gender);

        // 1.2 调用父类的state属性  未被重写
        console.log('父类的state属性 未被重写 words = '+this.state.words);

        // 2.1 调用父类的props属性  已被重写
        console.log('父类的props属性 已被重写  name = '+this.props.name);

        // 2.2 调用父类的props属性  未被重写
        console.log('父类的props属性 未被重写  phone = '+this.props.phone);

        /**************调用子类的props属性****************/
        console.log('子类的自定义props属性 未在SubClass类里申明  customProp = '+this.props.customProp);

    }
}


export default class Inherits extends Component<Props> {
    render() {
        {/*
         <SubClass
         name = '父类'
         // 页面渲染navigateBar用
         component={this}
         />
         */}

        return (
            <SubClass
                // 设置子类的props属性
                // 不赋值  '子类'  则name为undefined 而不是 name:'我是父类默认的名字'
                name = '子类'
                // 直接设置的props 未在子类里声明
                customProp = '我是子类在<SubClass />里设置的自定义props'

                // 设置自己的属性
                age = {18}
                // 页面渲染navigateBar用
                component={this}
            />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // 占满整个屏幕
        flex:1,
        paddingTop:84,
        backgroundColor:'white',
    },
});

