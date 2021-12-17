<template>
    <div class="page">
        <div ref="hot_chart" class="chart"></div>
        <span class="iconfont left" @click="left" :style="FontSize">&#xe6ef;</span>
        <span class="iconfont right" @click="right" :style="FontSize">&#xe6ed;</span>
        <span class="title" :style="FontSize">{{ useName }}</span>
    </div>
</template>

<script>
import {getThemeValue} from "../utils/themutils"
    export default {
        name: 'EckhartHot',

        data() {
            return {
                initChart: null,
                allData: null,
                currentPage: 0,
                size:0,
                theme:""
            };
        },
        computed:{
            FontSize(){
                return {
                    fontSize:this.size + 'px',
                    color:getThemeValue(this.theme).titleColor
                }
            },
            useName(){
                if(!this.allData){
                    return ''
                }else{
                    return this.allData[this.currentPage].name
                }
            },
            themes(){
               return  this.theme = this.$store.state.theme;
            }
        },
        created() {
            
            this.$socket.registerCallBack("hotData",this.getData)
        },
  
        watch:{
            themes(){
               
                this.initChart.dispose();
                this.initOption();
                this.screenOption();
                this.upDataOptin();
            }
        },
        mounted() {
           
            this.initOption(),
            // this.getData(),
            this.$socket.send({
                action:"getData",
                socketType:"hotData",
                chartName:"hotproduct",
                value:""
            })
            window.addEventListener('resize',this.screenOption)
            this.screenOption()
        },
        destroyed() {
            window.removeEventListener('resize',this.screenOption)
            this.$socket.unRegisterCallBack("hotData")
        },
        methods: {
            initOption() {
                this.initChart = this.$echarts.init(this.$refs.hot_chart, this.theme);
                let initOpti = {
                    legend:{
                        top:'15%',
                        icon:"circle"
                    },
                    tooltip:{
                        show:true,
                        formatter:arg =>{
                            const children = arg.data.children;
                            let toltal = 0;
                            children.forEach(item=>{
                                toltal += item.value;
                            })
                            let str = '';
                            children.forEach(item=>{
                                str += ` ${item.name} : ${parseInt(item.value / toltal * 100)}%<br/>`
                            })
                            return str
                        }
                    },
                    series: [
                        { type: "pie" }
                    ]
                }
                this.initChart.setOption(initOpti);
            },
           getData(ret) {
                // let { data: ret } = await this.$http.get('hotproduct');
                this.allData = ret;
                console.log(this.allData)
                this.upDataOptin()
            },
            upDataOptin() {
                const legenData = this.allData[this.currentPage].children.map(item => {
                    return item.name
                })
                const seriesData = this.allData[this.currentPage].children.map(item => {
                    return {
                        name: item.name,
                        value: item.value,
                        children:item.children
                    }
                })

                let updataOption = {
                    title:{
                    text:"Ⅰ 热销商品的占比",
                    left:20,
                    top:20
                    },
                    legend: {
                        data: legenData
                    },
                    series: [
                        { data: seriesData,
                            labelLine:{show:false},
                            label:{show:false},
                            emphasis:{
                                label:{show:true},
                    } }
                    ]
                }
                this.initChart.setOption(updataOption)
                
            },
            screenOption(){
                this.size = this.$refs.hot_chart.offsetWidth / 100 * 3.6;
                const sctOpto = {
                    legend:{
                        itemWidth:this.size / 2,
                        itemHeight:this.size / 2,
                        itemGap:this.size / 2,
                        textStyle:{
                            fontSize:this.size / 2
                        }
                    },
                    title:{
                        textStyle:{
                            fontSize:this.size
                        },

                    },
                    series:[
                        {radius:this.size * 4.5,center:['50%','60%']}
                    ]
                }
                this.initChart.setOption(sctOpto);
                this.initChart.resize()
            },
            left() {
                this.currentPage--;
                if (this.currentPage < 0) {
                    this.currentPage = this.allData.length - 1
                }
                this.upDataOptin()
            },
            right() {
                this.currentPage++;
                if (this.currentPage > this.allData.length - 1) {
                    this.currentPage = 0
                }
                this.upDataOptin()
            },
          
        },
    };
</script>

<style lang="scss" scoped>
    .left {
        position: absolute;
        top: 50%;
        left: 10%;
        color: azure;
        transform: translateY(-50%);
        cursor: pointer;
    }

    .right {
        position: absolute;
        top: 50%;
        right: 10%;
        color: azure;
        cursor: pointer;
        transform: translateY(-50%);
    }
    .title{
        position: absolute;
        bottom: 10%;
        color: white;
        right: 10%;
        font-size: 20px;
    }
</style>
