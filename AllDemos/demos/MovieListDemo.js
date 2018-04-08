/**
 * Created by apple on 2018/3/14.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class MovieListDemo extends Component<Props> {
    render() {
        return (
            <View style={{flex:1,paddingTop:84}}>
                <Text style={styles.textSty}> 我是{this.props.titleName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textSty:{

    },
});