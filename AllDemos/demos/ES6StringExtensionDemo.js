/**
 * Created by apple on 2018/4/24.
 */


/*************************************** 字符串的扩展 Demo *****************************************/

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

export default class ES6StringExtension extends Component<Props> {

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

        /*ES6 加强了对 Unicode 的支持，并且扩展了字符串对象。*/

        // 字符的 Unicode 表示法
        this.stringUnicode();

        // codePointAt()
        this.stringCodePointAt();

        // String.fromCodePoint()
        this.stringFromCodePoint();

        // 字符串的遍历器接口
        this.stringBianLi();

        // at()
        this.stringAt();

        // normalize()
        this.stringNormalize();

        // includes(), startsWith(), endsWith()
        this.stringIncludes();

        // repeat()
        this.stringRepeat();

        // padStart()，padEnd()
        this.stringPadStart();

        // matchAll()
        this.stringMatchAll();

        // 模板字符串
        this.stringModal();

        // 实例：模板编译
        this.stringModalBuild();

        // 标签模板
        this.stringSignModal();

        // String.raw()
        this.stringRow();

        // 模板字符串的限制
        this.stringModalLimit();

    }

    /***************** 字符的 Unicode 表示法 *****************/
    stringUnicode(){
        /*JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。*/
        // "a"
        console.log("\u0061");

        /*但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，
        必须用两个双字节的形式表示*/
        // 𠮷 ₻7
        console.log("\uD842\uDFB7","\u20BB7");
        /*上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），
        JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，
        所以只会显示一个空格，后面跟着一个7。*/

        /*ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。*/
        // 𠮷 ABC
        console.log("\u{20BB7}","\u{41}\u{42}\u{43}",);

        if('\u{1F680}' === '\uD83D\uDE80'){
            // '🚀' === '🚀'
            console.log("'\u{1F680}' === '\uD83D\uDE80'",);
        }
        /*上面代码中，大括号表示法与四字节的 UTF-16 编码是等价的。*/

        /*有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。*/
        if('\z' === 'z'){
            console.log("'\z' === 'z'",);
        }
        /*这个用法RN中使用不了*/
        // if('\172' === 'z'){
        //     console.log("'\172' === 'z'",);
        // }
        if('\x7A' === 'z'){
            console.log("'\x7A' === 'z'",);
        }
        if('\u007A' === 'z'){
            console.log("'\u007A' === 'z'",);
        }
        if('\u{7A}' === 'z'){
            console.log("'\u{7A}' === 'z'",);
        }


    }


    /***************** codePointAt() *****************/
    stringCodePointAt(){
        /*JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。
        对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），
        JavaScript 会认为它们是两个字符*/
        var s = "𠮷";
        //  2 � � 55362 57271
        console.log('s.length =',s.length,'s.charAt(0) =',s.charAt(0),
            's.charAt(1) =',s.charAt(1),'s.charCodeAt(0) =',s.charCodeAt(0),
            's.charCodeAt(1) =',s.charCodeAt(1));
        /*上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是0x20BB7，
        UTF-16 编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。
        对于这种4个字节的字符，JavaScript 不能正确处理，字符串长度会误判为2，
        而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。*/

        /*ES6 提供了codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。*/
        let s1 = '𠮷a';
        // 134071  57271  97
        console.log('s1.codePointAt(0) =',s1.codePointAt(0),'s1.codePointAt(1) =',s1.codePointAt(1),
            's1.codePointAt(2) =',s1.codePointAt(2));
        /*codePointAt方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，
        JavaScript 将“𠮷a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，
        返回了它的十进制码点 134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）
        和第三个字符“a”上，codePointAt方法的结果与charCodeAt方法相同。
        总之，codePointAt方法会正确返回 32 位的 UTF-16 字符的码点。
        对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。*/

        /*codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。*/
        let s2 = '𠮷a';
        // "20bb7"    "61"
        console.log('s2.codePointAt(0).toString(16) =',s2.codePointAt(0).toString(16),
            's2.codePointAt(2).toString(16) =',s2.codePointAt(2).toString(16));
        /*你可能注意到了，codePointAt方法的参数，仍然是不正确的。比如，上面代码中，
        字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt方法传入 2*/

        /*解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。*/
        let s3 = '𠮷a';
        for (let ch of s3) {
            //   20bb7 61
            console.log(ch.codePointAt(0).toString(16));
        }

        /*codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。*/
        function is32Bit(c) {
            return c.codePointAt(0) > 0xFFFF;
        }
        // true
        console.log(is32Bit("𠮷"));
         // false
        console.log(is32Bit("a"));
    }


    /***************** String.fromCodePoint() *****************/
    stringFromCodePoint(){
        /*ES5 提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别
         32 位的 UTF-16 字符（Unicode 编号大于0xFFFF）。*/
        // "ஷ"
        console.log('String.fromCharCode(0x20BB7) =',String.fromCharCode(0x20BB7));
        /*上面代码中，String.fromCharCode不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，
        最高位2被舍弃了，最后返回码点U+0BB7对应的字符，而不是码点U+20BB7对应的字符。*/

        /*ES6 提供了String.fromCodePoint方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。
        在作用上，正好与codePointAt方法相反。*/
        // 𠮷
        console.log('String.fromCodePoint(0x20BB7) =',String.fromCodePoint(0x20BB7));
        // true
        console.log( "String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y' =",
            String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y');
        /*上面代码中，如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。
         注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。*/
    }


    /***************** 字符串的遍历器接口 *****************/
    stringBianLi(){
        /*ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。*/
        for (let codePoint of 'foo') {
            // f o o
            console.log(codePoint)
        }

        /*除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。*/
        let text = String.fromCodePoint(0x20BB7);
        for (let i = 0; i < text.length; i++) {
            // �   �
            console.log(text[i]);
        }


        for (let i of text) {
            // // "𠮷"
            console.log(i);
        }
        /*上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），
        而for...of循环会正确识别出这一个字符。*/
    }


    /***************** at() *****************/
    stringAt(){
        /*ES5 对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。*/
        // "a"  �
        console.log("'abc'.charAt(0) = ",'abc'.charAt(0));
        console.log("'𠮷'.charAt(0) = ",'𠮷'.charAt(0));
        /*上面代码中的第二条语句，charAt方法期望返回的是用2个字节表示的字符，但汉字“𠮷”占用了4个字节，
        charAt(0)表示获取这4个字节中的前2个字节，很显然，这是无法正常显示的。*/

        /*目前，有一个提案，提出字符串实例的at方法，可以识别 Unicode 编号大于0xFFFF的字符，返回正确的字符。
        *
        * ！！！RN 中字符串没有 at（）这个方法
        * */
        // "a"  𠮷
        // console.log("'abc'.at(0) = ",'abc'.at(0));
        // console.log("'𠮷'.at(0) = ",'𠮷'.at(0));
    }


    /***************** normalize() *****************/
    stringNormalize(){
        /*许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。
        一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。
        另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，
        比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。

         这两种表示方法，在视觉和语义上都等价，但是 JavaScript 不能识别。*/
        //'Ǒ'==='Ǒ' =  false  'Ǒ'.length  =  1  'Ǒ'.length  =  2
        console.log("'\u01D1'==='\u004F\u030C' = ",'\u01D1'==='\u004F\u030C');
        console.log("'\u01D1'.length  = ",'\u01D1'.length);
        console.log("'\u004F\u030C'.length  = ",'\u004F\u030C'.length);
        /*上面代码表示，JavaScript 将合成字符视为两个字符，导致两种表示方法不相等。*/

        /*ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，
        这称为 Unicode 正规化。*/
        // 'Ǒ'.normalize() === 'Ǒ'.normalize() =  true
        console.log("'\u01D1'.normalize() === '\u004F\u030C'.normalize() = ",
            '\u01D1'.normalize() === '\u004F\u030C'.normalize());

        /*normalize方法可以接受一个参数来指定normalize的方式，参数的四个可选值如下。

         NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），
         返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
         NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），
         即在标准等价的前提下，返回合成字符分解的多个简单字符。
         NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），
         返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。
         （这只是用来举例，normalize方法不能识别中文。）
         NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），
         即在兼容等价的前提下，返回合成字符分解的多个简单字符。
         */
        // 1  2
        console.log("'\u004F\u030C'.normalize('NFC').length = ",
            '\u004F\u030C'.normalize('NFC').length);
        console.log("'\u004F\u030C'.normalize('NFD').length = ",
            '\u004F\u030C'.normalize('NFD').length);
        /*上面代码表示，NFC参数返回字符的合成形式，NFD参数返回字符的分解形式。*/

        /*不过，normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，
        通过 Unicode 编号区间判断*/
    }


    /***************** includes(), startsWith(), endsWith() *****************/
    stringIncludes(){
        /*传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。

        ES6 又提供了三种新方法。
         includes()：返回布尔值，表示是否找到了参数字符串。
         startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
         endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
        */
        let s = 'Hello world!';
        // true   true   true
        console.log("s.startsWith('Hello') = ",
            s.startsWith('Hello'));
        console.log("s.endsWith('!') = ",
            s.endsWith('!'));
        console.log("s.includes('o') = ",
            s.includes('o'));

        /*这三个方法都支持第二个参数，表示开始搜索的位置。*/
        // true   true   false
        console.log("s.startsWith('world', 6) = ",
            s.startsWith('world', 6));
        console.log("s.endsWith('Hello', 5) = ",
            s.endsWith('Hello', 5));
        console.log("s.includes('Hello', 6) = ",
            s.includes('Hello', 6));
        /*上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。
        它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。*/
    }


    /***************** repeat() *****************/
    stringRepeat(){
        /*repeat方法返回一个新字符串，表示将原字符串重复n次。*/
        // "xxx"  "hellohello"  ""
        console.log("'x'.repeat(3 = ",
            'x'.repeat(3));
        console.log("'hello'.repeat(2) = ",
            'hello'.repeat(2));
        console.log("'na'.repeat(0) = ",
            'na'.repeat(0));

        /*参数如果是小数，会被取整  向下取整*/
        // "nana"
        console.log("'na'.repeat(2.9) = ",
            'na'.repeat(2.9));

        /*如果repeat的参数是负数或者Infinity，会报错*/
        // RangeError  RangeError
        // console.log("'na'.repeat(Infinity) = ",
        //     'na'.repeat(Infinity));
        // console.log("'na'.repeat(-1) = ",
        //     'na'.repeat(-1));

        /*但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。
        0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。*/
        //  ""
        console.log("'na'.repeat(-0.9) = ",
            'na'.repeat(-0.9));

        /*参数NaN等同于 0。*/
        // ""
        console.log("'na'.repeat(NaN) = ",
            'na'.repeat(NaN));

        /*如果repeat的参数是字符串，则会先转换成数字。*/
        // ""
        console.log("'na'.repeat('na') = ",
            'na'.repeat('na'));
        // "nanana"
        console.log("'na'.repeat('3') = ",
            'na'.repeat('3'));
    }


    /***************** padStart()，padEnd() *****************/
    stringPadStart(){
        /*ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，
        会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。*/
        // 'ababx'
        console.log("'x'.padStart(5, 'ab') = ",
            'x'.padStart(5, 'ab'));
        // 'abax'
        console.log("'x'.padStart(4, 'ab') = ",
            'x'.padStart(4, 'ab'));
        // 'xabab'
        console.log("'x'.padEnd(5, 'ab') = ",
            'x'.padEnd(5, 'ab'));
        // 'xaba'
        console.log("'x'.padEnd(4, 'ab') = ",
            'x'.padEnd(4, 'ab'));
        /*上面代码中，padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，
        第二个参数是用来补全的字符串。*/

        /*如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。*/
        // 'xxx'
        console.log("'xxx'.padStart(2, 'ab') = ",
            'xxx'.padStart(2, 'ab'));
        // 'xxx'
        console.log("'xxx'.padEnd(2, 'ab') = ",
            'xxx'.padEnd(2, 'ab'));

        /*如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，
        则会截去超出位数的补全字符串。*/
        // '0123456abc'
        console.log("'abc'.padStart(10, '0123456789') = ",
            'abc'.padStart(10, '0123456789'));

        /*如果省略第二个参数，默认使用空格补全长度。*/
        // '   x'
        console.log("'x'.padStart(4) = ",
            'x'.padStart(4));
        // 'x   '
        console.log("'x'.padEnd(4) = ",
            'x'.padEnd(4));

        /*padStart的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。*/
        //  "0000000001"
        console.log("'1'.padStart(10, '0') = ",
            '1'.padStart(10, '0'));
        // "0000000012"
        console.log("'12'.padStart(10, '0') = ",
            '12'.padStart(10, '0'));
        // "0000123456"
        console.log("'123456'.padStart(10, '0') = ",
            '123456'.padStart(10, '0'));

        /*另一个用途是提示字符串格式。*/
        // "YYYY-MM-12"
        console.log("'12'.padStart(10, 'YYYY-MM-DD') = ",
            '12'.padStart(10, 'YYYY-MM-DD'));
        // "YYYY-09-12"
        console.log("'09-12'.padStart(10, 'YYYY-MM-DD') = ",
            '09-12'.padStart(10, 'YYYY-MM-DD'));
    }


    /***************** matchAll() *****************/
    stringMatchAll(){
        /*matchAll方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。*/
    }


    /***************** 模板字符串 *****************/
    stringModal(){
        /*
        * RN中跑步起来  全部报错
        * */

        /*传统的 JavaScript 语言，输出模板通常是这样写的。*/
        // $('#result').append(
        //     'There are <b>' + basket.count + '</b> ' +
        //     'items in your basket, ' +
        //     '<em>' + basket.onSale +
        //     '</em> are on sale!'
        // );

        /*上面这种写法相当繁琐不方便，ES6 引入了模板字符串解决这个问题。*/
        // $('#result1').append(`
        //     There are <b>${basket.count}</b> items
        //     in your basket, <em>${basket.onSale}</em>
        //     are on sale!
        // `);

        /*模板字符串（template string）是增强版的字符串，
        用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，
        或者在字符串中嵌入变量。*/
        // // 普通字符串
        // `In JavaScript '\n' is a line-feed.`
        //
        // // 多行字符串
        // `In JavaScript this is
        // not legal.`
        //
        // console.log(`string text line 1 string text line 2`);

        // 字符串中嵌入变量
        // let name = "Bob", time = "today";
        // `Hello ${name}, how are you ${time}?`

        /*上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，
        则前面要用反斜杠转义。*/
        let greeting = `\`Yo\` World!`;
        console.log(greeting)

        /*如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。*/
        // $('#list').html(`
        //     <ul>
        //         <li>first</li>
        //         <li>second</li>
        //     </ul>
        //     `);

    }


    /***************** 实例：模板编译 *****************/
    stringModalBuild(){
        /*编译不起来  不想测试*/
    }


    /***************** 标签模板 *****************/
    stringSignModal(){
        /*编译不起来  不想测试*/
    }


    /***************** String.raw() *****************/
    stringRow(){
        /*ES6 还为原生的 String 对象，提供了一个raw方法。
         *
         * String.raw方法，往往用来充当模板字符串的处理函数，
         * 返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。*/

        /*编译不起来  不想测试*/
    }


    /***************** 模板字符串的限制 *****************/
    stringModalLimit(){
        /*编译不起来  不想测试*/
    }


}