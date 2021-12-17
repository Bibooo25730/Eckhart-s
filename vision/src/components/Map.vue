<!-- 地图分布图表 -->
<template>
    <div class="Container" @dblclick="backMap">
        <div ref="chart_map" class="chart"></div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { getProvinceMapInfo } from "../utils/map_utils";
    export default {
        name: 'EckhartMap',

        data() {
            return {
                chartInstance: null,
                allData: null,
                mapData: {},
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
                console.log('1')
                this.chartInstance.dispose();
                this.initchart();
                this.screenOption();
                this.updataOption();
            }
        },
        created() {
            this.$socket.registerCallBack("mapData",this.getData)
        },
        mounted() {
            this.initchart();
            // this.getData();
            this.$socket.send({
                action:"getData",
                socketType:"mapData",
                chartName:"map",
                value:""
            })
            window.addEventListener('resize', this.screenOption);
            this.screenOption()
        },
        destroyed() {
            window.removeEventListener('resize', this.screenOption)
            this.$socket.unRegisterCallBack("mapData")
        },
        methods: {
            async initchart() {
                this.chartInstance = this.$echarts.init(this.$refs.chart_map, this.theme);
                let result = await axios.get('http://localhost:8999/static/map/china.json');
                this.$echarts.registerMap('china', result.data);
                let initOption = {
                    title: {
                        text: "Ⅰ商家分别",
                        left: 20,
                        top: 20
                    },
                    geo: {
                        type: "map",
                        map: 'china',
                        top: '5%',
                        bottom: "5%",
                        itemStyle: {
                            areaColor: '#2E72BF',
                            borderColor: '#233'
                        },
                    },
                    legend: {
                        left: "5%",
                        bottom: "5%",
                        orient: "vertical"
                    }
                };
                this.chartInstance.setOption(initOption)
                this.chartInstance.on('click', async arg => {
                    // 点击之后 调用工具方法 获取矢量数据 axios请求数据 
                    // 这里避免重复请求 使用 mapdata当缓存处理 
                    // path.key 作为地图拼音 如果点一样的则 if (!this.mapData[path.key])  geo直接处理
                    // 不一样的话 请求数据
                    let path = getProvinceMapInfo(arg.name)
                    if (!this.mapData[path.key]) {
                        const ret = await axios.get('http://localhost:8999' + path.path)
                        this.mapData[path.key] = ret.data;
                        this.$echarts.registerMap(path.key, ret.data);
                    }
                    const changeOptin = {
                        geo: {
                            map: path.key
                        }
                    };
                    this.chartInstance.setOption(changeOptin)
                })

            },
           getData(ret) {
                // let { data: ret } = await this.$http.get('map');
                this.allData = ret;
                this.updataOption()
            },
            updataOption() {
                const legendArr = this.allData.map(item => {
                    return item.name
                })
                const serierArr = this.allData.map(item => {
                    return {
                        type: "effectScatter",
                        rippleEffect: {
                            scale: 5,
                            brushType: "stroke"
                        },
                        name: item.name,
                        data: item.children,
                        // 要呈现散点图就必须增加一个配置
                        coordinateSystem: "geo"
                    }
                })
                let aupdataOptin = {
                    legend: {
                        data: legendArr
                    },
                    series: serierArr
                };
                this.chartInstance.setOption(aupdataOptin);
            },
            screenOption() {
                const titleFontSize = this.$refs.chart_map.offsetWidth / 100 * 3.6;

                let setScreen = {
                    title: {
                        textStyle: {
                            fontSize: titleFontSize
                        }
                    },
                    legend: {
                        itemWidth: titleFontSize / 2,
                        itemHeight: titleFontSize / 2,
                        itemGap: titleFontSize / 2,
                        textStyle: {
                            fontSize: titleFontSize / 2
                        }
                    }
                };
                this.chartInstance.setOption(setScreen)
                this.chartInstance.resize()
            },
            //  回到中国地图
            backMap() {
                let backOption = {
                    geo: {
                        map: "china"
                    }
                }
                this.chartInstance.setOption(backOption)
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
