/**
 * Created by apple on 2018/3/20.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    WebView,
    View
} from 'react-native';

export default class NewsDetail extends Component<Props> {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            detaiData:'',
        };
      }

    componentDidMount() {
        // 请求的路径
        var  url_api = this.props.data.url;

        // 更新状态机 刷新请求
        this.setState({
            detaiData:url_api,
        });

    }

    render() {

        if (this.state.detaiData.length == 0 ){
            return(<View></View>);
        }

        // console.log('渲染'+this.state.detaiData);
        return (
            <View style={styles.container}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.state.detaiData}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:64,
    },
    webView:{
    },
});