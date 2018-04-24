/**
 * Created by apple on 2018/4/24.
 */


/*************************************** 变量的解构赋值 Demo *****************************************/

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

export default class ES6VarJieGouFuZhi extends Component<Props> {

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
        // 1.数组的解构赋值
        this.jieGouForArr();

        // 2.对象的解构赋值
        this.jieGouForObj();

        // 3.字符串的解构赋值
        this.jieGouForStr();

        // 4.数值和布尔值的解构赋值
        this.jieGouForNumAndBool();

        // 5.函数参数的解构赋值
        this.jieGouForFuncPamar();

        // 6.圆括号问题
        this.jieGouForKuoHao();

        // 7.用途
        this.jieGouToUsed();
    }

    /***************** 数组的解构赋值 *****************/
    jieGouForArr(){
        /*ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。*/

        /*以前，为变量赋值，只能直接指定值。*/
        let a = 1;
        let b = 2;
        let c = 3;

        /*ES6 允许写成下面这样。*/
        let [a1, b1, c1] = [1, 2, 3];
        console.log('a =',a,'b =',b,'c =',c,'a1 =',a1,'b1 =',b1,'c1 =',c1);
        /*上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。*/

        /*本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
        下面是一些使用嵌套数组进行解构的例子。*/
        let [foo, [[bar], baz]] = [1, [[2], 3]];
        // 1 2 3
        console.log('foo =',foo,'bar =',bar,'baz =',baz);

        let [ , , third] = ["foo", "bar", "baz"];
        // "baz"
        console.log('third =',third);

        let [x, , y] = [1, 2, 3];
        // 1 3
        console.log('x =',x,'y =',y);

        let [head, ...tail] = [1, 2, 3, 4];
        // 1   [2, 3, 4]
        console.log('head =',head,'tail =',tail);

        let [x1, y1, ...z] = ['a'];
        // "a"   undefined   []
        console.log('x1 =',x1,'y1 =',y1,'z =',z);

        /*如果解构不成功，变量的值就等于undefined。*/
        let [foo1] = [];
        let [bar1, foo2] = [1];
        // foo1 = undefined bar1 = 1 foo2 = undefined
        console.log('foo1 =',foo1,'bar1 =',bar1,'foo2 =',foo2);
        /*以上两种情况都属于解构不成功，foo的值都会等于undefined。*/

        /*另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。
        这种情况下，解构依然可以成功。*/
        let [x2, y2] = [1, 2, 3];
        // 1 2
        console.log('x2 =',x2,'y2 =',y2);

        let [a2, [b2], d2] = [1, [2, 3], 4];
        // 1 2 4
        console.log('a2 =',a2,'b2 =',b2,'d2 =',d2);
        /*上面两个例子，都属于不完全解构，但是可以成功。*/

        /*如果等号的右边不是数组（或者严格地说，不是可遍历的结构，
        参见《Iterator》一章），那么将会报错。*/
        // 报错 TypeError: Invalid attempt to destructure non-iterable instance
        // let [foo3] = 1;
        // let [foo4] = false;
        // let [foo5] = NaN;
        // let [foo6] = undefined;
        // let [foo7] = null;
        // let [foo8] = {};
        // console.log('foo3 =',foo3,'foo4 =',foo4,'foo5 =',foo5,'foo6 =',
        //     foo6,'foo7 =',foo7,'foo8 =',foo8);
        /*上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），
        要么本身就不具备 Iterator 接口（最后一个表达式）。*/

        /*对于 Set 结构，也可以使用数组的解构赋值。*/
        let [x3, y3, z3] = new Set(['a', 'b', 'c']);
        // a b  c
        console.log('x3 =',x3,'y3 =',y3,'z3 =',z3);

        /*事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。*/
        function* fibs() {
            let a = 0;
            let b = 1;
            while (true) {
                yield a;
                [a, b] = [b, a + b];
            }
        }
        let [first, second, third1, fourth, fifth, sixth] = fibs();
        // 5
        console.log('sixth =',sixth);
        /*上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），
        原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。*/

        /*默认值
        * 解构赋值允许指定默认值*/
        let [foo3 = true] = [];
        // true
        console.log('foo3 =',foo3);

        let [x4, y4 = 'b'] = ['a'];
        let [x5, y5 = 'b'] = ['a', undefined];
        // x4='a', y4='b'   x5='a', y5='b'
        console.log('x4 =',x4,'y4 =',y4,'x5 =',x5,'y5 =',y5);

        /*注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
        所以，只有当一个数组成员严格等于undefined，默认值才会生效。*/
        let [x6 = 1] = [undefined];
        let [x7 = 1] = [null];
        // 1   null
        console.log('x6 =',x6,'x7 =',x7);
        /*上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。*/

        /*如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。*/
        function f() {
            console.log('aaa');
        }
        let [x8 = f()] = [1];
        /*上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。*/
        let x9;
        if ([1][0] === undefined) {
            x9 = f();
        }else {
            x9 = [1][0];
        }

        /*默认值可以引用解构赋值的其他变量，但该变量必须已经声明。*/
        let [x10 = 1, y10 = x10] = [];
        let [x11 = 1, y11 = x11] = [2];
        let [x12 = 1, y12 = x12] = [1, 2];
        // 1 1    2 2   1 2
        console.log('x10 =',x10,'y10 =',y10,'x11 =',x11,'y11 =',y11,'x12 =',x12,'y12 =',y12);
        let [x13 = y13, y13 = 1] = [];
        // undefined
        console.log('x13 =',x13,'y13 =',y13);
        /*理论上，在ES6中，x用y做默认值时，y还没有声明。
            因为let的暂时性死区，引用y13 会报错ReferenceError: y is not defined

          但是在RN中
            let也会发生变量提升，故访问的时候是容许的，只不过是undefined
        */
    }


    /***************** 对象的解构赋值 *****************/
    jieGouForObj(){
        /*解构不仅可以用于数组，还可以用于对象。*/
        let { foo, bar } = { foo: "aaa", bar: "bbb" };
        //  "aaa"  "bbb"
        console.log('foo =',foo,'bar =',bar,);

        /*对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；
        而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。*/
        let { bar1, foo1 } = { foo1: "aaa", bar1: "bbb" };

        let { baz } = { foo: "aaa", bar: "bbb" };
        //  "aaa"  "bbb"  undefined
        console.log('foo1 =',foo1,'bar1 =',bar1,'baz =',baz);
        /*上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，
        但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于undefined。*/

        /*如果变量名与属性名不一致，必须写成下面这样。*/
        let { foo: baz1 } = { foo: 'aaa', bar: 'bbb' };
        // "aaa"
        console.log('baz1 =',baz1);

        let obj = { first: 'hello', last: 'world' };
        let { first: f, last: l } = obj;
        // 'hello'  'world'
        console.log('f =',f,'l =',l);

        /*这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。*/
        let { foo: foo2, bar: bar2 } = { foo: "aaa", bar: "bbb" };
        /*也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。
        真正被赋值的是后者，而不是前者。*/
        let { foo3: baz2 } = { foo3: "aaa", bar3: "bbb" };
        //  "aaa"
        console.log('baz2 =',baz2);
        // ReferenceError: foo3 is not defined
        // console.log('foo3 =',foo3);
        /*上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。*/

        /*与数组一样，解构也可以用于嵌套结构的对象。*/
        let obj1 = {
            p: [
                'Hello',
                { y: 'World' }
            ]
        };
        let { p: [x, { y }] } = obj1;
        //  "Hello"   "World"
        console.log('x =',x,'y =',y);

        /*注意，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。*/
        let obj2 = {
            p1: [
                'Hello',
                { y: 'World' }
            ]
        };

        let { p1, p1: [x1, { y1 }] } = obj2;
        // "Hello"  "World"  ["Hello", {y: "World"}]
        console.log('x =',x,'y =',y,'p1',p1);

        /*下面是另一个例子*/
        const node = {
            loc: {
                start: {
                    line: 1,
                    column: 5
                }
            }
        };

        let { loc, loc: { start }, loc: { start: { line }} } = node;
        //  1   Object {start: Object}    Object {line: 1, column: 5}
        console.log('line =',line,'loc =',loc,'start',start);
        /*上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。
        注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。*/

        /*下面是嵌套赋值的例子*/
        let obj3 = {};
        let arr = [];
        ({ foo: obj3.prop, bar: arr[0] } = { foo: 123, bar: true });
        // {prop:123}    [true]
        console.log('obj3 =',obj3,'arr =',arr);

        /*对象的解构也可以指定默认值*/
        var {x2 = 3} = {};
        // 3
        console.log('x2 =',x2);

        var {x3, y2 = 5} = {x3: 1};
        // 1  5
        console.log('x3 =',x3,'y2 =',y2);

        var {x4: y3 = 3} = {};
        // 报错 变量没有声明
        // console.log('x4 =',x4);
        // 3
        console.log('y3 =',y3);

        var {x5: y4 = 3} = {x5: 5};
        // 报错 变量没有声明
        // console.log('x5 =',x5);
        // 5
        console.log('y4 =',y4);


        var { message: msg = 'Something went wrong' } = {};
        //  "Something went wrong"
        console.log('msg =',msg);

        /*默认值生效的条件是，对象的属性值严格等于undefined。*/
        var {x6 = 3} = {x6: undefined};
        // 3
        console.log('x6 =',x6);

        var {x7 = 3} = {x7: null};
        // null
        console.log('x7 =',x7);
        /*上面代码中，属性x等于null，因为null与undefined不严格相等，
        所以是个有效的赋值，导致默认值3不会生效。*/

        /*如果解构失败，变量的值等于undefined。*/
        let {foo3} = {bar: 'baz'};
        // undefined
        console.log('foo3 =',foo3);

        /*如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。*/
        // 报错 TypeError: Cannot read property 'bar3' of undefined
        // let {foo: {bar3}} = {baz: 'baz'};

        /*上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，
        解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错，请看下面的代码。*/
        let _tmp = {baz: 'baz'};
        // 报错 TypeError: Cannot read property 'bar3' of undefined
        // _tmp.foo.bar3

        /*如果要将一个已经声明的变量用于解构赋值，必须非常小心。*/
        // 错误的写法
        let x4;
        // 语法错误 Unexpected token 注意 因为是已经申明过的 所以 {x4}前没有像上面一样 加let 申明关键字 避免变量重定义
        // {x4} = {x4: 1};
        /*上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，
        从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。*/

        // 正确的写法
        let x5;
        ({x5} = {x5: 1});
        console.log('x5 =',x5);
        /*上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。
        关于圆括号与解构赋值的关系，参见下文。*/

        /*解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。*/
        ({} = [true, false]);
        ({} = 'abc');
        ({} = []);
        /*上面的表达式虽然毫无意义，但是语法是合法的，可以执行。*/

        /*对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。*/
        let { log, sin, cos } = Math;
        /*上面代码将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。*/

        /*由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。*/
        let arr1 = [1, 2, 3];
        let {0 : first, [arr1.length - 1] : last} = arr1;
        // 1 3
        console.log('first =',first,'last =',last);
        /*上面代码对数组进行对象解构。数组arr的0键对应的值是1，[arr.length - 1]就是2键，
        对应的值是3。方括号这种写法，属于“属性名表达式”（参见《对象的扩展》一章）。*/
    }


    /***************** 字符串的解构赋值 *****************/
    jieGouForStr(){
        /*字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。*/
        const [a, b, c, d, e] = 'hello';
        // "h" "e" "l" "l" "o"
        console.log('a =',a,'b =',b,'c =',c,'d =',d,'e =',e);

        /*类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。*/
        let {length : len} = 'hello';
        // 5
        console.log('len =',len);
    }


    /***************** 数值和布尔值的解构赋值 *****************/
    jieGouForNumAndBool(){
        /*解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。*/
        let {toString: s} = 123;
        //  ƒ toString() { [native code] }
        console.log('s =',s);
        if(s === Number.prototype.toString){
            console.log('s 全等于Number的 toString方法');
        }

        let {toString: s1} = true;
        // ƒ toString() { [native code] }
        console.log('s1 =',s1);
        if(s1 === Boolean.prototype.toString){
            console.log('s1 全等于Boolean的 toString方法');
        }
        /*上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。*/

        /*解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
        由于undefined和null无法转为对象(其实是转化成了空的对象，里面什么都没有，也没有Iterator接口 所以报错)，
        所以对它们进行解构赋值，都会报错。*/
        // TypeError: Cannot read property 'prop' of undefined
        // let { prop: x } = undefined;
        // TypeError: Cannot read property 'prop' of undefined
        // let { prop: y } = null;

    }


    /***************** 函数参数的解构赋值 *****************/
    jieGouForFuncPamar(){
        /*函数的参数也可以使用解构赋值。*/
        function add([x, y]){
            return x + y;
        }
        // 3
        console.log('add =',add([1, 2]));
        /*上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，
        数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。*/

        /*下面是另一个例子。*/
        let a = [[1, 2], [3, 4]].map(([a, b]) => a + b);
        // [ 3, 7 ]
        console.log('a =',a);

        /*函数参数的解构也可以使用默认值。*/
        function move({x = 0, y = 0} = {}) {
            return [x, y];
        }

        // [3, 8]
        console.log('move({x: 3, y: 8}) =',move({x: 3, y: 8}));
        // [3, 0]
        console.log('move({x: 3}) =',move({x: 3}));
        // [0, 0]
        console.log('move({}) =',move({}));
        // [0, 0]
        console.log('move() =',move());
        /*上面代码中，函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。
        如果解构失败，x和y等于默认值。*/

        /*注意，下面的写法会得到不一样的结果。*/
        function move1({x, y} = { x: 0, y: 0 }) {
            return [x, y];
        }
        // [3, 8]
        console.log('move1({x: 3, y: 8}) =',move1({x: 3, y: 8}));
        // [3, undefined]
        console.log('move1({x: 3}) =',move1({x: 3}));
        // [undefined, undefined]
        console.log('move1({}) =',move1({}));
        // [0, 0]
        console.log('move1() =',move1());
        /*上面代码是为函数move的参数指定默认值，即参数是数字类型0，
        而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。*/

        /*undefined就会触发函数参数的默认值。*/
        // [ 1, 'yes', 3 ]
        console.log('[1, undefined, 3].map((x = \'yes\') => x) =',[1, undefined, 3].map((x = 'yes') => x));

    }


    /***************** 圆括号问题 *****************/
    jieGouForKuoHao(){
        /*解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，
        还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
         由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不能使用圆括号。
         但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在 模式中 放置圆括号。*/

        /*以下三种解构赋值不得使用圆括号。*/
        /*（1）变量声明语句*/
        // 全部报错
        // let [(a)] = [1];
        //
        // let {x: (c)} = {};
        // let ({x: c}) = {};
        // let {(x: c)} = {};
        // let {(x): c} = {};
        //
        // let { o: ({ p: p }) } = { o: { p: 2 } };
        /*上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。*/

        /*（2）函数参数  函数参数也属于变量声明，因此不能带有圆括号。*/
        // 报错
        // function f([(z)]) { return z; }
        // 报错
        // function f([z,(x)]) { return x; }

        /*（3）赋值语句的模式*/
        // 全部报错
        // ({ p: a }) = { p: 42 };
        // ([a]) = [5];
        /*上面代码将整个模式放在圆括号之中，导致报错。*/

        // ES6中 报错  RN中 并没有报错
        [({ p: f }), { x: g }] = [{}, {}];
        // undefined   undefined
        console.log('f =',f,'g =',g);
        /*ES6 中  上面代码将一部分模式放在圆括号之中，导致报错。
        * RN 中 无报错
        * */

        /*可以使用圆括号的情况  只有一种：赋值语句的非模式部分，可以使用圆括号。*/
        // 全部正确
        [(b)] = [3];
        ({ p: (d) } = {});
        [(parseInt.prop)] = [3];
        // 3  undefined  3
        console.log('b =',b,'d =',d,'parseInt.prop =',parseInt.prop);
        /*上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；
        其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；
        第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。*/
    }


    /***************** 用途 *****************/
    jieGouToUsed(){
        /*变量的解构赋值用途很多。*/
        /*（1）交换变量的值*/
        let x = 1;
        let y = 2;
        [x, y] = [y, x];
        // 2  1
        console.log('x =',x,'y =',y);

        /*（2）从函数返回多个值  函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
        有了解构赋值，取出这些值就非常方便。*/
        // 返回一个数组
        function example() {
            return [1, 2, 3];
        }
        let [a, b, c] = example();
        // 1 2 3
        console.log('a =',a,'b =',b,'c =',c);

        // 返回一个对象
        function example1() {
            return {
                foo: 1,
                bar: 2
            };
        }
        let { foo, bar } = example1();
        // 1 2
        console.log('foo =',foo,'bar =',bar);

        /*（3）函数参数的定义 解构赋值可以方便地将一组参数与变量名对应起来。*/
        // 参数是一组有次序的值
        function f([x, y, z]) {
            // 1 2 3
            console.log('x =',x,'y =',y,'z =',z);
        }
        f([1, 2, 3]);

        // 参数是一组无次序的值
        function f1({x, y, z}) {
            // 1 2 3
            console.log('x =',x,'y =',y,'z =',z);
        }
        f1({z: 3, y: 2, x: 1});

        /*（4）提取 JSON 数据  解构赋值对提取 JSON 对象中的数据，尤其有用。*/
        let jsonData = {
            id: 42,
            status: "OK",
            data: [867, 5309]
        };
        let { id, status, data: number } = jsonData;
        //   42, "OK", [867, 5309]
        console.log(id, status, number);
        /*上面代码可以快速提取 JSON 数据的值。*/

        /*（5）函数参数的默认值*/
        // jQuery.ajax = function (url, {
        //                             async = true,
        //                             beforeSend = function () {},
        //                             cache = true,
        //                             complete = function () {},
        //                             crossDomain = false,
        //                             global = true,
        //                             // ... more config
        //                         } = {}) {
        //     // ... do stuff
        // };
        /*指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。*/

        /*（6）遍历 Map 结构  任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。
        Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。*/
        const map = new Map();
        map.set('first', 'hello');
        map.set('second', 'world');

        for (let [key, value] of map) {
            // first is hello
            // second is world
            console.log(key + " is " + value);
        }

        /*如果只想获取键名，或者只想获取键值，可以写成下面这样。*/
        // 获取键名
        for (let [key] of map) {
            console.log('key =',key);
        }

        // 获取键值
        for (let [,value] of map) {
            console.log('value =',value);
        }

        /*（7）输入模块的指定方法  加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。*/
        // const { SourceMapConsumer, SourceNode } = require("source-map");

    }

}