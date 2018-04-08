/**
 * Created by apple on 2018/3/19.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    View
} from 'react-native';
// 自定义组件
import NavigateBar from './CustomNavigateBar'

/**------------------------第一个例子 九宫格--------------------**/
import Dimensions from 'Dimensions';

// 一些常量的设置
var  screenWidth = Dimensions.get('window').width;
var  cols = 3;
var  cellWH = 100;
var  vMargin = (screenWidth - cellWH * cols)/(cols+1);
var  hMargin = 25;


// export default class ListViewDemo extends Component<Props> {
class ListViewDemo extends Component<Props> {

    static  defaultProps = {

    };

    // 构造
    constructor(props) {
        super(props);

        var shareData = [
            {'title':'文本1', 'icon':''},
            {'title':'文本2', 'icon':''},
            {'title':'文本3', 'icon':''},
            {'title':'文本4', 'icon':''},
            {'title':'文本5', 'icon':''},
            {'title':'文本6', 'icon':''},
            {'title':'文本7', 'icon':''},
            {'title':'文本8', 'icon':''},
            {'title':'文本9', 'icon':''},
            {'title':'文本10', 'icon':''},
        ];

        // 创建数据源
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==R2});
        // 初始状态
        this.state = {
            dataArr : ds.cloneWithRows(shareData),
        };
    }

    // 绘制数据
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataArr}
                    renderRow={this.renderRow}
                    contentContainerStyle={styles.listSty}
                />
            </View>
        );
    }

    // 绘制单独的cell
    renderRow = (shareItem,sectionID,rowID,highlightRow)=> {
        return<TouchableOpacity activeOpacity={0.5} onPress={()=>{alert(shareItem.title)}}>
            <View style={styles.bgVSty}>
                <Image source={{uir:shareItem.icon}} style={styles.iocnSty} />
                <Text>{shareItem.title}</Text>
            </View>
        </TouchableOpacity>
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    listSty:{
        // backgroundColor:'blue',
        // 关键是设置 contentContainerStyle  row  wrap
        flexDirection:'row',
        flexWrap:'wrap',
    },
    bgVSty:{
        width:cellWH,
        height:cellWH,
        marginLeft:vMargin,
        marginTop:hMargin,
        backgroundColor:'blue',
        alignItems:'center',
    },
    iocnSty:{
        width:80,
        height:80,
        backgroundColor:'red',
    },
});


/**------------------------第二个例子 吸顶效果原理--------------------**/

export default class ListViewDemo1 extends Component<Props> {

    static  defaultProps = {

    };

    // 构造
    constructor(props) {
        super(props);

        var getSectionData = (dataBlob,sectionID)=>{
            return dataBlob[sectionID];
        }

        var getRowData = (dataBlob,sectionID,rowID)=>{
            return dataBlob[sectionID+':'+rowID];
        }

        // 初始状态
        this.state = {
            dataArr : new ListView.DataSource({
                // 获取组里的数据
                getSectionData: getSectionData,
                // 获取行里的数据
                getRowData: getRowData,
                // 绘制条件
                rowHasChanged:(r1,r2) => r1!==r2,
                sectionHeaderHasChanged:(s1,s2) => s1!==s2,
            })
        }
    }

    // 加载处理
    componentDidMount() {
        // 调用json数据
        this.loadDataFromJson();
    }

    // 处理数据
    loadDataFromJson(){
        // 拿到json变量
        var jsonData = [
            {
                'title':'我是第一组',
                'cars':[
                    {'title':'我是车1', 'icon':''},
                    {'title':'我是车2', 'icon':''},
                    {'title':'我是车3', 'icon':''},
                    {'title':'我是车4', 'icon':''},
                    {'title':'我是车5', 'icon':''},
                    {'title':'我是车6', 'icon':''},
                    {'title':'我是车7', 'icon':''},
                    {'title':'我是车8', 'icon':''},
                    {'title':'我是车9', 'icon':''},
                    {'title':'我是车10', 'icon':''},
                ]
            },
            {
                'title':'我是第二组',
                'cars':[
                    {'title':'我是车1', 'icon':''},
                    {'title':'我是车2', 'icon':''},
                    {'title':'我是车3', 'icon':''},
                    {'title':'我是车4', 'icon':''},
                    {'title':'我是车5', 'icon':''},
                    {'title':'我是车6', 'icon':''},
                    {'title':'我是车7', 'icon':''},
                    {'title':'我是车8', 'icon':''},
                    {'title':'我是车9', 'icon':''},
                    {'title':'我是车10', 'icon':''},
                ]
            },
            {
                'title':'我是第三组',
                'cars':[
                    {'title':'我是车1', 'icon':''},
                    {'title':'我是车2', 'icon':''},
                    {'title':'我是车3', 'icon':''},
                    {'title':'我是车4', 'icon':''},
                    {'title':'我是车5', 'icon':''},
                    {'title':'我是车6', 'icon':''},
                    {'title':'我是车7', 'icon':''},
                    {'title':'我是车8', 'icon':''},
                    {'title':'我是车9', 'icon':''},
                    {'title':'我是车10', 'icon':''},
                ]
            },
        ];

        // 定义一些变量
        var dataBlob = {},
            sectionIDs = [],
            rowIDs = [];

        // 遍历json 组装我们需要的格式
        for (var i=0; i<jsonData.length; i++){
            // 1.把组号放入sectionIDs数组中
            sectionIDs.push(i);

            // 2.把组中的名称放到dataBlob对象中
            dataBlob[i] = jsonData[i].title;

            // 3.取出该组中所有的车
            var  cars =  jsonData[i].cars;
            rowIDs[i]=[];

            // 遍历所有的车数组
            for (var j=0; j<cars.length; j++){
                // 把行号放到rowIDs里
                rowIDs[i].push(j);

                // 把每一行的内容放到dataBlob里面来
                dataBlob[i+':'+j] = cars[j];
            }
        }
        //  更新状态
        this.setState({
            dataArr: this.state.dataArr.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
        });
    }

    // 绘制数据
    render() {
        return (
            <View style={styles1.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <ListView
                    dataSource={this.state.dataArr}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    // 容许Header是空的
                    enableEmptySections={true}
                    // 滚动视图内容显示高度不准确，则需要设置此值为false
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }

    // 每一行数据
    renderRow = (rowData,sectionID,rowID,highlightRow)=> {
        return<TouchableOpacity activeOpacity={0.5} onPress={()=>{alert(sectionID+'组'+rowID+'行'+rowData.title)}}>
            <View style={styles1.rowSty}>
                <Image source={{uir:rowData.icon}} style={styles1.iocnSty} />
                <Text style={{marginLeft:10}}>{rowData.title}</Text>
            </View>
        </TouchableOpacity>
    }

    // 每一组中的数据
    renderSectionHeader=(sectionData,sectionID)=>{
        return(
            <View style={styles1.headerSty}>
                <Text style={{margin:10,color:'red',fontSize:17}}>{sectionData}</Text>
            </View>
        );
    }

}

const styles1 = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
        paddingTop:84,
    },
    headerSty:{
        backgroundColor:'#e8e8e8',
    },
    rowSty:{
        // 设置主轴方向
        flexDirection:'row',
        // 侧轴方向居中
        alignItems:'center',
        padding:10,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1,
    },
    iocnSty:{
        width:70,
        height:70,
        backgroundColor:'red',
    },
});