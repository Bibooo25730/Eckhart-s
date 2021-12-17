import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import './assets/css/global.scss'
import axios from 'axios'
import SocketServer from './utils/socket_server'
// 对服务端进行连接
SocketServer.Instance.connect()
Vue.prototype.$socket = SocketServer.Instance
axios.defaults.baseURL = 'http://localhost:3000/api/'
Vue.prototype.$http = axios
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
