<template>
    <div class="page">
        <div ref="stock_ref" class="chart"></div>
    </div>
</template>

<script>
    export default {
        name: 'EckhartStock',

        data() {
            return {
                initChart: null,
                allData: null,
                currtIndex: 0,
                Time: null,
                theme:''
            };
        },
        computed:{
            themes(){
              return  this.theme = this.$store.state.theme;
                
            }
        },
        watch:{
           themes(){
               console.log('变化')
            this.initChart.dispose();
            this.initOption();
            this.screenOption();
            this.updataOption();
           }
        },
        created() {
            this.$socket.registerCallBack("stockData",this.getData)

        },
        mounted() {
            this.initOption();
            // this.getData();
            this.$socket.send({
                action:"getData",
                socketType:"stockData",
                chartName:"stock",
                value:""
            })
            this.screenOption();
         
            window.addEventListener('resize', this.screenOption)
        },
        destroyed() {
            window.removeEventListener('resize', this.screenOption)
            this.$socket.unRegisterCallBack("StockData")
            setInterval(this.Time)
        },
        methods: {
            initOption() {
                this.initChart = this.$echarts.init(this.$refs.stock_ref, this.theme);
                const initOption = {
                    title: {
                        text: "Ⅰ 库存和销量分析",
                        left: 20,
                        top: 20
                    }
                }
                this.initChart.setOption(initOption)
                this.initChart.on('mouseover',()=>{
                    clearInterval(this.Time)
                });
                this.initChart.on('mouseout',()=>{
                    this.Interval()
                })
            },
            getData(ret) {
                // let { data: ret } = await this.$http.get('stock');
                this.allData = ret;
                console.log(this.allData)
                this.updataOption()
                this.Interval()
            },
            updataOption() {
                const centerArr = [
                    ['18%', '40%'],
                    ['50%', '40%'],
                    ['82%', '40%'],
                    ['34%', '75%'],
                    ['66%', '75%']
                ]
                const colorArr = [
                    ['#4FF778', '#0BA82C'],
                    ['#E5DD45', '#E8B11C'],
                    ['#E8821C', '#E55445'],
                    ['#5052EE', '#AB6EE5'],
                    ['#23E5E5', '#2E72BF']
                ]
                //  五条数据
                let start = this.currtIndex * 5;
                let end = (this.currtIndex + 1) * 5;
                const showData = this.allData.slice(start, end);
                const seriesArr = showData.map((item, index) => {
                    return {
                        type: "pie",
                        center: centerArr[index],
                        hoverAnimation: false,
                        labelLine: { show: false },
                        label: {
                            position: 'center',
                            color: colorArr[index][0]
                        },
                        data: [
                            {
                                name: item.name + '\n' + item.sales,
                                value: item.sales,
                                itemStyle: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        {
                                            offset: 0,
                                            color: colorArr[index][0]
                                        },
                                        {
                                            offset: 0,
                                            color: colorArr[index][1]
                                        }
                                    ])
                                }
                            },
                            {
                                value: item.stock,
                                itemStyle: {
                                    color: '#333843'
                                }
                            }
                        ]
                    }
                })
                let dataOption = {
                    series: seriesArr
                }
                this.initChart.setOption(dataOption)
            },
            screenOption() {
                const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6;
                const innerRadius = titleFontSize * 2.8;
                const outRadius = titleFontSize * 1.125;
                const adaterOption = {
                    title:{
                        textStyle:{
                            fontSize:titleFontSize
                        }
                    },
                    series:[
                        {
                            type:"pie",
                            radius:[outRadius,innerRadius],
                            label:{
                                fontSize:titleFontSize / 3
                            }
                        },
                        {
                            type:"pie",
                            radius:[outRadius,innerRadius],
                            label:{
                                fontSize:titleFontSize / 3
                            }
                        },
                        {
                            type:"pie",
                            radius:[outRadius,innerRadius],
                            label:{
                                fontSize:titleFontSize / 3
                            }
                        },
                        {
                            type:"pie",
                            radius:[outRadius,innerRadius],
                            label:{
                                fontSize:titleFontSize / 3
                            }
                        },
                        {
                            type:"pie",
                            radius:[outRadius,innerRadius],
                            label:{
                                fontSize:titleFontSize / 3
                            }
                        },
                    ]
                }
                this.initChart.setOption(adaterOption)
                this.initChart.resize();
             },
            Interval() {
                if (this.Time) {
                     clearInterval(this.Time)
                }
                this.Time = setInterval(() => {
                        this.currtIndex++;
                        if (this.currtIndex > 1) {
                            this.currtIndex = 0
                        }
                        this.updataOption()
                    }, 5000)
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
