import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || ""
  },
  mutations: {
    login(state, user) {
      state.token = user.token;
      localStorage.setItem("token", user.token);
    }
  },
  actions: {
    LogOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("comId");
    }
  },
  modules: {}
});
