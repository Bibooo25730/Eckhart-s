
### 总结
![火柴截图20211217173106261](https://user-images.githubusercontent.com/42339998/146527413-bff68c5d-77bf-4850-9789-e9802fc603d4.jpg)


1. 在vue上使用eckhart
2. 首先我们在index.html 引入文件
3. 然后在main.js 在vue原型上增加$eckhart = window.echarts

#### 使用webscket
1. WebSocket不需要安装包 他是挂载在window上的
2. 我们想要实现联动也很简单
3. 我们可以先处理字符约定 （就是前端向服务器发送逻辑字符）
4. 让服务端可以根据发生特定的内容
<html>registerCallBack(socketType, callBack) {
        this.callBackMapping[socketType] = callBack;
    }
    // 取消meng一个回调函数
    unRegisterCallBack(socketType) {
        this.callBackMapping[socketType] = null;
    }</html>
6. 我们这里两个回调函数 一个注册 一个消耗
7. 比如当我们获取地图数据map的时候 前端发送特定的数据 这时候 当我们前端获取到服务段的数据 socket_server.js 这个文件
8.  this.callBackMapping[socketType].call(this, realData) realData 就是我们数据的函数 
### 主题联动 缩放联动
