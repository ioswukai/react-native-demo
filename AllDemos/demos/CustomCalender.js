/**
 * Created by apple on 2018/4/9.
 */


import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    // 导入SectionList
    SectionList,
    // 导入FlatList 实现栅格布局
    FlatList,
    View
} from 'react-native';


// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 CustomCalender*******************************/

// const monthStartWeekKey = 'monthStartWeekKey';
// const monthDaysKey = 'monthDaysKey';
// const monthRowCountsKey = 'monthRowCountsKey';
// const currentDateKey = 'currentDateKey';

// 引入Dimensions类库
import  Dimensions from 'Dimensions';
let {width} = Dimensions.get('window');
let itemW = width/7.0-0.1;

// 导入时间第三方库
import moment from 'moment';




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

    componentDidMount() {
        alert(moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    render() {
        let monthsData = this.getAllMonthsInfo();
        console.log('渲染了SectionList组件,数据源是=',monthsData);

        return (
            <View >

                {/*渲染日历的头部*/}
                {this.renderCalenderHeader()}

                {/*渲染日历的月份*/}
                <SectionList
                    renderSectionHeader={this.renderCalendarMonthHeader}
                    // 每个item的对象都是一个FlatList
                    renderItem={this.renderCalendarFlatList}
                    sections={monthsData}
                    // 不让自动调整
                    automaticallyAdjustContentInsets={false}
                    // 为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，
                    // 以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
                    keyExtractor={this._keyExtractor}
                    // 设置header是否粘在上面 true 粘住
                    stickySectionHeadersEnabled={false}
                    // 设置List样式
                    // contentContainerStyle={styles.contentSty}
                    // 默认渲染前四个月
                    // initialNumToRender={4}
                />

            </View>
        );
    }

    // 渲染日历的header
    renderCalenderHeader=()=>{
        let weekTexts = ['一', '二', '三', '四', '五', '六', '日'];
        let weekV = [];
        for (let i=0;i<7;i++){
            let weekText = weekTexts[i];
            let weekendStyle = {};
            if(i===5||i===6){
                // 周六日 灰色
                weekendStyle = {
                    color:'orange',
                };
            }
            weekV.push(
                <View key={i} style={[styles.weekItemSty]}>
                    <Text style={[this.state.headerStyle,weekendStyle]}>{weekText}</Text>
                </View>
                )
        }
        return(
            <View style={[styles.headerBgSty,styles.direction_row]}>
                {weekV}
            </View>
        )
    }

    // 渲染月份的开头
    renderCalendarMonthHeader=(info)=>{
        let text = info.section.monthTitle;
        return(
            <View style={styles.sectionSty}>
                <Text style={styles.sectionTextSty}>{text}</Text>
            </View>
        );
    }

    // 渲染每个月份的list表格 因为SectionList没法网格布局
    renderCalendarFlatList=(info)=>{
        console.log('渲染了FlatList组件');

        // 每个Item包含的都是一个数组
        let dataArr = info.item;
        // 渲染FlatList
        return(
            <FlatList
                // 设置数据源
                data={dataArr}
                // 设置渲染项目
                renderItem={this.renderCalendarItem}
                // 设置需要显示的行数
                numColumns={7}
                // 设置每一行的高度 用于避免动态测量内容尺寸的开销
                getItemLayout={this._getItemLayout}
            />
        );

    }

    // 生成特定的不重复的key
    _keyExtractor=(item, index)=>{
        return index.toString();
    }

    // 设置每一行的高度
    _getItemLayout(data: any, index: number){
        return({length:30, offset: 30 * index, index});
    }

    // 渲染日历的item
    renderCalendarItem=(info)=>{
        let item = info.item;
        let text = item.title;


        // 取得当前Item对应的 年份和月份 以及天
        let year = item.yearNumKey;
        let month = item.monthNumKey;
        let day = text -0;

        // 组装xxxx-xx-xx
        let formatStr = year +'-'+month+'-'+text;

        // 更改文本
        if (this.state.holiday[formatStr]){
            text = this.state.holiday[formatStr];
        }

        // 取得今天的年
        let todayYear = this.state.startTime.getFullYear();
        // 取得今天的月
        let todayMonth = this.state.startTime.getMonth()+1;

        let todayDate = this.state.startTime.toLocaleDateString();
        // 以 / 切割字符串
        let todayDateArr =todayDate.split("/");
        // console.log('todayDateArr',todayDateArr);

        let todayDay = 1;
        let length = todayDateArr.length;
        if (length){
            // 取得今天的日
            todayDay =  (todayDateArr[length-1])-0;
        }
        // console.log('year',year,'month',month,'day',day);
        // console.log('todayYear',todayYear,'todayMonth',todayMonth,'todayDay',todayDay);

        // 更改文字样式
        let dayCheckSty = {
            color:'black',
        };

        if(day>0&&todayYear>=year&&todayMonth>=month&&todayDay>day){
            // 今天以前的天
            dayCheckSty = {
                color:'#e6e6fa',
            };
        }

        // 更改背景的样式
        let dayBgSty = {
            backgroundColor:'white',
        };
        if (this.state.check[formatStr]){
            dayBgSty = {
                backgroundColor:'#1eb7ff',
            };

            dayCheckSty = {
                color:'white',
            };
        }

        return(
            <View style={[styles.dayItemSty,dayBgSty]}>
                <Text style={[styles.dayTextSty,dayCheckSty]}>{text}</Text>
            </View>
        );
    }


    // 所有月份的信息
    getAllMonthsInfo=()=>{
        let allMonthsInfo = [];
        let num = this.state.num;

        for (let n=0;n<num;n++){

            // 当月的信息
            let monthInfo = this.getMonthInfo(n);

            // 本月是xx年xx月
            let monthTitle = monthInfo.monthTitleKey;

            // 构建月份的总天数
            let monthEmptyCount = monthInfo.monthStartWeekKey-1;
            let monthTotalCount = monthEmptyCount + monthInfo.monthDaysKey;

            // 根据总天数确定月份的文本
            let monthDayTitles = [];

            for (let i=0;i<monthTotalCount;i++){
                // 天数的文本 默认是空格的文本
                let monthDayTitle = '';

                if (i>=monthEmptyCount){
                    // 月份的天数文本
                    let dayNum = i-monthEmptyCount;
                    dayNum += 1;
                    monthDayTitle += dayNum;
                }

                // 天的信息
                let  dayInfo ={
                    // 天的文本
                    title: monthDayTitle,
                    // 天所在年份
                    yearNumKey:monthInfo.yearNumKey,
                    // 天所在月份
                    monthNumKey:monthInfo.monthNumKey,
                    /*
                    数组中的每一项，需要包含 key 值作为唯一标示。
                    数据结构如下：[{title: 'Title Text', key: 'item1'}]
                    */
                    key:i,
                };

                // 存入天数数组
                monthDayTitles.push(dayInfo);
            }

            // 当月的信息
            let info ={
                // 月份的标题 xx年xx月
                monthTitle:monthTitle,
                // 当月的所有天数 需要作为FlatList的数据源 以实现栅格 所以外面再包装一层数组
                data:[monthDayTitles],
            };

            // 存储当月的信息
            allMonthsInfo.push(info);
        }
        // console.log(allMonthsInfo);
        return allMonthsInfo;
    }

    // 每个月需要知道的信息
    getMonthInfo=(monthNum)=>{
        // 开始日期
        let date = this.state.startTime;

        // 本月的月份对象
        let currentDate = new Date(date.getFullYear(),date.getMonth()+1+monthNum,0)

        // 本月是xx年xx月
        let monthTitle = currentDate.getFullYear().toString()+'年'+(currentDate.getMonth()+1).toString()+'月';

        // 本月1号 是周几
        let monthStartWeek = new Date(date.getFullYear(),date.getMonth()+monthNum,1).getDay();
        if (monthStartWeek===0){
            monthStartWeek = 7;
        }

        // 本月的天数
        let monthDays = currentDate.getDate();

        // 日历的行数
        let monthRowCounts = Math.ceil((monthDays+monthStartWeek-1)/7);

        // 返回本月的信息
        return {
            monthTitleKey:monthTitle,
            monthStartWeekKey:monthStartWeek,
            monthDaysKey:monthDays,
            monthRowCountsKey:monthRowCounts,
            monthNumKey:(currentDate.getMonth()+1),
            yearNumKey:currentDate.getFullYear(),
        };
    }

}

const styles = StyleSheet.create({
    direction_row:{
       flexDirection:'row',
        flexWrap:'wrap',
    },
    headerBgSty:{
        height:35,
        backgroundColor:'#a0522d',
        alignItems:'center',
    },
    weekItemSty:{
        width:itemW,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
    },
    contentSty:{
    },
    sectionSty:{
        width:width,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'darkcyan',
    },
    sectionTextSty:{
        fontSize:15,
    },
    dayItemSty:{
        width:itemW,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:3,
    },
    dayTextSty:{},
});