<template>
  <div class="workshop">
    <section class="boxwrap">
      <div class="gc">
        <div class="machines-grid">
          <img src="../../assets/车间.png" usemap="#Map" id="pic" />
          <div v-show="seen" class="hover_con" :style="positionStyle">
            <p>车间名：{{ content.ws_name }}</p>
            <hr />
            <p>机器数：{{ content.machine_count }}</p>
            <p>作业数：{{ content.run_count }}</p>
            <p>报警数：{{ content.alarm_count }}</p>
            <p>闲置数：{{ content.stop_count }}</p>
            <p>温度：25 ℃</p>
            <p>湿度：40 %</p>
          </div>
          <map name="Map" id="Map">
            <area
              shape="poly"
              coords="392,51,713,193,711,241,599,254,319,112"
              @mouseenter="enter(1)"
              @mouseleave="leave"
              @mousemove="updateXY"
              @click="detail(1)"
            />
            <area
              shape="poly"
              coords="301,83,321,105,318,163,262,172,259,119,204,95"
              @mouseenter="enter(2)"
              @mouseleave="leave"
              @mousemove="updateXY"
              @click="detail(2)"
            />
            <area
              shape="poly"
              coords="125,46,259,144,259,194,186,212,37,117,39,60"
              @mouseenter="enter(3)"
              @mouseleave="leave"
              @mousemove="updateXY"
              @click="detail(3)"
            />
            <area
              shape="poly"
              coords="33,122,182,223,261,195,430,311,424,385,323,400,37,173"
              @mouseenter="enter(4)"
              @mouseleave="leave"
              @mousemove="updateXY"
              @click="detail(4)"
            />
            <area shape="poly" coords="18,211,182,260" @click="detail(4)" />
            <!--<area shape="rect" coords="12,444,182,490" href="sm-textfile.html" target="pcs"/> -->
            <!-- onFocus="this.blur()"   去掉虚线框 -->
          </map>
        </div>

        <div class="pannel">
          <div class="indicator">
            <img class="sb" src="../../assets/images/sb.png" alt="" />
          </div>
          <div class="indicator mid">
            <div class="mid_items">
              <img src="../../assets/images/line3.png" alt="" />
              <div class="mid_con" id="ybp3"></div>

              <img src="../../assets/images/line3.png" alt="" />
            </div>
            <div class="mid_items">
              <img src="../../assets/images/line3.png" alt="" />
              <div class="mid_con" id="ybp2"></div>
              <img src="../../assets/images/line3.png" alt="" />
            </div>
            <div class="mid_items">
              <img src="../../assets/images/line3.png" alt="" />
              <div class="mid_con" id="ybp4"></div>
              <img src="../../assets/images/line3.png" alt="" />
            </div>
            <div class="mid_items">
              <img src="../../assets/images/line3.png" alt="" />

              <div class="mid_con" id="ybp"></div>
              <img src="../../assets/images/line3.png" alt="" />
            </div>
            <div class="mid_items">
              <img src="../../assets/images/line3.png" alt="" />
              <div class="mid_con" id="ybp5"></div>
              <img src="../../assets/images/line3.png" alt="" />
            </div>
            <div class="mid_items">
              <img src="../../assets/images/line3.png" alt="" />
              <div class="mid_con" id="ybp6"></div>
              <img src="../../assets/images/line3.png" alt="" />
            </div>
            <div class="clear"></div>
          </div>
          <div class="indicator2">
            <div id="devicenum"></div>
          </div>
          <div class="p_title">摘要信息</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import API from "@/api/busin";
import echarts from "echarts";
export default {
  name: "workShop",
  data() {
    return {
      machineData: [],
      state: "point bstandby",
      seen: false,
      x: 0,
      y: 0,
      positionStyle: { top: "20px", left: "20px" },
      content: {
        ws_name: "",
        machine_count: 0,
        run_count: 0,
        standby_count: 0,
        stop_count: 0,
        alarm_count: 0
      },
      workshopList: [],
      //待机数
      standby: "",
      //设备数
      mcount: "",
      //车间数
      wscount: "",
      //报警数
      alarm: "",
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
      comId: ""
    };
  },
  mounted() {
    this.findMachineListByCompany();
    this.statistics();
  },
  methods: {
    statistics() {
      const params = {
        cId: localStorage.getItem("comId")
      };
      API.statistics(params).then(res => {
        this.standby = res.info.standby;
        this.mcount = res.info.mcount;
        this.alarm = res.info.alarm;
        this.wscount = res.info.wscount;
        this.run = res.info.run;
        this.down = res.info.down;
        this.tp = res.info.tp;
        this.sp = res.info.sp;
        // console.log(this.tp)
        // console.log(this.sp)
        this.chart9();
        this.chart10();
        this.chart11();
        this.chart12();
        this.chart13();
        this.chart14();
        this.chart15();
      });
    },
    findMachineListByCompany() {
      const params = {
        cId: localStorage.getItem("comId")
      };
      API.findMachineListByCompany(params).then(res => {
        this.workshopList = res.info;
      });
    },
    enter(i) {
      this.workshopList.forEach((item, index, Array) => {
        if (item.ws_id == i) {
          this.content = {
            ws_name: item.workshop_name,
            machine_count: item.mCount,
            run_count: item.runCount,
            standby_count: item.standbyCount,
            stop_count: item.stopCount,
            alarm_count: item.alarmCount
          };
        }
      });
      this.seen = true;
    },
    leave: function() {
      this.seen = false;
    },
    updateXY: function(event) {
      this.x = event.pageX;
      this.y = event.pageY;
      this.positionStyle = {
        top: this.y - 100 + "px",
        left: this.x + 50 + "px"
      };
    },
    getXY(e) {
      var top_rel_to_parent = e.offsetX;
      var left_rel_to_parent = e.offsetY;
      alert(top_rel_to_parent + "," + left_rel_to_parent + ",");
    },
    detail(id) {
      localStorage.setItem("wsName", this.content.ws_name);
      this.$router.push({ path: "detail", query: { id: id } });
    },
    chart9() {
      var myChart = echarts.init(document.getElementById("ybp"));
      var option = {
        // title: {
        //   // top: 5,
        //   text: '公司分布',
        //   subtext: '',
        //   x: 'center',
        //   textStyle: {
        //     color: '#ccc',
        //   },
        // },
        tooltip: {},
        series: [
          {
            center: ["50%", "50%"], //仪表的位置
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            radius: "80%", //统计图的半径大小
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //设置默认刻度盘上的刻度不显示，重新定义刻度盘
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: "#00FAFF", //仪表盘上的轴线颜色
              distance: 15, //图形与刻度的间距
              formatter: function(v) {
                //刻度轴上的数据相关显示
                switch (v + "") {
                  case "0":
                    return "0";
                  case "2":
                    return "2W";
                  case "4":
                    return "4W";
                  case "6":
                    return "6W";
                  case "8":
                    return "8W";
                  case "10":
                    return "10W";
                  case "12":
                    return "12W";
                  case "14":
                    return "14W";
                  case "16":
                    return "16W";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: "#00FAFF",
                width: 1 //刻度的宽度
              },
              length: -5 //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -8, //便宜的长度
              lineStyle: {
                color: "#00FAFF"
              }
            } //分隔线样式
          },
          {
            type: "gauge", //刻度轴表盘
            radius: "80%", //刻度盘的大小
            center: ["50%", "50%"], //刻度盘的位置
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //刻度的线条
              show: true,
              lineStyle: {
                width: 5, //定义一个宽15的数轴
                color: [
                  //颜色为渐变色
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#1FFBFF"
                      },
                      {
                        offset: 0.2,
                        color: "#25E43E"
                      },
                      {
                        offset: 0.7,
                        color: "#FFC21F"
                      },
                      {
                        offset: 0.9,
                        color: "#E166A0"
                      },
                      {
                        offset: 1,
                        color: "#C74787"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false
            },
            axisTick: {
              //表盘上的刻度线
              show: false
            },
            pointer: {
              //表盘上的指针
              show: true,
              width: "10%",
              length: "80%"
            },
            itemStyle: {
              //表盘指针的颜色
              color: "rgba(52, 136, 219, 1)"
            },
            title: {
              //标题
              show: true,
              offsetCenter: [0, "-26%"], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 11 //表盘上的标题文字大小
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "70%"],
              color: "#DFFFFF",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 10
              }
            },
            data: [
              //当前数值的数据
              {
                name: "待机数",
                value: this.standby
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart10() {
      var myChart = echarts.init(document.getElementById("devicenum"));
      var option = {
        grid: {
          top: "20%",
          bottom: "10%"
        },
        tooltip: {},
        xAxis: {
          data: ["本次开机产量", "总产量"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 5],
            symbolOffset: [0, -3],
            z: 12,
            data: [
              {
                name: "本次开机产量",
                value: this.tp,
                // value: 30000,
                trueVal: "77",
                symbolPosition: "end",
                itemStyle: {
                  normal: {
                    color: "#00fff5"
                  }
                }
              },
              {
                name: "总产量",
                value: this.sp,
                trueVal: "99",
                symbolPosition: "end",
                itemStyle: {
                  normal: {
                    color: "#ffcc00"
                  }
                }
              }
            ]
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 5],
            symbolOffset: [0, 3],
            z: 12,
            data: [
              {
                name: "本次开机产量",
                value: this.tp,
                // value: 30000,
                trueVal: "77",
                itemStyle: {
                  normal: {
                    color: "#43bafe"
                  }
                }
              },
              {
                name: "总产量",
                value: this.sp,
                trueVal: "99",
                itemStyle: {
                  normal: {
                    color: "#ff7800"
                  }
                }
              }
            ]
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [15, 5],
            symbolOffset: [0, 6],
            z: 11,
            data: [
              {
                name: "本次开机产量",
                value: this.tp,
                // value: 30000,
                trueVal: "77",
                itemStyle: {
                  normal: {
                    color: "transparent",
                    borderColor: "#43bafe",
                    borderWidth: 8
                  }
                }
              },
              {
                name: "总产量",
                value: this.sp,
                trueVal: "99",
                itemStyle: {
                  normal: {
                    color: "transparent",
                    borderColor: "#ff7800",
                    borderWidth: 8
                  }
                }
              }
            ]
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, 12],
            z: 10,
            data: [
              {
                name: "本次开机产量",
                value: this.tp,
                // value: 30000,
                trueVal: "77",
                itemStyle: {
                  normal: {
                    color: "transparent",
                    borderColor: "#43bafe",
                    borderType: "dashed",
                    borderWidth: 20
                  }
                }
              },
              {
                name: "总产量",
                value: this.sp,
                trueVal: "99",
                itemStyle: {
                  normal: {
                    color: "transparent",
                    borderColor: "#ff7800",
                    borderType: "dashed",
                    borderWidth: 20
                  }
                }
              }
            ]
          },
          {
            type: "bar",
            silent: true,
            barWidth: 20,
            barGap: "-100%",
            label: {
              normal: {
                show: true,
                position: "top",
                distance: 10,
                textStyle: {
                  color: "#fff",
                  fontSize: 10
                }
              }
            },
            data: [
              {
                name: "本次开机产量",
                value: this.tp,
                // value: 30000,
                trueVal: "77",
                itemStyle: {
                  normal: {
                    color: {
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      type: "linear",
                      global: false,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(0,255,245,0.5)"
                        },
                        {
                          offset: 1,
                          color: "#43bafe"
                        }
                      ]
                    }
                  }
                }
              },
              {
                name: "总产量",
                value: this.sp,
                trueVal: "99",
                itemStyle: {
                  normal: {
                    color: {
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      type: "linear",
                      global: false,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(255,204,0,0.5)"
                        },
                        {
                          offset: 1,
                          color: "#ff7800"
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart11() {
      var myChart = echarts.init(document.getElementById("ybp2"));
      var option = {
        tooltip: {},
        series: [
          {
            center: ["50%", "50%"], //仪表的位置
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            radius: "80%", //统计图的半径大小
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //设置默认刻度盘上的刻度不显示，重新定义刻度盘
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: "#00FAFF", //仪表盘上的轴线颜色
              distance: 15, //图形与刻度的间距
              formatter: function(v) {
                //刻度轴上的数据相关显示
                switch (v + "") {
                  case "0":
                    return "0";
                  case "2":
                    return "2W";
                  case "4":
                    return "4W";
                  case "6":
                    return "6W";
                  case "8":
                    return "8W";
                  case "10":
                    return "10W";
                  case "12":
                    return "12W";
                  case "14":
                    return "14W";
                  case "16":
                    return "16W";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: "#00FAFF",
                width: 1 //刻度的宽度
              },
              length: -5 //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -8, //便宜的长度
              lineStyle: {
                color: "#00FAFF"
              }
            } //分隔线样式
          },
          {
            type: "gauge", //刻度轴表盘
            radius: "80%", //刻度盘的大小
            center: ["50%", "50%"], //刻度盘的位置
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //刻度的线条
              show: true,
              lineStyle: {
                width: 5, //定义一个宽15的数轴
                color: [
                  //颜色为渐变色
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#1FFBFF"
                      },
                      {
                        offset: 0.2,
                        color: "#25E43E"
                      },
                      {
                        offset: 0.7,
                        color: "#FFC21F"
                      },
                      {
                        offset: 0.9,
                        color: "#E166A0"
                      },
                      {
                        offset: 1,
                        color: "#C74787"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false
            },
            axisTick: {
              //表盘上的刻度线
              show: false
            },
            pointer: {
              //表盘上的指针
              show: true,
              width: "10%",
              length: "80%"
            },
            itemStyle: {
              //表盘指针的颜色
              color: "rgba(52, 136, 219, 1)"
            },
            title: {
              //标题
              show: true,
              offsetCenter: [0, "-26%"], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 11 //表盘上的标题文字大小
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "70%"],
              color: "#DFFFFF",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 10
              }
            },
            data: [
              //当前数值的数据
              {
                name: "设备数",
                value: this.mcount
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart12() {
      var myChart = echarts.init(document.getElementById("ybp3"));
      var option = {
        tooltip: {},
        series: [
          {
            center: ["50%", "50%"], //仪表的位置
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            radius: "80%", //统计图的半径大小
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //设置默认刻度盘上的刻度不显示，重新定义刻度盘
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: "#00FAFF", //仪表盘上的轴线颜色
              distance: 15, //图形与刻度的间距
              formatter: function(v) {
                //刻度轴上的数据相关显示
                switch (v + "") {
                  case "0":
                    return "0";
                  case "2":
                    return "2W";
                  case "4":
                    return "4W";
                  case "6":
                    return "6W";
                  case "8":
                    return "8W";
                  case "10":
                    return "10W";
                  case "12":
                    return "12W";
                  case "14":
                    return "14W";
                  case "16":
                    return "16W";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: "#00FAFF",
                width: 1 //刻度的宽度
              },
              length: -5 //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -8, //便宜的长度
              lineStyle: {
                color: "#00FAFF"
              }
            } //分隔线样式
          },
          {
            type: "gauge", //刻度轴表盘
            radius: "80%", //刻度盘的大小
            center: ["50%", "50%"], //刻度盘的位置
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //刻度的线条
              show: true,
              lineStyle: {
                width: 5, //定义一个宽15的数轴
                color: [
                  //颜色为渐变色
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#1FFBFF"
                      },
                      {
                        offset: 0.2,
                        color: "#25E43E"
                      },
                      {
                        offset: 0.7,
                        color: "#FFC21F"
                      },
                      {
                        offset: 0.9,
                        color: "#E166A0"
                      },
                      {
                        offset: 1,
                        color: "#C74787"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false
            },
            axisTick: {
              //表盘上的刻度线
              show: false
            },
            pointer: {
              //表盘上的指针
              show: true,
              width: "10%",
              length: "80%"
            },
            itemStyle: {
              //表盘指针的颜色
              color: "rgba(52, 136, 219, 1)"
            },
            title: {
              //标题
              show: true,
              offsetCenter: [0, "-26%"], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 11 //表盘上的标题文字大小
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "70%"],
              color: "#DFFFFF",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 10
              }
            },
            data: [
              //当前数值的数据
              {
                name: "车间数",
                value: this.wscount
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart13() {
      var myChart = echarts.init(document.getElementById("ybp4"));
      var option = {
        tooltip: {},
        series: [
          {
            center: ["50%", "50%"], //仪表的位置
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            radius: "80%", //统计图的半径大小
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //设置默认刻度盘上的刻度不显示，重新定义刻度盘
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: "#00FAFF", //仪表盘上的轴线颜色
              distance: 15, //图形与刻度的间距
              formatter: function(v) {
                //刻度轴上的数据相关显示
                switch (v + "") {
                  case "0":
                    return "0";
                  case "2":
                    return "2W";
                  case "4":
                    return "4W";
                  case "6":
                    return "6W";
                  case "8":
                    return "8W";
                  case "10":
                    return "10W";
                  case "12":
                    return "12W";
                  case "14":
                    return "14W";
                  case "16":
                    return "16W";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: "#00FAFF",
                width: 1 //刻度的宽度
              },
              length: -5 //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -8, //便宜的长度
              lineStyle: {
                color: "#00FAFF"
              }
            } //分隔线样式
          },
          {
            type: "gauge", //刻度轴表盘
            radius: "80%", //刻度盘的大小
            center: ["50%", "50%"], //刻度盘的位置
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //刻度的线条
              show: true,
              lineStyle: {
                width: 5, //定义一个宽15的数轴
                color: [
                  //颜色为渐变色
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#1FFBFF"
                      },
                      {
                        offset: 0.2,
                        color: "#25E43E"
                      },
                      {
                        offset: 0.7,
                        color: "#FFC21F"
                      },
                      {
                        offset: 0.9,
                        color: "#E166A0"
                      },
                      {
                        offset: 1,
                        color: "#C74787"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false
            },
            axisTick: {
              //表盘上的刻度线
              show: false
            },
            pointer: {
              //表盘上的指针
              show: true,
              width: "10%",
              length: "80%"
            },
            itemStyle: {
              //表盘指针的颜色
              color: "rgba(52, 136, 219, 1)"
            },
            title: {
              //标题
              show: true,
              offsetCenter: [0, "-26%"], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 11 //表盘上的标题文字大小
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "70%"],
              color: "#DFFFFF",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 10
              }
            },
            data: [
              //当前数值的数据
              {
                name: "作业数",
                value: this.run
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart14() {
      var myChart = echarts.init(document.getElementById("ybp5"));
      var option = {
        tooltip: {},
        series: [
          {
            center: ["50%", "50%"], //仪表的位置
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            radius: "80%", //统计图的半径大小
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //设置默认刻度盘上的刻度不显示，重新定义刻度盘
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: "#00FAFF", //仪表盘上的轴线颜色
              distance: 15, //图形与刻度的间距
              formatter: function(v) {
                //刻度轴上的数据相关显示
                switch (v + "") {
                  case "0":
                    return "0";
                  case "2":
                    return "2W";
                  case "4":
                    return "4W";
                  case "6":
                    return "6W";
                  case "8":
                    return "8W";
                  case "10":
                    return "10W";
                  case "12":
                    return "12W";
                  case "14":
                    return "14W";
                  case "16":
                    return "16W";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: "#00FAFF",
                width: 1 //刻度的宽度
              },
              length: -5 //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -8, //便宜的长度
              lineStyle: {
                color: "#00FAFF"
              }
            } //分隔线样式
          },
          {
            type: "gauge", //刻度轴表盘
            radius: "80%", //刻度盘的大小
            center: ["50%", "50%"], //刻度盘的位置
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //刻度的线条
              show: true,
              lineStyle: {
                width: 5, //定义一个宽15的数轴
                color: [
                  //颜色为渐变色
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#1FFBFF"
                      },
                      {
                        offset: 0.2,
                        color: "#25E43E"
                      },
                      {
                        offset: 0.7,
                        color: "#FFC21F"
                      },
                      {
                        offset: 0.9,
                        color: "#E166A0"
                      },
                      {
                        offset: 1,
                        color: "#C74787"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false
            },
            axisTick: {
              //表盘上的刻度线
              show: false
            },
            pointer: {
              //表盘上的指针
              show: true,
              width: "10%",
              length: "80%"
            },
            itemStyle: {
              //表盘指针的颜色
              color: "rgba(52, 136, 219, 1)"
            },
            title: {
              //标题
              show: true,
              offsetCenter: [0, "-26%"], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 11 //表盘上的标题文字大小
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "70%"],
              color: "#DFFFFF",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 10
              }
            },
            data: [
              //当前数值的数据
              {
                name: "预警数",
                value: this.alarm
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart15() {
      var myChart = echarts.init(document.getElementById("ybp6"));
      var option = {
        tooltip: {},
        series: [
          {
            center: ["50%", "50%"], //仪表的位置
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            radius: "80%", //统计图的半径大小
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //设置默认刻度盘上的刻度不显示，重新定义刻度盘
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: "#00FAFF", //仪表盘上的轴线颜色
              distance: 15, //图形与刻度的间距
              formatter: function(v) {
                //刻度轴上的数据相关显示
                switch (v + "") {
                  case "0":
                    return "0";
                  case "2":
                    return "2W";
                  case "4":
                    return "4W";
                  case "6":
                    return "6W";
                  case "8":
                    return "8W";
                  case "10":
                    return "10W";
                  case "12":
                    return "12W";
                  case "14":
                    return "14W";
                  case "16":
                    return "16W";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: "#00FAFF",
                width: 1 //刻度的宽度
              },
              length: -5 //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -8, //便宜的长度
              lineStyle: {
                color: "#00FAFF"
              }
            } //分隔线样式
          },
          {
            type: "gauge", //刻度轴表盘
            radius: "80%", //刻度盘的大小
            center: ["50%", "50%"], //刻度盘的位置
            splitNumber: 8, //刻度数量
            startAngle: 225, //开始刻度的角度
            endAngle: -45, //结束刻度的角度
            axisLine: {
              //刻度的线条
              show: true,
              lineStyle: {
                width: 5, //定义一个宽15的数轴
                color: [
                  //颜色为渐变色
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#1FFBFF"
                      },
                      {
                        offset: 0.2,
                        color: "#25E43E"
                      },
                      {
                        offset: 0.7,
                        color: "#FFC21F"
                      },
                      {
                        offset: 0.9,
                        color: "#E166A0"
                      },
                      {
                        offset: 1,
                        color: "#C74787"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false
            },
            axisTick: {
              //表盘上的刻度线
              show: false
            },
            pointer: {
              //表盘上的指针
              show: true,
              width: "10%",
              length: "80%"
            },
            itemStyle: {
              //表盘指针的颜色
              color: "rgba(52, 136, 219, 1)"
            },
            title: {
              //标题
              show: true,
              offsetCenter: [0, "-26%"], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 11 //表盘上的标题文字大小
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "70%"],
              color: "#DFFFFF",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 10
              }
            },
            data: [
              //当前数值的数据
              {
                name: "停机数",
                value: this.down
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.bon {
  background: #4cffff;
}
.bstandby {
  background: #fff965 !important;
}
.balarm {
  background: #ff8f7a !important;
}
.gc {
  // background: url('../../assets/images/GIF3.gif') no-repeat ;
  height: calc(100vh - 1.6rem);
  width: 100%;
  // background-size: cover;
  // position: relative;
  // background: pink;

  .machines-grid {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60%;
    img {
      height: 100%;
      width: 100%;
      margin: 2rem 0 0 0;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
    }
    .title {
      color: #fff;
      text-align: center;
      font-size: 0.3rem;
    }
    .hover_con {
      position: absolute;
      width: 10%;
      height: 30%;
      padding: 0.1rem;
      background: rgba(1, 19, 67, 0.8);
      border: 2px solid #00a1ff;
      border-radius: 8px;
      hr {
        border: 0.5px solid #00a1ff;
      }
    }
    .hover_con p {
      font-size: 0.3rem;
      line-height: 0.3rem;
      padding: 0.2rem;
      // text-align: center;
      color: #00a1ff;
      font-weight: 600;
      // text-shadow: 2px 2px 2px grey;
    }
  }
}
.machie {
  background: url("../../assets/images/jq1.png") no-repeat;
  // border: 1px solid yellow;
  width: 150px;
  height: 1.5rem;
  margin: 0.1% 0;
  background-size: 100%;
  position: relative;

  .point {
    width: 20px;
    height: 13px;
    background: #4cffff;
    position: absolute;
    right: 30px;
    bottom: 42px;
    z-index: 1;
    // transform: rotate(4deg);
  }
}

.pannel {
  // position: absolute;
  position: relative;
  width: 100%;
  height: 28%;
  border: 1px solid #274774;
  background: rgba(20, 35, 90, 0.6);
  margin: 1.75rem 0 0 0;
  // left: 5%;
  // bottom: 0px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .p_title {
    position: absolute;
    width: 200px;
    height: 50px;
    background: url("../../assets/images/title.png") no-repeat;
    background-size: 100%;
    // background: #ff8f7a;
    top: -15px;
    left: calc(50% - 100px);
    z-index: 999;
    text-align: center;
    // line-height: 40px;
    color: #fefefe;
    font-size: 0.25rem;
  }
  .indicator {
    width: 22%;
    height: 90%;
    margin: 0px 5px;
    display: flex;
  }
  .indicator2 {
    width: 18%;
    height: 90%;
    margin: 0px 5px;
    display: flex;
  }
  .sb {
    width: 90%;
    //  margin-top: 0.625rem;
  }
  #devicenum {
    width: 100%;
    height: 100%;
    // background-color: transparent;
  }
  .mid {
    align-items: center;
    flex-wrap: wrap;
    width: 59% !important;
    .mid_items {
      width: 33.33%;
      height: 50%;
      // margin: 0px 2px;

      img {
        width: 90%;
      }
      .mid_con {
        width: 90%;
        height: 75%;
        background: rgba(21, 49, 122, 0.5);
      }
    }
  }
  // flex-wrap: wrap;
}

.workshop {
  width: 100%;
  height: 100%;
}
.boxwrap {
  display: flex;
}
.items {
  flex: 1;
  margin: 0.125rem;
  height: 5rem;
  width: 100%;
  color: #fff;

  .item {
    flex: 1;
  }
  .top {
    height: 85%;
    background: burlywood;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .machine {
    // width: 0.625rem;
    min-width: 0.625rem;
    padding: 0.0625rem;
    height: 0.625rem;
    margin: auto;
    background: #a3a3a3;
    text-align: center;
    line-height: 0.625rem;
    border-radius: 0.0625rem;
  }

  .foot {
    width: 100%;
    height: 15%;
    text-align: center;
    line-height: 0.75rem;
    font-size: 0.325rem;
    background: cadetblue;
  }
}
// .boxwrap {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   .box {
//     min-width: 500px;
//     min-height: 400px;
//   }
// }
</style>
