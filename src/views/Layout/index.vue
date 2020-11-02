<template>
  <div id="app">
    <!-- header -->
    <header class="header">
      <!-- 标题 -->
      <div class="title">智能工厂生产车间大屏</div>
      <!-- 左上角 - 公司名 -->
      <div class="comName">
        {{ comName }}
      </div>
      <!-- 右上角 - 按钮组 -->
      <div class="btnList">
        <div id="date"></div>
        <i class="iconfont icon-quanping1" @click="toggleFullscreen"></i>
        <i
          class="iconfont icon-daping"
          @click="backindex"
          v-if="userName === 'admin'"
        ></i>

        <i
          class="iconfont icon-fanhui "
          @click="backCompany"
          v-if="routeName === 'detail'"
        ></i>
        <el-badge :value="alarmCount" :max="99" v-if="routeName === 'detail'">
          <i class="iconfont icon-icon-life-alarm " @click="handleClick"></i>
        </el-badge>
        <i
          class="iconfont icon-guanji-"
          @click="loginout"
          style="float:right;margin-left:4%;"
        ></i>
        <div class="loginUser">
          <i class="iconfont icon-denglu"></i>
          <span class="text">{{ userName }}</span>
        </div>
      </div>
    </header>

    <!-- content -->
    <router-view @getShopCode="getShopCode" ref="child" />
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
    backindex() {
      this.$router.push("/index");
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
    },
    toggleFullscreen() {
      let _this = this;
      let el = document.documentElement;
      if (document.fullscreenElement === null) {
        _this.openFullscreen(el);
      } else {
        _this.quitFullscreen();
      }
    },
    openFullscreen(element) {
      console.log(element);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
      }
    },
    quitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    getKeyDown(e) {
      let _this = this;
      if (event.keyCode === 122) {
        event.preventDefault() || (event.returnValue = false);
        _this.toggleFullscreen(); // 触发全屏的按钮
      } else if (event.keyCode === 27) {
        if (document.fullscreenElement !== null) {
          _this.quitFullScreen();
        }
      }
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
    .comName {
      color: #15a0db;
      position: absolute;
      top: 0.4rem;
      left: 0.5rem;
      font-size: 0.4rem;
      font-family: "electronicFont" !important;
      text-align: center;
      float: left;
      font-weight: 900;
      -webkit-box-reflect: below 2px -webkit-linear-gradient(transparent, transparent
            50%, rgba(255, 255, 255, 0.5));
    }
    .btnList {
      width: 25%;
      position: absolute;
      top: 0;
      right: 0.1rem;
      font-weight: 800;
      color: #15a0db;
      margin-top: 0.5rem;
      #date {
        width: 30%;
        padding: 0 2% 0 0%;
        float: left;
        font-size: 0.3rem;
        font-family: "electronicFont" !important;
        text-align: center;
      }
      i {
        cursor: pointer;
        width: 9%;
        float: left;
        font-size: 0.4rem;
      }
      .loginUser {
        width: 17%;
        float: right;
        .text {
          float: right;
          margin: 0.05rem 0 0 0;
          font-size: 0.3rem;
          color: gainsboro;
          font-family: "幼圆";
        }
      }
    }
  }
}
</style>
