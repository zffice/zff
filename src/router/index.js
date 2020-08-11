import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import Detail from '../views/detail/detail.vue'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },

  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/workshop',
    name: 'workshop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/workshop/index2.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  // this.$nextTick(()=>{})
  const tokenStr = localStorage.getItem('token')
  console.log(tokenStr)
  console.log(this)
  if (!tokenStr) return next('/login')
  next()
})

export default router
