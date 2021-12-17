<!-- 商家销量统计的横向柱状图 -->
<template>
    <div class="Container">
        <div ref="seller_ref" class="chart"></div>
    </div>
</template>

<script>
    export default {
        name: 'EckhartSeller',
        data() {
            return {
                chartInstance: null,
                allData: null,
                currentPage: 1,
                totalPage: 0,
                Time: null,
                theme:""
            };
        },
        computed:{
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
        created() {
            this.$socket.registerCallBack("sellerData",this.getData)
        },
        mounted() {
            this.initChart();
            // this.getData();
            this.$socket.send({
                action:"getData",
                socketType:"sellerData",
                chartName:"seller",
                value:""
            })
            // 屏幕适配
            window.addEventListener('resize',this.screenOption)
            this.screenOption();
        },
        destroyed() {
            clearInterval(this.Time);
            window.removeEventListener('resize',this.screenOption)
            this.$socket.unRegisterCallBack("sellerData")
        },
        methods: {
            // echart实例对象
            initChart() {
                this.chartInstance = this.$echarts.init(this.$refs.seller_ref, this.theme);
                let initOption = {
                    title: {
                        text: "Ⅰ 商家销售统计",
                        left: 20,
                        top: 20,
                    },
                    grid: {
                        top: "20%",
                        left: "3%",
                        right: "6%",
                        bottom: "3%",
                        containLabel: true //距离包含坐标轴的文字
                    },
                    xAxis: {
                        type: "value"
                    },
                    yAxis: {
                        type: "category",
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: "line",
                            z: 0,
                            lineStyle: {
                                color: "#2D3443"
                            }
                        }
                    },
                    series: [
                        {
                            type: "bar",
                            label: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: "white"
                                }
                            },
                            itemStyle: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: "#5052EE"
                                    },
                                    {
                                        offset: 1,
                                        color: "#AB6EE5"
                                    }
                                ])
                            }
                        }
                    ]
                }
                this.chartInstance.setOption(initOption)
                this.chartInstance.on('mouseover', () => {
                    clearInterval(this.Time)
                })
                this.chartInstance.on('mouseout', () => {
                    this.settimer()
                })
            },
            // 获取数据
            getData(ret) {
                // const { data: ret } = await this.$http.get("seller");
                this.allData = ret;
                this.allData.sort((a, b) => {
                    return a.value - b.value //从小到大
                })
                this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1;
                this.updataChart();
                this.settimer()
            },
            // 更新图表
            updataChart() {
                let start = (this.currentPage - 1) * 5;
                let end = this.currentPage * 5;
                const showData = this.allData.slice(start, end);
                let xData = showData.map((item) => {
                    return item.value
                })
                let yData = showData.map((item) => {
                    return item.name
                })
                const option = {
                    yAxis: {
                         data: yData
                    },
                    series: [
                        {
                              data: xData,
                        }
                    ]
                };
                this.chartInstance.setOption(option)
            },
            settimer() {
                if (this.Time != null) {
                    clearInterval(this.Time)
                }
                this.Time = setInterval(() => {
                    this.currentPage++;
                    if (this.currentPage > this.totalPage) {
                        this.currentPage = 1
                    }
                    this.updataChart()
                }, 3000)
            },
            // 屏幕适配
            screenOption(){
                const titleFontSize = this.$refs.seller_ref.offsetWidth / 100 * 3.6
                const adapterOption = {
                    title: {
                        textStyle: {
                            fontSize: titleFontSize
                        },
                    },
                    tooltip: {
                        axisPointer: {
                            lineStyle: {
                                width: titleFontSize,
                            }
                        }
                    },
                    series: [
                        {
                            barWidth: titleFontSize,
                            itemStyle: {
                                barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
                            }
                        }
                    ]
                }
                this.chartInstance.setOption(adapterOption);
                this.chartInstance.resize();
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
