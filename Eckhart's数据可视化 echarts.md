#### Eckhart's数据可视化 echarts

数据可视化的概念

- 把数据以更直观的形式展现
- 清晰有效地传达与沟通信息
- 隐藏在数据中的信息

可视化的实现方式

- 报表类
- 商业智能BI
- 编码类

#### Eckhart's的介绍

开源免费 是JS实现的开源可视化库,兼容性强

功能丰富 底层依赖矢量图形库 ZRender

 社区活跃 提供直观,交互丰富,可高度个性化定制的数据可视化表

😂历史考试 有一道题问你秦始皇的妈是谁？

#### Eckhart's的特点

##### 可视化类型

1. 折现图,柱状图,饼图,K线图----
2. https://echarts.apache.org/examples/zh/index.html

##### 多种数据格式化支持

1. 流数据的动态渲染
2. 增量渲染技术
3. 移动端优化
4. 跨平台使用
5. 特效
6. 三维可视化
7. 。。。。。。

#### Eckhart's基本使用

- 引入Eckhart's.js文件

![image-20211203193110699](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211203193110699.png)

- 准备一个呈现图表的盒子

![image-20211203193436904](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211203193436904.png)

- 初始化Eckhart'实例对象

![image-20211203193445402](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211203193445402.png)

- 准备配置项

![image-20211203193906970](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211203193906970.png)

- 将配置项设置给Eckhart's实例对象

![image-20211203195426619](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211203195426619.png)

##### 效果

![image-20211203195529977](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211203195529977.png)

##### 思考

首先引入文件,创建div盒子需要宽高,初始化实例,设置配置项,调用setOption方法；

#### 常见效果

标记：最大值,最小值,平均值

1. markPoint
2. markLine

显示：数值显示 柱宽度 横向柱状图

##### 柱状图

- 通用配置

  - 标题 title
    1. 文字样式 textStyle
    2. 标题边框 borderWidth borderColor borderRadius
  - 标题位置
    1. left top right bottom
  - 提示 tooltip
    1. trigger:'item' trigger:'axis'
    2. triggerOn: mouseover,click
    3. formatter:回调函数
  - 工具按钮 toolbox
    1. toolbox工具栏
    2. 内置有导出图片,数据视图，动态类型切换,数据区域缩放，重置五个工具
  - 图例 legend

  ​           1.legend图例，用于筛选系列,需要和series配合使用

  ​           2.legend中的data是一个数组

  ​           3.legend中的data的值需要和series中某组数据的name值一致.

  ##### 折线图
  
  **标记** : 最大值 最小值 平均值 标注区间

  markPoint markLine markArea
  
   ![image-20211210021001995](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211210021001995.png)
  
  ##### 线条控制:平滑 风格
  
  smooth:true,lineStyle
  
  ##### 填充风格
  
  areaStrle
  
  ##### 紧挨边缘
  
  boundaryGap:false
  
  ##### Y轴不从0开始
  
  scale:true
  
  ##### 堆叠图
  
   stack:"all", stack必须保证值一样
  
  areaStyle:{}

#### 散点图

散点图可以帮助我们推断出变量间从相关性

图表类型:

在series下设置type:scatter xAxis 和 yAxis的type都要设置为value

##### 配置网格Grid

grid是用来控制直角坐标系的布局和大小

x轴和y轴就是在grid的基础上进行绘制的

show:true 

grid的边框 borderWidth borderColor

grid的位置和大小

left,top,right,bottom,width height

##### 坐标轴axis

显示位置 position

xAxis:可取值为top或者bottom

yAxis:可取值为left或者right

##### 区域缩放dataZoom

dataZoom用于区域缩放,对数据范围过滤,x轴和y轴都可以拥有

dataZoom是一个数组,意味着可以配置多个区域缩放器

类型type   slider：滑块 inside:内置,依靠鼠标滚轮,或者双zhi缩放

指明产生作用的轴:xAxisindex：设置缩放组件控制的是哪个x轴,一般写0即可  yAxisIndex:设置缩放组件控制的是那个y洲,一般写0即可

指明初始状态的缩放情况 

start:数据窗口范围的起始百分比

end:数据窗口范围的结束百分比

#### 饼图

series下设置 type:pie

数据是一个数组 里面是一个又一个对象 每个对象需要有name value

### 显示数值

lable:formatter

redius:20 饼图的半径![image-20211211033527532](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211211033527532.png)

roseType:"radius" 南丁格尔图

selectedMode:"single" or "multiple" 选中的偏离圆点一小段距离

selectedOffset:30 选中偏移量

#### 地图

地图图标的使用方式

- 百度地图API

  需要申请百度地图ak

- 矢量地图

​        需要准备矢量地图数据

https://github.com/alin25730/nnn 资料文件

![image-20211211040513627](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211211040513627.png)ajax发送请求获取数据

```
  echarts.registerMap('china', ajax.responseText)
       var option = {
           series: [{ type: "map", map: "china" }]}
```

需要注意的是 应该是在请求响应完毕哪里 处理option ‘china’ 字段名应该一样

##### 常见效果

缩放拖动:roam:true

名称显示 label 

设置初始化的缩放比例:zoom:1 

center:[x,y] 设置地图中心点的坐标

##### 不同颜色空气质量

series：[ { data:数据,geoIndex：0，type:"map'}]

visualMap：{ min,max , inRange:{color:['width','red']}}

caluculable:true 出现滑块

##### 地图和散点图结合

1.给series下增加新的对象

2.准备好散点数据,设置给新对象的data

3.配置新对象的type

   type:effectScatter

4.让散点图使用地图坐标系统

   coordinateStstem:'geo'

5.让涟漪的效果更加明显

​    rippleEffect:{ scale : 10 }

#### 雷达图

![image-20211212030346911](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211212030346911.png)

option 配置 radar：{ indicator:各个维度的最大值}

series 配置 trpe："radar" data：产品数据

##### 设置样式

label{ show：true}

阴影面积 areaStyle:{} 

shape:"circle" 配置雷达图最外层的圆形需要设置到 radar下 默认是多边形

#### 仪表盘

![image-20211212030405441](C:\Users\Niko'C'\AppData\Roaming\Typora\typora-user-images\image-20211212030405441.png)

仪表盘类似于跑车的加油 主要用在进度把控以及数据范围的监测

series下设置 type:gauge

数值范围：max,min 多个指针:增加data中的数组元素

多个指针颜色差异:itemStyle

#### 图表

bar line scatter/effectScatter  pie map radar gauge

##### 使用场景

- 柱状图: 分类数据，呈现的是每一个分类中有多少
- 折线图: 常用来分析数据随着时间的变化趋势
- 散点图: 可以帮助我们推断出不同维度数据之间的相关性
- 饼图: 可以很好地帮助用户快速了解不同分类的数据占比情况
- 地图: 地图主要可以帮助我们从宏观的角度快速看出不同地理位置上数据的差异
- 雷达图: 可以用来分析多个维度的数据与标准数据的对比情况
- 仪表盘:可以更直观的表现出某个指标的进度或实际情况

### echarts

- 兼容性强,使用方便 功能强大
- echarts能满足大多数可视化图表实现
- 实现数据可视化的最佳选择之一

### echarts高级

- [ ] 显示相关
- [ ] 动画的使用
- [ ] 交互API

<center style="color: aquamarine;font-size: 20px;">主题</center>

内置主题

- echarts中默认内置了两套主题：light dark

   var mCharts = echarts.init(document.querySelector("div"),'dark');

- 在初始化对象方法init中可以指明

自定义主题

- 在主题编辑器中编辑主题
- 下载主题，是一个js文件
- 引入主题js文件
- 在init方法中使用主题

##### 调色盘

全局调试盘 option:{ color:[]}

局部调色盘 series:[{color:[]}]

调色盘的作用遵循就近原则

颜色渐变 type:"liner or radial

#### 自适应

JS监听窗口大小变化事件,在事件处理函数中调用Echatrs实例对象的resize即可

#### 加载动画

Echatrs已经内置了加载数据的动画,我们只需要在合适的时机显示或者隐藏即可

- 显示加载动画

  Echatrs.showLoading()

- 隐藏加载动画

  Echatrs.hideLoading()

#### 增量动画

mCharts.setOption

所有数据的更新都通过setOption实现

不用考虑数据到底产生了那些变化

Echarts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化.

### 动画

animation:true //控制动画是否开启

animationDuration:7000 //动画的时长,它是以毫秒为单位 是个回调函数

animationEasing:"bounceOut' 缓动动画

##### 交互API

- 全局Echatrs对象

  全局Echatrs对象是引入Echatrs.js文件之后就可以直接使用的

- Echatrs实例对象

  Echatrs实例对象是通过Echatrs.init方法调用之后得到的

#### 全局Echatrs对象

connect方法

- 一个页面中可以有多个独立的图表
- 每一个图表对应一个Echatrs实例对象
  - connect可以实现多图关联,传入联动目标为Echatrs实例对象,支持数组。保存图片的自动拼接 刷新按钮 重置按钮 提示框联动 图例选择 数据范围修改等。。。。。。。。

##### EchatrsInstance 对象

setOption

- 设置或修改图表实例的配置项以及数据

- 多次调用setOption方法

  合并新的配置和旧的配置

  增量动画

resize

- 重新计算和绘制图表
- 一般和window对象的resize事件结合使用

on\off

dispatchAction

clear

dispose



### 补充

grid直角坐标系的同一配置 

​         top:"20%",

​         left:"3%",

​         right:"6%",

​         bottom:"3%",

​         containLabel:true //距离包含坐标轴的文字

可以改变坐标

## 后端

- 安装包 npm i ws -S

- 创建对象 const WebSocket = require("ws") const wss = new WebSocKet.Server({port:9998})

- 监听事件

  连接事件 wss.on('connection',client=>{console.log("有客户端连接")})

  接收数据事件 wss.on("connection",client=>{client.on('message',msg=>{console.log("客户端发送数据过来了")})})

- 发生数据 client.send("hello word")

### 前端

- 创建对象 const ws = new Webscoket('ws//locallhost:9998') Webscoket 是window 提供的 不用安装其他包

- 监听事件

  连接成功事件 ws.onopen

  接收数据事件 ws.onmessage

  关闭连接事件 ws.onclose

- 发送数据 ws.send

### 优化

重发数据的机制

断开重连的机制