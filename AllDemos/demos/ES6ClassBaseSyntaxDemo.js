

/*************************************** Class的基本语法 Demo *****************************************/

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
// 定义打印函数
let l = console.log;


export default class ES6ClassBaseSyntax extends Component<Props> {

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
        // 简介
        this.classBrief();

        // 严格模式
        this.strictMode();

        // constructor 方法
        this.classConstructor();

        // 类的实例对象
        this.classInstance();

        // Class 表达式
        this.classExpression();

        // 不存在变量提升
        this.classVarTiSheng();

        // 私有方法和私有属性
        this.classPrivate();

        // this 的指向
        this.classThis();

        // name 属性
        this.classNameProperty();

        // Class 的取值函数（getter）和存值函数（setter）
        this.classGetterAnSetter();

        // Class 的 Generator 方法
        this.classGenerator();

        // Class 的静态方法
        this.classStaticMethod();

        // Class 的静态属性和实例属性
        this.classStaticAndInstanceProperty();

        // new.target 属性
        this.classTargetProperty();

    }

    /*****************简介  *****************/
    classBrief(){
        /**JavaScript 语言中，生成实例对象的传统方法是通过构造函数。
         * 下面是一个例子。*/
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }

        Point.prototype.toString = function () {
            return '(' + this.x + ', ' + this.y + ')';
        };

        var p = new Point(1, 2);
        l(p);
        /**上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，
         * 很容易让新学习这门语言的程序员感到困惑。*/

        /**ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，
         * 作为对象的模板。通过class关键字，可以定义类。*/

        /**基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，
         * ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、
         * 更像面向对象编程的语法而已。上面的代码用 ES6 的class改写，
         * 就是下面这样。*/
            //定义类
        class Point1 {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            toString() {
                return '(' + this.x + ', ' + this.y + ')';
            }
        }
        var p1 = new Point1(1, 2);
        l(p1);
        /**上面代码定义了一个“类”，
         * 可以看到里面有一个constructor方法，这就是构造方法，new的时候接受的参数
         * 而this关键字则代表实例对象。
         * 也就是说，ES5 的构造函数Point，对应 ES6 的Point1类的构造方法。
         *
         * 总结：
         * 1.constructor是实际的构造方法，他将被在转换ES5的时候，
         * 构造函数名由constructor改为，和类名相同的构造函数名
         * constructor 方法的参数，和函数体，将会在和类名同名的构造函数中
         * 参数被传递，函数体被执行。
         * 但是 和类名同名的构造函数  不仅仅只是运行了constructor，
         * 他还会运行一些自带的，额外函数，比如_classCallCheck
         *
         *
         * 2.Point1 是类的构造方法  相当于ES5  的构造函数Point
         *
         * 3.toString() 是原型对象上的方法
         *
         * */



        /**Point类除了构造方法，还定义了一个toString方法。
         * 注意，定义“类”的方法的时候，前面不需要加上function这个关键字，
         * 直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。*/

        /**ES6 的类，完全可以看作构造函数的另一种写法。*/
        class Point3 {
            // ...
        }
        l(typeof Point3); // "function"
        l(Point3 === Point3.prototype.constructor); // true
        /**上面代码表明，类的数据类型就是函数，类本身就指向构造函数。*/

        /**使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。*/
        class Bar {
            doStuff() {
                console.log('stuff');
            }
        }

        var b = new Bar();
        l(b.doStuff()); // "stuff"

        /**构造函数的prototype属性，在 ES6 的“类”上面继续存在。
         * 事实上，类的所有方法都定义在类的prototype属性上面。
         *
         * 注意：重点，类所有的方法，都是定义在构造函数的prototype 原型对象上！！！！
         * */
        class Point4 {
            constructor(name) {
                /**构造函数里申明的属性 是类自身的属性*/
                this.name = name;
                this.type = 'person'
            }

            /**类里面申明的属性 是构造函数原型对象上的属性*/
            toString() {
                // ...
            }

            toValue() {
                // ...
            }
        }
        // 等同于
        Point4.prototype = {
            constructor() {},
            toString() {},
            toValue() {},
        };

        /**使用ES5的方式表达 如下
         * var Point4 = function () {
         *          // 以下代码会立即执行 且是块级作用域
         *
         *          // Point4参数和构造函数constructor 的参数相同 在new操作符调用的时候执行
                    function Point4(name) {
                         // 它是为了保证调用的安全性
                        _classCallCheck(this, Point4);

                         // 下面函数体的内容 和 构造函数constructor函数体的内容相同
                        this.type = 'person';
                        this.name = name;
                    }

                    // 给上面的构造函数 原型对象上添加属性和方法
                    _createClass(Point4, [{
                        key: "toString",
                        value: function toString() {}
                    }, {
                        key: "toValue",
                        value: function toValue() {}
                    }]);

                    // 自执行函数 返回构造函数 function Point4(name) 赋值给变量 var Point4
                    return Point4;
                }();
         */
        /**写法分析，
         * 1.使用了一个自执行函数IIFE，模拟了块级作用域，同时将返回值（是一个函数指针）
         *   赋值给 var Point4 变量，
         *
         * 2.自执行函数里面做了如下操作
         *   1>. 声明了一个构造函数 function Point4(name)  并返回了这个构造函数
         *          1). 在这个构造函数里面，_classCallCheck(this, Point4)方法，_classCallCheck是什么？
         *              其实很简单，它是为了保证调用的安全性。
         *              具体代码实现如下：
         *              function _classCallCheck(instance, Constructor) {
                                // 检查是否成功创建了一个对象
                                        if (!(instance instanceof Constructor)) {
                                            throw new TypeError("Cannot call a class as a function");
                                            }
                        }
                        比如我们这么调用,是没有问题的：
                        // let p = new Person();`
                         但是直接调用,就会报错：
                        // let p = Person();`
                        // Uncaught TypeError: Cannot call a class as a function Person();
                            这就是_classCallCheck所起的作用。

                        同时在这个构造函数里面，参数是 constructor(name) 所对应的参数  function Point4(name)
                        并且所有constructor函数体里的内容，都会在这个构造函数里面调用 this.name = name;
         *
         *  2>. 调用了_createClass((Point4, [{}])；方法，_createClass是什么？
         *      它是实现了，往目标构造函数（此处是Point4）的原型对象上，添加方法的功能，
         *      他接受三个参数
         *      1).构造函数 Constructor
         *      2).需要添加的实例属性合集数组 protoProps
         *      3).需要添加的静态属性合集数组 staticProps
         *
         *      伪代码如下：
         *      var _createClass = (function () {
         *                      // 使用自执行函数
                               function defineProperties(target, props) {
                                    // 为每一个props 创建一个描述符，并将props赋值给目标对象
                                }
                                // 通过描述符，一次定义多个属性
                                return defineProperties(Constructor.prototype, protoProps);
                                // 最终返回的是 构造函数本身（此时的构造函数，
                                // 他所对应的原型对象上，已经添加了相应的属性了）
                        })();


         *      具体代码实现如下：
         *      var _createClass = (function () {
                           // 重写了 defineProperties 方法，以达到下面的目的
                              给目标对象（构造函数，或者构造函数所对应的原型对象）上的属性，
                              添加一些 enumerable  configurable  writable 等特性
                              这函数只是个操作函数，不要返回值
                            function defineProperties(target, props) {
                                    // 遍历属性集合props（props里面包含实例对象的方法名key，和方法value）
                                    for (var i = 0; i < props.length; i++) {
                                            // 取得描述符对象 如{ key: "toString",
                                            // value: function toString() {} }
                                            var descriptor = props[i];

                                            // 设置描述符的可枚举性 默认都是不可枚举的
                                            descriptor.enumerable = descriptor.enumerable || false;
                                            // 设置描述符的 可删除行 默认都是可删除的
                                            descriptor.configurable = true;
                                            // 设置描述符的 可写性  默认都是可写入的
                                            if ('value' in descriptor) {descriptor.writable = true;}

                                            // 将新的描述符 设置到原型对象的属性上
                                            Object.defineProperty(target, descriptor.key, descriptor);
                                    }
                            }

                            // 返回传入的构造函数本身
                            return function (Constructor, protoProps, staticProps) {
                                        // 存在实例对象属性
                                        if (protoProps){
                                            // 给构造函数的原型对象 添加实例对象的这些属性
                                            defineProperties(Constructor.prototype, protoProps);
                                        }

                                        // 在来判断 存在静态属性
                                        if (staticProps){
                                            // 给构造函数本身（函数也是对象，也可以有属性和方法），
                                            // 增加这些静态属性
                                            defineProperties(Constructor, staticProps);
                                        }

                                        // 最终返回的是 构造函数本身（此时的构造函数，
                                        // 他所对应的原型对象上，已经添加了相应的属性了）
                                        return Constructor;
                                    };
                            })();
         * */


        /**在类的实例上面调用方法，其实就是调用原型上的方法。*/
        class D {}
        let d = new D();
        l(D.prototype.constructor);
        l(d.constructor === D.prototype.constructor) // true
        /**上面代码中，b是B类的实例，它的constructor方法就是B类原型的constructor方法。*/

        /**由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
         * Object.assign方法可以很方便地一次向类添加多个方法。*/
        class Point5 {
            constructor(){
                // ...
            }
        }
        Object.assign(Point5.prototype, {
            toString(){},
            toValue(){}
        });

        /**prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。*/
        l(Point5.prototype.constructor === Point5); // true

        /**另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。*/
        class Point6 {
            constructor(x, y) {
                // ...
            }

            toString() {
                // ...
            }
        }
        l(Object.keys(Point6.prototype)); // []
        l(Object.getOwnPropertyNames(Point6.prototype)); // ["constructor","toString"]
        /**上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。
         * 这一点与 ES5 的行为不一致。*/

        /**类的属性名，可以采用表达式。*/
        let methodName = 'getArea';
        class Square {
            constructor(length) {
                // ...
            }

            [methodName]() {
                // ...
            }
        }
        /**上面代码中，Square类的方法名getArea，是从表达式得到的。*/
    }

    /*****************严格模式  *****************/
    strictMode(){
        /**类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
         * 只要你的代码写在类或模块之中，就只有严格模式可用。*/

        /**考虑到未来所有的代码，其实都是运行在模块之中，
         * 所以 ES6 实际上把整个语言升级到了严格模式。*/
    }

    /***************** constructor 方法 *****************/
    classConstructor(){
        /**constructor方法是类的默认方法，
         * 通过new命令生成对象实例时，自动调用该方法。
         * 一个类必须有constructor方法，如果没有显式定义，
         * 一个空的constructor方法会被默认添加。*/
        class Point {
        }

        // 等同于
        class Point1 {
            constructor() {}
        }
        /**上面代码中，定义了一个空的类Point，JavaScript引擎会自动为它
         * 添加一个空的constructor方法。*/

        /**constructor方法默认返回实例对象（即this），
         * 完全可以指定返回另外一个对象。*/
        class Foo {
            constructor() {
                return Object.create(null);
            }
        }

        l(new Foo() instanceof Foo); // false
        /**上面代码中，constructor函数返回一个全新的对象，
         * 结果导致实例对象不是Foo类的实例。*/

        /**类必须使用new调用，否则会报错。
         * 这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。*/
        // Foo();// TypeError: Cannot call a class as a function
    }

    /*****************类的实例对象  *****************/
    classInstance(){
        /**生成类的实例对象的写法，与 ES5 完全一样，也是使用new命令。
         * 前面说过，如果忘记加上new，像函数那样调用Class，将会报错。*/

        /**与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），
         * 否则都是定义在原型上（即定义在class上）。*/
            //定义类
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            toString() {
                return '(' + this.x + ', ' + this.y + ')';
            }
        }

        var point = new Point(2, 3);

        l(point.toString()); // (2, 3)

        l(point.hasOwnProperty('x')); // true
        l(point.hasOwnProperty('y')); // true
        l(point.hasOwnProperty('toString')); // false
        l(point.__proto__.hasOwnProperty('toString')); // true
        /**上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），
         * 所以hasOwnProperty方法返回true，
         * 而toString是原型对象的属性（因为定义在Point类上），
         * 所以hasOwnProperty方法返回false。这些都与 ES5 的行为保持一致。*/

        /**与 ES5 一样，类的所有实例共享一个原型对象。*/
        var p1 = new Point(2,3);
        var p2 = new Point(3,2);
        l(p1.__proto__ === p2.__proto__);//true
        /**上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，
         * 所以__proto__属性是相等的。*/

        /**这也意味着，可以通过实例的__proto__属性为“类”添加方法。
         *
         * 这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，
         * 不推荐使用，因为这会改变“类”的原始定义，影响到所有实例*/
    }

    /*****************Class 表达式  *****************/
    classExpression(){
        /**与函数一样，类也可以使用表达式的形式定义。
         * 其实就是 命名函数表达式语句
         * */
        const MyClass = class Me {
            getClassName() {
                return Me.name;
            }
        };
        /**上面代码使用表达式定义了一个类。需要注意的是，
         * 这个类的名字是MyClass而不是Me，
         * Me只在 Class 的内部代码可用，指代当前类。*/

        let inst = new MyClass();
        inst.getClassName() // Me
        // Me.name // ReferenceError: Me is not defined
        /**上面代码表示，Me只在 Class 内部有定义。*/

        /**如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
         * 其实就是 匿名函数表达式语句
         * */
        const MyClass1 = class { /* ... */ };

        /**采用 Class 表达式，可以写出立即执行的 Class。
         * IIFE 自执行函数
         * */
        let person = new class {
            constructor(name) {
                this.name = name;
            }

            sayName() {
                console.log(this.name);
            }
        }('张三');

        l(person.sayName()); // "张三"
        /**上面代码中，person是一个立即执行的类的实例。*/
    }

    /*****************不存在变量提升  *****************/
    classVarTiSheng(){
        /**类不存在变量提升（hoist），这一点与 ES5 完全不同。*/
        // new Foo(); // ReferenceError
        class Foo {}
        /**上面代码中，Foo类使用在前，定义在后，这样会报错，
         * 因为 ES6 不会把类的声明提升到代码头部。
         * 这种规定的原因与下文要提到的继承有关，
         * 必须保证子类在父类之后定义。*/

        {
            let Foo = class {};
            class Bar extends Foo {
            }
        }
        /**上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。
         * 但是，如果存在class的提升，上面代码就会报错，
         * 因为class会被提升到代码头部，而let命令是不提升的，
         * 所以导致Bar继承Foo的时候，Foo还没有定义。*/
    }

    /*****************私有方法和私有属性  *****************/
    classPrivate(){
        /**现有的方法*/

        /**私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。
         一种做法是在命名上加以区别。*/
        class Widget {

            // 公有方法
            foo (baz) {
                this._bar(baz);
            }

            // 私有方法
            _bar(baz) {
                return this.snaf = baz;
            }

            // ...
        }
        /**上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。
         * 但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。*/

        /**另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。*/
        class Widget1 {
            foo (baz) {
                bar.call(this, baz);
            }

            // ...
        }

        function bar(baz) {
            return this.snaf = baz;
        }
        /**上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。
         * 这使得bar实际上成为了当前模块的私有方法。*/

        /**还有一种方法是利用Symbol值的唯一性，
         * 将私有方法的名字命名为一个Symbol值。*/
        const bar1 = Symbol('bar');
        const snaf1 = Symbol('snaf');

        class myClass{

            // 公有方法
            foo(baz) {
                this[bar](baz);
            }

            // 私有方法
            [bar1](baz) {
                return this[snaf1] = baz;
            }

            // ...
        };
        /**上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，
         * 因此达到了私有方法和私有属性的效果。*/


        /**私有属性的提案*/
        /**与私有方法一样，ES6 不支持私有属性。目前，有一个提案，为class加了私有属性。
         * 方法是在属性名之前，使用#表示。*/
        // class Point {
        //     #x;
        //
        //     constructor(x = 0) {
        //         #x = +x; // 写成 this.#x 亦可
        //     }
        //
        //     get x() { return #x }
        //     set x(value) { #x = +value }
        // }
        /**上面代码中，#x就是私有属性，在Point类之外是读取不到这个属性的。
         * 由于井号#是属性名的一部分，使用时必须带有#一起使用，
         * 所以#x和x是两个不同的属性。*/

        /**私有属性可以指定初始值，在构造函数执行时进行初始化。*/
        // class Point {
        //     #x = 0;
        //     constructor() {
        //         #x; // 0
        //     }
        // }
        /**之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，
         * 是因为 JavaScript 是一门动态语言，使用独立的符号似乎是唯一的可靠方法，
         * 能够准确地区分一种属性是否为私有属性。
         * 另外，Ruby 语言使用@表示私有属性，ES6 没有用这个符号而使用#，
         * 是因为@已经被留给了 Decorator。*/

        /**这种写法不仅可以写私有属性，还可以用来写私有方法。*/
        // class Foo {
        //     #a;
        //     #b;
        //     #sum() { return #a + #b; }
        //     printSum() { console.log(#sum()); }
        //     constructor(a, b) { #a = a; #b = b; }
        // }
        /**上面代码中，#sum()就是一个私有方法。*/

        /**另外，私有属性也可以设置 getter 和 setter 方法。*/
        // class Counter {
        //     #xValue = 0;
        //
        //     get #x() { return #xValue; }
        //     set #x(value) {
        //         this.#xValue = value;
        //     }
        //
        //     constructor() {
        //         super();
        //         // ...
        //     }
        // }
        /**上面代码中，#x是一个私有属性，它的读写都通过get #x()和set #x()来完成。*/
    }

    /*****************this的指向   *****************/
    classThis(){
        /**类的方法内部如果含有this，它默认指向类的实例。
         * 但是，必须非常小心，一旦单独使用该方法，很可能报错。*/
        class Logger {
            printName(name = 'there') {
                this.print(`Hello ${name}`);
            }

            print(text) {
                console.log(text);
            }
        }

        const logger = new Logger();
        const { printName } = logger;
        // printName(); // TypeError: Cannot read property 'print' of undefined
        /**上面代码中，printName方法中的this，默认指向Logger类的实例。
         * 但是，如果将这个方法提取出来单独使用，
         * this会指向该方法运行时所在的环境，
         * 因为找不到print方法而导致报错。*/

        /**一个比较简单的解决方法是，在构造方法中绑定this，
         * 这样就不会找不到print方法了。*/
        class Logger1 {
            constructor() {
                this.printName = this.printName.bind(this);
            }

            // ...
        }

        /**另一种解决方法是使用箭头函数*/
        class Logger2 {
            constructor() {
                this.printName = (name = 'there') => {
                    this.print(`Hello ${name}`);
                };
            }

            print(text) {
                console.log(text);
            }
            // ...
        }

        /**还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。*/
        function selfish (target) {
            const cache = new WeakMap();
            const handler = {
                get (target, key) {
                    const value = Reflect.get(target, key);
                    if (typeof value !== 'function') {
                        return value;
                    }
                    if (!cache.has(value)) {
                        cache.set(value, value.bind(target));
                    }
                    return cache.get(value);
                }
            };
            const proxy = new Proxy(target, handler);
            return proxy;
        }

        const logger3 = selfish(new Logger());
    }

    /*****************name 属性  *****************/
    classNameProperty(){
        /**由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，
         * 所以函数的许多特性都被Class继承，包括name属性。*/
        class Point {}
        l(Point.name); // "Point"
        /**name属性总是返回紧跟在class关键字后面的类名。*/
    }

    /*****************Class 的取值函数（getter）和存值函数（setter）  *****************/
    classGenerator(){
        /**与 ES5 一样，在“类”的内部可以使用get和set关键字，
         * 对某个属性设置存值函数和取值函数，拦截该属性的存取行为。*/
        class MyClass {
            constructor() {
                // ...
            }
            get prop() {
                return 'getter';
            }
            set prop(value) {
                console.log('setter: '+value);
            }
        }

        let inst = new MyClass();

        inst.prop = 123;// setter: 123

        l(inst.prop); // 'getter'
        /**上面代码中，prop属性有对应的存值函数和取值函数，
         * 因此赋值和读取行为都被自定义了。*/

        /**存值函数和取值函数是设置在属性的 Descriptor(描述符) 对象上的*/
        class CustomHTMLElement {
            constructor(element) {
                this.element = element;
            }

            get html() {
                return this.element.innerHTML;
            }

            set html(value) {
                this.element.innerHTML = value;
            }
        }

        var descriptor = Object.getOwnPropertyDescriptor(
            CustomHTMLElement.prototype, "html"
        );
        l("get" in descriptor);  // true
        l("set" in descriptor);  // true
        /**上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，
         * 这与 ES5 完全一致。*/
    }

    /*****************Class 的 Generator 方法  *****************/
    classGetterAnSetter(){
        /**如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。*/
        class Foo {
            constructor(...args) {
                this.args = args;
            }
            * [Symbol.iterator]() {
                for (let arg of this.args) {
                    yield arg;
                }
            }
        }

        for (let x of new Foo('hello', 'world')) {
            console.log(x);
        }
        // hello
        // world
        /**上面代码中，Foo类的Symbol.iterator方法前有一个星号，
         * 表示该方法是一个 Generator 函数。
         * Symbol.iterator方法返回一个Foo类的默认遍历器，
         * for...of循环会自动调用这个遍历器。*/
    }

    /*****************Class 的静态方法  *****************/
    classStaticMethod(){
        /**类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
         * 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，
         * 而是直接通过类来调用，这就称为“静态方法”。*/
        class Foo {
            static classMethod() {
                return 'hello';
            }
        }
        /**此写法转换成ES5的写法是
         *  // 自执行函数
         *  var Foo = function () {
         *          //构造函数
                    function Foo() {
                        _classCallCheck(this, Foo);
                    }

                    // 给Foo构造函数 添加静态属性
                    _createClass(Foo, null, [{
                        key: "classMethod",
                        value: function classMethod() {
                            return 'hello';
                        }
                    }]);

                    // 返回构造函数
                    return Foo;
                }();
         * */

        l(Foo.classMethod()); // 'hello'
        var foo = new Foo();
        // foo.classMethod()
        // TypeError: foo.classMethod is not a function
        /**上面代码中，Foo类的classMethod方法前有static关键字，
         * 表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），
         * 而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，
         * 表示不存在该方法。*/

        /**注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。*/
        class Foo1 {
            static bar () {
                this.baz();
            }
            static baz () {
                console.log('hello');
            }
            baz () {
                console.log('world');
            }
        }

        Foo1.bar() // hello
        /**上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，
         * 而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，
         * 静态方法可以与非静态方法重名。*/

        /**父类的静态方法，可以被子类继承。*/
        class Foo2 {
            static classMethod() {
                return 'hello';
            }
        }

        class Bar extends Foo2 {
        }

        l(Bar.classMethod()); // 'hello'
        /**上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。*/

        /**静态方法也是可以从super对象上调用的。*/
        class Foo3 {
            static classMethod() {
                return 'hello';
            }
        }

        class Bar1 extends Foo3 {
            static classMethod() {
                return super.classMethod() + ', too';
            }
        }

        l(Bar1.classMethod()); // "hello, too"
    }

    /*****************Class 的静态属性和实例属性  *****************/
    classStaticAndInstanceProperty(){
        /**静态属性指的是 Class 本身的属性，即Class.propName，
         * 而不是定义在实例对象（this）上的属性。*/
        class Foo {
        }

        Foo.prop = 1;
        l(Foo.prop); // 1
        /**上面的写法为Foo类定义了一个静态属性prop。*/

        /**目前，只有上面这种写法可行，
         *
         * 因为 ES6 明确规定，
         * Class 内部只有静态方法，没有静态属性。*/
        // 以下两种写法都无效
        class Foo1 {
            // 写法一
            prop: 2

            // 写法二
            static prop: 2
        }

        l(Foo1.prop); // undefined

        /**目前有一个静态属性的提案，对实例属性和静态属性都规定了新的写法。*/


        /**（1）类的实例属性*/
        /**类的实例属性可以用等式，写入类的定义之中*/
        class MyClass {
            myProp = 42;

            constructor() {
                console.log(this.myProp); // 42
            }
        }
        /**上面代码中，myProp就是MyClass的实例属性。
         * 在MyClass的实例上，可以读取这个属性。*/

        /**以前，我们定义实例属性，只能写在类的constructor方法里面。
         * 因为写在外面就成了构造函数原型的属性了*/
        class ReactCounter extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    count: 0
                };
            }
        }
        /**上面代码中，构造方法constructor里面，定义了this.state属性。*/

        /**有了新的写法以后，可以不在constructor方法里面定义。*/
        class ReactCounter1 extends React.Component {
            state = {
                count: 0
            };
        }
        /**这种写法比以前更清晰。*/

        /**为了可读性的目的，对于那些在constructor里面已经定义的实例属性，
         * 新写法允许直接列出。*/
        class ReactCounter2 extends React.Component {
            state;
            constructor(props) {
                super(props);
                this.state = {
                    count: 0
                };
            }
        }


        /**（2）类的静态属性*/
        /**类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。*/
        class MyClass1 {
            static myStaticProp = 42;

            constructor() {
                console.log(MyClass1.myStaticProp); // 42
            }
        }
        let myClass1 = new MyClass1;

        /**同样的，这个新写法大大方便了静态属性的表达。*/
        // 老写法
        class Foo2 {
            // ...
        }
        Foo2.prop = 1;

        // 新写法
        class Foo3 {
            static prop = 1;
        }
        l(Foo2.prop);
        l(Foo3.prop);
        /**上面代码中，老写法的静态属性定义在类的外部。
         * 整个类生成以后，再生成静态属性。
         * 这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。
         * 另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。*/
    }

    /*****************new.target 属性  *****************/
    classTargetProperty(){

    }
}