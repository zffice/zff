<template>
  <div class="login">

    <div class="earth1" id="earth">
    </div>
    <div class="logbox">
      <div class="titled">智能工厂生产车间大屏</div>
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
            <el-input v-model="user.pwd" placeholder="请输入密码" size="small">
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <div class="btn">
            <div class="btnitem"  @click="submitForm('user')">登录</div>
            <div class="btnitem btn2"  @click="resetForm('user')">重置</div>
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
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        name: "",
        pwd: ""
      },
      userToken: ""
    };
  },
  mounted(){
this.earth()
  },
  methods: {
    earth(){
      // const myChart = this.$echarts.init(document.getElementById('earth'))
      var geoCoordMap = {
        '南宁': [108.479, 23.1152],
        '广州': [113.5107, 23.2196],
        '重庆': [107.7539, 30.1904],
        '芬兰': [24.909912, 60.169095], 
        '美国': [-100.696295, 33.679979], 
        '日本': [139.710164, 35.706962], 
        '韩国': [126.979208, 37.53875], 
        '瑞士': [7.445147, 46.956241],
        '东南亚': [117.53244, 5.300343], 
        '澳大利亚': [135.193845, -25.304039], 
        '德国': [13.402393, 52.518569], 
        '英国': [-0.126608, 51.208425], 
        '加拿大': [-102.646409, 59.994255]
    };

    /* 
        记录下起点城市和终点城市的名称，以及权重
        数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
     */

    var CQData = [
        [{name: '重庆'}, {name: "英国",value: 70}]
    ];

    var GZData = [
        [{name: '广州'}, {name: "日本",value: 30}],
    ];

    var NNData = [
        [{name: '南宁'}, {name: "加拿大",value: 80}],
        [{name: '南宁'}, {name: "美国",value: 100}],
        [{name: '南宁'}, {name: "澳大利亚",value: 95}],
        [{name: '南宁'}, {name: "瑞士",value: 50}]
    ];

    var convertData = function(data) {
        var res = []; 
        for(var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[1].name];
            var toCoord = geoCoordMap[dataItem[0].name];
            if(fromCoord && toCoord) {
                res.push([fromCoord, toCoord])
            }
        }
        console.log(res)
        return res;
    }

    var series = [];// 3D飞线
    var dser = [];  // 2D散点坐标
    [['重庆', CQData],['广州', GZData],['南宁', NNData]].forEach(function(item, i) {
        dser.push({ 
        type: 'effectScatter',         
        coordinateSystem: 'geo', 
        zlevel: 3,
        rippleEffect: {
            brushType: 'stroke' 
        },
        label: {
            fontSize:24,  
            show: true,
            position: 'right', 
            formatter: '{b}'  
        },
        itemStyle: {
            normal: {
                color: '#f5f802'
            }
        },
        data: item[1].map(function(dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name],
                symbolSize: dataItem[1].value / 4
            };
        })
    },{
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'left',
                fontSize:18,
                formatter: '{b}'
            }
        },
        itemStyle: {
            normal: {
                color: '#ff0000'
            }
        },
        data: [{
            name: item[0],
            value: geoCoordMap[item[0]],
            symbolSize:parseInt(Math.random()*20+10),
            label: {
                normal: {
                    position: 'right'
                }
            }
        }]
    })
    series.push({
            type: 'lines3D',
            effect: {
                show: true,
                period: 3,//速度
                trailLength: 0.1//尾部阴影          
            },
            lineStyle: {//航线的视图效果
                color: '#9ae5fc',
                width: 1,
                opacity: 0.6
            },
            data: convertData(item[1])// 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
        })
    });


    var canvas = document.createElement('canvas');
   
    var myChart = this.$echarts.init(canvas, null, {
        width: 4096,
        height: 2048
    });
    myChart.setOption({
	    backgroundColor: 'rgba(3,28,72,0.3)',
	    title: {
	        show:true
	    },
	    geo: {
	        type: 'map',
	        map: 'world',
	        left:0,
	        top:0,
	        right: 0,
	        bottom: 0,
	        boundingCoords: [[-180, 90], [180, -90]],
	        zoom:0,
	        roam: false,
	        itemStyle: {
	            borderColor:'#000d2d',
	            normal: {
	                areaColor: '#2455ad',
	                borderColor:'#000c2d'
	            },
	            emphasis: {
	                areaColor: '#357cf8' 
	            }
	        },
	        label:{
	            fontSize:24
	        }
	    },
	    series:dser
  });
  

  var option = {
        backgroundColor: 'rgba(0,0,0,0)',//canvas的背景颜色
        globe: {
            baseTexture:myChart,
            top: 'middle',
            left: 'center',
            displacementScale: 0,
            environment:'none',
            shading: 'color',
            viewControl: {
                distance:240,
                autoRotate: true
            }
        },
        series:series
    };

    this.$echarts.init(document.getElementById("earth")).setOption(option, true);

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
            console.log(res);
            if (res.code == 200) {
              const token = res.info;
              localStorage.setItem("token", token);
              API.getUserInfo().then(res => {
                console.log("用户信息", res);
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
    .earth2{
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
   transform: rotate(0deg) ;
   
  }
  100% {
   transform: rotate(360deg) ;
   
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
  // margin-left:35%;
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
    font-weight: normal;
    font-stretch: normal;
    line-height: 90px;
    letter-spacing: 5px;
    color: #0c2fff;
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