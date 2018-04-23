/**
 * Created by apple on 2018/4/19.
 */

/*************************************** let和const命令 Demo *****************************************/

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

export default class ES6LetAndConstCommand extends Component<Props> {

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
        /*ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，
        后面章节还会提到，另外两种声明变量的方法：import命令和class命令。
        所以，ES6 一共有 6 种声明变量的方法。*/

        // 1.let命令
        this.letCommand();

        // 2.块级作用域
        this.kuaiJiZuoYongYu();

        // 3.const命令
        this.constCommand();

        // 4.顶层对象的属性
        this.topObjectProperty();

        // 5.global对象
        this.globalObject();

    }

    /***************** 1.let命令 *****************/
    letCommand(){
        // let 块级作用域
        this.letKuaiJiZuoYongYu();

        // 验证 for 循环使用let
        this.forUseLet();

        // 验证 变量提升
        this.varPromote();

        // 验证 暂时性死区
        this.momentDeadZone();

        // 验证 let不允许重复声明同一变量
        this.letVarCannotRedefine();

    }

    // 验证 let 块级作用域
    letKuaiJiZuoYongYu(){
        /* ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。*/
        {
            let a = 10;
            var b = 1;
        }
        // 此行报错  ReferenceError: a is not defined
        // console.log(a);
        console.log(b);
        /*上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，
            结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它
            所在的代码块有效。*/
    }

    // 验证 for 循环使用let
    forUseLet(){
        /* for循环的计数器，就很合适使用let命令 */
        for (let i = 0; i < 10; i++) {
            // ...
        }

        // 此行报错  ReferenceError: i is not defined
        // console.log(i);
        /*上面代码中，计数器i只在for循环体内有效，在循环体外引用就会报错。*/

        /*下面的代码如果使用var，最后输出的是10。*/
        var a = [];
        for (var i = 0; i < 10; i++) {
            a[i] = function () {
                console.log(i);
            };
        }
        // 10
        a[6]();
        /*上面代码中，变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。
        每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，
        里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，
        导致运行时输出的是最后一轮的i的值，也就是 10。*/

        /*如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6。*/
        var b = [];
        for (let j = 0; j < 10; j++) {
            b[j] = function () {
                console.log(j);
            };
        }
        // 6
        b[6]();
        /*上面代码中，变量i是let声明的，当前的j只在本轮循环有效，所以每一次循环的j其实都是一个新的变量，
        所以最后输出的是6。你可能会问，如果每一轮循环的变量j都是重新声明的，那它怎么知道上一轮循环的值，
        从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量j时，
        就在上一轮循环的基础上进行计算。*/

        /*另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，
        而循环体内部是一个单独的子作用域。!!! 此说法在RN中有问题，只打印了一次，所以RN中，内部的变量k
        与循环变量k在同一个作用域*/
        for (let k = 0; k < 3; k++) {
            // 只打印一次abc
            let k = 'abc';
            let c = Number(k);
            // NaN
            console.log(c);

            if (c<3){
                console.log('c比3小');
            }else {
                console.log('c不小于3');
            }
            // c不小于3
            console.log(k);

            // 打印三次abc
            // let a = 'abc';
            // console.log(a);
        }
        /*上面代码正确运行，输出了 3 次abc。这表明函数内部的变量k与循环变量k不在同一个作用域，有各自单独的作用域。*/
    }

    // 验证 变量提升
    varPromote(){
        /*var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，
        按照一般的逻辑，变量应该在声明语句之后才可以使用。

         为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

         !!! 此说法在RN中有问题，都是输出的 undefined 既在RN中 let 也会发生变量提升。
         */
        // var 的情况
        console.log(foo); // 输出undefined
        var foo = 2;

        // let 的情况
        console.log(bar); // 应该报错ReferenceError，但实际在RN中也是输出undefined
        let bar = 2;
        /*在ES6正常情况，
        上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，
        但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，
        变量bar是不存在的，这时如果用到它，就会抛出一个错误*/
    }

    // 验证 暂时性死区 在RN中不存在 因为let也变量提升了
    momentDeadZone(){
        /*只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。*/
        // var tmp = 123;
        if (true) {
            // ES6中应该报错ReferenceError，但是RN的let 变量提升 所以没有报错
            tmp = 'abc';
            let tmp;
            // tmp用let申明，变量就“绑定”（binding）这个区域，不再受外部的影响，而tmp没有初始化，所以是undefined
            console.log(tmp); // 输出undefined
            /*在ES6正常情况，
            上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，
            所以在let声明变量前，对tmp赋值会报错。

             ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
             凡是在声明之前就使用这些变量，就会报错。

             总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，
             称为“暂时性死区”（temporal dead zone，简称 TDZ）。但是在RN中不存在 因为let也变量提升了。
             */
        }
    }

    // 验证 let不允许重复声明同一变量
    letVarCannotRedefine(arg){
        // 以下所有都报错 变量重定义
        // let a = 10;
        // var a = 1;

        // let a = 10;
        // let a = 1;

        // let arg;

        // 因为块级作用域 下面的不报错
        {
            let arg; // 不报错
        }
    }


    /***************** 2.块级作用域 *****************/
    kuaiJiZuoYongYu(){
        /*
            为什么需要块级作用域？
         ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。
        **/

        // 验证 第一种场景，内层变量可能会覆盖外层变量。
        this.kuaiJiZuoYongYuInnerCoverOutset();

        // 验证 第二种场景，用来计数的循环变量泄露为全局变量。
        this.kuaiJiZuoYongYuForLoop();

        // 验证 ES6 的块级作用域
        this.kuaiJiZuoYongYuES6();

        // 验证 块级作用域与函数声明
        this.kuaiJiZuoYongYuFunction();

    }

    //  第一种场景，内层变量可能会覆盖外层变量
    kuaiJiZuoYongYuInnerCoverOutset(){
        var tmp = new Date();

        function f() {
            console.log(tmp);
            if (false) {
                var tmp = 'hello world';
            }
        }

        // undefined
        f();

        /*上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。
        但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。*/
    }

    // 第二种场景，用来计数的循环变量泄露为全局变量。
    kuaiJiZuoYongYuForLoop(){
        var s = 'hello';

        for (var i = 0; i < s.length; i++) {
            console.log(s[i]);
        }

        // 5
        console.log(i);

        /*上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。*/
    }

    // ES6 的块级作用域
    kuaiJiZuoYongYuES6(){
        /*let实际上为 JavaScript 新增了块级作用域。*/

        function f1() {
            let n = 5;
            if (true) {
                let n = 10;
            }
            console.log(n); // 5
        }

        /*上面的函数有两个代码块，都声明了变量n，运行后输出 5。
        这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是 10。*/

        /* ES6 允许块级作用域的任意嵌套。 下面代码使用了一个五层的块级作用域。
        外层作用域无法读取内层作用域的变量。*/
        {{{{{let insane = 'Hello World'}}}}};
        {{{{
            {let insane = 'Hello World'}
            // 报错 ReferenceError:
            // console.log(insane);
        }}}};


        /*内层作用域可以定义外层作用域的同名变量。*/
        {{{{
            let insane = 'Hello World';
            {let insane = 'Hello World'}
        }}}};

        /*块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。*/
        // IIFE 写法
        (function () {
            var tmp = '';
        }());

        // 块级作用域写法
        {
            let tmp = '';
        }
    }

    // 块级作用域与函数声明
    kuaiJiZuoYongYuFunction(){
        /*函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。
         ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
         ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
        */

        function f() { console.log('I am outside!'); }

        (function () {
            if (false) {
                // 重复声明一次函数f
                function f() { console.log('I am inside!'); }
            }

            // I am outside!
            f();
        }());
    }

    /***************** 3.const命令 *****************/
    constCommand(){
        /*const声明一个只读的常量。一旦声明，常量的值就不能改变。*/
        const PI = 3.1415;
        // PI is read-only(null)
        // PI = 3;

        /*const声明的变量不得改变值，这意味着，const一旦声明变量，
        就必须立即初始化，不能留到以后赋值。对于const来说，只声明不赋值，就会报错*/
        // Unexpected token 不期待的表达式
        // const foo;

        /*const的作用域与let命令相同：只在声明所在的块级作用域内有效。*/
        if (true) {
            const MAX = 5;
        }
        // ReferenceError: MAX is not defined
        // MAX ;

        /*const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

         !!! 此说法在RN中有问题，输出的 undefined 既在RN中 const 也会发生变量提升。*/

        if (true) {
            // ES6 ReferenceError   RN  undefined
            console.log(MAX);
            const MAX = 5;
        }

        /*const声明的常量，也与let一样不可重复声明。*/
        var message = "Hello!";
        let age = 25;

        // 以下两行都会报错
        // const message = "Goodbye!";
        // const age = 30;

        /*本质
         const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。
         对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
         但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，
         const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。
         因此，将一个对象声明为常量必须非常小心。*/
        const foo = {};

        // 为 foo 添加一个属性，可以成功
        foo.prop = 123;
        foo.prop // 123

        // 将 foo 指向另一个对象，就会报错  "foo" is read-only
        // foo = {};
        /*上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，
        即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。*/

        const a = [];
        // 可执行
        a.push('Hello');
        // 可执行
        a.length = 0;
        // 报错 a is read-only
        // a = ['Dave'];
        /*上面代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。*/

        /*如果真的想将对象冻结，应该使用Object.freeze方法。*/
        const foo1 = Object.freeze({});
        // 常规模式时，下面一行不起作用；
        // 严格模式时，该行会报错
        foo1.prop = 123;
        // undefined
        console.log(foo1.prop);
        /*上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。*/

        /*除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。*/
        var constantize = (obj) => {
            Object.freeze(obj);
            Object.keys(obj).forEach( (key, i) => {
                if ( typeof obj[key] === 'object' ) {
                    constantize( obj[key] );
                }
            });
        };
    }


    /***************** 4.顶层对象的属性 *****************/
    topObjectProperty(){
        /*顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。
        ES5 之中，顶层对象的属性与全局变量是等价的。*/
        window.a = 1;
        // 1
        console.log(a) ;

        a = 2;
        // 2
        console.log(window.a) ;

        /*顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
        这样的设计带来了几个很大的问题，
        1.首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量
            可能是顶层对象的属性创造的，而属性的创造是动态的）；
        2.其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
        3.最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。
        4.另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，
            也是不合适的。
        */

        /*ES6 为了改变这一点，
        1.一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；
        2.另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，
        从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
        */

        var a = 1;
        // 如果在 Node 的 REPL 环境，可以写成 global.a
        // 或者采用通用方法，写成 this.a
        // 1
        console.log(window.a)

        let b = 1;
        // undefined
        console.log(window.b)
        /*上面代码中，全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，
        所以它不是顶层对象的属性，返回undefined。*/

    }

    /***************** 5.global对象 *****************/
    globalObject(){
        /*ES5 的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。
        1.浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
        2.浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
        3.Node 里面，顶层对象是global，但其他环境都不支持
        */

        /*同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。
        1.全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
        2.函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。
            但是，严格模式下，这时this会返回undefined。
        3.不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。
        但是，如果浏览器用了 CSP（Content Security Policy，内容安全政策），
        那么eval、new Function这些方法都可能无法使用。
         */

        /*综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。*/
        // 方法一
        let theGlobal =(typeof (window) !== 'undefined'
            ? window
            : (typeof (process) === 'object' &&
            typeof (require) === 'function' &&
            typeof (global) === 'object')
                ? global
                : this);
        // console.log(theGlobal);

        // 方法二
        var getGlobal = function () {
            if (typeof self !== 'undefined') { return self; }
            if (typeof window !== 'undefined') { return window; }
            if (typeof global !== 'undefined') { return global; }
            throw new Error('unable to locate global object');
        };
        // console.log(getGlobal())
    }
}

