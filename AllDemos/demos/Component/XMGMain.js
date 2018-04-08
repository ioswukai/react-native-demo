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

// 引入外部组件
import Home from './XMGHome';
import Find from './XMGFind';
import Message from './XMGMessage';
import Mine from './XMGMine';


export default class Main extends Component<Props> {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 设置选中标识 默认首页被选中
            selectedItem:'home',
        };
      }

    render() {
        return (
            <View style={styles.container}>

                {/*<设置TabBar />*/}
                <TabBarIOS
                    tintColor='orange'
                    style={{flex:1,paddingTop:64}}
                >
                    {/*<设置每一个分item />*/}

                    {/*首页*/}
                    <TabBarIOS.Item
                        // 设置图标
                        icon={require('../../img/icon_home_nor.png')}
                        // 设置标题
                        title='首页'
                        selected={this.state.selectedItem === 'home'}
                        // 注意 此处一定要用箭头函数 绑定作用域!!!
                        onPress={()=>{this.setState({
                             selectedItem:'home'
                         })}}
                    >
                        {/**设置显示为首页*/}
                        <Home />
                    </TabBarIOS.Item>


                    {/*发现*/}
                    <TabBarIOS.Item
                        // 设置图标
                        icon={require('../../img/icon_faxian_nor.png')}
                        // 设置标题
                        title='发现'
                        selected={this.state.selectedItem === 'find'}
                        onPress={()=>{this.setState({
                            selectedItem:'find'
                        })}}
                    >
                        {/**设置显示为发现*/}
                        <Find />

                    </TabBarIOS.Item>


                    {/*消息*/}
                    <TabBarIOS.Item
                        // 设置图标
                        icon={require('../../img/icon_touzi_nor.png')}
                        // 设置标题
                        title='消息'
                        selected={this.state.selectedItem === 'message'}
                        onPress={()=>{this.setState({
                            selectedItem:'message'
                        })}}
                    >
                        {/**设置显示为消息*/}
                        <Message />

                    </TabBarIOS.Item>


                    {/*我的*/}
                    <TabBarIOS.Item
                        // 设置图标
                        icon={require('../../img/icon_wode_nor.png')}
                        // 设置标题
                        title='我的'
                        selected={this.state.selectedItem === 'mine'}
                        onPress={()=>{this.setState({
                            selectedItem:'mine'
                        })}}
                    >
                        {/**设置显示为我的*/}
                        <Mine />

                    </TabBarIOS.Item>


                </TabBarIOS>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:64,
    },
});