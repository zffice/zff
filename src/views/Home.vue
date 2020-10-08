<template>
  <div class="home">
    <header class="header">
      <div class="title">智能工厂生产车间大屏</div>
      <div id="date"></div>
    </header>
    <section class="section">
      <div class="cloum">
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_01"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_02"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_03"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items2">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_04"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
      </div>
      <div class="cloum2">
        <workShop></workShop>
      </div>
      <div class="cloum3">
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_05"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_06"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_07"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items2">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_08"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
      </div>
      <div class="clear"></div>
    </section>
  </div>
</template>

<script>
import API from '@/api/busin'
import workShop from '@/components/workshop/index'
import linePercent from '../components/line/line'
import lineOne from '../components/line/lineOne'
import Vue from 'vue'
import { scrollBoard } from '@jiaminghi/data-view'
import echarts from 'echarts'
export default {
  name: 'Home',
  components: {
    workShop,
    linePercent,
    lineOne,
  },
  data() {
    return {
      configdisplacementofDam: {},
      configdata: {},
      value: '选项1',
    }
  },
  mounted() {
    require('../assets/js/common.js')
    this.chart1()
    this.chart2()
    this.chart3()
    this.chart4()
    this.chart5()
    this.chart6()
    this.chart7()
    this.chart8()
    this.alarmGroupMonth()
    this.alarmOfMachineTop()
    this.alarmTypeTop()
    this.findMachineListByExample()
    this.outputOfMachineTop()
    this.statistics()
  },
  methods: {
    // 月报警趋势
    alarmGroupMonth() {
      API.alarmGroupMonth().then((res) => {
        console.log(res)
      })
    },
    // 设备报警排名
    alarmOfMachineTop() {
      const params = {
        limit: 5,
      }
      API.alarmOfMachineTop(params).then((res) => {
        console.log(res)
      })
    },
    // 设备报警类型排名
    alarmTypeTop() {
      const params = {
        limit: 5,
      }
      API.alarmTypeTop(params).then((res) => {
        console.log(res)
      })

      const myChart = this.$echarts.init(document.getElementById('r1'))

      var img =
        'data:image/png;base64,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'

      var trafficWay = [
        {
          name: '火车',
          value: 20,
        },
        {
          name: '飞机',
          value: 10,
        },
        {
          name: '客车',
          value: 30,
        },
        {
          name: '轮渡',
          value: 40,
        },
      ]

      var data = []
      var color = [
        '#00ffff',
        '#00cfff',
        '#006ced',
        '#ffe000',
        '#ffa800',
        '#ff5b00',
        '#ff3000',
      ]
      for (var i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i],
              },
            },
          },
          {
            value: 2,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0,
              },
            },
          }
        )
      }
      var seriesOption = [
        {
          name: '',
          type: 'pie',
          clockWise: false,
          radius: [105, 109],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                formatter: function(params) {
                  var percent = 0
                  var total = 0
                  for (var i = 0; i < trafficWay.length; i++) {
                    total += trafficWay[i].value
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    return (
                      '交通方式：' +
                      params.name +
                      '\n' +
                      '\n' +
                      '占百分比：' +
                      percent +
                      '%'
                    )
                  } else {
                    return ''
                  }
                },
              },
              labelLine: {
                length: 3,
                length2: 40,
                show: true,
                color: '#00ffff',
              },
            },
          },
          data: data,
        },
      ]
      const option = {
        // backgroundColor: '#0A2E5D',
        color: color,
        title: {
          text: '交通方式',
          top: '48%',
          textAlign: 'center',
          left: '49%',
          textStyle: {
            color: '#fff',
            fontSize: 22,
            fontWeight: '400',
          },
        },
        graphic: {
          elements: [
            {
              type: 'image',
              z: 3,
              style: {
                image: img,
                width: 178,
                height: 178,
              },
              left: 'center',
              top: 'center',
              position: [100, 100],
            },
          ],
        },
        tooltip: {
          show: false,
        },
        // legend: {
        //     icon: "circle",
        //     orient: 'horizontal',
        //     // x: 'left',
        //     data:['火车','飞机','客车','轮渡'],
        //     right: 340,
        //     bottom: 150,
        //     align: 'right',
        //     textStyle: {
        //       color: "#fff"
        //     },
        //     itemGap: 20
        // },
        toolbox: {
          show: false,
        },
        series: seriesOption,
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },

    findMachineListByExample() {
      const params = {
        limit: 5,
      }
      API.findMachineListByExample(params).then((res) => {
        console.log(res)
      })

      const myChart = echarts.init(document.getElementById('r3'))

      var dataAxis = [
        '点',
        '击',
        '柱',
        '子',
        '或',
        '者',
        '两',
        '指',
        '在',
        '触',
        '屏',
      ]
      var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90]
      var yMax = 500
      var dataShadow = []

      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax)
      }

      const option = {
        // title: {
        //   text: "特性示例",
        // },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff',
            },
          },
          grid: {
            // left: '3%',
            // right: '4%',
            // bottom: '3%',
            containLabel: false,
          },
          axisTick: {
            show: false,
          },
          // axisLine: {
          //   show: false
          // },
          z: 10,
        },
        yAxis: {
          // axisLine: {
          //   show: false
          // },
          // axisTick: {
          //   show: false
          // },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.05)',
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false,
          },
          {
            type: 'bar',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ]),
              },
            },
            data: data,
          },
        ],
      }

      // Enable data zoom when user click bar.
      var zoomSize = 6
      myChart.on('click', function(params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[
              Math.min(params.dataIndex + zoomSize / 2, data.length - 1)
            ],
        })
      })
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    outputOfMachineTop() {
      const params = {
        limit: 5,
      }
      API.outputOfMachineTop(params).then((res) => {
        console.log(res)
      })
    },
    statistics() {
      const params = {
        limit: 5,
      }
      API.statistics(params).then((res) => {
        console.log(res)
      })
    },
    chart1() {
      var myChart = echarts.init(document.getElementById('box_01'))
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '18%',
          top: '10%',
          containLabel: true,
        },
        legend: {
          data: ['1', '2'],
          right: 10,
          top: 12,
          textStyle: {
            color: '#fff',
          },
          itemWidth: 12,
          itemHeight: 10,
          // itemGap: 35
        },
        xAxis: {
          type: 'category',
          data: [
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
          ],
          axisLine: {
            show: false,
            lineStyle: {
              color: '#00C2FF',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Microsoft YaHei',
            },
          },
        },
        yAxis: {
          type: 'value',
          max: '10',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#00C2FF',
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        dataZoom: [
          {
            show: true,
            height: 8,
            xAxisIndex: [0],
            bottom: '8%',
            start: 10,
            end: 50,
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5',
            },
            textStyle: {
              color: '#fff',
            },
            borderColor: '#00C2FF',
          },
          {
            type: 'inside',
            show: true,
            height: 10,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: '1',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#C3BC30',
                  },
                  {
                    offset: 1,
                    color: '#F18B00',
                  },
                ]),
                barBorderRadius: 5,
              },
            },
            data: [4, 4, 3, 3, 3, 4, 4, 4, 3],
          },
          {
            name: '2',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#12DCFE',
                  },
                  {
                    offset: 1,
                    color: '#0094FE',
                  },
                ]),
                barBorderRadius: 5,
              },
            },
            data: [4, 5, 5, 5, 5, 4, 4, 5, 5],
          },
        ],
      }

      var app = {
        currentIndex: -1,
      }
      setInterval(function() {
        var dataLen = option.series[0].data.length

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        })
        app.currentIndex = (app.currentIndex + 1) % dataLen
        //console.log(app.currentIndex);
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        })
      }, 1000)
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    chart2() {
      var myChart = echarts.init(document.getElementById('box_02'))
      function contains(arr, dst) {
        var i = arr.length
        while ((i -= 1)) {
          if (arr[i] == dst) {
            return i
          }
        }
        return false
      }

      var attackSourcesData = [70, 34, 60, 70, 34, 70, 34, 34]
      var attackSourcesName = [
        '绕过攻击',
        '网络爬虫',
        '其他有害程序事件',
        '远程代码执行',
        '信息泄露',
        'HTTP请求攻击',
        '其他注入攻击',
        '后门攻击',
      ]
      var attackSourcesColor = [
        '#f36c6c',
        '#e6cf4e',
        '#20d180',
        '#0093ff',
        '#1089E7',
        '#F57474',
        '#56D0E3',
        '#1089E7',
        '#F57474',
        '#1089E7',
        '#F57474',
        '#F57474',
      ]

      function attackSourcesDataFmt(sData) {
        var sss = []
        sData.forEach(function(item, i) {
          var itemStyle = {
            color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
          }
          sss.push({
            value: item,
            itemStyle: itemStyle,
          })
        })
        return sss
      }

      var option = {
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 10,
          },
          //trigger: 'axis',
          //axisPointer: {
          //    type: 'shadow'
          //}
        },
        legend: {
          show: false,
        },
        grid: {
          left: '40%',
          right: '15%',
          bottom: '5%',
          top: '5%',
        },
        dataZoom: [
          {
            type: 'slider',
            yAxisIndex: 0,
            zoomLock: true,
            width: 8,
            handleSize: 0,
            showDetail: false,
            start: 0,
            end: 40,
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5',
            },
            borderColor: '#90979c',
          },
          {
            type: 'inside',
            id: 'insideY',
            yAxisIndex: 0,
            start: 0,
            end: 50,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
          },
        ],
        xAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'category',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisPointer: {
            label: {
              show: true,
              margin: 30,
            },
          },
          data: attackSourcesName,
          axisLabel: {
            margin: 140,
            fontSize: 14,
            align: 'left',
            color: '#333',
            rich: {
              nt1: {
                color: '#fff',
                backgroundColor: attackSourcesColor[0],
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 100,
              },
              nt2: {
                color: '#fff',
                backgroundColor: attackSourcesColor[1],
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 100,
              },
              nt3: {
                color: '#fff',
                backgroundColor: attackSourcesColor[2],
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 100,
              },
              nt: {
                color: '#fff',
                backgroundColor: attackSourcesColor[3],
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 100,
              },
              title1: {
                backgroundColor: attackSourcesColor[0],
                color: '#fff',
                width: 90,
                align: 'left',
                borderRadius: 5,
                padding: 5,
              },
              title2: {
                backgroundColor: attackSourcesColor[1],
                color: '#fff',
                width: 90,
                align: 'left',
                borderRadius: 5,
                padding: 5,
              },
              title3: {
                backgroundColor: attackSourcesColor[2],
                color: '#fff',
                width: 90,
                align: 'left',
                borderRadius: 5,
                padding: 5,
              },
              title: {
                backgroundColor: attackSourcesColor[3],
                color: '#fff',
                width: 90,
                align: 'left',
                borderRadius: 5,
                padding: 5,
              },
            },
            formatter: function(value, index) {
              index = contains(attackSourcesName, value) + 1
              if (index - 1 < 3) {
                return [
                  '{nt' +
                    index +
                    '|' +
                    index +
                    '}' +
                    '  {title' +
                    index +
                    '|' +
                    value +
                    '}',
                ].join('\n')
              } else {
                return ['{nt|' + index + '}' + '  {title|' + value + '}'].join(
                  '\n'
                )
              }
            },
          },
        },
        series: [
          {
            z: 2,
            //name: 'value',
            type: 'bar',
            barWidth: '10',
            animationDuration: 150,
            data: attackSourcesDataFmt(attackSourcesData),
            itemStyle: {
              normal: {
                color: function(params) {
                  return attackSourcesColor[
                    params.dataIndex > 3 ? 3 : params.dataIndex
                  ]
                },
                barBorderRadius: 5,
              },
            },
            label: {
              show: true,
              position: 'right',
              color: '#00C2FF',
              fontSize: 10,
              offset: [10, 0],
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    chart3() {
      const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
      const xData = ['北京', '上海', '广州', '深圳', '香港', '澳门', '台湾']
      const option = {
        legend: {
          icon: 'circle',
          top: '5%',
          right: '5%',
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: '#556677',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: 'rgba(0,0,0,0)',
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 0,
            },
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)',
        },
        grid: {
          left: '2%',
          right: '8%',
          bottom: '2%',
          top: '10%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisLine: {
              lineStyle: {
                color: '#00C2FF', //x轴颜色
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#00C2FF', //坐标轴字颜色
              },
            },
            axisPointer: {
              label: {
                padding: [5, 5, 5],
                backgroundColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#fff', // 0% 处的颜色
                    },
                    {
                      offset: 0.9,
                      color: '#fff', // 0% 处的颜色
                    },
                    {
                      offset: 0.9,
                      color: '#33c0cd', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#33c0cd', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#00C2FF', //y轴颜色
              },
            },
            axisLabel: {
              textStyle: {
                color: '#00C2FF',
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: 'Adidas',
            type: 'line',
            data: [10, 10, 30, 12, 15, 3, 7],
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#9effff',
                },
                {
                  offset: 1,
                  color: '#9E87FF',
                },
              ]),
              shadowColor: 'rgba(158,135,255, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[0],
                borderColor: colorList[0],
              },
            },
          },
          {
            name: 'Nike',
            type: 'line',
            data: [5, 12, 11, 14, 25, 16, 10],
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#73DD39',
                },
                {
                  offset: 1,
                  color: '#73DDFF',
                },
              ]),
              shadowColor: 'rgba(115,221,255, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[1],
                borderColor: colorList[1],
              },
            },
          },
        ],
      }

      let chart = document.getElementById('box_03')
      let myChart = echarts.init(chart)
      let i = 0
      setInterval(function() {
        console.log(i)
        i = i === xData.length ? 0 : i + 1
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0, // 显示第几个series
          dataIndex: i, // 显示第几个数据
        })
      }, 2000)
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    chart4() {
      var myChart = echarts.init(document.getElementById('box_04'))
      var option = {
        legend: {
          show: false,
          orient: 'vertical',
          top: 'center',
          right: '5%',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7'],
          textStyle: {
            color: '#fff',
            fontSize: 10,
          },
        },
        grid: {
          left: '3%',
          top: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: ['30%', '80%'],
            center: ['50%', '63%'],
            roseType: 'radius',
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 20,
                lineStyle: {
                  color: '#CCCCCC',
                  width: 1,
                },
              },
            },
            label: {
              normal: {
                formatter: '{b|{b}}\n{hr|}\n{c|{c}%}',
                rich: {
                  b: {
                    fontSize: 10,
                    color: '#FFF',
                    align: 'left',
                    padding: 4,
                  },
                  hr: {
                    borderColor: '#CCCCCC',
                    width: '100%',
                    borderWidth: 2,
                    height: 0,
                  },
                  c: {
                    fontSize: 10,
                    align: 'center',
                    padding: 4,
                    color: '#00EDED',
                  },
                },
              },
            },
            data: [
              {
                value: 1,
                name: 'rose1',
                itemStyle: {
                  color: 'rgba(50,123,250,0.7)',
                  borderColor: 'rgba(50,123,250,1)',
                  borderWidth: 1,
                },
              },
              {
                value: 2,
                name: 'rose2',
                itemStyle: {
                  color: 'rgba(244,201,7,0.7)',
                  borderColor: 'rgba(244,201,7,1)',
                  borderWidth: 1,
                },
              },
              {
                value: 3,
                name: 'rose3',
                itemStyle: {
                  color: 'rgba(23,216,161,0.7)',
                  borderColor: 'rgba(23,216,161,1)',
                  borderWidth: 1,
                },
              },
              {
                value: 4,
                name: 'rose4',
                itemStyle: {
                  color: 'rgba(122,60,235,0.7)',
                  borderColor: 'rgba(122,60,235,1)',
                  borderWidth: 1,
                },
              },
              {
                value: 5,
                name: 'rose5',
                itemStyle: {
                  color: 'rgba(15,197,243,0.7)',
                  borderColor: 'rgba(15,197,243,1)',
                  borderWidth: 1,
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
    chart5() {
      var myChart = echarts.init(document.getElementById('box_05'))
      var xData2 = [
        '容城谷庄',
        '雄县七间房',
        '安新三台',
        '雄县张岗',
        '安新寨里',
      ]
      var data1 = [200, 100, 200, 200, 100]
      var data2 = [300, 200, 300, 300, 400]
      var option = {
        tooltip: {
          trigger: 'item',
        },
        grid: {
          left: '6%',
          right: '2%',
          bottom: '2%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          data: xData2,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 10,
            },
            //margin: 20, //刻度标签与轴线之间的距离。
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
            textStyle: {
              color: '#fff',
              fontSize: 10,
            },
          },
        },
        series: [
          {
            //三个最低下的圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [25, 5],
            symbolOffset: [0, 3],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function(params) {
                var a = params.name.slice(0, 2)
                if (a === '容城') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#FF9A22', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFD56E', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '雄县' || a === '雄州') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#00EC28', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5DF076', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '安新') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#12B9DB', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#6F8EF2', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                }
              },
            },
            data: [1, 1, 1, 1, 1],
          },
          //下半截柱状图
          {
            name: '2020',
            type: 'bar',
            barWidth: 25,
            barGap: '-100%',
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function(params) {
                var a = params.name.slice(0, 2)
                if (a === '容城') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#FF9A22', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFD56E', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '雄县' || a === '雄州') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#00EC28', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5DF076', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '安新') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#12B9DB', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#6F8EF2', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                }
              },
            },
            data: data1,
          },

          {
            // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: 'bar',
            barWidth: 25,
            barGap: '-100%',
            stack: '广告',
            itemStyle: {
              color: 'transparent',
            },
            data: data1,
          },

          {
            name: '', //头部
            type: 'pictorialBar',
            symbolSize: [25, 5],
            symbolOffset: [0, -3],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              color: '#163F7A',
              opacity: 1,
            },
            data: data2,
          },

          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [25, 5],
            symbolOffset: [0, -3],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function(params) {
                var a = params.name.slice(0, 2)
                if (a === '容城') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#FF9A22', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFD56E', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '雄县' || a === '雄州') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#00EC28', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5DF076', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                } else if (a === '安新') {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: '#12B9DB', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#6F8EF2', // 100% 处的颜色
                      },
                    ],
                    false
                  )
                }
              },
            },
            symbolPosition: 'end',
            data: data1,
          },
          {
            name: '2019',
            type: 'bar',
            barWidth: 25,
            barGap: '-100%',
            z: 0,
            itemStyle: {
              color: '#163F7A',
              opacity: 0.7,
            },
            data: data2,
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    chart6() {
      var myChart = echarts.init(document.getElementById('box_06'))
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '2%',
          top: '30%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#44607C',
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 10,
                color: '#D5CBE8',
              },
            },
            axisTick: {
              show: false,
            },
            data: [
              '11点',
              '12点',
              '13点',
              '14点',
              '15点',
              '16点',
              '17点',
              '18点',
              '19点',
              '20点',
              '21点',
              '22点',
            ],
          },
        ],
        yAxis: [
          {
            type: 'value',
            // name: '单位（%）',
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: 'none',
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 10,
                color: '#D5CBE8',
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#57617B',
              },
            },
          },
        ],
        series: [
          {
            name: '移动',
            type: 'line',
            smooth: true,
            stack: '总量',
            symbol: 'circle',
            symbolSize: 2,
            showSymbol: false,
            animationDelay: 1000,
            animationDuration: 1000,
            markPoint: {
              symbol:
                'path://M783.136 180.064C771.872 168.832 757.152 160 742.4 160L281.6 160C266.848 160 252.128 168.832 240.864 180.064 229.632 191.328 224 209.248 224 224l0 460.8c0 14.752 5.632 26.272 16.864 37.536C252.128 733.568 266.848 736 281.6 736l115.2 0 115.2 115.2 115.2-115.2 115.2 0c14.752 0 29.472-2.432 40.736-13.664C794.368 711.072 800 699.552 800 684.8L800 224C800 209.248 794.368 191.328 783.136 180.064z',
              symbolOffset: [0, '-60%'],
              symbolSize: 25, //这里可以改变大小
              data: [
                {
                  type: 'max',
                  name: '最大值',
                },
              ],
              label: {
                offset: [0, -2],
              },
              animationDelay: 2000,
              animationDuration: 1000,
            },
            lineStyle: {
              normal: {
                width: 2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#64C3FA', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#A774FC', // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                opacity: 0.9,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(52, 79, 168, 0.8)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(52, 79, 168, 0.6)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.8)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: '#3A5493',
                borderColor: '',
                borderWidth: 10,
              },
            },
            data: [220, 182, 191, 134, 250, 120, 110, 125, 145, 122, 165, 122],
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    chart7() {
      var myChart = echarts.init(document.getElementById('box_07'))
      var plantCap = [
        {
          name: '居住',
          value: 'Settlements',
        },
        {
          name: '行政',
          value: 'administration',
        },
        {
          name: '文化',
          value: 'Culture',
        },
        {
          name: '医疗',
          value: 'hospital ',
        },
        {
          name: '教育',
          value: 'education ',
        },
        {
          name: '交通',
          value: 'hospital',
        },
        {
          name: '产业',
          value: 'industry',
        },
      ]
      var datalist = [
        {
          offset: [50, 50],
          symbolSize: 50,
          opacity: 0.95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#29c0fb',
            },
            {
              offset: 1,
              color: '#2dc5b9',
            },
          ]),
        },
        {
          offset: [28, 70],
          symbolSize: 45,
          opacity: 0.95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#35d17e',
            },
            {
              offset: 1,
              color: '#49ddb2',
            },
          ]),
        },
        {
          offset: [10, 40],
          symbolSize: 30,
          opacity: 0.95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#e5d273',
            },
            {
              offset: 1,
              color: '#e4a37f',
            },
          ]),
        },
        {
          offset: [34, 26],
          symbolSize: 30,
          opacity: 0.95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#277aec',
            },
            {
              offset: 1,
              color: '#57c5ec',
            },
          ]),
        },
        {
          offset: [80, 65],
          symbolSize: 25,
          opacity: 0.95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#e54948',
            },
            {
              offset: 1,
              color: '#f08456',
            },
          ]),
        },
        {
          offset: [70, 36],
          symbolSize: 28,
          opacity: 0.7,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#11c46e',
            },
            {
              offset: 1,
              color: '#f08456',
            },
          ]),
        },
        {
          offset: [68, 80],
          symbolSize: 25,
          opacity: 0.68,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#ff4141',
            },
            {
              offset: 1,
              color: '#ff8989',
            },
          ]),
        },
      ]
      var datas = []
      for (var i = 0; i < plantCap.length; i++) {
        var item = plantCap[i]
        var itemToStyle = datalist[i]
        datas.push({
          name: item.name + '\n' + item.value,
          value: itemToStyle.offset,
          symbolSize: itemToStyle.symbolSize,
          label: {
            normal: {
              textStyle: {
                fontSize: 10,
                fontWeight: 600,
                lineHeight: 12,
              },
            },
          },
          itemStyle: {
            normal: {
              color: itemToStyle.color,
              opacity: itemToStyle.opacity,
            },
          },
        })
      }
      var option = {
        grid: {
          show: false,
          top: 10,
          bottom: 5,
        },
        xAxis: [
          {
            gridIndex: 0,
            type: 'value',
            show: false,
            min: 0,
            max: 100,
            nameLocation: 'middle',
            nameGap: 5,
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: 'middle',
            nameGap: 30,
          },
        ],
        series: [
          {
            type: 'effectScatter',
            // symbol: 'circle',
            // symbolSize: 120,

            hoverAnimation: true,
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textStyle: {
                  fontSize: '20',
                },
              },
            },
            itemStyle: {
              normal: {
                color: '#00acea',
              },
            },
            data: datas,
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    chart8() {
      var myChart = echarts.init(document.getElementById('box_08'))
      var option = {
        grid: {
          left: '4%',
          right: '4%',
          bottom: '2%',
          top: '30%',
          containLabel: true,
        },
        xAxis: {
          data: ['人员1', '人员2', '人员3', '人员4', '人员5', '人员7', '人员8'],
          axisLine: {
            lineStyle: {
              color: '#3d5269',
            },
          },
          axisLabel: {
            color: '#fff',
            fontSize: 10,
          },
        },
        yAxis: {
          name: '单位:次',
          nameTextStyle: {
            color: '#fff',
            fontSize: 10,
          },
          axisLine: {
            lineStyle: {
              color: '#3d5269',
            },
          },
          axisLabel: {
            color: '#fff',
            fontSize: 10,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#2d3d53',
            },
          },
          interval: 1000,
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#5ef3ff',
                    },
                    {
                      offset: 1,
                      color: '#06a4f4',
                    },
                  ],
                  false
                ),
              },
            },
            label: {
              normal: {
                show: true,
                fontSize: 10,
                color: '#ffffff',
                position: 'top',
              },
            },
            data: [254, 3254, 1654, 2454, 4757, 2011, 1211],
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
/*引用字库*/
@font-face {
  font-family: electronicFont;
  src: url('~@/assets/font/DS-DIGIT.TTF');
}
.home {
  width: 100%;
  background: url('../assets/beijing.png') no-repeat;
  height: 100vh;
  background-size: 100% 100%;

  .header {
    background: url('../assets/header.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 0.45rem;
    .title {
      text-align: center;
      line-height: 1.1rem;
      font-weight: 800;
      // text-shadow: 2px 2px 2px #275bdb;
      text-shadow: -1px -1px 1px #fff, 1px 2px 2px #00ffff;
    }

    #date {
      position: absolute;
      top: 0.22rem;
      left: 0.375rem;
      font-size: 0.45rem;
      font-family: 'electronicFont' !important;
      text-align: center;
      color: #00ccff;
    }
    .dropdown {
      position: absolute;
      top: 0.625rem;
      right: 0.375rem;
      font-size: 0.275rem;
    }
  }
  .section {
    width: 99.8%;
    // display: flex;
    // border: 1px solid red;
    border-radius: 5px;
    height: calc(100% - 1.1rem);
    // background: rgba(20, 35, 90, 0.4);
    .cloum {
      // flex: 1;
      float: left;
      width: 28%;
      margin: 0 0.2rem 0.1rem 0.2rem;
      height: 90vh;
      border: 1px solid #274774;
      border-radius: 10px;
      // display: flex;
      flex-direction: column;
      // background: rgba(20, 35, 90, 0.4);
      .items {
        // flex: 1;
        margin: 0.2rem;
        background: rgba(20, 35, 90, 0.4);
        height: 21.5%;
        width: 96%;
        position: relative;
        .item {
          height: 90%;
          // background: rgba(20, 35, 90, 0.4);
          #box_01 {
            height: 100%;
          }
        }
      }
      .items2 {
        // flex: 1;
        margin: 0.2rem;
        background: rgba(20, 35, 90, 0.4);
        height: 28%;
        width: 96%;
        position: relative;
        .item {
          height: 90%;
          // background: rgba(20, 35, 90, 0.4);
        }
      }
    }
    .cloum2 {
      // flex: 1.3;
      float: left;
      width: 42%;
      margin: 0 0.2rem 0.1rem 0;
      height: 90vh;
      background: transparent;
      // border: 1px solid #274774;
      border-radius: 10px;
      //  background: rgba(20, 35, 90, 0.4);
      // workShop {
      //   margin-top: 15%;
      // }
    }
    .cloum3 {
      width: 27%;
      float: left;
      height: 90vh;
      border: 1px solid #274774;
      border-radius: 10px;
      flex-direction: column;
      // background: rgba(20, 35, 90, 0.4);
      .items {
        // flex: 1;
        margin: 0.2rem;
        background: rgba(20, 35, 90, 0.4);
        height: 21.5%;
        width: 96%;
        position: relative;
        .item {
          height: 90%;
          // background: rgba(20, 35, 90, 0.4);
          #box_01 {
            height: 100%;
          }
        }
      }
      .items2 {
        // flex: 1;
        margin: 0.2rem;
        background: rgba(20, 35, 90, 0.4);
        height: 28%;
        width: 96%;
        position: relative;
        .item {
          height: 90%;
          // background: rgba(20, 35, 90, 0.4);
        }
      }
    }
    .clear {
      clear: both;
    }
  }
}
</style>
