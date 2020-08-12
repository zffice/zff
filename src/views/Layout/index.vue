<template>
  <div id="app">
    <header class="header">
      <div class="title">智能工厂生产车间大屏</div>
      <div id="date"></div>
      <div id="company">
        <div class="warm" v-if="routeName === 'detail'" @click="handleClick">
          <el-badge :value="alarmCount" :max="99" class="item">
            <img src="../../assets/images/warm.png" alt="预警数" />
          </el-badge>
        </div>
        <div class="loginUser">
          <img src="../../assets/images/loginUser.png" alt="用户信息" />
          <span class="text">{{ userName }}</span>
        </div>
        <div class="logoutUser">
          <img
            src="../../assets/images/logoutUser.png"
            alt="登出"
            @click="loginout"
          />
        </div>
        <div class="back" v-if="routeName === 'detail'">
          <img
            src="../../assets/images/back.png"
            alt="返回上一屏"
            @click="backCompany"
          />
        </div>
      </div>
    </header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view @getShopCode="getShopCode" ref="child" />
    <!-- <transition>
      <router-view></router-view>
    </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeName: "",
      alarmCount: 0,
      userName: ""
    };
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to) {
      this.routeName = to.name;
    }
  },
  created() {
    // 获取当前路由的信息
    this.getRouteInfo();
    this.getComId();
  },
  methods: {
    handleClick() {
      this.$refs.child.showAlarm();
    },
    getShopCode(value) {
      this.alarmCount = value.count;
    },
    //获取用户登录cId
    getComId() {
      this.userName = localStorage.getItem("loginName");
      console.log(this.userName);
    },
    getRouteInfo() {
      this.routeName = this.$route.name;
    },
    backCompany() {
      this.$router.push("/home");
    },
    loginout() {
      var self = this;
      this.$confirm("您确定要退出吗？", "退出管理平台", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const info = {
            userkey: localStorage.getItem("token")
          };
          self.$store
            .dispatch("LogOut", info)
            .then(() => {
              self.$router.push({ path: "/login" });
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  background: url("../../assets/beijing.png") rgba(42, 49, 127, 0.1) no-repeat;
  height: 100vh;
  background-size: 100% 100%;
  background-blend-mode: multiply;
  .header {
    background: url("~@/assets/title.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 0.45rem;
    .title {
      text-align: center;
      line-height: 1.1rem;
      font-weight: 800;
      // text-shadow: 2px 2px 2px #275bdb;
      text-shadow: -1px -1px 1px #fff, 1px 2px 2px #55ffff;
    }
    #company {
      width: 15%;
      height: 5%;
      position: absolute;
      top: 0.38rem;
      right: 0.375rem;
      font-size: 0.45rem;
      font-family: "electronicFont" !important;
      text-align: center;
      color: #15a0db;
      .warm {
        cursor: pointer;
        width: 20%;
        height: 90%;
        float: left;
        .item {
          margin-top: 5px;
        }
        img {
          margin-top: 5px;
          width: 60%;
        }
      }
      .loginUser {
        cursor: pointer;
        width: 38%;
        height: 90%;
        margin-left: 10%;
        margin-top: 3px;
        float: left;
        img {
          margin-top: 3px;
          width: 25%;
          float: left;
        }
        .text {
          font-size: 0.3rem;
          color: gainsboro;
          font-family: "幼圆";
        }
      }
      .logoutUser {
        cursor: pointer;
        width: 20%;
        height: 90%;
        margin-top: 3px;
        float: left;
        img {
          margin-top: 3px;
          width: 50%;
        }
      }
      .back {
        img {
          margin-top: 0.1rem;
          width: 10%;
        }
        cursor: pointer;
      }
    }
    #date {
      position: absolute;
      top: 0.38rem;
      left: 0.375rem;
      font-size: 0.45rem;
      font-family: "electronicFont" !important;
      text-align: center;
      color: #15a0db;
    }
    .dropdown {
      position: absolute;
      top: 0.625rem;
      right: 0.375rem;
      font-size: 0.275rem;
    }
  }
}
</style>
