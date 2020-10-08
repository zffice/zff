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
            <strong>1187</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>设备总数</p>
            <strong>13977</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>设备作业总数</p>
            <strong>13800</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>设备待机总数</p>
            <strong>1500</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>设备报警总数</p>
            <strong>50</strong>
          </li>
          <li>
            <b class="animation-1"></b>
            <b class="animation-2"></b>
            <b class="animation-3"></b>
            <p>设备闲置总数</p>
            <strong>3400</strong>
          </li>
        </ul>
      </div>
      <div class="area-inbox-3">
        <ul>
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
        </ul>
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
            <div id="bar"></div>
          </div>
          <span class="pandect-area-right">
            <b></b>
          </span>
        </div>
        <div class="details1-area">
          <span class="detailsl-area-left"></span>
          <div class="details1-area-center">
            <h3>总体电耗情况</h3>
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
            <b></b>
          </div>
          <span class="detailsl-area-right"></span>
        </div>
        <div class="details2-area">
          <span class="details2-area-left"></span>
          <div class="details2-area-center">
            <h3>总体水耗情况</h3>
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
            <dt>上月利用率</dt>
            <dd class="font12">
              <span>76.525%</span>
              <b></b>
            </dd>
            <dt class="ml-20">今日利用率</dt>
            <dd class="font-red ml-20">
              <span>74.113%</span>
              <b></b>
            </dd>
            <dt>今日故障率</dt>
            <dd>
              <span>8.113%</span>
              <b></b>
            </dd>
          </dl>
          <div class="round-1"></div>
          <div class="round-2"></div>
          <div class="round-3">50%</div>
          <div class="round-4"></div>
        </div>
        <div class="area-inbox-2">
          <ul>
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
          </ul>
          <div class="area-text">
            <b class="animation-line1"></b>
            <h4>系统说明：</h4>
            <p class="text_container"></p>
            <b class="animation-line2"></b>
          </div>
        </div>
      </div>
      <!-- <div class="time-base-outer">
        <b class="line1"></b>
        <div class="time-base">
          <div class="slider2"></div>
        </div>
        <b class="line2"></b>
      </div>-->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      companyscount: '',
      shopcount: '',
      onlinecount: '',
      offlinecount: '',
      faultcount: '',
      freecount: '',
      //公司经纬度
      comlocation: [],
      //车间机床数
      shopmnumber: [],
      //公司名称
      companyname: [],
    }
  },
  mounted() {
    require('../assets/css/mobile.css')
    require('../assets/js/common.js')
    // require("../assets/js/index");
    require('../assets/js/jquery_and_jqueryui.js')
    // require('../assets/css/default.css')
    require('../assets/css/jquery-ui.css')
    //字体间隔逐字显示
    this.fontstyle()
    //苏州地图
    this.mapinit()
    //车间柱状图
    this.comshop()
    // this.comData()
  },
  methods: {
    fontstyle() {
      var s =
        '（该系统模拟智能车间，通过各种传感器数据对相应环境信息或设备信息进行可视化分析处理，便于用户直观了解）'
      var con = $('.text_container')
      var index = 0
      var length = s.length
      var tId = null
      function start() {
        con.text('')
        tId = setInterval(function() {
          con.append(s.charAt(index))
          if (index++ === length) {
            clearInterval(tId)
            index = 0
            start()
          }
        }, 100)
      }
      start()
    },
    mapinit() {
      //网页中获取苏州市的geojson制作苏州市地图
      //   var dataurl = '../public/china.json'
      var geoCoordMap = {}
      var myChart = echarts.init(document.getElementById('map'))
      //   myChart.showLoading()
      let index = -1
      var timer = setInterval(function() {
        //隐藏提示框
        myChart.dispatchAction({
          type: 'hideTip',
          seriesIndex: 0,
          dataIndex: index,
        })
        // 显示提示框
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index + 1,
        })
        // 取消高亮指定的数据图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index,
        })
        // 高亮指定的数据图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index + 1,
        })
        index++
        if (index > 13) {
          index = -1
        }
      }, 2000)
      // console.log(this.comlocation)
      myChart.on('mousemove', function(e) {
        clearInterval(timer)
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        })
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        })
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        })
      }) //---------------------------------------------鼠标移入静止播放
      myChart.on('mouseout', function(e) {
        clearInterval(timer)
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        }) //鼠标移出后先把上次的高亮取消
        timer = setInterval(function() {
          // 隐藏提示框
          myChart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: index,
          })
          // 显示提示框
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index + 1,
          })
          // 取消高亮指定的数据图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index,
          })
          // 高亮指定的数据图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: index + 1,
          })
          index++
          if (index > 13) {
            index = -1
          }
        }, 2000)
      })
      var self = this
      $.getJSON('json/china.json', function(geoJson) {
        echarts.registerMap('china', geoJson)
        // myChart.hideLoading();
        var mapDate = self.comlocation
        var option = {
          // backgroundColor: "#020933",
          title: {
            top: 5,
            text: '公司分布',
            subtext: '',
            x: 'center',
            textStyle: {
              color: '#ccc',
            },
          },
          // tooltip: {
          //     trigger: 'item',
          //     formatter: function(params) {
          //        // console.log(params)
          //             return params.name;
          //     }
          // },
          geo: {
            map: 'china',
            aspectScale: 0.75, //长宽比
            zoom: 1.1,
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#013C62',
                shadowColor: '#182f68',
                shadowOffsetX: 0,
                shadowOffsetY: 25,
              },
              emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green',
                label: {
                  show: false,
                },
              },
            },
          },
          series: [
            {
              type: 'map',
              roam: true,
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: '#fff',
                  },
                },
                emphasis: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: '#2ab8ff',
                  borderWidth: 1.5,
                  areaColor: '#12235c',
                },
                emphasis: {
                  areaColor: '#2AB8FF',
                  borderWidth: 0,
                  color: 'green',
                },
              },
              zoom: 1.1,
              roam: false,
              map: 'china', //使用
              // data: this.difficultData //热力图数据   不同区域 不同的底色
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              showEffectOn: 'render',
              rippleEffect: {
                period: 15,
                scale: 4,
                brushType: 'fill',
              },
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#ffff',
                  shadowBlur: 10,
                  shadowColor: '#333',
                },
              },
              data: mapDate,
            },
          ],
        }
        myChart.setOption(option)
      })
    },
    comshop() {
      var myChart = echarts.init(document.getElementById('bar'))
      var category = [
        { name: '海尔', value: 20 },
        { name: '海昌', value: 30 },
        { name: 'ABB', value: 37 },
        { name: '江控', value: 10 },
        { name: '西门', value: 50 },
        { name: '砺行', value: 40 },
        { name: '三菱', value: 20 },
        { name: '罗克', value: 25 },
      ] // 类别
      var total = 50 // 数据总数
      var datas = []
      category.forEach((value) => {
        datas.push(value.value)
      })
      var option = {
        // backgroundColor:'#071347',
        title: {
          top: 50,
          text: '车间-机床数',
          x: 'center',
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          max: total,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 50,
          top: 80, // 设置条形图的边距
          right: 50,
          bottom: 60,
        },
        // tooltip: {
        //   trigger: "item"
        // },
        yAxis: [
          {
            type: 'category',
            inverse: false,
            data: category,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
        ],
        series: [
          {
            // 内
            type: 'bar',
            barWidth: 18,
            legendHoverLink: false,
            silent: true,
            itemStyle: {
              normal: {
                color: function(params) {
                  var color
                  if (params.dataIndex == 19) {
                    color = {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#EB5118', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#2AB8FF', // 100% 处的颜色
                        },
                      ],
                    }
                  } else if (params.dataIndex == 18) {
                    color = {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#FFA048', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#2AB8FF', // 100% 处的颜色
                        },
                      ],
                    }
                  } else if (params.dataIndex == 17) {
                    color = {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#F8E972', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#2AB8FF', // 100% 处的颜色
                        },
                      ],
                    }
                  } else {
                    color = {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#1588D1', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#0F4071', // 100% 处的颜色
                        },
                      ],
                    }
                  }
                  return color
                },
              },
            },
            label: {
              normal: {
                show: true,
                position: 'left',
                formatter: '{b}',
                textStyle: {
                  color: '#fff',
                  fontSize: 14,
                },
              },
            },
            data: category,
            z: 1,
            animationEasing: 'elasticOut',
          },
          {
            // 分隔
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                color: '#2AB8FF',
              },
            },
            symbolRepeat: 'fixed',
            symbolMargin: 6,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [1, 21],
            symbolPosition: 'start',
            symbolOffset: [1, -1],
            symbolBoundingData: this.total,
            data: category,
            z: 2,
            animationEasing: 'elasticOut',
          },
          {
            // 外边框
            type: 'pictorialBar',
            symbol: 'rect',
            symbolBoundingData: total,
            itemStyle: {
              normal: {
                color: 'none',
              },
            },
            label: {
              normal: {
                formatter: '{c}',
                textStyle: {
                  color: '#409EFF',
                  fontSize: 12,
                },
                position: 'right',
                distance: 0, // 向右偏移位置
                show: true,
              },
            },
            data: datas,
            z: 0,
            animationEasing: 'elasticOut',
          },
          {
            name: '外框',
            type: 'bar',
            barGap: '-120%', // 设置外框粗细
            data: [
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
              total,
            ],
            barWidth: 25,
            itemStyle: {
              normal: {
                color: 'transparent', // 填充色
                barBorderColor: '#2AB8FF', // 边框色
                barBorderWidth: 1, // 边框宽度
                // barBorderRadius: 0, //圆角半径
                label: {
                  // 标签显示位置
                  show: false,
                  position: 'top', // insideTop 或者横向的 insideLeft
                },
              },
            },
            z: 0,
          },
        ],
      }
      myChart.setOption(option)
    },
    comData() {
      var self = this
      self.$http.get(this.baseUrl + '/company/lay').then(function(response) {
        var res = response.data
        // console.log(res)
        //公司总数
        self.companyscount = res.length

        //车间总数
        var a = 0
        for (var i = 0; i < res.length; i++) {
          res[i].comCount = parseInt(res[i].comCount)
          a += res[i].comCount
        }
        self.shopcount = a

        self.comlocation = []
        for (var i = 0; i < res.length; i++) {
          self.comlocation.push({
            name: res[i].comName,
            value: [res[i].comLongitude, res[i].comLatitude],
          })
        }
        self.mapinit()
        // console.log(self.comlocation);
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
