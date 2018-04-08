/**
 * Created by apple on 2018/3/28.
 */


import React, { Component } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    Text,
    ListView,

    View
} from 'react-native';

// 自定义组件
import NavigateBar from './CustomNavigateBar'

import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');
var hMargin = 35;
let emptyDs = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

// 输出的组件
export default  class  Detail extends Component<>{
    // 构造
      constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            dataSource:emptyDs,
            totalPrice:0,
        };
      }

    // 取得数据源
    componentDidMount() {
        // 取得所有的存储数据
        AsyncStorage.getAllKeys((errs,keys)=>{

            if (errs){
                // 存储取数据出错  不用执行下面代码
                return;
            }

            // 更具keys得到 value
            AsyncStorage.multiGet(keys,(errs,result)=>{
                if (errs){
                    // 存储取数据出错  不用执行下面代码
                    return;
                }

                var arr =[];
                let totalPrice = 0;
                for (let i in result){
                    // 得到的数组是个二维数组 result[i][0] 是存储的key result[i][1] 是存储的value
                    let jsonStr  = result[i][1];
                    // 把str转换成Json数据
                    var jsonData = JSON.parse(jsonStr);
                    // 计算总价格
                    totalPrice += jsonData.price;
                    // 存入数据源
                    arr.push(jsonData)
                }

                // 根据得到的arr 和totalPrice 跟新状态机

                this.setState({
                    totalPrice:totalPrice,
                    dataSource:this.state.dataSource.cloneWithRows(arr),
                });
            })

        })

    }

    // 渲染数据
    render(){
        // 是否有商品数据
        let hasData = true;
        if (this.state.totalPrice == 0){
            // 总价为0 无数据
            hasData = false;
        }
        // console.log(this.state.totalPrice,hasData);

        // 没有数据
        if (!hasData){
            return(
                <View style={styles.container}>
                    {/*渲染导航栏*/}
                    <NavigateBar
                        component = {this}
                    />
                    <View style={{width:width,height:100,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:14}}>您暂时没有选定的商品，快去选购吧！</Text>
                    </View>
                    {/**渲染footer*/}
                    {this.renderFooter()}
                </View>
            );
        }

        // console.log(this.state.dataSource);
        return(
        <View style={styles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                    automaticallyAdjustContentInsets={false}
                    enableEmptySections={true}
                    style={{marginTop:15}}
                />
            </View>
        );
    }

    // 渲染cell
    renderRow=(rowData)=>{
        // console.log(rowData);
        return(
            <View style={styles.cellSty}>
                <Text style={styles.titleSty}>{rowData.title+rowData.desc}</Text>
                <Text style={styles.moneySty}>¥{rowData.price}</Text>
            </View>
        );
    }

    // 渲染footer
    renderFooter=()=>{
        return(
            <View style={{width:width,marginTop:35}}>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.clickPay()}}>
                    <View style={styles.payBtnSty}>
                        <Text style={styles.payTitleSty}>支付，共{this.state.totalPrice}元</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.clickClear()}}>
                    <View style={styles.clearBtnSty}>
                        <Text style={styles.clearTitleSty}>清空购物车</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    // 点击了支付按钮
    clickPay(){
        alert('确定支付'+this.state.totalPrice+'元');
    }

    // 点击了清空按钮
    clickClear(){
        // 判断有没有数据
        let hasData = true;
        if (this.state.totalPrice == 0){
            // 总价为0 无数据
            hasData = false;
        }
        // 没有数据
        if (!hasData){
            alert('您暂时没有选定的商品，快去选购吧！');
            return;
        }

        // 清空存储
        AsyncStorage.clear((errs)=>{
            if(errs){
                // 清空数据出错 不执行下面操作
                return;
            }

            // 更改状态机
            this.setState({
                totalPrice:0,
                dataSource:emptyDs,
            });
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:64,
        backgroundColor:'white',
    },
    cellSty:{
        margin:5,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:3,
        borderWidth:1,
        borderColor:'#e8e8e8',
        justifyContent:'space-between',
    },
    titleSty:{
        fontSize:14,
        marginTop:10,
        marginBottom:10,
        marginLeft:5,
    },
    moneySty:{
        fontSize:14,
        marginRight:5,
    },
    payBtnSty:{
        height:50,
        width:width-2*hMargin,
        marginLeft:hMargin,
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
    payTitleSty:{
        color:'white',
        fontSize:18,
    },
    clearBtnSty:{
        height:50,
        width:width-2*hMargin,
        marginLeft:hMargin,
        borderColor:'#e8e8e8',
        borderRadius:5,
        borderWidth:1,
        marginTop:35,
        justifyContent:'center',
        alignItems:'center',
    },
    clearTitleSty:{
        fontSize:18,
    },
});