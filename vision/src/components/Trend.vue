<!-- 折线图 -->
<template>
    <div class="Container">
        <div class="title" :style="comStyle">
            <span>{{'Ⅰ'+ showTitle}}</span>
            <span @click="isShow=!isShow" :style="comStyle" class="iconfont icon">&#xe6eb</span>
            <div class="title_Conta" v-show="isShow" :style="marigStyle">
                <div class="title_item" v-for="item of selectTypes" :key="item.key" @click="handSelecet(item.key)">{{item.text}}</div>
            </div>
        </div>
        <div ref="trend_ref" class="chart"></div>
    </div>
</template>

<script>
    import {getThemeValue} from "../utils/themutils"
    export default {
        name: 'EckhartTrend',

        data() {
            return {
                chartInstance: null,
                allData: null,
                isShow:false,
                dynamicType:'map',
                titleFontSize:0,
                theme:""
            };
        },
        created() {
            this.$socket.registerCallBack("trendData",this.getData)
        },
        destroyed() {
            window.removeEventListener('resize', this.screenOption)
            this.$socket.unRegisterCallBack("trendData")
        },
        mounted() {
            this.initChart();
            // this.getData()
            this.$socket.send({
                action:"getData",
                socketType:"trendData",
                chartName:"trend",
                value:""
            })
            window.addEventListener('resize', this.screenOption)
            this.screenOption();
        },
        computed:{
        selectTypes(){
          if(!this.allData){
              return []
          }else{
              return this.allData.type.filter(item=>{
                  return item.key !== this.dynamicType
              })
          }
        }, 
        showTitle(){
            if(!this.allData){
                return ''
            }else{
                return this.allData[this.dynamicType].title
            }
        },
        comStyle(){
            return{
                fontSize:this.titleFontSize + 'px',
                color:getThemeValue(this.theme).titleColor
            }
        },
        marigStyle(){
            return {marginLeft:this.titleFontSize + 'px'}
        },
        themes(){
            return this.theme = this.$store.state.theme;
        }
        },
        watch:{
            themes(){
                this.chartInstance.dispose();
                this.initChart();
                this.screenOption();
                this.updataChart();
            }
        },
        methods: {
            initChart() {
                this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme);
                let initOption = {
                    xAxis: {
                        type: "category",
                        // 紧埃边缘
                        boundaryGap: false
                    },
                    yAxis: {
                        type: "value"
                    },
                    grid: {
                        left: "3%",
                        top: "35%",
                        right: "4%",
                        bottom: "1%",
                        containLabel: true
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        left: 20,
                        top: '15%',
                        icon: "circle"
                    }

                }
                this.chartInstance.setOption(initOption)
            },
            getData(ret) {
                // const { data: ret } = await this.$http.get('trend')
                this.allData = ret;
                console.log(ret)
                this.updataChart()
            },
            updataChart() {
                // 颜色数据
                const colorArr2 = [
                    'rgba(11,168,44,0)',
                    'rgba(44,110,255,0)',
                    'rgba(22,242,217,0)',
                    'rgba(254,33,30,0)',
                    'rgba(250,105,0,0)',
                ]
                const colorArr1 = [
                    'rgba(11,168,44,1)',
                    'rgba(44,110,255,1)',
                    'rgba(22,242,217,1)',
                    'rgba(254,33,30,1)',
                    'rgba(250,105,0,1)',
                ]
                // 类目轴的数据
                let xData = this.allData.common.month;
                // y轴的数据
                let yData = this.allData[this.dynamicType].data;
                const seriesArr = yData.map((item, index) => {
                    return {
                        name: item.name,
                        type: "line",
                        data: item.data,
                        stack: this.dynamicType,
                        // 颜色填充
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: colorArr1[index]
                                },
                                {
                                    offset: 1,
                                    color: colorArr2[index]
                                }
                            ])
                        }
                    }
                })
                const legendArr = yData.map(item => {
                    return item.name
                })
                let Option = {
                    xAxis: {
                        data: xData
                    },
                    legend: {
                        data: legendArr
                    },
                    series: seriesArr

                }
                this.chartInstance.setOption(Option)
            },
            handSelecet(key){
                this.dynamicType = key;
                this.updataChart();
                this.isShow = false;
            },
            screenOption() {
                this.titleFontSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6
                let Screen = {
                    legend:{
                        itemWidth:this.titleFontSize,
                        itemHeight:this.titleFontSize,
                        itemGap:this.titleFontSize,
                        textStyle:{
                            fontSize:this.titleFontSize / 2
                        }
                    }
                }
                this.chartInstance.setOption(Screen)
                this.chartInstance.resize();
            }
        },
    };
</script>

<style lang="scss" scoped>
.title{
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    color: white;
    .icon{
        margin-left: 10px;
        cursor: pointer;
    }
  
}
</style>
