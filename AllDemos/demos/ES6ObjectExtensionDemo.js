

/*************************************** 对象的扩展 Demo *****************************************/

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

export default class ES6ObjectExtension extends Component<Props> {

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
            </View>
        );
    }

    // 组件已经渲染
    componentDidMount() {
        // 属性的简洁表示法
        this.objectProp();

        // 属性名表达式
        this.objectPropName();

        // 方法的 name 属性
        this.objectFunctionName();

        // Object.is()
        this.objectIs();

        // Object.assign()
        this.objectAssign();

        // 属性的可枚举性和遍历
        this.objectBianli();

        // Object.getOwnPropertyDescriptors()
        this.objectGetOwnPropertyDescriptors();

        // __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
        this.objectProto();

        // super 关键字
        this.objectSuper();

        // Object.keys()，Object.values()，Object.entries()
        this.objectEntries();

        // 对象的扩展运算符 ...
        this.objectSpread();


    }

    /*****************属性的简洁表示法  *****************/
    objectProp(){
        /*ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。*/

        const foo = 'bar';
        const baz = {foo};
        // {foo: "bar"}
        console.log(baz);
        // 等同于
        const baz1 = {foo: foo};
        console.log(baz1);
        /*上面代码表明，ES6 允许在对象之中，直接写变量。
        这时，属性名为变量名, 属性值为变量的值*/

        /*下面是另一个例子。*/

    }


    /*****************属性名表达式  *****************/
    objectPropName(){}


    /*****************方法的 name 属性  *****************/
    objectFunctionName(){}


    /*****************Object.is()  *****************/
    objectIs(){}


    /*****************Object.assign()  *****************/
    objectAssign(){}


    /*****************属性的可枚举性和遍历  *****************/
    objectBianli(){}


    /*****************Object.getOwnPropertyDescriptors()  *****************/
    objectGetOwnPropertyDescriptors(){}


    /*****************__proto__属性，Object.setPrototypeOf()，
     * Object.getPrototypeOf()                               *****************/
    objectProto(){}


    /*****************super 关键字  *****************/
    objectSuper(){}


    /*****************Object.keys()，Object.values()，Object.entries()  *****************/
    objectEntries(){}


    /*****************对象的扩展运算符 ...  *****************/
    objectSpread(){}




}
