//
//  RCTDeviceExtensionSecond.h
//  AllDemos
//
//  Created by apple on 2018/4/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <React/RCTEventEmitter.h>

// 0.48之后的导入方式
#import <React/RCTBridgeModule.h>

/** 导出本地类的新方法 成为RCTEventEmitter的子类*/
@interface RCTDeviceExtensionSecond : RCTEventEmitter<RCTBridgeModule>

@end
