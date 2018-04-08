/**
 * Created by apple on 2018/3/30.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

/**********************导入***********************/
// 自定义组件
import NavigateBar from './CustomNavigateBar';


/**********************导出***********************/

// 导出自定义样式
export  const CustomStyles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:64,
        backgroundColor:'white',
    },
});

// 导出自定义对象
export  {NavigateBar};