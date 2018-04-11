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
        let holiday ={
            '2018-10-1':'国庆节',
            '2018-9-10':'教师节',
            '2019-1-1':'元旦节',
            '2018-11-11':'双十一',
        };
        let check= {
            '2018-10-1':'checked',
            '2018-9-1':'checked',
            '2018-7-10':'checked',
            '2018-9-10':'checked',
            '2018-11-11':'checked',
        };
        let headerStyle = {
            color:'white',
            fontSize:16
        };

        return(
            <CustomCalender
                // 设置字体颜色是白色
                headerStyle={headerStyle}
                // 假期
                holiday={holiday}
                // 标红
                check={check}
                // 设置显示10个月
                num={10}
            />
        );
    }

}

const styles = StyleSheet.create({
    bgVSty:{},
});