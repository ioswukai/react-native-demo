//
//  XYPieChartManager.m
//  AllDemos
//
//  Created by apple on 2018/4/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "XYPieChartManager.h"
// 第三方控件
#import "XYPieChart.h"
#import <objc/runtime.h>

#import <React/RCTUIManager.h>
//#import <React/RCTSparseArray.h>
#import <React/RCTWebView.h>


#pragma mark - 为XYPieChart添加chartData属性
@interface XYPieChart(ReactCategory)<XYPieChartDataSource>

@property(nonatomic,strong)NSArray * chartData;

@end

@implementation XYPieChart(ReactCategory)

#pragma mark property
-(NSArray*)chartData{
  return (NSArray*)objc_getAssociatedObject(self,@selector(chartData));
}
-(void)setChartData:(NSArray *)chartData{
  objc_setAssociatedObject(self, @selector(chartData), chartData, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
  [self reloadData];
}

#pragma mark XYPieChartDataSource
-(NSUInteger)numberOfSlicesInPieChart:(XYPieChart *)pieChart{
//  NSLog(@"数据源chartData = %@",self.chartData);
  return [self.chartData count];
}
-(CGFloat)pieChart:(XYPieChart *)pieChart valueForSliceAtIndex:(NSUInteger)index{
//  NSLog(@"数据value = %i",[self.chartData[index][@"value"] intValue]);
  return [self.chartData[index][@"value"] intValue];
}
-(UIColor*)pieChart:(XYPieChart *)pieChart colorForSliceAtIndex:(NSUInteger)index{
//  NSLog(@"数据color = %@",self.chartData[index][@"color"]);
  return [RCTConvert UIColor:self.chartData[index][@"color"]];
}
-(NSString*)pieChart:(XYPieChart *)pieChart textForSliceAtIndex:(NSUInteger)index{
//  NSLog(@"数据label = %@",self.chartData[index][@"label"]);
  return self.chartData[index][@"label"];
}

@end





@interface XYPieChartManager()<XYPieChartDelegate>

@property(nonatomic,strong)XYPieChart * pieChart;

@end

@implementation XYPieChartManager

#pragma mark - 导出组件
// 导出模块类
RCT_EXPORT_MODULE()

-(UIView*)view{
  return self.pieChart;
}
-(XYPieChart*)pieChart{
  if (!_pieChart) {
    _pieChart = [[XYPieChart alloc] init];
    _pieChart.dataSource = _pieChart;
    _pieChart.delegate = self;
  }
  return _pieChart;
}
#pragma mark - 为组件扩展属性
RCT_EXPORT_VIEW_PROPERTY(chartData, NSArray)
RCT_EXPORT_VIEW_PROPERTY(showPercentage, BOOL)
RCT_EXPORT_VIEW_PROPERTY(labelFont, UIFont)
RCT_EXPORT_VIEW_PROPERTY(labelColor, UIColor)
/*导出点击block*/
RCT_EXPORT_VIEW_PROPERTY(onClickSlice, RCTBubblingEventBlock)

#pragma mark - XYPieChartDelegate 发送点击事件
- (void)pieChart:(XYPieChart *)pieChart didSelectSliceAtIndex:(NSUInteger)index{
  
  NSDictionary *event = @{
                          @"target": [self.pieChart reactTag],
                          @"data" : self.pieChart.chartData[index]
                          };
/*
 通过事件派发器向JS发送用户输入事件change
 
 sendInputEventWithName 已经被弃用 使用 RCTDirectEventBlock 或者 RCTBubblingEventBlock 来替代
 
 RCTDirectEventBlock:直接事件,这种事件类型作为不影响UI的一些事件，比如“图片加载失败”。
RCTBubblingEventBlock:冒泡事件,就和操作DOM一样，影响UI的事件，比如“点击按钮事件”。
 */
  
  // 发送用户点击事件
//  [self.bridge.eventDispatcher sendInputEventWithName:@"change" body:event];
  // 发送自定义的事件
//  [self.bridge.eventDispatcher sendInputEventWithName:@"customEvent" body:event];
  
  // 发送用户点击事件
  if(self.pieChart.onClickSlice){
    NSLog(@"oc did click %li", [self.pieChart.reactTag integerValue]);
    // 发送用户点击事件
    self.pieChart.onClickSlice(event);
  }
  
}

/*    如果需要绑定自定义事件，可以同在Manager模块中重写-(NSArray*)customBubblingEventTypes接口来实现：
*/
- (NSArray *)customBubblingEventTypes{
  return @[@"customEvent"];
}

#pragma mark - 为组件扩展方法 
/*刷新组件内容*/
RCT_EXPORT_METHOD(reload:(nonnull NSNumber*)reactTag
                  data:(NSArray *)data)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary *viewRegistry) {

    XYPieChart *chart = viewRegistry[reactTag];
    if ([chart isKindOfClass:[XYPieChart class]]) {
      [chart setChartData:data];
      [chart reloadData];
    }
  }];
}

@end




