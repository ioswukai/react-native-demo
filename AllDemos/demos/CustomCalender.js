/**
 * Created by apple on 2018/4/9.
 */


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

/*************************第一个例子 CustomCalender*******************************/

export default class CustomCalender extends Component<Props> {
    // 提供接口
    static defaultProps={
        startTime:new Date(),
        holiday:{},
        check:{},
        headerStyle:{},
        num:3,
    };

    // 设置状态机
    // 构造
    constructor(props) {
          super(props);

          // 初始状态 初始化数据模型
          this.state = {
              startTime:this.props.startTime,
              holiday:this.props.holiday,
              check:this.props.check,
              headerStyle:this.props.headerStyle,
              num:this.props.num,
          };
    }


    render() {
        return (
            <View style={styles.bgVSty}>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.doSomething()}}>
                    <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                        <Text>我是日历组件</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    doSomething(){

    }
}

const styles = StyleSheet.create({
    bgVSty:{

    },
});