/**
 * Created by apple on 2018/4/11.
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

import Dimensions from 'Dimensions';
let {width} =Dimensions.get('window');

/*************************第一个例子 BannerDemo*******************************/

// 导入第三方库
import Swiper from 'react-native-swiper';

export default class BannerDemo extends Component<Props> {
    render() {
        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />

                {/*渲染Swiper*/}
                {this.renderSwiper()}

            </View>
        );
    }

    renderSwiper=()=>{
        /*
            注意：在写ListView的头部添加react-native-swiper轮播图时，发现轮播图不显示，
            直接定位到ListView组件上，加上这个属性，removeClippedSubviews={false}，
            然后就显示了。
        */

        return(
            <View
                /* pagination是和Swiper平级相对布局 ，他们都是布局在一个父View上
                    父View是flex：1的布局  所以在这里给外层套一个View 约束下他们的
                    父View 以便控制pagination的位置
                */
                style={styles.swiperBgSty}
            >
                <Swiper
                    // 水平方向，为false可设置为竖直方向
                    horizontal={true}

                    // 隐藏左右滑动箭头
                    showsButtons={false}

                    // 自动轮播
                    autoplay={true}

                    // 设置轮播时间 默认2.5秒
                    autoplayTimeout={2.5}

                    // 如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                    loop={true}

                    // 设置轮播组件的包裹容器高度，注意这里需要设置属性，不能使用样式设置
                    height = {200}

                    // 为false不显示下方圆点
                    showsPagination={true}

                    // 允许自定义小圆点的样式   如：小圆点的位置距离底部10px
                    paginationStyle={styles.indicatorStyle}

                    // 当index改变的时候调用改方法 返回改变后的index
                    onIndexChanged ={this._onIndexChanged}
                >
                    <TouchableOpacity style={styles.bgSty} activeOpacity={0.5} onPress={()=>{this.clickBanner(0)}}>
                        <Image style={styles.imgSty} source={{uri:
                            'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg'}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bgSty} activeOpacity={0.5} onPress={()=>{this.clickBanner(1)}}>
                        <Image style={styles.imgSty} source={{uri:'http://vczero.github.io/ctrip/lvtu/img/city.jpg'}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bgSty} activeOpacity={0.5} onPress={()=>{this.clickBanner(2)}}>
                        <Image style={styles.imgSty} source={{uri:'http://vczero.github.io/ctrip/lvtu/img/4.jpg'}} />
                    </TouchableOpacity>
                </Swiper>
            </View>
        );
    }

    // index改变了
    _onIndexChanged=(index)=>{
        // console.log(index);
    }

    // 点击了banner
    clickBanner(bannerIndex){
        let msg = '点击了第'+bannerIndex+'张图片';
        alert(msg);
    }
}

const styles = StyleSheet.create({
    swiperBgSty:{
        marginTop:20,
        height:200,
    },
    bgSty:{
        width:width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorStyle:{
        bottom:10,
        justifyContent:'flex-start',
        backgroundColor:'rgba(0,0,0,0.3)',
    },
    imgSty: {
        width:width,
        height: 200,
        resizeMode:'stretch',
    }
});