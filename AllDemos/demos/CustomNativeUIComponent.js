/**
 * Created by apple on 2018/4/8.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    // 导入Native UI 组件集合
    requireNativeComponent,
    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 CustomNativeUIComponent*******************************/
/*
    Native UI 组件也是一个Native的模块，相对于API组件来说，UI组件还需要被抽象出供React使用的标签，
    提供标签属性，响应用户行为等。在React中创建UI组件时，都会生成reactTag来作为唯一的标识。JS的UI
    组件和Native的UI组件都将通过reactTag来进行关联。JS UI的更新会通过调用RCTUIManager模块的方法
    来映射成Native UI的更新。当Native UI被通知改变时，会通过reactTag定位UI实例来进行操作，所有的
    操作并不会马上执行，而是被缓存在一个UIBlock中，每次通讯完毕，再由主线程统一执行UIBlock中的更新，
    在帧级别的通讯频率下，让原生UI无缝的响应JS的改变。


    1.要构建Native UI组件，
    首先创建UI的管理类，这个类需要继承RCTViewManager类，实质上，RCTViewManager
    类同样遵循RCTBridgeModule的协议。然后再实现-(UIView*)view接口，在接口返回Native实例：
    #import "RCTViewManager.h"
    @interface RCTMapManager : RCTViewManager
    @end

    @implementation RCTMapManager
    RCT_EXPORT_MODULE()
    -(UIView*)view{
        return [[MKMapView alloc] init];
    }
    @end

    需要注意的是，UI组件的样式都是由JS控制的，因此在-(UIView*)view中实例化时，任何对于样式的操作
    都会被JS中对应的样式覆盖，同时值得注意的是，在实例化时一般View的frame进行设置。如果UI组件内部
    的UI或者是图层不支持自适应，则需要在UI组件(实例化时的View)的-(void)layoutSubviews方法中对内部控件实现自适应
    布局。

    沿用系统的命名规范，扩展的UI模块组件都以Manager为后缀，在React中使用时只需要在JS中导出对应的
    Native组件对象即可。组件的名字需要过滤类名的后缀Manager，所有的组件对象导出后都可以通过组件标签
    引用
    import {
        // 导入Native UI 组件集合
        requireNativeComponent,

    } from 'react-native';
    module.exports = requireNativeComponent('RCTMap',null)

    // 可以在render方法中这样使用<RCTMap/>


    2.UI组件的属性
    原始组件的属性也需要桥接到JS，以标签属性的形式访问。一般情况下，我们需要使用RCT_EXPORT_VIEW_PROPERTY
    来桥接native UI的属性：
    RCT_EXPORT_VIEW_PROPERTY(pitchEabled,BOOL)
    默认情况下，JS标签属性与Native属性相同。如果需要另外定义，可以使用RCT_REMAP_VIEW_PROPERTY。
    然后就可以在JS中为组件标签设置属性了
    <RCTMap
        pitchEabled=false
    />

    在RCTViewManager.m中可以看到，RN对于一些默认的view属性自动做了桥接Veiw，我们可以直接使用
    // RCTViewManager.m
    ...
    RCT_EXPORT_VIEW_PROPERTY(backgroundColor,UIColor)
    RCT_REMAP_VIEW_PROPERTY(accessible,isAccessibilityElement,BOOL)
    ...

    与模块的方法相同，属性的类型支持标准JSON对象。同时，RCTConvert.h中也提供一些常用类型的转换，
    例如UIColor 和 NSDate。
    如果是默认不支持的类型属性，可以通过宏RCT_CUSTOM_VIEW_PROPERTY(name,type,viewClass)来
    完成自定义属性的扩展，其中name为属性名，type为属性类型，viewClass则是Native组件的类型。在
    宏命令后的方法实现中，对控件的对应于属性进行赋值示例如下：
    // RCTMapManager.m
    RCT_CUSTOM_VIEW_PROPERTY(region,MKCoordinateRegion,RCTMap){
        [View setRegion:json?[RCTConvert MKCoordinateRegion:json] :
        defaultView.region animated:YES];
    }

    我们可以为视图的属性类型创建自定义的RCTConvert扩展来进行类型转换。以下是对MKCoordinateRegion
    类型的RCTConvert扩展：
    @implementation RCTConvert(CoreLocation)
    RCT_CONVERTER(CLLocationDegress,CLLocationDegrees,doubleValue);
    RCT_CONVERTER(CLLocationDistance,CLLocationDistance,doubleValue);

    +(CLLocationCoordinate2D)CLLocationCoordinate2D:(id)json{
        json = [self NSDictionary:json];
        return (CLLocationCoordinate2D){
            [self CLLocationDegress:json[@"latitude"]],
            [self CLLocationDegress:json[@"longitude"]],
        }
    }
    @end

    @implementation RCTConvert(MapKit)
    +(MKCoordinateSpan)MKCoordinateSpan:(id)json{
        json = [self NSDictionary:json];
        return (MKCoordinateSpan){
            [self CLLocationDegress:json[@"latitudeDelta"]],
            [self CLLocationDegress:json[@"longitudeDelta"]],
        }
    }
    +(MKCoordinateRegion)MKCoordinateRegion:(id)json{
        return (MKCoordinateRegion){
            [self CLLocationCoordinate2D:json],
            [self MKCoordinateSpan:json],
        }
    }
    @end

    此外，我们也可以采用和API组件相同的方式，结合常量导出与RCTConvert扩展提供枚举类型的支持：
    @implementation RCTConvert(UIAccessibilityTraits)
    RCT_MULTI_ENUM_CONVERTER(UIAccessibilityTraits,(@{
        @"none":@(UIAccessibilityTraitsNone),
        ...
        @"pageTurn":@(UIAccessibilityTraitsPageTurn),
    }),UIAccessibilityTraitsNone,unsignedLongLongValue)
    @end

    // RCTViewManager.m
     ...
     RCT_EXPORT_VIEW_PROPERTY(accessibilityTraits,UIAccessibilityTraits)
     ...


     3.UI组件的方法：
     Native UI组件同样支持模块方法，其方法定义中必须包含由JS传递过来的reactTag，
     其实现逻辑需要封装在RCTUIManager的addUIBlock接口的块函数中执行。这样，在块函数中，我们可以
     使用RCTUIManager维护的ViewRegistry，通过reactTag获得调用方法的组件实例：
     RCT_EXPORT_METHOD(reload:(NSNumber*)reactTag){
        [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager*uiManager,
        RCTSparseArray*viewRegistry){
            id view = viewRegistry[reactTag];
            // 完成对控件重载方法的调用
        }];
     }

    在JS中需要对组件设置ref，调用方法事通过应用React.findNodeHandle(ref)来获取组件的reactTag，
    然后将其作为组件模块方法对应的参数传入：
    var RCT_UI_REF = ...;
    <RCTCustomUI
        ref = {RCT_UI_REF}
        ...
    />
    // 方法调用
    RCTCustomUIManager.reload(React.findNodeHandle(this.refs[RCT_UI_REF]));


    4.事件
    大多数控件多会接受用户的行为，例如TextField需要接受用户输入和点击的行为，这时我们需要针对用户的行为
    作出响应，纯Native中很容易做到，如为控件添加UIControlEvent的监听，实现对应的delegate方法等，
    但在RN中，我们还需要把时间通知到JS，最终由JS端完成实践的响应，具体步骤如下：

    首先设置响应函数
    -(void)init{
        [control addTarget:self action:@selector(controlValueChanged:)
        forControlEvent:UIControlEventValueChanged];
    }
    -(void)controlValueChanged:(id)sender{
        // 处理控件的事件
    }
    然后设置delegate回调函数
    -(void)tableView:(UItableView*)tableView didSelectRowAtIndexPath:(NSIndexPath*)indexPath{
        // 处理table点击事件
    }

    在RN中，在控件响应用户事件的地方，通过事件派发器RCTEvent-Dispatcher 的 sendInputEventWithName将
    事件发送给JS模块。在RN中，事件名在Native模块中会进行格式化处理，例如在Native端，change，onChange和
    topChange都会格式化为topChange事件，而JS都会以onChange事件属性来响应：
    -(void)controlValueChanged:(id)sender{
        NSDictionary * event = @{
            @"target":sender.reactTag,
            @"value":@(sender.value),
        };
        [self.bridge.eventDispatcher sendInputEventWithName:"topChange" body:event];
    }

    最后，由JS组件响应函数处理：
    <RCTCustomUI
        onChange={changeHandler}
        ...
    />

    在RCTViewManager中，默认定义了一些事件，这些事件会自动与JS标签中的onEventName属性进行绑定，具体如下
    press change focus blur submitEditing endEditing touchStart touchMove touchCancel touchEnd

    如果需要绑定自定义事件，可以同在Manager模块中重写-(NSArray*)customBubblingEventTypes接口来实现：
    -(NSArray*)customBubblingEventTypes{
        return @[@"downloadComplete"];
    }
    此时，在标签中就可以使用标签属性调用响应函数了：
    <RCTCustomUI
        onDownloadComplete = {downloadHandler}
        ...
    />

    发送事件时，也会将一些数据通过sendInputEventWithName：body: 接口的body参数传递给JS，此时数据需要封装
    为一个字典类型，必选包含target字段来存放reactTag，让JS能够通知到对应的组件来执行响应函数。在JS中，可以通过
    响应函数的参数body.nativeEvent直接访问字典中的数据：
    var changeHandler = function(body){
        console.log(body.nativeEvent.userData);
    }

 */

// 导入自定义的Native UI 模块
let XYPieChart = requireNativeComponent('XYPieChart',null);
let chartData =[
    {'label':'Chrome',value:36,color:0x008800},
    {'label':'IE8.0',value:22,color:0x0044bb},
    {'label':'Other',value:42,color:0x444444}
];

export default class CustomNativeUIComponent extends Component<Props> {


    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                {/*显示Native UI 模块*/}
                <XYPieChart
                    style={styles.chart}
                    chartData={chartData}
                    showPercentage={false}
                />

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doSomething()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>我是{NavigateBar.getComponentName(this)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    doSomething(){
        console.log(requireNativeComponent);
    }
}

const styles = StyleSheet.create({
    bgVSty:{
        alignItems:'center',
    },
    chart:{
        width:200,
        height:200,
        marginTop:30,
        marginLeft:50,
        borderWidth:1
    },
});