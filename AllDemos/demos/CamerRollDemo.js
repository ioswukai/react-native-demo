/**
 * Created by apple on 2018/3/30.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    CameraRoll,
    ScrollView,
    View
} from 'react-native';

// 导入自定义样式
import {CustomStyles,NavigateBar} from './CustomStyles';

/*************************第一个例子 CamerRollDemo*******************************/
/*
    CameraRoll模块提供了访问本地相册的功能。它提供了两比较简单的静态方法
 !!!!!!!!!!!!!!!! 下面两个的静态方法的书写方式变了
 !!!!!!!!!!!!!!!! saveImageWithTag被废弃了 使用 saveToCameraRoll()替代 用法相同

 !!!!!!!!!!!!!!!! iOS需要集成环境
 1.首先打开你的项目目录/node_modules/react-native/Libraries/CameraRoll/
 找到RCTCameraRoll.xcodeproj这个文件。
 2.然后把它拖到xcode的Libraries目录下。
 3.然后点击项目标签在General标签中找到Linked Frameworks and Libraries
 点击下边的+号把libRCTCameraRoll.a加进来
 然后再返回你的项目中保存图片应该就不会错了。

 static saveImageWithTag(tag,successCallBack,errorCallBack) 保存一个图片到相册。
 参数tag是图片的地址，是字符串类型，

 tag 的含义

 在Android上，本参数是一个本地URI，例如"file:///sdcard/img.png".

 在iOS设备上可能是以下之一：
 本地URI
 资源库的标签
 非以上两种类型，表示图片数据将会存储在内存中（并且在本进程持续的时候一直会占用内存）。
 返回一个Promise，操作成功时返回新的URI。

 static getPhotos(params,successCallBack,errorCallBack)

 返回一个带有图片标识符对象的Promise。返回的对象的  结构参见getPhotosReturnChecker。

 @params 表示获取图片的参数 是一个{object}  要求的参数结构参见 getPhotosParamChecker，结构如下
 var fetchParams = {
    // 获取数据的个数
    first:5,

    // 数据的分组类型，可以是下面数组中的任意一个
    groupTypes:React.PropType.oneOf(
        [
            'Album', // 相簿
            'All',   // 所有的
            'Event',
            'Faces',
            'Library', // 库
            'PhotoStream', // 照片流
            'SavedPhotos', // 保存的图片
        ]
    ),

    // 资源类型，可以是数组中的任意一个
    assetType:React.PropType.oneOf(
        [
            'Photos', // 图片
            'Videos',   // 视频
            'All', // 所有类型
        ]
    ),
 }

 返回一个Promise，操作成功时 返回符合getPhotosReturnChecker结构的对象。返回的数据是一个字典包含两个key
 第一个key  edges:[] 是个数组，里面包含一个字典{} 字典里有两个  node和location，各自都对应一个对象，每个
 node对象包含了图片的时间戳、组名、类型、图片宽高、贝蒂uri以及位置信息。

 第二个key  page_info 对应的也是一个字典，里面有个has_next_page这个布尔值可以用来判断是否有下一页，从而判断是否
 需要继续加载图片

 !!!!!!!!!!!!!!!! 旧的的书写方式
 // 取得图片
 CameraRoll.getPhotos(fetchParams,(data)=>{
 // 取得照片成功
 console.log('取得图库的照片有：',data);
 let edges = data.edges;
 let photos = [];
 for (let i=0;i<edges.length;i++){
    let edge = edges[i];
    photos.push(edge.node.image.uri);
 }

 // 显示取得的图片
 this.setState({
    photos:photos,
 });
 },(error)=>{
    // 取得照片失败
    console.log('获取照片失败',error);
 })


 //存第二张图片
    CameraRoll.saveImageWithTag(imgURL+img2,(url)=>{
    if(url) {
    // 保存图片成功
     let photos = this.state.photos;
    // 在前面追加url
    photos.unshift(url);
    // 显示保存的图片
    this.setState({
        photos: photos,
    });

    // 显示保存图片成功
    console.log('保存照片成功');
    }

    },(error)=>{
    // 保存图片失败了
        console.log('保存照片2失败',error);
 })


 !!!!!!!!!!!!!!!! 新的书写方式
 // 取得图片
 CameraRoll.getPhotos(fetchParams)
    .done((data)=>{
    // 取得照片成功
    console.log('取得图库的照片有：',data);
    let edges = data.edges;
    let photos = [];
     for (let i=0;i<edges.length;i++){
    let edge = edges[i];
    photos.push(edge.node.image.uri);
    }

    // 显示取得的图片
    this.setState({
    photos:photos,
    });
    },(error)=>{
    // 取得照片失败
    console.log('获取照片失败',error);
    })

 */

// 定义变量
let fetchParams ={
    first:4,
    groupTypes:'All',
    assetType:'Photos',
};
let imgURL = 'http://vczero.github.io/lvtu/img/';

export default class CamerRollDemo extends Component<Props> {
// class CamerRollDemo extends Component<Props> {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            photos:null,
        };
      }

    render() {
          let photos = [];
          if (this.state.photos){
              photos = this.state.photos;
          }

          let photosView = [];

          let length = photos.length;
          if (length == 0){
              length = 4;
          }

          for(let i =0;i<length;i+=2){
              photosView.push(
                  <View key={i} style={styles.row}>
                      <View style={styles.flex_1}>
                          <Image
                              resizeMode='stretch'
                              style={[styles.imgHeight,styles.m5]}
                              source={{uri:photos[i]}}
                          />
                      </View>
                      <View style={styles.flex_1}>
                          <Image
                              resizeMode='stretch'
                              style={[styles.imgHeight,styles.m5]}
                              source={{uri:photos[parseInt(i)+1]}}
                          />
                      </View>
                  </View>
              );
          }

        return (
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
                <ScrollView>
                    <View style={styles.row}>
                        <View style={styles.flex_1}>
                            <Image
                                resizeMode='stretch'
                                style={[styles.imgHeight,styles.m5]}
                                source={{uri:imgURL+'city.jpg'}}
                            />
                        </View>
                        <View style={styles.flex_1}>
                            <Image
                                resizeMode='stretch'
                                style={[styles.imgHeight,styles.m5]}
                                source={{uri:imgURL+'3.jpeg'}}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.saveImg('city.jpg','3.jpeg')}}>
                            <View style={{backgroundColor:'orange',height:40,marginLeft:30,marginRight:30,marginTop:20,alignItems:'center',justifyContent:'center',}}>
                                <Text>保存网络图片到相册</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:20}}>
                        {photosView}
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
          // 取得图片
        CameraRoll.getPhotos(fetchParams)
            .done((data)=>{
                // 取得照片成功
                console.log('取得图库的照片有：',data);
                let edges = data.edges;
                let photos = [];
                for (let i=0;i<edges.length;i++){
                    let edge = edges[i];
                    photos.push(edge.node.image.uri);
                }

                // 显示取得的图片
                this.setState({
                    photos:photos,
                });
            },(error)=>{
                // 取得照片失败
                console.log('获取照片失败',error);
            })

        // 旧的书写方式 已弃用
        // CameraRoll.getPhotos(fetchParams,(data)=>{
        //     // 取得照片成功
        //    console.log('取得图库的照片有：',data);
        //    let edges = data.edges;
        //    let photos = [];
        //    for (let i=0;i<edges.length;i++){
        //        let edge = edges[i];
        //        photos.push(edge.node.image.uri);
        //    }
        //
        //    // 显示取得的图片
        //     this.setState({
        //         photos:photos,
        //     });
        // },(error)=>{
        //     // 取得照片失败
        //     console.log('获取照片失败',error);
        // })
    }


    // 保存图片
    saveImg(img1,img2){
          // 被弃用了
        // CameraRoll.saveImageWithTag(imgURL+img1,(url)=>{
        // 使用 saveToCameraRoll 替代
        CameraRoll.saveToCameraRoll(imgURL+img1)
            .then((url)=>{
                if(url){
                    // 保存图片成功
                    let photos = this.state.photos;
                    // 在前面追加url
                    photos.unshift(url);
                    // 显示保存的图片
                    this.setState({
                        photos:photos,
                    });

                    //存第二张图片
                    // 被弃用了
                    // CameraRoll.saveImageWithTag(imgURL+img2,(url)=>{
                    // 使用 saveToCameraRoll 替代
                    CameraRoll.saveToCameraRoll(imgURL+img2)
                        .then((url)=>{
                            if(url) {
                                // 保存图片成功
                                // let photos = this.state.photos;
                                // 在前面追加url
                                photos.unshift(url);
                                // 显示保存的图片
                                this.setState({
                                    photos: photos,
                                });

                                // 显示保存图片成功
                                console.log('保存照片成功');
                            }
                        })
                        .catch((error)=>{
                            // 保存图片失败了
                            console.log('保存照片2失败',error);
                        });

                }
            })
            .catch((error)=>{
                // 保存图片失败了
                console.log('保存照片1失败',error);
            })
    }


}


/*************************第一个例子 react-native-camera*******************************/
/*
   这里如果我们需要调用摄像头，我们在Github上找到了一个开源库，react-native-camera  集成如下
    1.安装react-native-camera，终端进入项目根目录， npm i react-native-camera --save
    2.添加到工程：因为第三方库不是单纯的js库，还包含oc代码，所以需要编译，将react-native-camera
    添加到我们的项目目录中，具体步骤如下
    (1).在node_modules下找到react-native-camera文件夹，在该文件夹里找到RNCamera.xcodeproj 文件
    (2).然后把它拖到xcode的Libraries目录下。
    (3).然后点击项目标签在General标签中找到Linked Frameworks and Libraries
        点击下边的+号把libRNCameraRoll.a加进来
    (4).设置路径：在Libraries中点击RNCamera.xcodeproj，然后选择Build Setting,点击All,然后找到
    Header Search Paths选项，并且点击，确保该项的值包含 $(SRCROOT)/../../react-native/React
    和 $(SRCROOT)/../../../React 这两项，并且他们的值都是recursive

    到此我们就完成了第三方库的添加

    重启项目，会发现模拟器中无法调用摄像头。我们需要将其打包，放到真机上运行才行。我们使用下面的例子，
    这个例子主要包括两个功能：前置摄像头，和后置摄像头的切换、拍照
*/

// import RNCamera from 'react-native-camera';
// export default class ReactNativeCamera extends Component<Props> {
class ReactNativeCamera extends Component<Props> {
    // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
        // 后置摄像头
        cameraType:Camera.constants.Type.back,
    };
  }

    render(){
        return(
            <View style={CustomStyles.container}>
                {/*渲染导航栏*/}
                <NavigateBar
                    component = {this}
                />
            </View>
        );
    }

  // render(){
  //     return(
  //         <View style={CustomStyles.container}>
  //             {/*渲染导航栏*/}
  //             <NavigateBar
  //                 component = {this}
  //             />
  //
  //             {/*照相机*/}
  //             <Camera
  //                 ref = 'cam'
  //                 style={styles.CameraSty}
  //                 onBarCodeRead={(e)=>{this._onBarCodeRead(e)}}
  //                 type={this.state.cameraType}
  //             >
  //                 <TouchableOpacity activeOpacity={0.5} onPress={()=>{this._switchCamera}}>
  //                     <Text>切换相机</Text>
  //                 </TouchableOpacity>
  //                 <TouchableOpacity style={{marginTop:30}} activeOpacity={0.5} onPress={()=>{this._takePic}}>
  //                     <Text>照相</Text>
  //                 </TouchableOpacity>
  //             </Camera>
  //         </View>
  //     );
  // }

    _onBarCodeRead(e){
      console.log(e);
    }

    _switchCamera(){
        let state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front:Camera.constants.Type.back;
        this.setState({
            cameraType:state.cameraType,
        });
    }
    _takePic(){
        this.refs.cam.capture((err,data)=>{
            console.log(err,data);
        })
    }

}

 const styles = StyleSheet.create({
    bgVSty:{},
    row:{
        flexDirection:'row',
    },
    flex_1:{
        flex:1,
    },
    imgHeight:{
        height:120,
    },
    m5:{
        marginLeft:5,
        marginRight:5,
        borderWidth:1,
        borderColor:'#e8e8e8',
    },
    CameraSty:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent'
    },
});