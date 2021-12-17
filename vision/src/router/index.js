import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect:"/screen"
  },
  {
    path: "/screen",
    component: () => import('../views/ScreenPage')
  },
  {
    path: '/SellerPage',
    component: () => import('../views/SellerPage')
  },
  {
    path: '/TrendPage',
    component: () => import('../views/TrendPage')
  },
  {
    path: '/MapPage',
    component: () => import('../views/MapPage')
  },
  {
    path: '/RankPage',
    component: () => import('../views/RankPage')
  },
  {
    path: '/HotPage',
    component: () => import('../views/HotPage')
  },
  {
    path: '/StockPage',
    component: () => import('../views/StockPage')
  },
]

const router = new VueRouter({
  routes
})

export default router
