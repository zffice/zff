<template>
  <div class="hello">
    <div id="wrapper">
      <h1>智能工厂生产车间大屏</h1>
      <h2>
        <strong>重点关注</strong>
        <sub>Focus on the indicators</sub>
        <b class="logoline"></b>
        <b class="logoline1"></b>
        <b class="logoline2"></b>
        <b class="logoline3"></b>
        <b class="logoline4"></b>
      </h2>
      <!--时间区-->
      <div class="date-timer">
        <p>
          <strong id="H"></strong>
          <strong>:</strong>
          <strong id="M"></strong>
          <strong id="S" class="hide"></strong>
        </p>
        <em id="D"></em>
        <ul>
          <li id="Y"></li>
          <li id="MH"></li>
          <li id="TD"></li>
        </ul>
      </div>
      <div class="big-index-1">
        <ul>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>总车间数</p>
            <strong>{{ wscount }}</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>设备数</p>
            <strong>{{ mcount }}</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>停机数</p>
            <strong>{{ down }}</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>作业数</p>
            <strong>{{ run }}</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>待机数</p>
            <strong>{{ standby }}</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>报警数</p>
            <strong>{{ alarm }}</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>总产量</p>
            <strong>{{ sp }}</strong>
          </li>
        </ul>
      </div>
      <div class="area-inbox-3">
        <!-- <ul>
          <li>
            <strong>12</strong>74.23%
            <b></b>
            <em></em>
          </li>
          <li>
            <strong>16</strong>71.19%
            <b></b>
            <em></em>
          </li>
          <li>
            <strong>18</strong>68.02%
            <b></b>
            <em></em>
          </li>
        </ul> -->
      </div>
      <div class="center-area">
        <div class="pandect-area">
          <h3>
            <p>
              当前08时
              <sub>8 points</sub>
            </p>
            <strong>总览</strong>
            <em>11时：29.742 Erl</em>
          </h3>
          <span class="pandect-area-left">
            <b></b>
          </span>
          <div class="pandect-area-center">
            <div id="map"></div>
            <div id="rank"></div>
          </div>
          <span class="pandect-area-right">
            <b></b>
          </span>
        </div>
        <div class="details1-area">
          <span class="detailsl-area-left"></span>
          <div class="details1-area-center">
            <h3>总体电耗情况</h3>
            <div id="eleInfo">
              <dl>
                <dt>上月平均值</dt>
                <dd>
                  <div class="mavg">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="50"
                    ></el-progress>
                  </div>
                  <div class="minfo">182305A</div>
                </dd>
                <dt>昨日耗电率</dt>
                <dd>
                  <div class="mavg">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="20"
                      status="warning"
                    ></el-progress>
                  </div>
                  <div class="minfo">1580A</div>
                </dd>
                <dt>今日耗电率</dt>
                <dd>
                  <div class="mavg">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="10"
                      status="success"
                    ></el-progress>
                  </div>
                  <div class="minfo">1056A</div>
                </dd>
              </dl>
            </div>
            <b></b>
          </div>
          <span class="detailsl-area-right"></span>
        </div>
        <div class="details2-area">
          <span class="details2-area-left"></span>
          <div class="details2-area-center">
            <h3>总体水耗情况</h3>
            <div id="eleInfo">
              <dl>
                <dt>上月平均值</dt>
                <dd>
                  <div class="mavg">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="70"
                    ></el-progress>
                  </div>
                  <div class="minfo">1178t</div>
                </dd>
                <dt>昨日耗水量</dt>
                <dd>
                  <div class="mavg">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="50"
                      status="exception"
                    ></el-progress>
                  </div>
                  <div class="minfo">10t</div>
                </dd>
                <dt>今日耗电率</dt>
                <dd>
                  <div class="mavg">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="30"
                      status="success"
                    ></el-progress>
                  </div>
                  <div class="minfo">5.6t</div>
                </dd>
              </dl>
            </div>
            <b></b>
          </div>
          <span class="details2-area-right"></span>
        </div>
      </div>
      <div class="right-area">
        <h3>
          总体设备利用情况
          <b></b>
        </h3>
        <div class="area-inbox-1">
          <dl>
            <dt>本次开机报警率</dt>
            <dd class="font12">
              <span>{{ talarmrate }}%</span>
              <b></b>
            </dd>
            <dt class="ml-20">总报警率</dt>
            <dd class="font-red ml-20">
              <span>{{ salarmrate }}%</span>
              <b></b>
            </dd>
            <dt>使用率/利用率</dt>
            <dd>
              <span>{{ userate }}%</span>
              <b></b>
            </dd>
          </dl>
          <div class="round-1"></div>
          <div class="round-2"></div>
          <div class="round-3">50%</div>
          <div class="round-4"></div>
        </div>
        <div class="area-inbox-2">
          <div class="area-text">
            <b class="animation-line1"></b>
            <h4>系统说明：</h4>
            <p class="text_container"></p>
            <b class="animation-line2"></b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/busin";
import echarts from "echarts";
export default {
  name: "index",
  data() {
    return {
      //本次开机报警率
      talarmrate: "",
      //待机数
      standby: "",
      //设备数
      mcount: "",
      //车间数
      wscount: "",
      //报警数
      alarm: "",
      //总报警率
      salarmrate: "",
      //本次开机产量
      tp: "",
      //停机数
      down: "",
      //总产量
      sp: "",
      //使用率/利用率
      userate: "",
      //作业数
      run: "",
      //公司经纬度
      comlocation: [],
      //车间机床数
      shopmnumber: [],
      //公司名称
      companyname: [],
      //地图散点
      mapDataList: [],
      // 公司名
      com_name: [],
      // 产量
      sum_pro: []
    };
  },
  mounted() {
    require("../assets/css/mobile.css");
    require("../assets/js/common.js");
    // require("../assets/js/index");
    require("../assets/js/jquery_and_jqueryui.js");
    // require('../assets/css/default.css')
    require("../assets/css/jquery-ui.css");
    //字体间隔逐字显示
    this.fontstyle();
    //苏州地图
    // this.mapinit()
    //车间柱状图
    this.comshop();
    this.statistics();
    this.outputOfCompanyTop();
  },
  methods: {
    fontstyle() {
      var s =
        "（该系统模拟智能车间，通过各种传感器数据对相应环境信息或设备信息进行可视化分析处理，便于用户直观了解）";
      var con = $(".text_container");
      var index = 0;
      var length = s.length;
      var tId = null;
      function start() {
        con.text("");
        tId = setInterval(function() {
          con.append(s.charAt(index));
          if (index++ === length) {
            clearInterval(tId);
            index = 0;
            start();
          }
        }, 100);
      }
      start();
    },
    mapinit() {
      var self = this;
      //网页中获取苏州市的geojson制作苏州市地图
      //   var dataurl = '../public/china.json'
      var geoCoordMap = {};
      var myChart = echarts.init(document.getElementById("map"));
      //   myChart.showLoading()
      let index = -1;
      var timer = setInterval(function() {
        //隐藏提示框
        myChart.dispatchAction({
          type: "hideTip",
          seriesIndex: 0,
          dataIndex: index
        });
        // 显示提示框
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index + 1
        });
        // 取消高亮指定的数据图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index
        });
        // 高亮指定的数据图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: index + 1
        });
        index++;
        if (index > 13) {
          index = -1;
        }
      }, 2000);
      // console.log(this.comlocation)
      myChart.on("mousemove", function(e) {
        clearInterval(timer);
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0
        });
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex
        });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: e.dataIndex
        });
      }); //---------------------------------------------鼠标移入静止播放
      myChart.on("mouseout", function(e) {
        clearInterval(timer);
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: e.dataIndex
        }); //鼠标移出后先把上次的高亮取消
        timer = setInterval(function() {
          // 隐藏提示框
          myChart.dispatchAction({
            type: "hideTip",
            seriesIndex: 0,
            dataIndex: index
          });
          // 显示提示框
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index + 1
          });
          // 取消高亮指定的数据图形
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index
          });
          // 高亮指定的数据图形
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: index + 1
          });
          index++;
          if (index > 13) {
            index = -1;
          }
        }, 2000);
      });
      var self = this;
      $.getJSON("json/china.json", function(geoJson) {
        echarts.registerMap("china", geoJson);
        var mapDate = self.mapDataList;
        var option = {
          title: {
            top: 5,
            text: "公司分布",
            subtext: "",
            x: "center",
            textStyle: {
              color: "#ccc"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: function(params) {
              if (params.seriesType != "map") {
                if (typeof params.value[2] == "undefined") {
                  return "";
                } else {
                  return params.name + " : " + params.value[3];
                }
              } else {
                return null;
              }
            }
          },
          geo: {
            map: "china",
            aspectScale: 0.75, //长宽比
            zoom: 1.1,
            roam: false,
            itemStyle: {
              normal: {
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#09132c" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#274d68" // 100% 处的颜色
                    }
                  ],
                  globalCoord: true // 缺省为 false
                },
                shadowColor: "rgb(58,115,192)",
                shadowOffsetX: 10,
                shadowOffsetY: 11
              },
              emphasis: {
                areaColor: "#2AB8FF",
                borderWidth: 0,
                color: "green",
                label: {
                  show: false
                }
              }
            },
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  areaColor: "rgba(0, 10, 52, 1)",

                  borderColor: "rgba(0, 10, 52, 1)",
                  normal: {
                    opacity: 0,
                    label: {
                      show: false,
                      color: "#009cc9"
                    }
                  }
                }
              }
            ]
          },
          series: [
            {
              type: "map",
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: "#fff"
                  }
                },
                emphasis: {
                  textStyle: {
                    color: "#fff"
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: "#2ab8ff",
                  borderWidth: 1.5,
                  areaColor: "#12235c"
                },
                emphasis: {
                  areaColor: "#2AB8FF",
                  borderWidth: 0,
                  color: "green"
                }
              },
              zoom: 1.1,
              roam: false,
              map: "china" //使用
              // data: this.difficultData //热力图数据   不同区域 不同的底色
            },
            {
              name: "Top 5",
              type: "effectScatter",
              coordinateSystem: "geo",
              data: mapDate,
              symbolSize: 20,
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke"
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "left",
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: "yellow",
                  shadowBlur: 10,
                  shadowColor: "yellow"
                }
              },
              zlevel: 1
            }
          ]
        };
        myChart.on("click", params => {
          // window.location.href = '@/views/Home'
          if (params.value[2] == 1) {
            self.home(params.value[2]);
          } else {
            self.$message({
              message: "暂未接入该公司数据",
              type: "warning"
            });
          }
        });
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      });
    },
    comshop() {
      var self = this;
      var myChart = echarts.init(document.getElementById("rank"));
      var option = {
        title: {
          top: 5,
          text: "公司产量排名",
          subtext: "",
          x: "center",
          textStyle: {
            color: "#ccc"
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].seriesName +
              " : " +
              Number((params[0].value / 10000).toFixed(2)).toLocaleString() +
              " 万<br/>"
            );
          }
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: self.com_name
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              },
              formatter: function(value) {
                if (value >= 10000) {
                  return (value / 10000).toFixed(2) + "万";
                } else {
                  return value.toLocaleString();
                }
              }
            },
            data: self.sum_pro
          }
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)"
                  }
                ])
              }
            },
            barWidth: 10,
            data: self.sum_pro
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 10,
            barGap: "-100%",
            data: [5000000, 5000000, 5000000, 5000000, 5000000],
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,1)",
                barBorderRadius: 30
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    home(cid) {
      localStorage.setItem("comId", cid);
      this.$router.push("/home");
    },
    statistics() {
      API.statistics().then(res => {
        this.mcount = res.info.mcount;
        this.wscount = res.info.wscount;
        this.alarm = res.info.alarm;
        this.run = res.info.run;
        this.standby = res.info.standby;
        this.talarmrate = res.info.talarmrate;
        this.salarmrate = res.info.salarmrate;
        this.tp = res.info.tp;
        this.down = res.info.down;
        this.sp = res.info.sp;
        this.userate = res.info.userate;
      });
    },
    outputOfCompanyTop() {
      const params = {
        limit: 5
      };
      API.outputOfCompanyTop(params).then(res => {
        this.mapDataList = [];
        this.com_name = [];
        this.sum_pro = [];
        for (var i = 0; i < res.info.length; i++) {
          this.mapDataList.push({
            name: res.info[i].company_name,
            value: [
              res.info[i].com_lon,
              res.info[i].com_lat,
              res.info[i].id,
              res.info[i].sum_production
            ]
          });
          this.com_name.push(res.info[i].company_name);
          this.sum_pro.push(res.info[i].sum_production);
        }
        console.log(this.mapDataList);
        this.mapinit();
        this.comshop();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
