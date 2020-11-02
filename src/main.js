import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./style/reset.css";
// import './style/commen.css'
import "lib-flexible";
import axios from "axios";

import echarts from "echarts";

// import echartsGL from "./assets/js/echarts-gl";

import $ from "jquery";

import echartsGL from "echarts-gl"; // 引入echarts
Vue.prototype.$echartsGL = echartsGL; // 引入组件（将echarts注册为全局）

import world from "world";
Vue.prototype.$world = world;

Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

import dataV from "@jiaminghi/data-view";
import "./assets/iconfont/iconfont.css";
Vue.use(dataV);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
