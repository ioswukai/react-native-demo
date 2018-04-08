import {
    AppRegistry,
} from 'react-native';
import App from './App';

// AppRegistry 提供入口文件和入口函数 主要有一下方法

// 静态方法 注册配置 registerConfig(config:Array<AppConfig>)
// console.log(AppRegistry.registerConfig);

// 注册入口组件 registerComponent(appKey:string,getComponentFunc:ComponentProvider)
// console.log(AppRegistry.registerComponent);

// 注册函数监听 registerRunnable(appKey:string,func:Function)
// AppRegistry.registerRunnable('vczero',function(){
//     console.log('vczero');
// })
// AppRegistry.registerRunnable('react-native',function(){
//     console.log('react-native');
// })
// console.log(AppRegistry.registerRunnable);

// 获取registerRunnable注册的监听 key
// console.log(AppRegistry.getAppKeys)
// console.log(AppRegistry.getAppKeys())


// 运行app的函数 runApplication（appKey:string,appPramaters:any）
// console.log(AppRegistry.runApplication);

AppRegistry.registerComponent('AllDemos', () => App);
