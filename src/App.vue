<template>
  <div id="app" @click="toggleFullscreen">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
    <!-- <transition>
      <router-view></router-view>
    </transition> -->
  </div>
</template>
<script>
export default {
  mounted() {
    setTimeout(() => {
      this.toggleFullscreen();
    }, 500);
  },
  methods: {
    toggleFullscreen() {
      let _this = this;
      let el = document.documentElement;
      if (document.fullscreenElement === null) {
        _this.openFullscreen(el);
      } else {
        // _this.quitFullscreen();
      }
    },
    openFullscreen(element) {
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
  height: 100vh;
}
</style>
