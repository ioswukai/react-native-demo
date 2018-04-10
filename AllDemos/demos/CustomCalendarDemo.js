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
// 导入自定义日历
import CustomCalender from './CustomCalender';


/*************************第一个例子 CustomCalendarDemo*******************************/

export default class CustomCalendarDemo extends Component<Props> {
    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                {/*渲染日历组件*/}
                {this.renderCalendar()}

            </View>
        );
    }

    // 渲染日历组件
    renderCalendar(){
        return(
            <CustomCalender/>
        );
    }

}

const styles = StyleSheet.create({
    bgVSty:{},
});