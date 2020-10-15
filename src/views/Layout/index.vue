<template>
  <div id="app">
    <header class="header">
      <div class="title">智能工厂生产车间大屏</div>
      <div id="date"></div>
      <div id="date1">
        {{ comName }}
      </div>
      <div id="company">
        <div class="back" v-if="routeName === 'detail'">
          <img
            src="../../assets/images/back.png"
            alt="返回上一屏"
            @click="backCompany"
          />
        </div>
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
        <!-- <div class="back" v-if="routeName === 'detail'">
          <img
            src="../../assets/images/back.png"
            alt="返回上一屏"
            @click="backCompany"
          />
        </div> -->
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
      userName: "",
      comName: "",
      wsName: ""
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
      this.comName = localStorage.getItem("comName");
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
      width: 16%;
      height: 5%;
      position: absolute;
      top: 0.38rem;
      right: 0.375rem;
      font-size: 0.45rem;
      font-family: "electronicFont" !important;
      text-align: center;
      color: #15a0db;

      .warm {
        position: absolute;
        top: 0.05rem;
        right: 3.2rem;
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
      .back {
        position: absolute;
        top: 0.04rem;
        right: 4.2rem;
        img {
          margin-top: 0.1rem;
        }
        cursor: pointer;
      }
      .loginUser {
        position: absolute;
        top: 0.14rem;
        right: 0.8rem;
        cursor: pointer;
        width: 38%;
        height: 90%;
        img {
          width: 25%;
          float: left;
        }
        .text {
          font-size: 0.23rem;
          color: gainsboro;
          font-family: "幼圆";
        }
      }
      .logoutUser {
        position: absolute;
        top: 0.14rem;
        right: 0rem;
        cursor: pointer;
        width: 20%;
        height: 90%;
        img {
          width: 50%;
        }
      }
      // .back {
      //   img {
      //     margin-top: 0.1rem;
      //     width: 10%;
      //   }
      //   cursor: pointer;
      // }
    }
    #date1 {
      color: #15a0db;
      position: absolute;
      top: 0.4rem;
      left: 0.5rem;
      font-size: 0.4rem;
      // font-family: "electronicFont" !important;
      text-align: center;
      float: left;
      font-weight: 900;
      -webkit-box-reflect: below 2px -webkit-linear-gradient(transparent, transparent
            50%, rgba(255, 255, 255, 0.5));
    }
    #date {
      position: absolute;
      top: 0.6rem;
      right: 5.5rem;
      font-size: 0.3rem;
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
