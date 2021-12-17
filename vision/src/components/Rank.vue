<!-- 竖向柱状图 -->
<template>
    <div class="Container">
        <div class="chart" ref="Rank_chart"></div>
    </div>
</template>

<script>
    export default {
        name: 'EckhartRank',

        data() {
            return {
                instanceChart: null,
                allData: null,
                startValue: 0,
                endValue: 9,
                timeId: null,
                theme:''
            };
        },
        computed:{
            themes(){
                return this.theme = this.$store.state.theme;
            }
        },
        watch:{
            themes(){
                this.instanceChart.dispose();
                this.initChart();
                this.screenOption();
                this.updataOptin();
            }
        },
        created() {
            this.$socket.registerCallBack("rankData",this.getData)
        },
        mounted() {
            this.initChart()
            // this.getData()
            this.$socket.send({
                action:"getData",
                socketType:"rankData",
                chartName:"rank",
                value:""
            })
            window.addEventListener('resize', this.screenOption)
            this.screenOption()

        },
        destroyed() {
            window.removeEventListener('resize', this.screenOption);
            this.$socket.unRegisterCallBack("rankData")
        },
        methods: {
            initChart() {
                this.instanceChart = this.$echarts.init(this.$refs.Rank_chart, this.theme);
                const colorArr = [
                    ['#0BA82C', '#4FF778'],
                    ['#2E72BF', '#23E5E5'],
                    ['#5052EE', '#AB6EE5'],
                ]
                let initOption = {
                    title: {
                        text: "Ⅰ 地区销售排行",
                        left: 20,
                        top: 20
                    },
                    grid: {
                        top: '40%',
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    tooltip: {
                        show: true
                    },
                    xAxis: {
                        type: "category",
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: {
                        type: "bar",
                        itemStyle: {
                            color: (arg) => {
                                let Arrs = null
                                if (arg.value > 300) {
                                    Arrs = colorArr[0]
                                } else if (arg.value > 200) {
                                    Arrs = colorArr[1]
                                } else {
                                    Arrs = colorArr[2]
                                }
                                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: Arrs[0]
                                    },
                                    {
                                        offset: 1,
                                        color: Arrs[1]
                                    },
                                ])
                            }
                        }
                    }
                };
                this.instanceChart.setOption(initOption)
                this.instanceChart.on("mouseover",()=>{
                    clearInterval(this.timeId)
                })
                this.instanceChart.on("mouseout",()=>{
                    this.setInterv()
                })
            },
            getData(ret) {
                // let { data: ret } = await this.$http.get('rank')
                this.allData = ret;
                this.allData.sort((a, b) => {
                    return a.value - b.value
                })
                this.updataOptin()
                this.setInterv()

            },
            updataOptin() {
                // x轴的数据
                let xData = this.allData.map(item => {
                    return item.name
                })
                let yData = this.allData.map(item => {
                    return item.value
                })
                let upOption = {
                    xAxis: {
                        data: xData
                    },
                    series: [
                        { type: "bar", data: yData }
                    ],
                    dataZoom: {
                        show: false,
                        startValue: this.startValue,
                        endValue: this.endValue
                    }
                }
                this.instanceChart.setOption(upOption)
            },
            screenOption() {
                const titleFontsize = this.$refs.Rank_chart.offsetWidth / 100 * 3.6;
                const screenOption = {
                    title:{
                        textStyle:{
                            fontSize:titleFontsize
                        }
                    },
                    series:[
                        {
                            barWidth:titleFontsize,
                            itemStyle:{
                                barBorderRadius:[titleFontsize/2,titleFontsize/2,0,0]
                            }
                        }
                    ]
                }
                this.instanceChart.setOption(screenOption)
                this.instanceChart.resize();
            },
            setInterv() {
                if (this.timeId) {
                    clearInterval(this.timeId)
                }
                this.timeId = setInterval(() => {

                    if (this.endValue > this.allData.length - 1) {
                        this.startValue = 0,
                            this.endValue = 9;
                    } else {
                        this.startValue++,
                            this.endValue++;
                    }
                    this.updataOptin()
                }, 2000)
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
