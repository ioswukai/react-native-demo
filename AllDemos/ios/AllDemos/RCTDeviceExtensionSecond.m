//
//  RCTDeviceExtensionSecond.m
//  AllDemos
//
//  Created by apple on 2018/4/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RCTDeviceExtensionSecond.h"
// 工具类
#import <React/RCTUtils.h>
// 通知类
#import <React/RCTEventDispatcher.h>

@implementation RCTDeviceExtensionSecond
// 本类注册成为Native模块类
RCT_EXPORT_MODULE();

/*重写父类的方法 导出所有你需要监听事件名字
  试图监听或发送不包含在此列表中的事件将导致错误
 */
-(NSArray<NSString*>*)supportedEvents{
  return @[@"orientationDidChangeSecond"];
}
/*将事件变量作为常量导出，供JS注册事件时使用*/
-(NSDictionary*)constantsToExport{
  return @{@"EVENT_ORIENTATION_SECOND":@"orientationDidChangeSecond"};
}

// 添加一个方法返回屏幕尺寸
static NSDictionary * DynamicDimensions(){
  // 提供当前屏幕尺寸 需要导入头文件RCTUtils.h
  CGSize size = RCTScreenSize();
  CGFloat width = MIN(size.width, size.height);
  CGFloat height = MAX(size.width, size.height);
  CGFloat scale = RCTScreenScale();
  
  if (UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation)) {
    width = MAX(size.width, size.height);
    height = MIN(size.width, size.height);
  }
  
  return @{
           @"width":@(width),
           @"height":@(height),
           @"scale":@(scale),
           };
}
// 导出方法为模块方法
RCT_EXPORT_METHOD(getDynamicDimensions:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null] , DynamicDimensions()]);
}


// 要实现屏幕方向的监听，需要在模块初始化时向消息中心注册一个屏幕方向变化的系统事件，UIDeviceOrientationDidChangeNotification:
-(instancetype)init{
  if (self = [super init]) {
    // 注册通知
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(orientationDidChange:) name:UIDeviceOrientationDidChangeNotification object:nil];
  }
  return self;
}
/*分别实现你发送的所有事件，里面都使用 sendEventWithName 方法即可*/
// 屏幕旋转了
-(void)orientationDidChange:(id)notify{
  // 向JS发送消息
  [self sendEventWithName:@"orientationDidChangeSecond" body:@{@"orientation":UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation)?@"Landscape":@"Protrait",@"Dimensions":DynamicDimensions()}];
}
-(void)dealloc{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
