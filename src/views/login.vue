<template>
  <div class="login">
    <div class="earth1" id="earth"></div>
    <div class="logbox">
      <div class="titled">
        智能工厂生产车间大屏
      </div>
      <div class="loginbox">
        <div class="title">
          <p class="p1">登录</p>
          <p class="p2">SIGN IN</p>
        </div>
        <el-form :model="user" ref="user" class="demo-dynamic formstlyle">
          <el-form-item
            prop="name"
            :rules="[
              { required: true, message: '请输入账户名称', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="user.name"
              placeholder="请输入用户名"
              size="small"
              clearable
            >
              <template slot="prepend">用户名</template>
            </el-input>
          </el-form-item>
          <el-form-item
            class="mima"
            prop="pwd"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="user.pwd"
              placeholder="请输入密码"
              size="small"
              type="password"
              clearable
            >
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <div class="btn">
            <div class="btnitem" @click="submitForm('user')">登录</div>
            <div class="btnitem btn2" @click="resetForm('user')">重置</div>
            <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('user')"
              >提交</el-button
            >
            <el-button @click="resetForm('user')">重置</el-button>
          </el-form-item> -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/user";
// import { mapMutations } from "vuex";
// import axios from "axios";
export default {
  data() {
    return {
      user: {
        name: "",
        pwd: ""
      },
      userToken: "",
      mapChart: {},
      img: require("../assets/earth_atmos_4096.jpg"),
      cloud: require("../assets/clouds.png")
    };
  },
  mounted() {
    this.earth();
  },
  methods: {
    earth() {
      //获取容器并对其初始化
      this.myChart = this.$echarts.init(document.getElementById("earth"));

      var option = {
        globe: {
          globeRadius: 83,
          // baseTexture: '',//贴图 球形和平面的吻合
          silent: true,
          baseTexture: this.img, //背景
          // heightTexture: require("../assets/earth_atmos_4096.jpg"), //地球的整个纹路
          // baseTexture: "../assets/earth_atmos_4096.jpg",
          /*baseTexture: 'world.topo.bathy.200401.jpg',*/
          shading: "lambert",
          light: {
            main: {
              color: "#fff",
              intensity: 0,
              shadow: false,
              shadowQuality: "high",
              alpha: 55,
              beta: 10
            },
            ambient: {
              color: "#fff",
              intensity: 1
            }
          },
          layers: [
            {
              type: "overlay",
              blendTo: "lambert",
              texture: this.cloud,
              distance: 5
            }
          ],
          postEffect: {
            enable: false,
            SSAO: {
              enable: true,
              radius: 10
            }
          },

          //地球是否自己转动 autoRotate为true时自己转动
          viewControl: {
            autoRotate: true,
            zoomSensitivity: 0,
            animationDurationUpdate: 2000,
            targetCoord: ""
          }
        },
        series: [
          /* {
               type: 'scatter3D',
               coordinateSystem: 'globe',
               blendMode: 'lighter',
               symbolSize: 20,
               symbol: 'pin',
               silent: false,
               itemStyle: {
                   color: function (params) {
                       var colorList = ['rgb(246, 153, 180)', 'rgb(118,77,209)'];
                       if (params.dataIndex % 2 != 0) {
                           return colorList[0]
                       } else {
                           return colorList[1]
                       }
                   },
                   opacity: 1
               },
               label: {
                   show: true,
                   textStyle: {
                       fontSize: 20
                   },
                   formatter: function (params) {
                       if (params.dataIndex % 2 != 0) {
                           return 'Destination:\n' + params.name
                       } else {
                           return 'Departure:\n' + params.name
                       }
                   },
                   position: 'top'
               }
           }*/
          {
            name: "lines3D",
            type: "lines3D",
            coordinateSystem: "globe",
            effect: {
              show: true,
              period: 6,
              trailWidth: 3,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: "#0087f4"
            },
            blendMode: "lighter",
            lineStyle: {
              width: 1,
              color: "#0087f4",
              opacity: 0
            },
            data: [],
            silent: false
          }
        ]
      };

      //随机划多条线
      for (let i = 0; i < 10; i++) {
        option.series[0].data = option.series[0].data.concat(this.rodamData());
      }

      this.myChart.setOption(option);
    },

    //调用划线方法
    rodamData() {
      //let name = '随机点' + Math.random().toFixed(5) * 100000
      // let longitude = Math.random() * 62 + 73
      let longitude = 105.18;
      let longitude2 = Math.random() * 360 - 180;
      // let latitude = Math.random() * 50 + 3.52
      let latitude = 37.51;
      let latitude2 = Math.random() * 180 - 90;
      return {
        coords: [
          [longitude2, latitude2],
          [longitude, latitude]
        ],
        value: (Math.random() * 3000).toFixed(2)
      };
    },
    // ...mapMutations(['login']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            userName: this.user.name,
            pwd: this.user.pwd
          };
          API.login(params).then(res => {
            if (res.code == 200) {
              const token = res.info;
              localStorage.setItem("token", token);
              API.getUserInfo().then(res => {
                const loginName = res.info.nickName;
                localStorage.setItem("loginName", loginName);
                localStorage.setItem("comName", res.info.comName);
                //用户登录Id
                if (res.info.com_id) {
                  const comId = res.info.com_id;
                  localStorage.setItem("comId", comId);
                } else {
                  // localStorage.setItem("comId", 1);
                }
                if (res.info.type == 1) {
                  this.$router.push("/index");
                } else {
                  this.$router.push("/home");
                }
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.earth1 {
  width: 8.5rem;
  height: 8.5rem;
  //  position: relative;
  //   transform:translate(-50%,-50%) ;
  //  margin-top: 50%;
  // background: pink;
  .earth2 {
    //   position: relative;
    //   width:7.5rem;
    //   height: 7.5rem;
    //   // top: 50%;
    //   // left: 50%;
    // //  transform:translate(-50%,-50%) ;
    //   animation: myfirst 100s infinite linear ;
    //  background: url('../assets/images/earth.png') no-repeat ;
    //  background-size: 100%;
    //  margin: auto;
  }
  .line {
    position: absolute;
    right: 0.125rem;
    top: 0.375rem;
    animation: lined 5s linear infinite;
    -webkit-animation: lined 100s linear infinite;
    animation-play-state: running;
    -webkit-animation-play-state: running;
  }

  // img:hover {animation-play-state:paused; -webkit-animation-play-state:paused;}
}
@keyframes lined {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(190deg);
  }
}
@-webkit-keyframes lined {
  0% {
    transform-origin: center center;
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(190deg);
  }
}

@keyframes myfirst {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
// @-webkit-keyframes myfirst {
//   0% {

//     transform: rotate(0deg);
//   }
//   100% {

//     transform: rotate(360deg);
//   }
// }

.btn {
  margin-top: 0.7125rem;
  display: flex;
  justify-content: space-between;
  .btnitem {
    width: 47%;
    background-color: #2765cc;
    color: #fefefe;
    height: 0.55rem;
    line-height: 0.55rem;
    font-size: 0.225rem;
    border-radius: 5px;
    text-align: center;
  }
  .btn2 {
    background-color: transparent;
    border: solid 1px #7d869b;
    // opacity: 0.47;
  }
}
.formstlyle ::v-deep .el-input-group__prepend {
  background-color: #2765cc;
  border: 1px solid #2765cc;
  color: #fefefe;
}
.mima ::v-deep .el-input-group__prepend {
  letter-spacing: 8px;
}
.logbox {
  margin-left: 12%;
}
.login {
  // background: url("../assets/log_b.png") no-repeat;
  background: url("../assets/beijing.png") no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100%;
  .titled {
    font-family: MicrosoftYaHei-Bold;
    font-size: 0.6rem;
    font-weight: 900;
    font-stretch: normal;
    line-height: 90px;
    letter-spacing: 5px;
    color: #0c2fff;
    text-shadow: 0 0 5px #55ffff, 0 0 10px #55ffff, 0 0 15px #55ffff,
      0 0 20px #0c2fff, 0 0 35px #0c2fff, 0 0 40px #0c2fff, 0 0 50px #0c2fff,
      0 0 75px #0c2fff;
  }
  .loginbox {
    width: 6rem;
    height: 5.8rem;
    background: rgba(13, 66, 127, 0.5);
    border-radius: 8px;
    border: solid 1px #1a8bff;
    margin: auto;
    margin-top: 20px;
    .formstlyle {
      width: 80%;
      margin: auto;
      margin-top: 0.7125rem;
    }

    .title {
      color: #fff;
      width: 80%;
      margin: auto;
      display: flex;
      height: 1.025rem;
      border-bottom: 1px solid #1a8bff;

      .p1 {
        // width: 48px;
        // height: 24px;
        font-family: MicrosoftYaHei-Bold;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.025rem;
        // letter-spacing: 0px;
        color: #fefefe;
      }
      .p2 {
        // width: 67px;
        // height: 15px;
        font-family: MicrosoftYaHei;
        font-size: 0.225rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.025rem;
        letter-spacing: 0px;
        color: #fefefe;
        margin-left: 0.25rem;
      }
    }
  }
}
</style>
