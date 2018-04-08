//
//  RCTDeviceExtension.h
//  AllDemos
//
//  Created by apple on 2018/4/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
// 0.48之前的导入方式
//#import "RCTBridgeModule.h"

/*
 如果为了兼容旧版本，可以用宏来判断一下（注意一定要把 <React/RCTBridgeModule.h> 的判断放在前面）：
 #if __has_include(<React/RCTBridgeModule.h>)
 #import <React/RCTBridgeModule.h>
 #elif __has_include("RCTBridgeModule.h")
 #import "RCTBridgeModule.h"
 #endif
 
 */

// 0.48之后的导入方式
#import <React/RCTBridgeModule.h>

// 所有的Native组件须遵守协议
@interface RCTDeviceExtension : NSObject<RCTBridgeModule>


@end
