<template>
  <div class="workshop">
    <section class="boxwrap">
      <div class="gc">
        <div class="machines-grid">
          <div
            class="machines-col-1s"
            v-for="(area, index) in machineData"
            :key="index"
          >
            <ul>
              <li
                class="machiewrp"
                v-for="(row, index) in area.children"
                :key="index"
                :style="{ transform: 'scale(' + (index + 6) / 10 + ')' }"
              >
                <div class="machie" @click="detail">
                  <div
                    class="point"
                    :class="
                      row.type == 0
                        ? 'bon'
                        : row.type == 1
                        ? 'bstandby'
                        : 'balarm'
                    "
                  ></div>
                </div>
              </li>
            </ul>
            <div class="title">
              {{ area.name }}
            </div>
          </div>
        </div>
        <div class="pannel">
          <div class="indicator">
            <img class="sb" src="../../assets/images/sb.png" alt="" />
          </div>
          <div class="indicator mid">
            <div class="mid_items" v-for="(i, index) in 6" :key="index">
              <img src="../../assets/images/line3.png" alt="" />
              <div class="mid_con" id="ybp"></div>
              <img src="../../assets/images/line3.png" alt="" />
            </div>
          </div>
          <div class="indicator">
            <div id="devicenum"></div>
          </div>
          <div class="p_title">摘要信息</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import echarts from 'echarts'
import API from '@/api/busin'
export default {
  name: 'workShop',
  data() {
    return {
      machineData: [],
      state: 'point bstandby',
      workshopInfo: [],
      workshopName: [],
      children1: [],
      children2: [],
      children3: [],
      children4: [],
    }
  },
  mounted() {
    this.demo()
    this.chart9()
    this.chart10()
    this.findMachineListByExample()
  },
  methods: {
    detail(id) {
      console.log(id)
      // this.$router.push("/detail/detail");
      this.$router.push('detail')
    },

    demo() {
      this.machineData = [
        {
          name: '一车间',
          floorCount: 6,
          nowFloor: 4,
          type: 0,
          run: 4,
          warn: 1,
          wait: 1,
          children: [
            { name: '生产设备1', type: 0 },
            { name: '生产设备1', type: 1 },
            { name: '生产设备1', type: 2 },
            { name: '生产设备1', type: 0 },
            { name: '生产设备1', type: 1 },
          ],
        }, //0停在某一楼层，1上行，2下行,还没做
        {
          name: '二车间',
          floorCount: 6,
          nowFloor: 1,
          type: 1,
          run: 4,
          warn: 1,
          wait: 1,
          children: [
            { name: 'a', type: 0 },
            { name: 'a1', type: 1 },
            { name: 'aw2', type: 2 },
            { name: 'a3', type: 0 },
            { name: 'a4', type: 1 },
          ],
        },
        {
          name: '三车间',
          floorCount: 6,
          nowFloor: 5,
          type: 0,
          run: 4,
          warn: 1,
          wait: 1,
          children: [
            { name: 'a', type: 0 },
            { name: 'fa1', type: 1 },
            { name: 'a2', type: 2 },
            { name: 'a3', type: 0 },
            { name: 'a4', type: 1 },
          ],
        },
        {
          name: '四车间',
          floorCount: 6,
          nowFloor: 4,
          type: 2,
          run: 4,
          warn: 1,
          wait: 1,
          children: [
            { name: 'a', type: 0 },
            { name: 'a1', type: 1 },
            { name: 'ah2', type: 2 },
            { name: 'a3', type: 0 },
            { name: 'a4', type: 1 },
          ],
        },
      ]
    },
    chart9() {
      var myChart = echarts.init(document.getElementById('ybp'))
      var option = {
        series: [
          {
            center: ['50%', '50%'], //仪表的位置
            name: '刻度', //仪表的名字
            type: 'gauge', //统计图类型为仪表
            radius: '80%', //统计图的半径大小
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
                color: [[1, 'rgba(255,255,255,0)']],
              },
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: '#00FAFF', //仪表盘上的轴线颜色
              distance: 15, //图形与刻度的间距
              formatter: function(v) {
                //刻度轴上的数据相关显示
                switch (v + '') {
                  case '0':
                    return '0'
                  case '2':
                    return '2W'
                  case '4':
                    return '4W'
                  case '6':
                    return '6W'
                  case '8':
                    return '8W'
                  case '10':
                    return '10W'
                  case '12':
                    return '12W'
                  case '14':
                    return '14W'
                  case '16':
                    return '16W'
                }
              },
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: '#00FAFF',
                width: 1, //刻度的宽度
              },
              length: -5, //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: -8, //便宜的长度
              lineStyle: {
                color: '#00FAFF',
              },
            }, //分隔线样式
          },
          {
            type: 'gauge', //刻度轴表盘
            radius: '80%', //刻度盘的大小
            center: ['50%', '50%'], //刻度盘的位置
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
                        color: '#1FFBFF',
                      },
                      {
                        offset: 0.2,
                        color: '#25E43E',
                      },
                      {
                        offset: 0.7,
                        color: '#FFC21F',
                      },
                      {
                        offset: 0.9,
                        color: '#E166A0',
                      },
                      {
                        offset: 1,
                        color: '#C74787',
                      },
                    ]),
                  ],
                ],
              },
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false,
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false,
            },
            axisTick: {
              //表盘上的刻度线
              show: false,
            },
            pointer: {
              //表盘上的指针
              show: true,
              width: '10%',
              length: '80%',
            },
            itemStyle: {
              //表盘指针的颜色
              color: 'rgba(52, 136, 219, 1)',
            },
            title: {
              //标题
              show: false,
              offsetCenter: [0, '-26%'], // x, y，单位px
              textStyle: {
                color: '#fff',
                fontSize: 8, //表盘上的标题文字大小
              },
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, '70%'],
              color: '#DFFFFF',
              formatter: function(params) {
                return params + '%'
              },
              textStyle: {
                fontSize: 10,
              },
            },
            data: [
              //当前数值的数据
              {
                name: '受检率',
                value: 10,
              },
            ],
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    chart10() {
      var myChart = echarts.init(document.getElementById('devicenum'))
      var option = {
        grid: {
          top: '20%',
          bottom: '10%',
        },
        tooltip: {},
        xAxis: {
          data: ['在线设备', '工作设备'],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [20, 5],
            symbolOffset: [0, -3],
            z: 12,
            data: [
              {
                name: '在线设备',
                value: '81',
                trueVal: '77',
                symbolPosition: 'end',
                itemStyle: {
                  normal: {
                    color: '#00fff5',
                  },
                },
              },
              {
                name: '工作设备',
                value: '491',
                trueVal: '99',
                symbolPosition: 'end',
                itemStyle: {
                  normal: {
                    color: '#ffcc00',
                  },
                },
              },
            ],
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [20, 5],
            symbolOffset: [0, 3],
            z: 12,
            data: [
              {
                name: '在线设备',
                value: '81',
                trueVal: '77',
                itemStyle: {
                  normal: {
                    color: '#43bafe',
                  },
                },
              },
              {
                name: '工作设备',
                value: '491',
                trueVal: '99',
                itemStyle: {
                  normal: {
                    color: '#ff7800',
                  },
                },
              },
            ],
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [15, 5],
            symbolOffset: [0, 6],
            z: 11,
            data: [
              {
                name: '在线设备',
                value: '81',
                trueVal: '77',
                itemStyle: {
                  normal: {
                    color: 'transparent',
                    borderColor: '#43bafe',
                    borderWidth: 8,
                  },
                },
              },
              {
                name: '工作设备',
                value: '491',
                trueVal: '99',
                itemStyle: {
                  normal: {
                    color: 'transparent',
                    borderColor: '#ff7800',
                    borderWidth: 8,
                  },
                },
              },
            ],
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [20, 10],
            symbolOffset: [0, 12],
            z: 10,
            data: [
              {
                name: '在线设备',
                value: '81',
                trueVal: '77',
                itemStyle: {
                  normal: {
                    color: 'transparent',
                    borderColor: '#43bafe',
                    borderType: 'dashed',
                    borderWidth: 20,
                  },
                },
              },
              {
                name: '工作设备',
                value: '491',
                trueVal: '99',
                itemStyle: {
                  normal: {
                    color: 'transparent',
                    borderColor: '#ff7800',
                    borderType: 'dashed',
                    borderWidth: 20,
                  },
                },
              },
            ],
          },
          {
            type: 'bar',
            silent: true,
            barWidth: 20,
            barGap: '-100%',
            label: {
              normal: {
                show: true,
                position: 'top',
                distance: 10,
                textStyle: {
                  color: '#fff',
                  fontSize: 10,
                },
              },
            },
            data: [
              {
                name: '在线设备',
                value: '81',
                trueVal: '98',
                itemStyle: {
                  normal: {
                    color: {
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      type: 'linear',
                      global: false,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(0,255,245,0.5)',
                        },
                        {
                          offset: 1,
                          color: '#43bafe',
                        },
                      ],
                    },
                  },
                },
              },
              {
                name: '工作设备',
                value: '491',
                trueVal: '499',
                itemStyle: {
                  normal: {
                    color: {
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      type: 'linear',
                      global: false,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(255,204,0,0.5)',
                        },
                        {
                          offset: 1,
                          color: '#ff7800',
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
  },
}
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
    // background: yellow;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 70%;
    // border: 1px solid red;

    .title {
      color: #fff;
      text-align: center;
      font-size: 0.3rem;
    }
  }
}
.machie {
  background: url('../../assets/images/jq1.png') no-repeat;
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
  margin: 0.3rem 0;
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
    background: url('../../assets/images/title.png') no-repeat;
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
  .sb {
    width: 100%;
    //  margin-top: 0.625rem;
  }
  #devicenum {
    width: 100%;
  }
  .mid {
    align-items: center;
    flex-wrap: wrap;
    width: 55% !important;
    .mid_items {
      width: 32%;
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
