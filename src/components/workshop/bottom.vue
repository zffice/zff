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
                  <h2 class="content">{{ workshopInfo.workshop_name }}</h2>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/machine.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">设备数量</span>
                  <br />
                  <span class="content">{{ workshopInfo.mCount }}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/run.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">作业数量</span>
                  <br />
                  <span class="content">{{ workshopInfo.runCount }}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/standby.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">待机数量</span>
                  <br />
                  <span class="content">{{ workshopInfo.standbyCount }}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="item_3">
                  <img src="../../assets/images/alarm.png" alt="" />
                </div>
                <div class="item_4">
                  <span class="title">报警数量</span>
                  <br />
                  <span class="content">{{ workshopInfo.alarmCount }}</span>
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
import API from "@/api/busin";
// import echarts from "echarts";
export default {
  name: "bottom",
  props: {
    workshop: {
      type: Object
    }
  },
  data() {
    return {
      workshopInfo: {
        workshop_name: "",
        alarmCount: 0,
        mCount: 0,
        runCount: 0,
        stopCount: 0,
        standbyCount: 0
      }
    };
  },
  watch: {
    workshop: {
      handler: function(newvalue) {
        // console.log(newvalue);
        this.workshopInfo.alarmCount = newvalue.acount;
        this.workshopInfo.runCount = newvalue.rcount;
        this.workshopInfo.standbyCount = newvalue.standbycount;
      },
      deep: true
    }
  },
  mounted() {
    this.findMachineListByWsId();
  },
  methods: {
    findMachineListByWsId() {
      const params = {
        wsId: this.$route.query.id
      };
      API.findMachineListByWsId(params).then(res => {
        if (res.code == "200") {
          this.workshopInfo = res.info;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-col-5 {
  width: 20%;
}
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
