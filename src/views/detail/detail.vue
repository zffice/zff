<template>
  <div class="detail">
    <section class="section">
      <div class="cloum">
        <div class="navmenu">
          <el-menu class="navone" default-active="1" style="left: -100px;">
            <el-menu-item
              :index="index"
              v-for="(item, index) in workshopList"
              :key="index"
              @click="changeWs(item.ws_id)"
            >
              <span slot="title">{{ item.workshop_name }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="cloum2">
        <div class="clocen">
          <el-carousel :interval="0" type="card" height="70vh" trigger="click">
            <el-carousel-item
              v-for="item in machineList"
              :key="item.id"
              class="items"
            >
              <div class="mask">{{ item.machine_name }}</div>
              <div class="item">
                <el-tooltip placement="right" popper-class="popperTooltip">
                  <div slot="content">
                    品牌：{{ item.machine_brand }}<br />
                    型号：{{ item.machine_model }}<br />
                    出厂日期：{{ item.manufacture_date }}<br />
                    外形尺寸：{{ item.boundary_dimension }}<br />
                    用途：{{ item.use }}<br />
                  </div>
                  <img src="../../assets/images/sb.png" alt="" />
                </el-tooltip>
                <div class="imgdata" v-if="item.status == 1">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div>
                    <div
                      class="showinfo"
                      style="border-right: 2px solid #2e7fc8;"
                    >
                      {{ (item.today_rtime / 60).toFixed(1) }}
                      <span style="color:#476699;font-size:0.1rem">分钟</span
                      ><br />
                      <span style="color:#91ABC6;font-size:0.25rem"
                        >运行时长</span
                      >
                    </div>
                    <div
                      class="showinfo"
                      style="border-right: 2px solid #2e7fc8;"
                    >
                      {{ item.today_production }}
                      <span style="color:#476699;font-size:0.1rem">件</span
                      ><br />
                      <span style="color:#91ABC6;font-size:0.25rem"
                        >开机产量</span
                      >
                    </div>
                    <div class="showinfo">
                      {{ item.today_alarm_num }}
                      <span style="color:#476699;font-size:0.1rem">次</span
                      ><br />
                      <span style="color:#91ABC6;font-size:0.25rem"
                        >报警次数</span
                      >
                    </div>
                  </div>
                  <!-- <div class="item_2" :id="'product' + item.dpu_code"></div> -->
                  <!-- <dv-decoration-10 style="width:100%;height:5px;margin:auto" /> -->
                </div>
                <div class="imgdata" v-if="item.status == 2">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div class="dev_info" style="color:#fff">
                    <img src="../../assets/images/dev_await.png" alt="" />
                    <span>待机</span>
                  </div>
                  <!-- <div class="item_2" :id="'product' + item.dpu_code"></div> -->
                  <!-- <dv-decoration-10 style="width:100%;height:5px;margin:auto" /> -->
                </div>
                <div class="imgdata" v-if="item.status == 3">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div class="dev_info" style="color:red">
                    <img src="../../assets/images/dev_warm.png" alt="" />
                    <span>报警</span>
                  </div>
                  <!-- <div class="item_2" :id="'product' + item.dpu_code"></div> -->
                  <!-- <dv-decoration-10 style="width:100%;height:5px;margin:auto" /> -->
                </div>
                <div class="imgdata" v-if="item.status == 0">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div class="dev_info" style="color:orange">
                    <img src="../../assets/images/dev_off.png" alt="" />
                    <span>未开机</span>
                  </div>
                  <!-- <div class="item_2" :id="'product' + item.dpu_code"></div> -->
                  <!-- <dv-decoration-10 style="width:100%;height:5px;margin:auto" /> -->
                </div>
                <div class="imgdata3">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div
                    class="item_1"
                    :id="'productChart' + item.dpu_code"
                  ></div>
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                </div>
              </div>
            </el-carousel-item>
            <!-- 其他设备 -->
            <el-carousel-item class="items">
              <div class="mask">学校设备</div>
              <div class="item">
                <img src="../../assets/images/sb.png" alt="" />
                <div class="imgdata2" style="margin-left:5%">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div class="item_2">
                    <div id="cirInfo"></div>
                  </div>
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                </div>
                <div class="imgdata2">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div class="item_2"></div>
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                </div>
                <div class="clear"></div>
              </div>
            </el-carousel-item>
            <el-carousel-item class="items">
              <div class="mask">环境</div>
              <div class="item">
                <img src="../../assets/images/sb.png" alt="" />
                <div class="imgdata4">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div class="item_2">
                    <div id="glinfo"></div>
                  </div>
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                </div>
                <div class="imgdata4">
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                  <div class="item_2">
                    <div id="glinfo2"></div>
                  </div>
                  <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                </div>
                <div class="clear"></div>
              </div>
            </el-carousel-item>
          </el-carousel>

          <div class="clear"></div>
        </div>
        <div class="bottom">
          <bottom :workshop="alarmCount"></bottom>
        </div>
      </div>
      <div class="cloum">
        <div class="navmenu">
          <el-menu class="navtwo" default-active="1" style="right: -100px;">
            <el-menu-item index="1">
              <span slot="title">生产设备</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">供电设备</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">监控设备</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">告警设备</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span slot="title">其他设备</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="clear"></div>
    </section>

    <!--弹框-->
    <el-dialog
      title="实时报警"
      :visible.sync="dialogVisible"
      :close-on-click-modal="true"
      :modal="true"
      :show-close="true"
      :center="true"
    >
      {{ alarmCount.content }}
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/api/busin'
import bottom from '@/components/workshop/bottom'
import echarts from 'echarts'
export default {
  name: 'Detail',
  components: {
    bottom,
  },
  data() {
    return {
      productCharts: {},
      socket: [],
      queueReceiveSetting: {
        //消息队列配置
        websock: null,
        client: null,
        wsuri: 'ws://localhost:9531/ws/asset/300219050525',
      },

      dialogVisible: false,
      machineList: [],
      workshopList: [],
      id: 1,
    }
  },
  created() {
    //根据车间编号查询车间信息（车间名、dpuCode、状态）
    var id = this.$route.query.id
    this.findMachineByWsId(id)
    this.findMachineListByCompany()
    this.getWsId()
  },
  mounted() {
    require('../../assets/js/common.js')
    // 获取url上的车间号
    this.product()
    //学校设备静态数据
    this.schoolInData()
    this.schoolOutData()
    //环境
    this.cirTem()
    this.product()
  },
  watch: {
    machineList: {
      handler: function() {
        this.goShopList()
      },
      deep: true,
    },
  },
  computed: {
    alarmCount: {
      get() {
        var statis = {}
        var count = 0
        var rcount = 0
        var standbycount = 0
        var acount = 0
        var alarmInfoList = []
        alarmInfoList.length = 0
        console.log(alarmInfoList)
        this.machineList.forEach((item) => {
          if (item.acount !== undefined) {
            count = item.acount + count
          }
          if (item.content !== undefined) {
            item.content.forEach((alarm) => {
              alarmInfoList.push({
                wsname: item.workshop_name,
                mname: item.machine_name,
                info: alarm,
                time: item.time,
              })
            })
          }
          console.log(alarmInfoList)
          if (item.status == 1) {
            rcount++
          }
          if (item.status == 2) {
            standbycount++
          }
          if (item.status == 3) {
            acount++
          }
        })
        statis.count = count
        statis.rcount = rcount
        statis.standbycount = standbycount
        statis.acount = acount
        statis.content = alarmInfoList
        return statis
      },
      set: function() {},
    },
  },
  methods: {
    changeWs(id) {
      this.findMachineByWsId(id)
    },
    findMachineListByCompany() {
      const params = {
        cId: localStorage.getItem('comId'),
      }
      API.findMachineListByCompany(params).then((res) => {
        this.workshopList = res.info
      })
    },
    getWsId() {},
    showAlarm() {
      this.dialogVisible = true
    },
    goShopList() {
      this.$emit('getShopCode', this.alarmCount)
      // this.router.push("/");
    },

    findMachineByWsId(id) {
      const params = {
        wsId: id,
      }
      API.findMachineByWsId(params)
        .then((res) => {
          this.machineList = []
          res.info.forEach((item) => {
            this.machineList.push(item)
          })
        })
        .then(() => {
          this.product()
        })
    },
    //创建socket连接功能函数
    connect(wsobj, dpuCode) {
      //浏览器支持？
      if ('WebSocket' in window) {
        var host = 'ws://47.101.33.200:9531/ws/asset/' + dpuCode
        this.socket[wsobj] = new WebSocket(host)

        try {
          //连接事件
          this.socket[wsobj].onopen = () => {
            // alert(wsobj+":连接已建立！");
          }
          //错误事件
          this.socket[wsobj].onerror = (msg) => {
            alert('错误：' + msg.data)
          }

          //消息事件
          this.socket[wsobj].onmessage = (msg) => {
            this.machineList.forEach((item) => {
              if (item.dpu_code == dpuCode) {
                item.acount = 0
                item.today_rtime = item.today_rtime + 20
                item.today_production =
                  item.today_production + JSON.parse(msg.data).data.production
                item.status = JSON.parse(msg.data).data.status
                if (JSON.parse(msg.data).data.status == '3') {
                  item.time = JSON.parse(msg.data).data.time
                  item.acount = JSON.parse(msg.data).data.alarming.length
                  item.today_alarm_num =
                    item.today_alarm_num +
                    JSON.parse(msg.data).data.alarming.length
                  item.content = JSON.parse(msg.data).data.alarming
                  this.dialogVisible = true
                }
                if (JSON.parse(msg.data).data.status == '0') {
                  item.today_rtime = 0
                  item.today_production = 0
                }
              }
            })
            if (JSON.parse(msg.data).data.status == '1') {
              this.productCharts[dpuCode].productDate.xData.shift()
              this.productCharts[dpuCode].productDate.xData.push(
                JSON.parse(msg.data).data.time
              )
              this.productCharts[dpuCode].productDate.pNum.shift()
              this.productCharts[dpuCode].productDate.pNum.push(
                JSON.parse(msg.data).data.production
              )
              this.productCharts[dpuCode].productDate.bNum.shift()
              this.productCharts[dpuCode].productDate.bNum.push(
                JSON.parse(msg.data).data.unqualified
              )
              this.productCharts[dpuCode].chart.setOption({
                xAxis: {
                  data: this.productCharts[dpuCode].productDate.xData,
                },
                series: [
                  {
                    data: this.productCharts[dpuCode].productDate.pNum,
                  },
                  {
                    data: this.productCharts[dpuCode].productDate.bNum,
                  },
                ],
              })
            }
          }
          //关闭事件
          this.socket[wsobj].onclose = () => {
            alert(wsobj + ':socket closed!')
          }
        } catch (ex) {
          console.log(ex)
        }
      } else {
        // 浏览器不支持 WebSocket
        alert('您的浏览器不支持 WebSocket!')
      }
    },
    initWebSocket(dpuCode) {
      var self = this
      //ws地址
      if (self.queueReceiveSetting.websock) {
        self.queueReceiveSetting.websock.close()
      }
      self.queueReceiveSetting.websock = new WebSocket(
        'ws://localhost:9531/ws/asset/' + dpuCode
      )
      self.queueReceiveSetting.websock.onopen = () => {
        console.log('开启连接')
      }
      self.queueReceiveSetting.websock.onmessage = (msg) => {
        if (JSON.parse(msg.data).data.status == '1') {
          self.productDate.xData.shift()
          self.productDate.xData.push(JSON.parse(msg.data).data.time)
          self.productDate.pNum.shift()
          self.productDate.pNum.push(JSON.parse(msg.data).data.production)
          self.productDate.bNum.shift()
          self.productDate.bNum.push(JSON.parse(msg.data).data.unqualified)
          self.productCharts.setOption({
            xAxis: {
              data: self.productDate.xData,
            },
            series: [
              {
                data: self.productDate.pNum,
              },
              {
                data: self.productDate.bNum,
              },
            ],
          })
        }
        if (JSON.parse(msg.data).data.status == '3') {
          self.content = JSON.parse(msg.data).data.alarming[0]
          self.dialogVisible = true
        }
      }
      self.queueReceiveSetting.websock.onclose = () => {
        console.log('连接关闭')
      }
      self.queueReceiveSetting.websock.onerror = () => {
        console.log('连接出错')
        // this.initWebSocket();
      }
    },
    product() {
      const color = ['rgba(23, 255, 243', 'rgba(255,100,97']

      var roseCharts = document.getElementsByClassName('item_1') // 对应地使用ByClassName
      var dpuCode = []
      this.machineList.forEach((item) => {
        dpuCode.push(item.dpu_code)
      })

      for (var i = 0; i < roseCharts.length; i++) {
        var productDate = {
          xData: [
            '21:43:02',
            '21:43:22',
            '21:43:42',
            '21:44:02',
            '21:44:22',
            '21:44:42',
            '21:45:02',
          ],
          pNum: [0, 0, 0, 0, 0, 0, 0],
          bNum: [0, 0, 0, 0, 0, 0, 0],
        }
        // 通过for循环，在相同class的dom内绘制元素
        var productCharts = echarts.init(roseCharts[i])
        const option = {
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
            top: '20%',
            left: '4%',
            right: '4%',
            bottom: '8%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: productDate.xData,
              axisLabel: {
                interval: 0,
                rotate: 20,
                textStyle: {
                  color: 'rgb(0,253,255,0.6)',
                  fontSize: 10,
                },
              },
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: 'rgb(0,253,255,0.6)', //x轴颜色
                },
              },
              axisTick: {
                show: false,
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
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  fontSize: 10,
                  color: 'rgb(0,253,255,0.6)',
                },
              },
              splitLine: {
                lineStyle: {
                  color: 'rgb(23,255,243,0.3)',
                },
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(0,253,255,0.6)',
                },
              },
            },
          ],
          series: [
            {
              name: '产量',
              type: 'line',
              data: productDate.pNum,
              symbolSize: 1,
              symbol: 'circle',
              // smooth: true,
              yAxisIndex: 0,
              showSymbol: false,
              color: color[0] + ')',
              smooth: true,
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
                        color: color[0] + ', 0.3)',
                      },
                      {
                        offset: 0.8,
                        color: color[0] + ', 0)',
                      },
                    ],
                    false
                  ),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10,
                },
              },
            },
            {
              name: '回退量',
              type: 'line',
              data: productDate.bNum,
              symbolSize: 1,
              symbol: 'circle',
              // smooth: true,
              yAxisIndex: 0,
              showSymbol: false,
              color: color[1] + ')',
              smooth: true,
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
                        color: color[1] + ', 0.3)',
                      },
                      {
                        offset: 0.8,
                        color: color[1] + ', 0)',
                      },
                    ],
                    false
                  ),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10,
                },
              },
            },
          ],
        }

        productCharts.setOption(option)
        window.addEventListener('resize', function() {
          productCharts.resize()
        })
        var info = {
          chart: productCharts,
          productDate: productDate,
        }
        this.productCharts[dpuCode[i]] = info
        this.connect(i, dpuCode[i])
      }
    },
    machine() {
      let chart = document.getElementById('product')
      let myChart = echarts.init(chart)
      let data = [
        {
          name: '图一',
          value: 50,
          icon: 'hyacinth',
        },
        {
          name: '图二',
          value: 50,
          icon: 'algae',
        },
        {
          name: '图三',
          value: 50,
          icon: 'llegal',
        },
      ]
      let pos
      let seriesArr = []
      let titleArr = []
      data.map((item, index) => {
        pos =
          data.length == 4
            ? index * 33.3 + 12
            : data.length == 1
            ? 30
            : index * 26 + 25
        titleArr.push({
          text: item.name,
          left: pos + '%',
          top: '75%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '14',
            color: '#d0e3ee',
            textAlign: 'center',
          },
        })
        seriesArr.push({
          name: item.name,
          type: 'gauge',
          z: 3,
          min: 20,
          max: 200,
          splitNumber: 1,
          radius: '31',
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              width: 2,
              color: [[1, '#3882C5']],
              shadowColor: '#3882C5',
              shadowBlur: 8,
            },
          },
          axisTick: {
            // 坐标轴小标记
            length: 5, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: 'auto',
              width: 2,
            },
          },
          axisLabel: {
            color: '#3882C5',
            fontSize: 12,
          },
          splitLine: {
            // 分隔线
            length: 5, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto',
              width: 2,
            },
          },
          title: {
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 14,
              color: '#000',
            },
          },
          // 指针
          pointer: {
            length: '70%',
            width: '4%',
          },
          detail: {
            formatter: '{value}',
            offsetCenter: [0, '80%'],
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bold',
              backgroundColor: '#3882C5',
              color: '#fff',
              fontSize: 12,
            },
          },
          center: [pos + '%', '40%'],
          data: [
            {
              value: item.value,
              name: '次数',
            },
          ],
        })
      })

      var option = {
        title: titleArr,
        series: seriesArr,
      }

      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    machine2() {
      var option = {
        backgroundColor: '#000',
        xAxis: {
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          // 内圆
          {
            type: 'pie',
            radius: ['0', '45%'],
            center: ['50%', '50%'],
            z: 4,
            label: {
              normal: {
                position: 'center',
              },
            },
            hoverAnimation: false,
            data: [
              {
                name: '在线数量',
                value: 11111,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: '#0069D3',
                      },
                      {
                        offset: 0.5,
                        color: '#00B8F8',
                      },
                      {
                        offset: 1,
                        color: '#0068D3',
                      },
                    ]),
                  },
                },
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: '#fff',
                        align: 'center',
                        fontSize: 10,
                        fontWeight: 'normal',
                      },
                      b: {
                        color: '#fff',
                        align: 'center',
                        fontSize: 8,
                      },
                      c: {
                        color: '#fff',
                        align: 'center',
                        fontSize: 10,
                      },
                    },
                    formatter: function(params) {
                      return (
                        '{a|' +
                        '在线数量' +
                        '}\n\n' +
                        '{b|' +
                        params.value +
                        '}' +
                        '{c|个}'
                      )
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '14',
                      fontWeight: 'normal',
                      color: '#fff',
                    },
                  },
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
              },
            ],
          },
          //进度图
          {
            type: 'gauge',
            radius: '60%',
            center: ['50%', '50%'],
            min: 0,
            max: 1000,
            z: 5,
            splitNumber: 0, //刻度数量
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              show: true,
              lineStyle: {
                width: 20,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: '#0099FF',
                      },
                      {
                        offset: 1,
                        color: '#00FAFF',
                      },
                    ]),
                  ],
                ],
              },
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            pointer: {
              show: false,
            },
            title: {
              show: false,
              offsetCenter: [0, '-20%'], // x, y，单位px
              textStyle: {
                color: '#ddd',
                fontSize: 11,
              },
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: false,
              offsetCenter: [0, '10%'],
              color: '#ddd',
              formatter: function(params) {
                return params
              },
              textStyle: {
                fontSize: 10,
              },
            },
            data: [
              {
                name: '在线数量',
                value: 11111111111111111,
              },
            ],
          },
          //刻度尺
          {
            // name: "白色圈刻度",
            type: 'gauge',
            radius: '67%',
            startAngle: 220,
            endAngle: -40,
            z: 2,
            axisTick: {
              show: true,
              lineStyle: {
                color: '#00FAFF',
                width: 1,
              },
              length: -8,
            }, //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: '#00FAFF',
              },
            }, //分隔线样式
            axisLabel: {
              color: 'rgba(255,255,255,0)',
              fontSize: 12,
            }, //刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            title: {
              show: true,
              offsetCenter: [-65, '84%'], // x, y，单位px
              textStyle: {
                color: '#ddd',
                fontSize: 11,
              },
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, '84%'],
              color: '#ddd',
              formatter: function(params) {
                return params
              },
              textStyle: {
                fontSize: 15,
              },
            },
            data: [
              {
                value: 14444,
                name: '总数:',
              },
            ],
          },
          // 刻度圈
          {
            type: 'pie',
            z: 1,
            radius: ['0%', '73%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontWeight: 'bold',
                },
              },
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.05,
                      color: 'rgba(32,36,107, 0.2)',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(32,36,107,0.3)',
                    },
                    {
                      offset: 0.95,
                      color: 'rgba(32,36,107, 0.2)',
                    },
                  ],
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 3235,
              },
            ],
          },
          //最外层圈
          {
            type: 'pie',
            radius: ['0%', '85%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontWeight: 'bold',
                },
              },
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.05,
                      color: 'rgba(21,24,65, 0.2)',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(21,24,65, 0.3)',
                    },
                    {
                      offset: 0.95,
                      color: 'rgba(21,24,65, 0.2)',
                    },
                  ],
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 3235,
              },
            ],
          },
          //最外层圈
          {
            type: 'pie',
            radius: ['0%', '100%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontWeight: 'bold',
                },
              },
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.05,
                      color: 'rgba(21,24,65, 0.2)',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(21,24,65, 0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(96,27,59, 0.2)',
                    },
                  ],
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 3235,
              },
            ],
          },
        ],
      }
      let chart = document.getElementById('product')
      let myChart = echarts.init(chart)
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    schoolInData() {
      var myChart = echarts.init(document.getElementById('glinfo'))
      var getmydmc = ['输入功率：', '有功功率：', '无功功率：', '总功率：'] //数据点名称
      var getmyd = [50, 12, 23, 65] //学生满意度
      var getmydzd = [] //学生满意度100%
      for (let i = 0; i < getmyd.length; i++) {
        getmydzd.push(100)
      }
      var option = {
        grid: {
          left: '30%',
          right: '15%',
          bottom: '0',
          top: '10%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: function(params) {
            return params[0].name + ': ' + params[0].value + '%'
          },
        },
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              formatter: function(value) {
                var ret = '' //拼接加\n返回的类目项
                var maxLength = 5 //每项显示文字个数
                var valLength = value.length //X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于5,
                  var temp = '' //每次截取的字符串
                  var start = 0 //开始截取的位置
                  var end = maxLength //结束截取的位置
                  temp =
                    value.substring(start, end) +
                    '\n' +
                    value.substring(end, valLength)
                  ret += temp //凭借最终的字符串
                  return ret
                } else {
                  return value
                }
              },
              textStyle: {
                color: '#fff',
                fontSize: '10',
                lineHeight: 10,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: getmydmc,
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: '10',
              },
              formatter: '{value}%',
            },
            data: getmyd,
          },
        ],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: (params) => {
                  let colors = ['#5E43CD', '#A2A94C', '#259670', '#108CCA']
                  return colors[params.dataIndex]
                },
              },
            },
            barWidth: 10,
            data: getmyd,
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            data: getmydzd,
            itemStyle: {
              normal: {
                color: 'rgba(103,150,253,0.3)',
                barBorderRadius: 5,
              },
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    schoolOutData() {
      var myChart = echarts.init(document.getElementById('glinfo2'))
      var getmydmc = ['输出功率：', '有功功率：', '无功功率：', '总功率：'] //数据点名称
      var getmyd = [50, 12, 23, 65] //学生满意度
      var getmydzd = [] //学生满意度100%
      for (let i = 0; i < getmyd.length; i++) {
        getmydzd.push(100)
      }
      var option = {
        grid: {
          left: '30%',
          right: '15%',
          bottom: '0',
          top: '10%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: function(params) {
            return params[0].name + ': ' + params[0].value + '%'
          },
        },
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              formatter: function(value) {
                var ret = '' //拼接加\n返回的类目项
                var maxLength = 5 //每项显示文字个数
                var valLength = value.length //X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于5,
                  var temp = '' //每次截取的字符串
                  var start = 0 //开始截取的位置
                  var end = maxLength //结束截取的位置
                  temp =
                    value.substring(start, end) +
                    '\n' +
                    value.substring(end, valLength)
                  ret += temp //凭借最终的字符串
                  return ret
                } else {
                  return value
                }
              },
              textStyle: {
                color: '#fff',
                fontSize: '10',
                lineHeight: 10,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: getmydmc,
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: '10',
              },
              formatter: '{value}%',
            },
            data: getmyd,
          },
        ],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: (params) => {
                  let colors = ['#5E43CD', '#A2A94C', '#259670', '#108CCA']
                  return colors[params.dataIndex]
                },
              },
            },
            barWidth: 10,
            data: getmyd,
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            data: getmydzd,
            itemStyle: {
              normal: {
                color: 'rgba(103,150,253,0.3)',
                barBorderRadius: 5,
              },
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    cirTem() {
      var myChart = echarts.init(document.getElementById('cirInfo'))
      var xdata = ['a', 'b']
      var dataArr = [40, 70]
      var framData = [129, 129] //白框
      var outData = [130, 130] //外框
      var outRadiusData = [0, 0] //外圆
      var option = {
        title: {
          top: '10%',
          text: '环境温湿度',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#ccc',
            fontSize: 10,
          },
        },
        grid: {
          left: '15%',
          top: '20%',
          right: '10%',
          bottom: '0',
          // containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            show: false,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'transparent', //x轴底部横线
              },
            },
            axisLabel: {
              margin: 25, //标签距离x轴轴线的距离
              inside: false,
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '14',
              },
            },
            splitLine: {
              show: false, //背景格线
            },
            data: xdata,
          },
        ],
        yAxis: [
          {
            axisTick: 'none',
            axisLine: 'none',
            offset: '27',
            axisLabel: {
              textStyle: {
                show: false,
                fontSize: '16',
              },
            },
            splitLine: {
              show: false, //背景格线
            },
            min: 0,
            max: 150,
          },
          {
            axisTick: 'none',
            axisLabel: {
              textStyle: {
                show: false,
                // color: '#ffffff',
                fontSize: '16',
              },
            },
            splitLine: {
              show: false, //背景格线
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'transparent', //x轴底部横线
              },
            },
            min: 0,
            max: 150,
          },
          {
            name: '',
            nameGap: '50',
            nameTextStyle: {
              color: '#ffffff',
              fontSize: '16',
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)',
              },
            },
            data: [],
          },
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: dataArr,
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function(param) {
                  return param.value + '°C'
                },
                textStyle: {
                  color: '#ffffff',
                  fontSize: '10',
                },
              },
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(54, 168, 244)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgb(99, 90, 241)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(106, 78, 240)',
                  },
                ]),
              },
            },
            z: 2,
          },
          {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: framData,
            barWidth: 18,
            itemStyle: {
              normal: {
                borderColor: 'rgb(0, 136, 231)',
                color: 'transparent',
                barBorderRadius: 10,
              },
            },
            z: 1,
          },
          {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-120%',
            data: outData,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: 'transparent',
                barBorderRadius: 5,
              },
            },
            z: 0,
          },
          {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: outRadiusData,
            yAxisIndex: 2,
            symbolSize: 22,
            symbolOffset: [-5, 0], //相对于原本位置的偏移量

            itemStyle: {
              normal: {
                color: 'rgb(106, 78, 240)',
                opacity: 1,
              },
            },
            z: 2,
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        productCharts.resize()
      })
    },
  },
}
let chart = document.getElementById('product')
let myChart = echarts.init(chart)
myChart.setOption(option)
window.addEventListener('resize', function() {
  myChart.resize()
})
</script>
<style scoped lang="scss">
.detail .section .cloum .navmenu {
  .el-menu {
    /* border-right: solid 0px #e6e6e6; */
    background-color: transparent;
    // position: absolute;
    // top: 32%;
    // width: 20%;
    padding-top: 25%;
    border-radius: 50%;
    border: solid rgba(0, 0, 0, 0);
  }
  .el-menu-item {
    border-right: #4177e1 solid 1px !important;
    border-left: 0px;
    border-radius: 50px;
    text-align: right;
    font-size: 0.3rem;
    color: #ffff;
    margin: 0.5rem 1rem;
    box-shadow: rgb(0, 36, 255, 50) 0px 0px 20px inset;
    .el-submenu__title {
      height: 1rem;
      line-height: 1rem;
    }
  }
  .el-menu-item:hover {
    box-shadow: rgb(18, 87, 201) 0px 0px 38px inset;
    color: #fff !important;
    font-weight: 700;
  }
  .el-menu-item.is-active {
    //* background-color: #cfe0ee !important; */
    color: #fff !important;
    font-weight: 900;
    box-shadow: rgb(85, 107, 238) 0px 0px 0.9rem inset;
  }
  .el-menu-item:nth-of-type(2) {
    margin: 0.5rem 0.5rem;
  }
  .el-menu-item:nth-of-type(3) {
    margin: 0.5rem 0rem;
  }
  .el-menu-item:nth-of-type(4) {
    margin: 0.5rem 0.5rem;
  }
  .el-menu-item:nth-of-type(5) {
    margin: 0.5rem 1rem;
  }
  .navtwo .el-menu-item {
    text-align: left;
  }
}
.el-carousel__item {
  width: 30%;
  left: 10%;
  height: 240px;
}

.el-tooltip__popper.is-dark {
  color: #fff;
  font-size: 12px；;
}
</style>
<style>
/* 注意
placement的属性值有top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
[x-placement^=??] border-??-color 的上下左右 要与placement一致 
不能放到scoped中*/
/* .el-tooltip_ popper[x-placement^=right] .popper_arrow:after {
border-top-color: blue;
}
.el-tooltip_ popper[xplacement^=right] .popper_arrow
{
border-top-color: blue ;
} */
.popperTooltip {
  line-height: 1.8 !important;
  background: rgba(161, 176, 203, 0.2) !important;
}
.el-carousel__container .el-carousel__arrow {
  font-size: 0.5rem !important;
}
</style>
<style lang="scss" scoped>
/*引用字库*/
@font-face {
  font-family: electronicFont;
  src: url('~@/assets/font/DS-DIGIT.TTF');
}
.detail {
  width: 100%;
  height: calc(100% - 1.1rem);
  .section {
    width: 99.8%;
    // display: flex;
    // border: 1px solid red;
    border-radius: 5px;
    height: 100%;
    overflow: hidden;
    .cloum {
      float: left;
      margin: 0.2rem;
      width: 18%;
      height: 90vh;
      background: url('../../assets/images/椭圆 1.png') center no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: right;
      align-items: center;
      .navmenu {
        width: 100%;
        height: 70%;
      }
    }
    .cloum:nth-child(3) {
      background: url('../../assets/images/椭圆 2.png') center no-repeat;
      background-size: 100% 100%;
    }
    .cloum2 {
      float: left;
      margin: 0.2rem;
      width: 59.3%;
      height: 90vh;
      .clocen {
        width: 100%;
        height: 83%;

        .items {
          // width: 32%;
          height: 100%;
          float: left;
          border: 1px solid #274774;
          background: rgba(20, 35, 90, 0.4);
          border-radius: 10px;

          .mask {
            border: 1px solid #5d74c2;
            border-radius: 50px;
            width: 100%;
            height: 4%;
            color: #fff;
            text-align: center;
            font-size: 0.2rem;
            font-weight: 600;
            padding-top: 2%;
            margin-top: -1%;
            background-image: linear-gradient(#455eca, #1c4c8d, #455eca);
          }
          .item {
            width: 100%;
            height: 90%;
            // background: rgba(21, 49, 122, 0.5);
            img {
              width: 45%;
              height: 35%;
              padding: 5% 0 5% 28%;
            }
            img:hover {
              cursor: pointer;
            }
            .imgdata4 {
              width: 92%;
              height: 26%;
              margin: 0.3rem 0.2rem;
              background: rgba(21, 49, 122, 0.5);
              .item_2 {
                width: 100%;
                height: 94%;
                #glinfo {
                  width: 230%;
                  height: 100%;
                }
                #glinfo2 {
                  width: 230%;
                  height: 100%;
                }
              }
            }
            .imgdata {
              width: 92%;
              height: 18%;
              margin: 0 0.2rem;
              background: rgba(21, 49, 122, 0.5);
              .item_1 {
                width: 100%;
                height: 94%;
              }
              .item_2 {
                width: 100%;
                height: 94%;
              }
              .showinfo {
                width: 28%;
                float: left;
                font-family: 'electronicFont';
                font-size: 0.4rem;
                text-align: center;
                padding: 0.1rem;
                margin: 0.2rem 0;
                color: #00ffff;
              }
              .dev_info {
                width: 100%;
                font-size: 0.35rem;
                font-weight: 600;
                margin-top: 3%;
                img {
                  width: 15%;
                  margin-right: 3%;
                }
              }
            }
            .imgdata3 {
              width: 92%;
              height: 42%;
              margin: 0 0.2rem;
              background: rgba(21, 49, 122, 0.5);
              .item_1 {
                width: 100%;
                height: 94%;
              }
            }
            .imgdata2 {
              width: 42%;
              height: 60%;
              margin: 0 0.15rem;
              float: left;
              background: rgba(21, 49, 122, 0.5);
              .item_1 {
                width: 100%;
                height: 97%;
              }
              .item_2 {
                width: 100%;
                height: 97%;
                #cirInfo {
                  width: 100%;
                  height: 80%;
                  border: 1px solid red;
                }
              }
            }
            .imgdata:nth-child(3) {
              margin-top: 0.3rem;
            }
            .clear {
              clear: both;
            }
          }
        }
        .items:nth-child(2) {
          margin: 0 0.27rem;
        }
        .clear {
          clear: both;
        }
      }
      .bottom {
        width: 100%;
        height: 12%;
        margin: 0.4rem 0;
        border: 1px solid #274774;
        background: rgba(20, 35, 90, 0.4);
        border-radius: 10px;
      }
    }
    .clear {
      clear: both;
    }
  }
}
</style>
