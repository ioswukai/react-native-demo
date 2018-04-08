/**
 * Created by apple on 2018/3/19.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TabBarIOS,
    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

export default class TabBarIOSDemo extends Component<Props> {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 默认选中的tabBarItem
            selectedTabBarItem:'home',
        };
      }

    render() {
        return (
            <View style={{flex:1,paddingTop:64,backgroundColor:'white'}}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                <View style={{justifyContent:'center',alignItems:'center',height:64,backgroundColor:'black'}}>
                    <Text style={{color:'white'}}> Tab选项卡的切换</Text>
                </View>
                <TabBarIOS
                    //  设置tabBar背景色
                    barTintColor='orange'
                    //  设置选中的颜色
                    tintColor='purple'
                >

                   {/*第一块 */}
                   <TabBarIOS.Item
                       systemIcon='contacts'
                       // title='张三'
                       badge='3'
                       //  控制页面的显示 YES 是选中 显示 NO 非选择 隐藏
                       selected={this.state.selectedTabBarItem === 'home'}
                       //  选中的时候 更改状态 切换页面
                       onPress={()=>{this.setState({
                           selectedTabBarItem:'home'
                       })}}
                   >
                       <View style={[styles.commonVSty,{backgroundColor:'red'}]}>
                           <Text>首页</Text>
                       </View>

                   </TabBarIOS.Item>

                    {/*第二块 */}
                    <TabBarIOS.Item
                        systemIcon='bookmarks'
                        selected={this.state.selectedTabBarItem === 'second'}
                        onPress={()=>{this.setState({
                            selectedTabBarItem:'second'
                        })}}
                    >
                        <View style={[styles.commonVSty,{backgroundColor:'green'}]}>
                            <Text>第二页</Text>
                        </View>

                    </TabBarIOS.Item>

                    {/*第三块 */}
                    <TabBarIOS.Item
                        systemIcon='downloads'
                        selected={this.state.selectedTabBarItem === 'three'}
                        onPress={()=>{this.setState({
                            selectedTabBarItem:'three'
                        })}}
                    >
                        <View style={[styles.commonVSty,{backgroundColor:'blue'}]}>
                            <Text>第三页</Text>
                        </View>

                    </TabBarIOS.Item>

                    {/*第四块 */}
                    <TabBarIOS.Item
                        systemIcon='search'
                        selected={this.state.selectedTabBarItem === 'four'}
                        onPress={()=>{this.setState({
                            selectedTabBarItem:'four'
                        })}}
                    >
                        <View style={[styles.commonVSty,{backgroundColor:'purple'}]}>
                            <Text>第四页</Text>
                        </View>

                    </TabBarIOS.Item>

                </TabBarIOS>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commonVSty:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
});