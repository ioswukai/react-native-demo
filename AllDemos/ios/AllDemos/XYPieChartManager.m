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

@interface XYPieChartManager()<XYPieChartDelegate>
@property(nonatomic,strong)XYPieChart *pieChart;
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
    _pieChart.delegate = self;
    _pieChart.dataSource = _pieChart;
  }
  return _pieChart;
}

#pragma mark - 为组件扩展属性
RCT_EXPORT_VIEW_PROPERTY(chartData, NSArray)
RCT_EXPORT_VIEW_PROPERTY(showPercentage, BOOL)
RCT_EXPORT_VIEW_PROPERTY(labelFont, UIFont)
RCT_EXPORT_VIEW_PROPERTY(labelColor, UIColor)

@end

#pragma mark - 为XYPieChart添加chartData属性
@interface XYPieChart(ReactCategory)<XYPieChartDataSource>
// {label:'',value:'',color:''}
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
  return [self.chartData count];
}
-(CGFloat)pieChart:(XYPieChart *)pieChart valueForSliceAtIndex:(NSUInteger)index{
  return [self.chartData[index][@"value"] intValue];
}
-(UIColor*)pieChart:(XYPieChart *)pieChart colorForSliceAtIndex:(NSUInteger)index{
  
  return [RCTConvert UIColor:self.chartData[index][@"color"]];
}
-(NSString*)pieChart:(XYPieChart *)pieChart textForSliceAtIndex:(NSUInteger)index{
  return self.chartData[index][@"label"];
}

@end

