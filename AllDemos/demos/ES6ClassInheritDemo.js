

/***************************************Class 的继承  Demo *****************************************/

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


export default class ES6ClassInherit extends Component<Props> {

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
        this.classInheritBrief();

        // Object.getPrototypeOf()
        this.classInheritGetPrototypeOf();

        // super 关键字
        this.classInheritSuper();

        // 类的prototype 属性 和 __proto__属性
        this.classInheritPrototype();

        // 原生构造函数的继承
        this.classInheritConstructor();

        // Mixin 模式的实现
        this.classInheritMixin();
    }

    /*****************简介  *****************/
    classInheritBrief(){
        /**Class 可以通过extends关键字实现继承，
         * 这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
         * */
        class Point {
            haha(){
                l(haha);
            }
        }
        /** 此写法转换成ES5的写法是
         *
         *      var Point = function () {
                    function Point() {
                        _classCallCheck(this, Point);
                    }

                    _createClass(Point, [{
                        key: "logHaha",
                        value: function logHaha() {
                            l(haha);
                        }
                    }]);

                    return Point;
                }();
         * */


        class ColorPoint extends Point {

        }
        /**
         * extends的继承方式，实际上是寄生组合式的继承，也被称
         * 之为 完美继承。
         *
         *
         * 此写法转换成ES5的写法是
         *
         *      var ColorPoint = function (_Point) {
         *          // 让ColorPoint的原型对象，等于_Point的原型对象
         *             实现原理是：原型式继承  实现了子类继承父类原型链上的所有属性和方法
         *             最终的结果：
         *                  1.子类构造函数的原型对象是，父类构造函数的原型对象
         *                  2.子类原型对象的constructor指针，指向了子类的构造函数
         *                  3.子类构造函数静态属性__proto__，保存了父类的构造函数
         *                  4.通过原型式继承，实现了子类继承父类原型链接上的所有属性
         *          _inherits(ColorPoint, _Point);

                    // 申明构造函数
                    function ColorPoint() {

                        // 检查构造函数的调用方式是否是new操作符调用
                        _classCallCheck(this, ColorPoint);

                        // 让ColorPoint的实例对象，调用父类的构造函数
         *                 实现原理是：借用构造函数式继承  实现了子类继承父类构造函数上的所有属性和方法
         *                 最终的结果：
         *                  1.用apply实现，子类this，传递子类构造函数的参数，并调用父类的构造函数，
         *                  2.返回了真实的实例对象指针
         *                  3.通过借用构造函数式继承，实现了子类继承父类构造函数上的所有属性和方法
         *              return _possibleConstructorReturn(
                                    this,
                                    (
                                        ColorPoint.__proto__ ||
                                        Object.getPrototypeOf(ColorPoint)
                                    ).apply(this, arguments)
                               );
                        }

                        // 返回构造函数   ColorPoint
                        return ColorPoint;

                }(Point);
         *
         *
         * 写法分析，
         * 1.使用了一个自执行函数IIFE，模拟了块级作用域，
         *      1>. 接受一个参数，此参数是父类的构造函数
         *      2>. 同时将返回值（是一个函数指针）赋值给 var ColorPoint 变量。
         *
         * 2.自执行函数里面做了如下操作
         *
         *
         *   1>. 调用了_inherits(ColorPoint, _Point)方法，_inherits是什么？
         *      它是实现了原型式继承，让子类的原型对象，等于父类的原型对象。
         *
         *      他接受两个参数
         *      1).子类的构造函数 subClass
         *      2).父类的构造函数 superClass
         *
         *      具体代码实现如下：
         *      function _inherits(subClass, superClass) {
         *
         *          // 父类不是一个构造函数，或者不等于null
                    if (typeof superClass !== "function" && superClass !== null) {
                        // 抛出异常 说明父类必须是一个函数或者是null
                        throw new TypeError(
                            "Super expression must either be null or a function, not "
                            + typeof superClass);
                    }

                    // 调用Object.create方法,生成一个继承的新对象，赋值给子类构造函数的原型对象
                        实现原型式继承
                    subClass.prototype = Object.create(
                        superClass && superClass.prototype,
                        {
                            constructor: {
                                // 更改原型上 constructor 的指向为子类的构造函数
                                value: subClass,
                                enumerable: false,
                                writable: true,
                                configurable: true
                            }
                        }
                    );

                    // 因为在下面的方法中，需要调用父类的构造函数，而且最好子类能够存储父类的构造函数
                       所以这里，通过子类构造函数(函数本身也是对象)的静态属性__proto__ 来存储父类的
                       构造函数
                    if (superClass) {
                        // 存在setPrototypeOf就调用，不存在就直接用__proto__去赋值。
                        Object.setPrototypeOf ?
                            Object.setPrototypeOf(subClass, superClass) :
                            subClass.__proto__ = superClass;
                    }
                }

         *      1). 调用了Object.create()方法，create()是什么？
         *          在ES5中，新增了一个create（）方法，来创建对象，这个方法的实现原理是原型式继承。
         *
         *          他接受两个参数
         *          1.第一个参数是你要继承的对象。
                    2.第二个参数是可选的，一个为新对象定义额外属性的对象。
         *
         *          第一个参数，superClass && superClass.prototype表达式的结果是
         *          1. 如果superClass存在，且superClass.prototype也存在，那么
                        表达式运算到最后的表示式是 superClass.prototype
                    2. 如果superClass不存在，那么表达式运算到最后的表示式是
                        superClass
         *
         *          第二个参数，实现的功能是，这是原型对象的constructor属性，
         *          1.更改constructor属性的指向为，指向子类的构造函数subClass；
         *          2.设置constructor属性不可枚举
         *          3.设置constructor属性可写
         *          4.设置constructor属性可删除
         *
         *          新生成的对象，他的原型对象是，
         *          1. 正常情况下，子类的原型对象，应该继承父类构造函数的原型对象，
         *              也就是superClass.prototype。
         *          2. 其他情况下，子类的原型对象，直接继承父类的构造函数，
         *              也就是superClass。

                    最终目的，是针对子类subClass，实现了原型式的继承superClass。
                    1. 将新生成的子类实例，赋值给子类构造函数的原型对象
         *
         *      2).  通过子类的静态属性__proto__，来保存父类的构造函数，以供下面的方法访问
         *              1. 存在Object.setPrototypeOf()方法，就调用，保存父类的构造函数
         *              2. 不存在该方法，直接设置静态属性subClass.__proto__,指向父类的构造函数
         *          子类构造函数静态属性__proto__,指向父类的构造函数。这样的话，下面就的方法
         *          就可以使用借用构造函数方式的继承，调用父类的构造函数方法了。从而实现了子类
         *          继承父类构造函数上的所有属性和方法
         *
         *
         *   2>. 申明了一个构造函数，function ColorPoint()
         *
         *      1). 构造函数的返回值是，_possibleConstructorReturn(
         *                              this,
         *                              (
         *                                  ColorPoint.__proto__ ||
                                            Object.getPrototypeOf(ColorPoint)
                                        ).apply(this, arguments)
                                    );
                2). 返回值，是通过调用_possibleConstructorReturn()方法实现的，
                    _possibleConstructorReturn 是什么？
         *
         *          它的作用是，实现借用构造函数式的继承
         *
         *          他接受两个参数
         *          1).实例对象，this。
         *          2). (ColorPoint.__proto__ ||
                                Object.getPrototypeOf(
                                                        ColorPoint
                                )
                        ).apply(this, arguments)
         *
         *              注意，这里的ColorPoint.__proto__，是构造函数上面的静态属性__proto__，
         *              以类的方法调用，在前面的_inherits()方法中，已经设置了子类的静态属性__proto__为
         *              父类的构造函数，所以这里的代码就相当是
         *
         *              父类的构造函数.apply(this, arguments)
         *
         *              也就是说，让子类使用，借用构造函数的方式，实现了构造函数里面属性的继承。
         *
         *              apply()函数的返回值是任意类型的，他的返回值取决于父类的构造函数的返回值。
         *
         *
         *      具体代码实现如下：
         *      function _possibleConstructorReturn(self, call) {

                    // 不存在this
                    if (!self) {
                        // 抛出异常 没有调用父类的初始化方法
                        throw new ReferenceError("this hasn't been " +
                            "initialised - super() hasn't been called");
                    }

                    // 返回self 或者 call
                    return call &&
                            (typeof call === "object" || typeof call === "function") ?
                                call :
                                self;
                }
         *
         *      1). 判断构造函数里面，有没有显示的调用父类的构造函数，如果没有是不存在this指针的。
         *      2). 如果原型对象不存在，则返回call，此时原型对象就是null；
         *          如果原型对象存在，且原型对象是一个函数，或者是对象，则返回原型对象，
         *          （类似new一个工厂函数的情况）；
         *          如果原型对象存在，但是，他并不是函数或者对象，则返回self。
         *
         *
         *   3>. 返回上面申明的构造函数，ColorPoint()，并赋值给变量ColorPoint;
         *
         * */

        let colorPoint = new ColorPoint;
        l(colorPoint.haha);
        l(colorPoint.__proto__ === ColorPoint.prototype); // true
        l(colorPoint.__proto__ === ColorPoint.prototype.__proto__);// false



        /**上面代码定义了一个ColorPoint类，该类通过extends关键字，
         * 继承了Point类的所有属性和方法。但是由于没有部署任何代码，
         * 所以这两个类完全一样，等于复制了一个Point类。
         * 下面，我们在ColorPoint内部加上代码。*/
        class ColorPoint1 extends Point {
            constructor(x, y, color) {
                // 调用父类的constructor(x, y)
                super(x, y);
                this.color = color;
            }
            toString() {
                // 调用父类的toString()
                return this.color + ' ' + super.toString();
            }
        }
        /**
         * 此写法转换成ES5的写法是
         *
         *
         *      var ColorPoint1 = function (_Point2) {
         *          // 原型式继承
                    _inherits(ColorPoint1, _Point2);

                    // 声明构造函数
                    function ColorPoint1(x, y, color) {

                        // 检查构造函数调用方式是否正确
                        _classCallCheck(this, ColorPoint1);

                        // 得到this指针 使用call实现 借用构造函数式的继承
                            因为父类此处只需要 x，y 两个参数，所以使用call
                            来实现更方便。

                        var _this3 = _possibleConstructorReturn(
                                            this,
                                            (
                                                ColorPoint1.__proto__ ||
                                                Object.getPrototypeOf(
                                                                        ColorPoint1
                                                                      )
                                            ).call(this, x, y) // 传递部分参数 使用call方便
                                       );

                        // 运行子类构造函数的代码
                        _this3.color = color;

                        // 返回this指针
                        return _this3;
                    }

                    // 设置原型上面的方法 toString
                    _createClass(ColorPoint1, [{
                            key: "toString",
                            value: function toString() {
                                return this.color + ' '
                                        // 通过call方法，调用get方法，访问父类上的属性或方法，得到返回值
                                        + _get(
                                                ColorPoint1.prototype.__proto__ ||
                                                Object.getPrototypeOf(ColorPoint1.prototype),
                                                "toString",
                                                this
                                            ).call(this);
                            }
                        }]
                    );

                    // 返回构造函数 ColorPoint1
                    return ColorPoint1;

                }(Point); // 传递父类的构造函数
         *
         *
         *      super.toString()  调用父类的toString() 转换后，其实的是
         *      通过call方法，传递了this指针，使用了this去调用了，一个名为_get()方法
         *      那么，这个_get()是什么？
         *
         *          它的作用是，访问父类的属性，或者调用父类的方法，得到父类对应的返回值。
         *
         *          他接受三个参数
         *          1). 父类的构造函数；
         *              注意，这里的ColorPoint1.prototype.__proto__，是构造函数上面的静态属性__proto__，
         *              以类的方法调用，在前面的_inherits()方法中，已经设置了子类的静态属性__proto__为
         *              父类的构造函数，所以这里的代码
         *
         *              ColorPoint1.prototype.__proto__ ||
                        Object.getPrototypeOf(ColorPoint1.prototype),
         *
         *              就相当是
         *              父类的构造函数,
         *
         *          2). 属性所对应的属性名
         *
         *          3). 子类的实例对象
         *
         *      具体代码实现如下：
         *      var _get = function get(object, property, receiver) {

                    // 父类的构造函数不存在 就设置为Function的原型对象
                    if (object === null) {
                        object = Function.prototype;
                    }

                    // 取得父类的构造函数 上本身 property属性(此处为"toString",)，所对应的描述符
                    var desc = Object.getOwnPropertyDescriptor(object, property);

                    // 父类构造函数不存在该属性描述符
                    if (desc === undefined) {

                        // 取得构造函数上的原型对象
                        var parent = Object.getPrototypeOf(object);

                        if (parent === null) {
                            // 原型对象不存在，返回undefined
                            return undefined;

                        } else {
                            // 原型对象存在，递归调用 从而达到取得原型对象上，
                               property属性(此处为"toString",)，所对应的属性值
                            return get(parent, property, receiver);

                        }

                    }

                    // 该对象上，存在property属性描述符
                    else if ("value" in desc) {
                        // 描述符里有，属性名为value的属性，返回该属性值。
                        return desc.value;

                    } else {
                        // 描述符里没有，属性名为value的属性，取值get方法
                        var getter = desc.get;

                        if (getter === undefined) {
                            // 也不存在get的属性名 则返回undefined
                            return undefined;

                        }

                        // 存在get的属性名 使用子类的实例对象
                           调用get方法，返回属性值
                        return getter.call(receiver);
                    }
                };
         *
         *
         * */
        let colorPoint1 = new ColorPoint1();
        l(colorPoint1.constructor);
        /**上面代码中，constructor方法和toString方法之中，都出现了super关键字，
         * 它在这里表示父类的构造函数，用来新建父类的this对象。*/

        /**子类必须在constructor方法中调用super方法，否则新建实例时会报错。
         * 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，
         * 得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。
         * 如果不调用super方法，子类就得不到this对象。
         */
        class ColorPoint2 extends Point {
            // constructor() {
            // }
        }

        // let cp = new ColorPoint2(); // ReferenceError
        /**上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，
         * 导致新建实例时报错。
         * */


        /**ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
         *
         * ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），
         * 然后再用子类的构造函数修改this。*/


        /**如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。
         * 也就是说，不管有没有显式定义，任何一个子类都有constructor方法。*/
        class ColorPoint3 extends Point {
        }
        // 等同于
        class ColorPoint4 extends Point {
            constructor(...args) {
                super(...args);
            }
        }

        /**另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，
         * 才可以使用this关键字，否则会报错。这是因为子类实例的构建，
         * 基于父类实例，只有super方法才能调用父类实例。*/
        class ColorPoint5 extends Point {
            constructor(x, y, color) {
                // this.color = color; // ReferenceError
                super(x, y);
                this.color = color; // 正确
            }
        }
        /**上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，
         * 而放在super方法之后就是正确的。*/

        /**下面是生成子类实例的代码。*/
        let cp = new ColorPoint(25, 8, 'green');

        l(cp instanceof ColorPoint); // true
        l(cp instanceof Point); // true
        /**上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。*/

        /**最后，父类的静态方法，也会被子类继承。*/
        class A {
            static hello() {
                console.log('hello world');
            }
        }
        /**
         * 此写法转换成ES5的写法是
         *
         *      var A = function () {
                    function A() {
                        _classCallCheck(this, A);
                    }

                    // 在父类的构造函数上，绑定了静态方法hello
                    _createClass(A, null, [{
                        key: "hello",
                        value: function hello() {
                            console.log('hello world');
                        }
                    }]);

                    return A;
                }();
         */

        class B extends A {
        }
        B.hello()  // hello world
        l(B.hello);
        /**上面代码中，hello()是A类的静态方法，B继承A，也继承了A的静态方法。*/
    }


    /*****************Object.getPrototypeOf()  *****************/
    classInheritGetPrototypeOf(){
        /**Object.getPrototypeOf方法可以用来从子类上获取父类。*/
        class Point {
        }

        class ColorPoint extends Point {
        }

        l(Object.getPrototypeOf(ColorPoint) === Point);  // true
        /**因此，可以使用这个方法判断，一个类是否继承了另一个类。*/
    }


    /*****************super 关键字  *****************/
    classInheritSuper(){
        /**super这个关键字，既可以当作函数使用，也可以当作对象使用。
         * 在这两种情况下，它的用法完全不同。*/

        /**第一种情况，super作为函数调用时，代表父类的构造函数。
         * ES6 要求，子类的构造函数必须执行一次super函数。*/
        class A {}

        class B extends A {
            constructor() {
                super();
            }
        }
        /**上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。
         * 这是必须的，否则 JavaScript 引擎会报错。*/

        /**注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，
         * 因此super()在这里相当于A.prototype.constructor.call(this)。
         *
         * 借用构造函数模式的继承
         * */
        class A1 {
            constructor() {
                // 构造函数的名称
                let func = new.target;
                l(func.name);
            }
        }
        class B1 extends A1 {
            constructor() {
                super();
            }
        }
        new A1(); // A1
        // new B1() // B1 但是在RN中 func为undefined!!! 从而报错
        /**上面代码中，new.target指向当前正在执行的函数。
         * 可以看到，在super()执行时，它指向的是子类B的构造函数，
         * 而不是父类A的构造函数。
         * 也就是说，super()内部的this指向的是B。*/

        /**作为函数时，super()只能用在子类的构造函数之中，
         * 用在其他地方就会报错。*/
        class B2 extends A {
            m() {
                // super(); // 报错
            }
        }
        /**上面代码中，super()用在B类的m方法之中，就会造成句法错误。*/

        /**第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；
         * 在静态方法中，指向父类。*/
        class A3 {
            p() {
                return 2;
            }
        }

        class B3 extends A3 {
            constructor() {
                super();
                console.log(super.p()); // 2
            }
        }

        let b = new B3();
        /**上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。
         * 这时，super在普通方法之中，指向A.prototype，
         * 所以super.p()就相当于A.prototype.p()。*/

        /**这里需要注意，由于super指向父类的原型对象，
         * 所以定义在父类实例上的方法或属性，是无法通过super调用的。*/
        class A4 {
            constructor() {
                this.p = 2;
            }
        }

        class B4 extends A4 {
            get m() {
                return super.p;
            }
        }

        let b4 = new B4();
        l(b4.m); // undefined
        /**上面代码中，p是父类A实例的属性，super.p就引用不到它。*/

        /**如果属性定义在父类的原型对象上，super就可以取到。*/
        class A5 {}
        A5.prototype.x = 2;

        class B5 extends A5 {
            constructor() {
                super();
                console.log(super.x) // 2
            }
        }

        let b5 = new B5();
        /**上面代码中，属性x是定义在A.prototype上面的，
         * 所以super.x可以取到它的值。*/

        /**ES6 规定，在子类普通方法中通过super调用父类的方法时，
         * 方法内部的this指向当前的子类实例。*/
        class A6 {
            constructor() {
                this.x = 1;
            }
            print() {
                console.log(this.x);
            }
        }

        class B6 extends A6 {
            constructor() {
                super();
                this.x = 3;
            }
            m() {
                super.print();
            }
        }

        let b6 = new B6();
        l(b6.m()); // 3
        /**上面代码中，super.print()虽然调用的是A.prototype.print()，
         * 但是A.prototype.print()内部的this指向子类B的实例，导致输出的是3，
         * 而不是1。也就是说，实际上执行的是super.print.call(this)。*/

        /**由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，
         * 赋值的属性会变成子类实例的属性。
         *
         * RN中不成立！！！！
         * */
        class A7 {
            constructor() {
                this.x = 1;
            }
        }

        class B7 extends A7 {
            constructor() {
                super();
                this.x = 2;
                super.x = 3;
                console.log(super.x); // undefined
                console.log(this.x); // 3  在RN中  还是2 ！！！！！
            }
        }

        let b7 = new B7();
        /**上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。
         * 而当读取super.x的时候，读的是A.prototype.x，
         * 所以返回undefined。*/

        /**如果super作为对象，用在静态方法之中，这时super将指向父类，
         * 而不是父类的原型对象。*/
        class Parent {
            static myMethod(msg) {
                console.log('static', msg);
            }

            myMethod(msg) {
                console.log('instance', msg);
            }
        }

        class Child extends Parent {
            static myMethod(msg) {
                // 静态方法中
                super.myMethod(msg);
            }

            myMethod(msg) {
                // 实例方法中
                super.myMethod(msg);
            }
        }

        Child.myMethod(1); // static 1

        var child = new Child();
        child.myMethod(2); // instance 2
        /**上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。*/

        /**另外，在子类的静态方法中通过super调用父类的方法时，
         * 方法内部的this指向当前的子类，而不是子类的实例。*/
        class A8 {
            constructor() {
                this.x = 1;
            }
            static print() {
                console.log(this.x);
            }
        }

        class B8 extends A8 {
            constructor() {
                super();
                this.x = 2;
            }
            static m() {
                super.print();
            }
        }

        B8.x = 3;
        B8.m() // 3
        /**上面代码中，静态方法B.m里面，super.print指向父类的静态方法。
         * 这个方法里面的this指向的是B，而不是B的实例。*/

        /**注意，使用super的时候，必须显式指定
         * 是作为函数、还是作为对象使用，否则会报错。*/
        class A9 {}

        class B9 extends A9 {
            constructor() {
                super();
                // console.log(super); // 报错
            }
        }
        /**上面代码中，console.log(super)当中的super，无法看出是作为函数使用，
         * 还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。
         * 这时，如果能清晰地表明super的数据类型，就不会报错。*/
        class B0 extends A9 {
            constructor() {
                super();
                console.log(super.valueOf() instanceof B0); // true
            }
        }

        let b0 = new B0();
        /**上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。
         * 同时，由于super使得this指向B的实例，
         * 所以super.valueOf()返回的是一个B的实例。*/

        /**最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
         *
         * RN中不行  会报错！！！！
         * */
        var obj = {
            toString() {
                // return "MyObject: " + super.toString();
            }
        };

        l(obj.toString()); // MyObject: [object Object]
    }


    /*****************类的prototype 属性 和 __proto__属性 *****************/
    classInheritPrototype(){
        /**大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，
         * 指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，
         * 同时有prototype属性和__proto__属性，因此同时存在两条继承链。*/

        /**
         * （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
         *
         * （2）子类prototype属性的__proto__属性，表示方法的继承，
         * 总是指向父类的prototype属性。
         * */
        class A {
        }

        class B extends A {
        }

        l(B.__proto__ === A); // true
        l(B.prototype.__proto__ === A.prototype) // true
        /**上面代码中，
         * 子类B的__proto__属性指向父类A，
         * 子类B的prototype属性的__proto__属性指向父类A的prototype属性。*/

        /**这样的结果是因为，类的继承是按照下面的模式实现的。*/
        class A2 {
        }

        class B2 {
        }

        // B2 的实例继承 A2 的实例
        Object.setPrototypeOf(B2.prototype, A2.prototype);

        // B2 继承 A2 的静态属性
        Object.setPrototypeOf(B2, A2);

        const b2 = new B2();

        /**《对象的扩展》一章给出过Object.setPrototypeOf方法的实现。*/
        Object.setPrototypeOf = function (obj, proto) {
            obj.__proto__ = proto;
            return obj;
        }

        /**因此，就得到了上面的结果*/
        Object.setPrototypeOf(B2.prototype, A2.prototype);
        // 等同于
        B2.prototype.__proto__ = A2.prototype;

        Object.setPrototypeOf(B2, A2);
        // 等同于
        B2.__proto__ = A2;

        /**这两条继承链，可以这样理解：
         * 作为一个对象(函数对象)，子类（B）的原型（__proto__属性）是父类（A）；
         * 作为一个构造函数，子类（B）的原型对象（prototype属性）
         * 是父类的原型对象（prototype属性）的实例。*/
        Object.create(A2.prototype);
        // 等同于
        B2.prototype.__proto__ = A2.prototype;

        /**extends关键字后面可以跟多种类型的值。*/
        class B3 extends A {
        }
        /**上面代码的A，只要是一个有prototype属性的函数，就能被B继承。
         * 由于函数都有prototype属性（除了Function.prototype函数），
         * 因此A可以是任意函数。*/


        /**下面，讨论两种情况。*/

        /**第一种，子类继承Object类。*/
        class A3 extends Object {
        }

        l(A3.__proto__ === Object); // true
        l(A3.prototype.__proto__ === Object.prototype); // true
        /**这种情况下，A其实就是构造函数Object的复制，
         * A的实例就是Object的实例。*/

        /**第二种情况，不存在任何继承。*/
        class A4 {
        }

        l(A4.__proto__ === Function.prototype); // true
        l(A4.prototype.__proto__ === Object.prototype); // true
        /**这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，
         * 所以直接继承Function.prototype。
         * 但是，A调用后返回一个空对象（即Object实例），
         * 所以A.prototype.__proto__指向构造函数（Object）的prototype属性。*/


        /**实例的__proto__属性*/
        /**子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。
         * 也就是说，子类的原型的原型，是父类的原型。*/
        var p1 = new A(2, 3);
        var p2 = new B(2, 3, 'red');

        l(p2.__proto__ === p1.__proto__); // false
        l(p2.__proto__.__proto__ === p1.__proto__);// true
        /**上面代码中，B继承了A，导致前者原型的原型是后者的原型。*/

        /**因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为。*/
        p2.__proto__.__proto__.printName = function () {
            console.log('Ha');
        };
        p1.printName() // "Ha"
        /**上面代码在ColorPoint的实例p2上向Point类添加方法，
         * 结果影响到了Point的实例p1。*/
    }


    /*****************原生构造函数的继承  *****************/
    classInheritConstructor(){
        /**
         * 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。
         * ECMAScript 的原生构造函数大致有下面这些。

            Boolean()
            Number()
            String()
            Array()
            Date()
            Function()
            RegExp()
            Error()
            Object()
         */

        /**以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。*/
        function MyArray() {
            Array.apply(this, arguments);
        }

        MyArray.prototype = Object.create(Array.prototype, {
            constructor: {
                value: MyArray,
                writable: true,
                configurable: true,
                enumerable: true
            }
        });
        /**上面代码定义了一个继承 Array 的MyArray类。
         * 但是，这个类的行为与Array完全不一致。*/
        var colors = new MyArray();
        colors[0] = "red";
        l(colors.length);  // 0

        colors.length = 0;
        l(colors[0]);  // "red"
        /**之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，
         * 通过Array.apply()或者分配给原型对象都不行。
         * 原生构造函数会忽略apply方法传入的this，
         * 也就是说，原生构造函数的this无法绑定，导致拿不到内部属性。*/

        /**ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，
         * 由于父类的内部属性(不可遍历属性)无法获取，导致无法继承原生的构造函数。
         *
         * 比如，Array构造函数有一个内部属性
         * [[DefineOwnProperty]]，用来定义新属性时，更新length属性，
         * 这个内部属性无法在子类获取，
         * 导致子类的length属性行为不正常。*/

        /**下面的例子中，我们想让一个普通对象继承Error对象。*/
        var e = {};

        Object.getOwnPropertyNames(Error.call(e))
        // [ 'stack' ]

        Object.getOwnPropertyNames(e)
        // []
        /**上面代码中，我们想通过Error.call(e)这种写法，让普通对象e具有Error对象的实例属性。
         * 但是，Error.call()完全忽略传入的第一个参数，而是返回一个新对象，
         * e本身没有任何变化。这证明了Error.call(e)这种写法，无法继承原生构造函数。*/

        /**ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，
         * 然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。
         * 下面是一个继承Array的例子。*/
        class MyArray1 extends Array {
            constructor(...args) {
                super(...args);
            }
        }

        var arr = new MyArray1();
        arr[0] = 12;
        l(arr.length); // 1

        arr.length = 0;
        l(arr[0]); // undefined
        /**上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。
         * 这意味着，ES6 可以自定义原生数据结构（比如Array、String等）的子类，
         * 这是 ES5 无法做到的。*/

        /**上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
         * 因此可以在原生数据结构的基础上，定义自己的数据结构。
         * 下面就是定义了一个带版本功能的数组。*/
        class VersionedArray extends Array {
            constructor() {
                super();
                this.history = [[]];
            }
            commit() {
                this.history.push(this.slice());
            }
            revert() {
                this.splice(0, this.length, ...this.history[this.history.length - 1]);
            }
        }

        let x = new VersionedArray();

        x.push(1);
        x.push(2);
        x // [1, 2]
        x.history // [[]]

        // x.commit();
        // x.history // [[], [1, 2]]
        //
        // x.push(3);
        // x // [1, 2, 3]
        // x.history // [[], [1, 2]]
        //
        // x.revert();
        x // [1, 2]
        /**上面代码中，VersionedArray会通过commit方法，
         * 将自己的当前状态生成一个版本快照，存入history属性。
         * revert方法用来将数组重置为最新一次保存的版本。
         * 除此之外，VersionedArray依然是一个普通数组，
         * 所有原生的数组方法都可以在它上面调用。*/

        /**下面是一个自定义Error子类的例子，可以用来定制报错时的行为。*/
        class ExtendableError extends Error {
            constructor(message) {
                super();
                this.message = message;
                this.stack = (new Error()).stack;
                this.name = this.constructor.name;
            }
        }

        class MyError extends ExtendableError {
            constructor(m) {
                super(m);
            }
        }

        var myerror = new MyError('ll');
        myerror.message // "ll"
        myerror instanceof Error // true
        myerror.name // "MyError"
        myerror.stack
        // Error
        //     at MyError.ExtendableError
        //     ...

        /**注意，继承Object的子类，有一个行为差异。*/
        class NewObj extends Object{
            constructor(){
                super(...arguments);
            }
        }
        var o = new NewObj({attr: true});
        l(o.attr === true);  // false
        /**上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。
         * 这是因为 ES6 改变了Object构造函数的行为，
         * 一旦发现Object方法不是通过new Object()这种形式调用，比如这里通过的NewObj
         * ES6 规定Object构造函数会忽略参数。*/
    }


    /*****************Mixin 模式的实现  *****************/
    classInheritMixin(){
        /**Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
         * 它的最简单实现如下。*/
        const a = {
            a: 'a'
        };
        const b = {
            b: 'b'
        };
        const c = {...a, ...b}; // {a: 'a', b: 'b'}
        /**上面代码中，c对象是a对象和b对象的合成，具有两者的接口。*/

        /**下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。*/
        function mix(...mixins) {
            class Mix {}

            for (let mixin of mixins) {
                copyProperties(Mix.prototype, mixin); // 拷贝实例属性
                copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)); // 拷贝原型属性
            }

            return Mix;
        }

        function copyProperties(target, source) {
            for (let key of Reflect.ownKeys(source)) {
                if ( key !== "constructor"
                    && key !== "prototype"
                    && key !== "name"
                ) {
                    let desc = Object.getOwnPropertyDescriptor(source, key);
                    Object.defineProperty(target, key, desc);
                }
            }
        }

        /**上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。*/
        class DistributedEdit extends mix(Loggable, Serializable) {
            // ...
        }
    }


}