<template>
  <div class="home">
    <header class="header">
      <div class="title">智能工厂生产车间大屏</div>
      <div id="date"></div>
      <div id="company">测试工厂</div>
    </header>
    <section class="section">
      <div class="cloum">
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item"
               id="box_01"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item"
               id="box_02"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item"
               id="box_03"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items2">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_04">
            <el-table
              :data="tableData"
              :row-style="{ height: '0.1rem' }"
              :cell-style="{ padding: '0px' }"
            >
              <el-table-column prop="name" label="车间名"> </el-table-column>
              <el-table-column prop="type" label="设备名"> </el-table-column>
              <el-table-column prop="num" label="报警信息"> </el-table-column>
              <el-table-column prop="status" label="处理状态"></el-table-column>
            </el-table>
          </div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
      </div>
      <div class="cloum2">
        <workShop></workShop>
      </div>
      <div class="cloum3">
        <div class="items">

          <!-- <dv-decoration-10 style="width:90%;height:5px;margin:auto" /> -->
          <dv-border-box-13>
            <div class="item"
                 id="box_05"></div>
          </dv-border-box-13>

          <!-- <dv-decoration-10 style="width:90%;height:5px;margin:auto" /> -->
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item"
               id="box_06"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item"
               id="box_07"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items2">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item"
               id="box_08"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
      </div>
      <div class="clear"></div>
    </section>
  </div>
</template>

<script>
import API from '@/api/busin'
import workShop from '@/components/workshop/index2'
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
  data () {
    return {
      //图一横坐标
      Xaxis1: [],
      //图一数据
      data1: [],

      //图二横坐标
      Xaxis2: [],
      //图二数据
      data2: [],

      //图三数据
      data3: [],
      devsum: [],
      Xaxis3: [],

      //图五数据
      Xaxis5: [],
      //图五数据
      data5: [],
      sumpro: [],
      tableData: [
        {
          name: '2222',
          type: 'test',
          num: '12',
          status: '0',
        },
        {
          name: '2342',
          type: 'test',
          num: '12',
          status: '1',
        },
        {
          name: '2552',
          type: 'test',
          num: '12',
          status: '0',
        },
        {
          name: '7787',
          type: 'test',
          num: '12',
          status: '1',
        },
        {
          name: '657',
          type: 'test',
          num: '12',
          status: '1',
        },
        {
          name: '2222',
          type: 'test',
          num: '12',
          status: '0',
        },
      ],
    }
  },
  created() {
    //表格自动滚动
    this.play()
  },
  mounted() {
    require('../assets/js/common.js')
    this.chart6()
    this.chart8()
    this.alarmGroupMonth()
    this.alarmOfMachineTop()
    this.alarmTypeTop()
    this.findMachineListByExample()
    this.outputOfMachineTop()
  },
  methods: {
    //change,play实现表格自动滚动
    change() {
      //把第一条数据插入数组最后一条
      this.tableData.push(this.tableData[0])
      //删除数组中第一条数据
      this.tableData.shift()
    },
    play() {
      //每两秒执行一次插入删除操作
      setInterval(this.change, 1000)
    },
    // 月报警趋势
    alarmGroupMonth () {
      API.alarmGroupMonth().then((res) => {
        // console.log(res)
        this.Xaxis1 = []
        this.data1 = []
        for (var i = 0; i < res.info.length; i++) {
          this.Xaxis1.push(res.info[i].date)
          this.data1.push(res.info[i].count)
        }
        this.chart3()
        // console.log(this.data1)
      })
    },
    // 设备报警排名
    alarmOfMachineTop () {
      const params = {
        limit: 5,
      }
      API.alarmOfMachineTop(params).then((res) => {
        console.log(res)
        var list = []
        this.Xaxis3 = []
        this.devsum = []
        for (var i = 0; i < res.info.length; i++) {
          list.push({
            name: res.info[i].workshop_name,
            value: res.info[i].machine_name,
          })
          this.devsum.push(res.info[i].sum_alarm_num)
          this.Xaxis3.push(res.info[i].machine_name)
        }
        this.data3 = list
        // console.log(list)
        this.chart7()
        this.chart1()
      })
    },
    // 设备报警类型排名
    alarmTypeTop () {
      const params = {
        limit: 5,
      }
      API.alarmTypeTop(params).then((res) => {
        // console.log(res)
        this.Xaxis2 = []
        this.data2 = []
        for (var i = 0; i < res.info.length; i++) {
          this.Xaxis2.push(res.info[i].info)
          this.data2.push(res.info[i].count)
        }
        this.chart2()
      })
    },
    // 查询企业内设备（车间名、设备数量、各状态设备数量【作业、待机、报警】）
    findMachineListByExample() {
      const params = {
        limit: 5,
      }
      API.findMachineListByExample(params).then((res) => {
        // console.log(res)
      })
    },
    // 各设备产量排名【limit true，cId false】
    outputOfMachineTop() {
      const params = {
        limit: 5,
      }
      API.outputOfMachineTop(params).then((res) => {
        console.log(res)
        this.data5 = []
        this.Xaxis5 = []
        this.sumpro = []
        var list = []
        for (var i = 0; i < res.info.length; i++) {
          this.Xaxis5.push(res.info[i].machine_name)
          this.data5.push(
            Math.floor(
              (res.info[i].passrate / 100) * res.info[i].sum_production
            )
          )
          this.sumpro.push(res.info[i].sum_production)
        }
        this.chart5()
        // console.log(this.Xaxis5)
        // console.log(this.data5)
        // console.log(this.sumpro)
      })
    },
    chart1 () {
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
          // data: ['1', '2'],
          data: ['设备总数'],
          right: 0,
          top: 0,
          textStyle: {
            color: '#fff',
          },
          itemWidth: 12,
          itemHeight: 10,
          // itemGap: 35
        },
        xAxis: {
          type: 'category',
          data: this.Xaxis3,
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
            name: '设备总数',
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
            data: this.devsum,
          },
          // {
          //   name: '2',
          //   type: 'bar',
          //   barWidth: '15%',
          //   itemStyle: {
          //     normal: {
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         {
          //           offset: 0,
          //           color: '#12DCFE',
          //         },
          //         {
          //           offset: 1,
          //           color: '#0094FE',
          //         },
          //       ]),
          //       barBorderRadius: 5,
          //     },
          //   },
          //   data: [4, 5, 5, 5, 5, 4, 4, 5, 5],
          // },
        ],
      }

      var app = {
        currentIndex: -1,
      }
      setInterval(function () {
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    chart2 () {
      var myChart = echarts.init(document.getElementById('box_02'))
      function contains (arr, dst) {
        var i = arr.length
        while ((i -= 1)) {
          if (arr[i] == dst) {
            return i
          }
        }
        return false
      }

      var attackSourcesData = this.data2
      var attackSourcesName = this.Xaxis2
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

      function attackSourcesDataFmt (sData) {
        var sss = []
        sData.forEach(function (item, i) {
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
            formatter: function (value, index) {
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
                color: function (params) {
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    chart3 () {
      const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
      const xData = this.Xaxis1
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
            boundaryGap: true,
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
          // {
          //   name: 'Adidas',
          //   type: 'line',
          //   data: [10, 10, 30, 12, 15, 3, 7],
          //   symbolSize: 1,
          //   symbol: 'circle',
          //   smooth: true,
          //   yAxisIndex: 0,
          //   showSymbol: false,
          //   lineStyle: {
          //     width: 2,
          //     color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          //       {
          //         offset: 0,
          //         color: '#9effff',
          //       },
          //       {
          //         offset: 1,
          //         color: '#9E87FF',
          //       },
          //     ]),
          //     shadowColor: 'rgba(158,135,255, 0.3)',
          //     shadowBlur: 10,
          //     shadowOffsetY: 20,
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: colorList[0],
          //       borderColor: colorList[0],
          //     },
          //   },
          // },
          {
            name: '报警率',
            type: 'line',
            data: this.data1,
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
        // console.log(i)
        i = i === xData.length ? 0 : i + 1
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0, // 显示第几个series
          dataIndex: i, // 显示第几个数据
        })
      }, 2000)
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    chart4 () {
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    chart5 () {
      var myChart = echarts.init(document.getElementById('box_05'))
      var data1 = this.data5
      var data2 = this.sumpro
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
          data: this.Xaxis5,
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
                // console.log(params)
                var a = params.name
                if (a === '生产设备02' || a === '生产设备01') {
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
                } else if (a === '生产设备03') {
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
                } else if (a === '生产设备04') {
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
                var a = params.name
                if (a === '生产设备02' || a === '生产设备01') {
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
                } else if (a === '生产设备03') {
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
                } else if (a === '生产设备04') {
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
                var a = params.name
                if (a === '生产设备02' || a === '生产设备01') {
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
                } else if (a === '生产设备03') {
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
                } else if (a === '生产设备04') {
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
            name: '设备产量',
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    chart6 () {
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    chart7 () {
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
      for (var i = 0; i < this.data3.length; i++) {
        var item = this.data3[i]
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    chart8 () {
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
  },
}
</script>
<style>
.el-table {
  height: 100%;
  width: 96% !important;
  background-color: transparent !important;
  color: #00d4c7 !important;
  font-size: 0.3rem !important;
  margin: 2% 2%;
}

.el-table thead {
  color: #ffffff !important;
  background-color: #1b3565;
}
/* 设置table header的背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important;
  padding: 2% 0 !important;
  text-align: center !important;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 0px solid #05a4b8 !important;
}

.el-table--border,
.el-table--group {
  border: 1px solid #05a4b8 !important;
}
.el-table::after {
  width: 0% !important;
  height: 0% !important;
}
.el-table::before {
  width: 0% !important;
  height: 0% !important;
}
.el-table .cell {
  line-height: 100% !important;
  padding-left: 0 !important;
}
.item .el-table th {
  width: 20% !important;
}
element.style {
  /* width: 400px; */
}
.el-table__header {
  padding: 0;
  height: 5%;
}
.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: fixed;
  border-collapse: separate;
  width: auto !important;
}
</style>
<style lang="scss" scoped>
/*引用字库*/
@font-face {
  font-family: electronicFont;
  src: url('~@/assets/font/DS-DIGIT.TTF');
}
.home {
  width: 100%;
  background: url('../assets/beijing.png') rgba(42, 49, 127, .1)  no-repeat;
  height: 100vh;
  background-size: 100% 100%;
  background-blend-mode: multiply;

  .header {
    background: url('~@/assets/title.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 0.45rem;
    .title {
      text-align: center;
      line-height: 1.1rem;
      font-weight: 800;
      // text-shadow: 2px 2px 2px #275bdb;
      text-shadow: -1px -1px 1px #fff, 1px 2px 2px #55ffff;
    }
    #company{
      position: absolute;
      top: 0.38rem;
      left: 0.375rem;
      font-size: 0.45rem;
      font-family: 'electronicFont' !important;
      text-align: center;
      color: #15a0db;
    }
    #date {
      position: absolute;
      top: 0.38rem;
      right: 0.375rem;
      font-size: 0.45rem;
      font-family: 'electronicFont' !important;
      text-align: center;
      color: #15a0db;
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
