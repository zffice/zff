<template>
  <div id="bottom">
    <section class="boxwrap">
      <el-main>
        <el-row>
          <el-col :span="24">
            <!--占整行-->
            <el-row>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/workshop.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">车间名</span>

                  <br />
                  <h2 class="content">三车间</h2>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/machine.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">设备数量</span>
                  <br />
                  <span class="content">5</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/run.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">作业数量</span>
                  <br />
                  <span class="content">5</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/standby.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">待机数量</span>
                  <br />
                  <span class="content">5</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/alarm.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">报警数量</span>
                  <br />
                  <span class="content">5</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </section>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'bottom',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
#bottom {
  width: 100%;
  height: 100%;
}
.boxwrap {
  display: flex;
}
.el-main {
  .item_3 {
    height: 94%;
    float: left;
  }
  .item_4 {
    margin-left: 7%;
    height: 94%;
    float: left;
  }
  .title {
    font-size: 0.3rem;
    color: #fff;
    line-height: 0.5rem;
  }
  .content {
    font-weight: 700;
    font-size: 0.3rem;
    background-image: -webkit-linear-gradient(bottom, #3962d4, #9db5eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
<style>
.el-col-5 {
  width: 20%;
}
</style>
