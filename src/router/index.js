import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index.vue")
  },
  {
    path: "/",
    // 你可以选择不同的layout组件
    component: Layout,
    // 这里开始对应的路由都会显示在app-main中 如上图所示
    children: [
      {
        path: "home",
        component: () => import("../views/Home.vue"),
        name: "Home"
      },
      {
        path: "detail",
        name: "detail",
        component: () => import("../views/detail/detail.vue")
      },
      {
        path: "workshop",
        name: "workshop",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../components/workshop/index2.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login") return next();
  // this.$nextTick(()=>{})
  const tokenStr = localStorage.getItem("token");
  // console.log(tokenStr);
  // console.log(this);
  if (!tokenStr) return next("/login");
  next();
});

export default router;
