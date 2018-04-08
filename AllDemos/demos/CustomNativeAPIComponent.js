/**
 * Created by apple on 2018/4/3.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,

    // 所有的Native组件
    NativeModules,
    // Native事件监听
    DeviceEventEmitter,
    // 新Native事件监听
    NativeEventEmitter,

    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 CustomNativeAPIComponent*******************************/
/*
    React Native 使用JavaScriptCore框架提供JavaScript运行环境，通过调用evaluateScript方法执行特定的js脚步传递数据，
    完成OC和JS的交互。
    我们可以先思考下，编程中调用一个功能需要什么，应该是实现功能的是哪一个类的哪一个方法，需要传递什么参数即可。
    React Native也是如此，当JS调用Native模块时，必须包含模块、方法和参数信息，从而定位具体调用哪个模块的那个方法。
    此时，需要一个模块的配置信息映射表，来作为双方通讯的桥梁。

    现在第一个问题是RN是如何提供这个模块配合映射表的？ 模块配合映射表

    在RN加载的时候，所以注册且符合规范的模块都会被导出，生成对应的模块数据类，RCTModuleData,该数据类中缓存了模块的对象实例、
    以及模块的索引ModuleID。

    在RCTModuleData中，当前模块所有的模块方法都会通过OC的runtime被导出，从而生成某块方法类，RCTModuelMethod，该方法类对象
    缓存了原生的方法和JS方法的对应关系以及模块的实例，且在生成配置的时候会顺序生成方法的索引MethodID。

    在这些处理完以后，会为JS模块生成一份模块配置表，包含模块名、JS方法、常量参数、ModuleID和MethodID。

    最终，这份配置信息表通过调用[_javaScriptExecutor injectJSONText:asGlobalObjectNamed:callback:]向JS端注册，
    生成对应的JS模块和方法。

    通过配置表，我们可以很清晰地将调用的JS方法映射到对应的Native模块方法上。


    现在第二问题是：如何使用配置表来实现JS模块和Native模块之间的相互调用？通讯流程

    JS会维护一个MessageQueue，当调用模块的方法时，调用会被解析为模块名ModuleName,模块方法MethodName、参数Params这三个部分，
    并将这个三个部分传递给MessageQueue，通过前面生成的模块配置表remoteModuleConfig解析为ModuleID何MethodID。
    MessageQueue和原生代码中的RTCBridge类似，都提供了将 模块方法调用 和 模块通讯数据 相互转换的功能。它提供了四个接口，
    RN就是通过在RTCBridge中调用特定的接口来完成JavaScript与Native之间的通讯的。

    processBatch：获取JS模块的方法调用。
    invokeCallbackAndReturnFlushedQueue：调用JS模块执行时传递的回调函数
    callFunctionReturnFlushedQueue：处理OC对JS模块的功能调用
    flushedQueue：用于刷新MessageQueue队列

    如果调用的参数包含了一个callback回调函数，MessageQueue会将参数Params中的对调函数缓存到本地，并且生成一个CallbackID来代替。最终将
    JS调用以ModuleID、MethodID、Params的形式缓存起来，然后传递给Native。

    需要说明的是不是JS模块主动将数据传递给Native的，而是Native模块主动调用MessageQueue的接口（processBatch）得到数据的，该接口
    的返回值是MessageQueue队列中缓存的JS调用的消息数据（[ModuleID,MethodID,Params]。

    Native在得到消息数据（[ModuleID,MethodID,Params]之后，通过ModuleID索引，对应到模块对象RCTModuleData,然后在模块对像中调用
    MethodID索引，对应到模块的方法RCTModuleMethod,这样就定位到了JS模块的方法所对应的Natvie某块方法。

    JS模块和Native某块间数据是以JSON类型来传递的，而Native模块方法的参数必须是Native的类型，因此，在方法实现之前，需要将JS传递的
    参数Params，根据对应模块方法的参数类型进行处理。在RCTModuleMethod中，框架会通过runtime来获取模块方法的参数类型，然后将JS转换
    成对应的Native类型，而对于回调函数CallbackID，则会转换成一个block函数来替换。最后，再由RCTModuleMethod来完成方法的调用。

    如果模块方法定义了回调函数，那模块功能代码执行完毕后，需要执行回调函数。再来看看RCTModuleMethod在参数转换时，做了什么处理。
    回调函数中调用了MessageQueue的接口（invokeCallbackAndReturnFlushedQueue），将CallbackID以及参数（需要序列化成JSON数据）
    传递给MessageQueue，最终由MessageQueue再通过CallbackID找到之前缓存的callback回调函数，执行JS回调，这样就完成了一次JS模块
    调用Native模块的流程。

    JS端也会生成一份Native模块配置的localModules，Native模块可以通过enqueue-JSCall:args:直接调用JS模块方法，这也是通过传递
    ModuleID和MethodID来调用的。与之前Native模块中对回调函数的处理相同，通过调用MessageQueue的callFunctionReturnFlushedQueue
    接口实现这个流程。

    RN在这个基础上提供了在JS模块中对于Native模块事件的监听处理：在JS端注册事件响应函数，通过Native端发出事件通知，然后JS接受通知后
    执行对应的事件响应。我们也可以通过这个功能来间接的实现Native对JS模块的调用。

    自定义Native API组件
    1.模块的定义：模块必须在编译及运行时向系统注册，同时告诉系统上面属性和方法可以被JS调用，才会被系统处理成模块而被调用

    模块类必须遵守RCTBridgeModule协议
    import "RCTBridgeModule.h"
    @interface CalendarManager : NSObject<RCTBridgeModule>
    @end

    RCTBridgeModule协议中定义了一些模块的基本属性和方法以及一些宏命令。我们可以通过调用对应的宏命令来告诉RN那些是什么的模块类
    那些需要暴露的模块方法：
    RCT_EXPORT_MODULE   // 向系统注册模块
    RCT_EXPORT_METHOD   // 暴露模块方法

    在类的实现中，需要调用宏RCT_EXPORT_MODULE(...);来导出模块类。如果需要自定义模块的名称，在宏命令中传入模块的名称作为参数即可，
    如果不填，则默认使用类名来作为模块名：

    @implementation CalendarManager
    // 注册模块
    RCT_EXPORT_MODULE();
    @end

    模块名在JS中被映射时，如果模块前缀名包含RCT，会被格式化去除的，例如原生模块RCTActionSheetManager
    在JS被映射中的模块名是ActionSheetManager，模块映射后，会在JS中生成一个模块对象以供调用：
    var MyModule = require('NativeModules').ModuleName;


    2.模块方法的定义：需要使用宏RCT_EXPORT_METHOD(method)的封装，将方法显示的导出到JS中。宏命令实现了JS方法和OC方法的映射，
    映射会使用OC方法的第一部分作为JS的方法名，如果需要自定义JS模块的方法名，可以使用宏RCT_EXPORT_METHOD(js_name,method)来代替

    // OC  导出方法
    RCT_EXPORT_METHOD(doSomething:(NSString*)aString withA:(NSInteger)a andB:(NSInteger)b){
            ...
    }
    // JS 映射的该方法
    NativeModules.ModuleName.doSomething(aString,a,b);

    JS和Native数据通信采用JSON类型，因此支持标准JSON的类型都是支持的，主要有
    string(NSString)
    number(NSInteger,float,double,CGFload,NSNumber)
    boolen(BOOL,NSNumber)
    array(NSArray)
    map(NSDictionary)
    function(RCTResponseSenderBlock)

    在Native执行代码前，RCTModuleMethod会根据Native方法定义的参数类型，通过RCTConvert.h进行转换。在RCTConvert.h中除了支持
    标准JSON类型外，还支持一些常用的类型，例如日期类型的数据

    // JS
    CalendarManager.addEvent('Birthday Party','4 Private Drive',date.toTime());
    // OC
    RCT_EXPORT_METHOD(addEvent:(NSString*)name location:(NSString*)location data:(NSData*)date){
        // date将会转化成了NSDate类型
    }

    这些类型包括，但是不限制于一下类型（具体可以查看RCTConvert.h）
    NSDate,UIColor,UIFont,NSURL,NSURLRequest,UIImage...
    UIColorArray,UINumberArray,NSURLArray...
    NSTextAlignment,NSUnderlineStyle...
    CGPoint,CGSize...


    3.模块回调函数：RN 定义了几种类型的块函数来作为回调函数，RCTModuleMethod已经MessageQueue会根据不同的类型来作对应的处理。
    Native中定义的回调函数在执行时都会将数据传递给JS环境，来执行对应的JS函数。
    (^RCTResponseSenderBlock)(NSArray*): 接受多个参数的回调函数
    (^RCTResponseErrorBlock)(NSError*): 接受错误参数的回调函数
    (^RCTResponseResolveBlock)(id result): 处理Promise Resolve
    (^RCTResponseRejectBlock)(NSError*): 处理Promise Reject
    一般情况下，我们都使用RCTResponseSenderBlock来作为回调函数，此时只需要将一个NSArray对象传入块函数执行即可
    RCT_EXPORT_METHOD(findEvent:(RCTResponseSenderBlock)callback){
        NSArray * events = ...
        // 回调给JS
        callback(@[[NSNull null] , events]);
    }

    如果需要回调函数，则需要在js调用模块方法时，在对应的参数上定义回调函数，Native端执行回调时，JS的回调函数也将被执行。
    如果需要使用回调函数中的参数，定义回调函数参数的顺序，要和Native模块中传入的NSArray中的对象顺序保持一致，这样才可以接受正确参数。
    例如：Native某块中传入的第一个对象是NSError对象，那么JS回调函数定义的第一个参数将会被这个NSError的JSON值赋值。
    如果不需要使用回调函数，无需指定回调函数即可，并不影响正常运行。
    CalendarManager.findEvents((error,events)=>{
        if(error){
            console.error(error);
        }else{
            this.setState({events:events});
        }
    })

    当然模块容许被缓存起来延后执行，例如RCTAlertManager在alertWithArgs:callback:方法中，将回调函数callback缓存，
    户点击控件后，在代理事件中调用callback，并释放缓存。当我们这样使用的时候，一定要确保手动缓存的实例会被释放，来防止
    内存泄漏，实例代码如下：

    RCT_EXPORT_METHOD(alertWithArgs:(NSDictionary*)args callback:(RCTResponseSenderBlock)callback){
        ...
        [alerts addObject:alertView];
        // 回调函数callback缓存
        [alertCallbacks addObject:callback?:^(__unused id unused){}];
        ...
    }
    -(void)alertView:(UIAlertView*)alertView clickedButtonAtIndex:(NSInteger)bottonIndex{
        ...
        RCTResponseSenderBlock callback = _alertCallbacks[bottonIndex];
        // 回调给JS
        callback(args);
        // 手动缓存的实例被释放
        [_alertCallbacks removeObjectAtIndex:bottonIndex];
    }

    如果需要传递错误信息给回调函数，使用RCTResponseErrorBlock时，方法的参数部分可以直接传入NSError对象。
    一般来说，当我们需要在JS定义的方法中区分正确返回和错误返回时，会使用RCTResponseErrorBlock回调。
    当然也可以像上面的例子一样，将错误作为第一个参数来表示执行成功与否，因为NSError不是默认支持的数据类型
    所以不能直接传递NSError对象实例，这时则需要使用RCTUtil.h的RCTMakeError

    RN还支持Promise规范的异步编程模式。在支持Promise规范的Native模块方法中，最后两个参数必须强制定义为
    RCTResponseResolveBlock 和 RCTResponseRejectBlock
    RCT_EXPORT_METHOD(doSomethingAsync:(NSString*)aString (RCTResponseResolveBlock)resolve
    (RCTResponseRejectBlock)reject){
        ...
        if(error){
            reject(error);
        }else{
            resolve(data);
        }
        ...
    }
    调用方式时，可以通过链式执行then方法来处理RCTResponseResolveBlock的调用，执行catch方法来处理RCTResponseRejectBlock的调用
    NativeModules.MouduleName.doSomethingAsync(aString)
        .then((data)=>{...})
        .catch((err)=>{...});


    4.线程：JS代码都是单线程运行的，而Native则不然，所以的Native模块都默认运行在各自独立的GCD串行队列中，
    如果需要特别指定某个线程队列，可以通过- (dispatch_queue_t)methodQueue方法实现
    -（dispatch_queue_t）methodQueue{
        return dispatch_queue_create("com.facebook.React.NameQueue",DISPATCH_QUEUE_SERIAL)
    }
    某块中所有的模块方法都会运行在同一线程队列中，如果某些方法需要单独指定队列，可以使用dispatch_async:
    RCT_EXPORT_METHOD(doSomethingExpensive:(NSString*)param callback:(RCTResponseSenderBlock)callback){
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT,0),^{
            // call long-running code on background thread
            ...
            // you can invoke callback from any thread/queue
            callback(@[...]);
        })
    }

    如果多个模块需要共享一个线程队列，那么我们必须手动缓存共享队列的实例，并在methodQueue中返回共享实例，而不是创建一个相同标签的实例。


    5.常量导出：RN还支持Native模块暴露一些常量数据供JS模块方法使用，主要有以下用法
    Native组件中的常量值，例如：版本号和事件名称等
    Native组件中定义的枚举，在JS组件中使用的对应值
    边界定义，例如控件容许最下尺寸，或者默认尺寸等

    可以定义一些默认值，以及一些参数的枚举值来提高使用JS时的可读性，
    通过constantsToExport方法，可以返回一个字典对象：
    -(NSDictionary*)constantsToExport{
        return @{@"firstDayOfTheWeek":@"Monday"};
    }
    在JS中可以直接访问字典的key值来访问字典对象
    CalendarManager.firstDayOfTheWeek

    常量在模块初始化的时候导入到模块配置表中，并在生成JS模块对象时并入该实例对象中，因此，
    在运行时对constantsToExport字典的任何修改将无法生效

    在常量导出中将枚举NS_ENUM导出以供JS作为参数来使用，但问题是，通常常量导出枚举时，枚举的值都是以整型数字存储的，那么在JS中调用
    模块方法，将常量导出中的枚举值作为参数递给Native时，对应Native而言，我们只是单纯的传递了一个整形参数。因此，
    我们需要对自定义的枚举类型进行RCTCovert扩展，这样在模块方法调用中使用常量导出的枚举值，通信到Native中时，
    会从整形自动转换为定义的枚举类型。

    定义一个枚举：
    typedef NS_ENUM(NSInteger,UIStatusBarAnimation){
        UIStatusBarAnimationNone,
        UIStatusBarAnimationFade,
        UIStatusBarAnimationSlide,
    }

    实现RCTCovert对于UIStatusBarAnimation类型的扩展
    @implementation RCTCovert(UIStatusBarAnimation)
        RCT_ENUM_CONVERTER(
            UIStatusBarAnimation,
            (
                @{
                    @"UIStatusBarAnimationNone":@(UIStatusBarAnimationNone),
                    @"UIStatusBarAnimationFade":@(UIStatusBarAnimationFade),
                    @"UIStatusBarAnimationSlide":@(UIStatusBarAnimationSlide),
                },
                UIStatusBarAnimationNone,
                integerValue
            )
        )
    @end

    然后在常量导出中会返回对应的枚举值：
    -(NSDictionary*)constantsToExport{
        return @{
                    @"UIStatusBarAnimationNone":@(UIStatusBarAnimationNone),
                    @"UIStatusBarAnimationFade":@(UIStatusBarAnimationFade),
                    @"UIStatusBarAnimationSlide":@(UIStatusBarAnimationSlide),
                }
    }

    在JS方法调用中，只要将枚举类型的参数位置传入模块常量导出中对应的值，例如：
    Module.UIStatusBarAnimationSlide,这个参数在Native模块中就会自动被转换成对应的枚举类型UIStatusBarAnimation：
    // OC
    RCT_EXPORT_METHOD(updateStatusBarAnimation:(UIStatusBarAnimation)animation
                                completion:(RCTResponseSenderBlock)callback);

    // JS
    Module.updateStatusBarAnimation(UIStatusBarAnimationSlide,callback);


    6.通知事件：RN在Native向JS传递消息机制的基础上，实现了一个非常低耦合的消息事件订阅系统。
    Native通过RCTEventDispatcher 向JS端的EventEmitter模块发送事件消息，由EventEmitter模块
    通知该事件的订阅者去执行事件响应。在大多数情况下，只需要通过这种通知方式间接完成Native对JS的调用

    首先在JS端对事件进行订阅，并且添加事件的响应函数:
    var {NativeAppEventEmitter} = require('react-native');
    var subscription = NativeAppEventEmitter.addListener('EventReminder',(reminder)=>{console.log(reminder.name)});

    当Native模块上发出事件通知时，EventEmitter模块则会执行都有注册EventReminder事件的响应函数：
    // 引入RCTEventDispather.h头文件
    import "RCTEventDispather.h"
    [self.bridge.eventDisptcher sendAppEventWithName:@"EventReminder" body:@{@"name":@"EventName"}];

    RN定义了不同的接口以及接收者来区分事件类型：
    // 发送应用相关的事件，例如数据更新 NativeAppEventEmitter
    -(void)sendAppEventWithName:(NSString*)name body:(id)body;

    // 发送设备相关的事件，例如地理定位和屏幕旋转 DeviceEventEmitter
    -(void)sendDeviceEventWithName:(NSString*)name body:(id)body;

    最后，我们需要在适当的时候手动的取消消息的订阅，subscription.remove();否则这订阅可能会导致内存泄漏。


 */

// 取出我们自定义Native的DeviceExtension模块
let DeviceExtension =  NativeModules.DeviceExtension;
let DeviceExtensionSecond = NativeModules.DeviceExtensionSecond;


export default class CustomNativeAPIComponent extends Component<Props> {
    componentDidMount() {
        /*************** DeviceExtension组件相关的方法*************************/
        // 调用Native模块的方法
        DeviceExtension.getDynamicDimensions((error,dimensions)=>{
            console.log(dimensions);
        })

        // 注册屏幕旋转通知
        this.subscription = DeviceEventEmitter.addListener(DeviceExtension.EVENT_ORIENTATION,(dimensions)=>{
            console.log(dimensions);
        })

        /*************** DeviceExtensionSecond组件相关的方法*************************/
        DeviceExtensionSecond.getDynamicDimensions((error,dimensions)=>{
            console.log('我是DeviceExtensionSecond',dimensions);
        })

        // 注册屏幕旋转通知
        // 通过DeviceExtensionSecond创建NativeEventEmitter 的实例  自定义事件接口
        let myNativeEvt = new NativeEventEmitter(DeviceExtensionSecond);
        this.subscriptionSecond = myNativeEvt.addListener(DeviceExtensionSecond.EVENT_ORIENTATION_SECOND,(dimensions)=>{
            console.log('我是DeviceExtensionSecond',dimensions);
        })

    }

    componentWillUnmount() {
        /*************** DeviceExtension组件相关的方法*************************/
        // 移除通知
        this.subscription && this.subscription.remove();
        this.subscription = null;

        /*************** DeviceExtensionSecond组件相关的方法*************************/
        // 移除通知
        this.subscriptionSecond && this.subscriptionSecond.remove();
        this.subscriptionSecond =null;

        console.log('CustomNativeAPIComponent组件被销毁');
    }

    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doSomething()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>打印Native所有自定的组件</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    doSomething(){
        // 查询原生模块有哪些
        console.log(NativeModules);
    }


}

const styles = StyleSheet.create({
    bgVSty:{},
});