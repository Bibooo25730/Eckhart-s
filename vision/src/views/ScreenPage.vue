<template>
    <div class="Containers" :style="constyle">
        <header>
            <div class="left">
                <img src="../../public/static/img/channels4_profile.jpg" alt="">
                <div class="title">
                    <span :style="constyle">Bibooo </span>
                    <a :style="constyle">www.bibooo.top</a>
                </div>
            </div>
            <span class="text" :style="constyle">电商平台实时监控系统</span>
            <div class="right">
                <img @click="changeTheme" src="../assets/logo.png" alt="">
                <span :style="constyle">2049-01-01 00:00:00</span>
            </div>
        </header>
        <div class="chartBody">
            <section class="chartLeft">
                <div id="left-top" :class="fullScreenStatus.trend ? 'fullscreen' :''">
                    <!-- 销量趋势图表 -->
                    <Trend ref="trend"></Trend>
                    <div class="resize">
                        <span @click="changSize('trend')"
                            :class="['iconfont',fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
                </div>
                <div id="left_bottom" :class="fullScreenStatus.seller ? 'fullscreen' :''">
                    <!-- 商家销售统计 -->
                    <Seller ref="seller"></Seller>
                    <div class="resize">
                        <span @click="changSize('seller')"
                            :class="['iconfont',fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
                </div>
            </section>
            <section class="screen-middle">
                <div id="middle-top" :class="fullScreenStatus.map ? 'fullscreen' :''">
                    <!-- 商家分布 -->
                    <Map ref="map"></Map>
                    <div class="resize">
                        <span @click="changSize('map')"
                            :class="['iconfont',fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
                </div>
                <div id="middle-bottom" :class="fullScreenStatus.rank ? 'fullscreen' :''">
                    <!-- 地区销售排行 -->
                    <Rank ref="rank"></Rank>
                    <div class="resize">
                        <span @click="changSize('rank')"
                            :class="['iconfont',fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
                </div>
            </section>
            <section class="screen-right">
                <div id="right-top" :class="fullScreenStatus.hot ? 'fullscreen' :''">
                    <!-- 热销商品的占比 -->
                    <Hot ref="hot"></Hot>
                    <div class="resize">
                        <span @click="changSize('hot')"
                            :class="['iconfont',fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
                </div>
                <div id="right-bottom" :class="fullScreenStatus.stock ? 'fullscreen' :''">
                    <!-- 库存和销量分析 -->
                    <Stock ref="stock"></Stock>
                    <div class="resize">
                        <span @click="changSize('stock')"
                            :class="['iconfont',fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import { getThemeValue } from "../utils/themutils"
    import Hot from "../components/Hot"
    import Map from "../components/Map"
    import Rank from "../components/Rank"
    import Seller from "../components/Seller"
    import Stock from "../components/Stock"
    import Trend from "../components/Trend"
    export default {
        name: 'EckhartScreenpage',
        components: {
            Hot, Map, Rank, Seller, Stock, Trend
        },
        data() {
            return {
                // 定义每个图表的全屏状态
                fullScreenStatus: {
                    trend: false,
                    seller: false,
                    map: false,
                    rank: false,
                    hot: false,
                    stock: false
                },
                theme: ""
            };
        },

        mounted() {

        },
        watch: {
            themes() {

            }
        },
        computed: {
            constyle() {
                return {
                    backgroundColor: getThemeValue(this.theme).backgroundColor,
                    color: getThemeValue(this.theme).titleColor
                }
            },
            themes() {
                return this.theme = this.$store.state.theme;
            }
        },
        created() {
            this.$socket.registerCallBack('fullScreen', this.devData)
            this.$socket.registerCallBack('themeChange', this.themChan)
        },
        destroyed() {
            this.$socket.unRegisterCallBack('fullScreen')
            this.$socket.unRegisterCallBack('themeChange')
        },
        methods: {
            changSize(chartName) {
                //     this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
                //     this.$nextTick(()=>{
                //         this.$refs[chartName].screenOption()
                //     });
                // 客户端联动
                const targentValue = !this.fullScreenStatus[chartName]
                this.$socket.send({
                    action: 'fullScreen',
                    socketType: 'fullScreen',
                    chartName: chartName,
                    value: targentValue
                })
            },
            devData(ret) {
                console.log(ret)
                const chartName = ret.chartName;
                const value = ret.value;
                this.fullScreenStatus[chartName] = value;
                this.$nextTick(() => {
                    this.$refs[chartName].screenOption()
                });

            },
            changeTheme() {
                this.$socket.send({
                    action: "themeChange",
                    socketType: "themeChange",
                    chartName: "",
                    value: ""
                })
            },
            themChan() {
                this.$store.commit('changeTheme')
            }
        },
    };
</script>

<style lang="scss" scoped>
    .fullscreen {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        z-index: 100;
    }

    .Containers {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        background-color: #161522;
        color: #fff;
        box-sizing: border-box;

        header {
            height: 64px;
            width: 100%;

            border-bottom: 1px solid rebeccapurple;

            .text {
                position: absolute;
                left: 50%;
                top: 3%;
                color: white;
                font-size: 20px;
                transform: translate(-50%, -50%);

            }

            .left {
                float: left;
                display: flex;

                align-items: center;

                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 60px;
                }

                title {
                    display: flex;
                    flex-direction: column;

                }

                span {
                    display: block;
                    color: white;
                    font-size: 20px;
                    margin-left: 5px;
                }

                a {
                    color: white;
                    margin-left: 5px;
                    font-size: 12px;
                }
            }

            .right {
                float: right;
                display: flex;
                align-items: center;

                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50px;
                }

                span {
                    display: block;
                    color: white;
                    font-size: 20px;
                    margin-left: 5px;
                }
            }
        }

        .chartBody {
            width: 100%;
            height: 100%;
            display: flex;
            margin-top: 8px;

            .chartLeft {
                height: 100%;
                width: 27.6%;

                #left-top {
                    height: 53%;
                    position: relative;
                }

                #left_bottom {
                    height: 37%;
                    margin-top: 10px;
                    position: relative;
                }
            }

            .screen-middle {
                height: 100%;
                width: 41.5%;
                margin-left: 1.6%;
                margin-right: 1.6%;

                #middle-top {
                    width: 100%;
                    height: 56%;
                    position: relative;
                }

                #middle-bottom {
                    margin-top: 25px;
                    width: 100%;
                    height: 30%;
                    position: relative;
                }
            }

            .screen-right {
                height: 100%;
                width: 27.6%;

                #right-top {
                    height: 47%;
                    position: relative;
                }

                #right-bottom {
                    height: 40%;
                    margin-top: 45px;
                    position: relative;
                }
            }
        }
    }

    .resize {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }

</style>
