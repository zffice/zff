<template>
  <div class="home">
    <div id="container"></div>
    <div
      class="moveText"
      :style="{ top: dragTop + 'px', left: dragLeft + 'px' }"
    >
      <p>机柜编号: {{ texts.code }}</p>
      <p>设备类型: {{ texts.type }}</p>
    </div>

    <section class="section">
      <div class="cloum">
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_01"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <!-- <div class="item" id="box_02"></div> -->
          <dv-scroll-ranking-board
            :config="config"
            class="item"
            style="width:80%;margin:0 auto;"
          />
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_03"></div>
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
        </div>
        <div class="items2">
          <dv-decoration-10 style="width:90%;height:5px;margin:auto" />
          <div class="item" id="box_04">
            <el-table
              :data="alarmData"
              :row-style="{ height: '0.1rem' }"
              :cell-style="{ padding: '0px' }"
            >
              <el-table-column prop="name" label="车间名"> </el-table-column>
              <el-table-column prop="result" label="报警设备"></el-table-column>
              <el-table-column prop="info" label="报警内容" width="200">
              </el-table-column>
              <el-table-column prop="time" label="报警时间"> </el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
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
            <div class="item" id="box_05"></div>
          </dv-border-box-13>

          <!-- <dv-decoration-10 style="width:90%;height:5px;margin:auto" /> -->
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
    <div v-show="seen" class="hover_con" :style="positionStyle">
      <br />
      <span style="font-Size:0.3rem;">
        {{ content.ws_name }}
      </span>
      <hr />
      <p><span>机器数：</span>{{ content.machine_count + 1 }}</p>
      <p><span>作业数：</span>{{ content.run_count + 1 }}</p>
      <p><span>报警数：</span>{{ content.alarm_count }}</p>
      <p><span>闲置数：</span>{{ content.stop_count }}</p>
      <p><span>温度：</span>25 ℃</p>
      <p><span>湿度：</span>40 %</p>
    </div>
  </div>
</template>

<script>
import API from "@/api/busin";
import workShop from "@/components/workshop/index2";
// import Vue from "vue";
// import { scrollBoard } from "@jiaminghi/data-view";
import * as THREE from "three";
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
import { TGALoader } from "three/examples/jsm/loaders/TGALoader";

const OrbitControls = require("three-orbit-controls")(THREE);
import echarts from "echarts";
export default {
  name: "Home",
  components: {
    workShop
  },
  data() {
    return {
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
      dragTop: -100,
      dragLeft: -200,
      widthBox: "",
      heightBox: "",
      cabinetData: [
        { code: "Mesh1", type: "交换机" },
        { code: "Mesh2", type: "路由器" }
      ],
      texts: {
        code: "",
        type: ""
      },
      scene: "",
      // light: "",
      camera: "",
      controls: "",
      renderer: "",
      container: null,
      //图一横坐标
      Xaxis1: [],
      //图一数据
      data1: [],

      //图二横坐标
      Xaxis2: [],
      //图二数据
      data2: [],
      dataAlarm: [],

      //图三数据
      data3: [],
      devsum: [],
      Xaxis3: [],

      //图五数据
      Xaxis5: [],
      //图五数据
      data5: [],
      sumpro: [],
      //图六数据
      Xaxis6: [],
      // sumpro: [],
      sumback: [],
      //报警表格
      alarmData: [],
      //日报
      dayData: [],
      //运行时长
      Xaxis8: [],
      runtime: [],
      //
      alarmOption: {},
      //
      chart: "",
      // 报警次数
      alarmCount: 0,
      comId: "",
      config: {
        data: [],
        waitTime: 4000,
        carousel: "page",
        colors: [
          "#f36c6c",
          "#e6cf4e",
          "#20d180",
          "#0093ff",
          "#1089E7",
          "#F57474",
          "#56D0E3",
          "#1089E7",
          "#F57474",
          "#1089E7",
          "#F57474",
          "#F57474"
        ],
        unit: "次"
      },
      objects: null,
      raycaster: null,
      mouse: null
    };
  },
  created() {
    //表格自动滚动
    this.play();
  },
  mounted() {
    require("../assets/js/common.js");
    this.init();
    this.loadObj();
    this.animate();
    // this.getComId();
    this.$nextTick(() => {
      this.alarmGroupMonth();
      this.alarmOfMachineTop();
      this.alarmTypeTop();
      // this.findMachineListByExample()
      this.outputOfMachineTop();
      this.groupByMonth();
      this.groupByDate();
      this.ThisTimeAlarmInfo();
      this.sumRtimeOfMachineTop();
    });
  },
  methods: {
    //初始化three.js相关内容
    init() {
      // this.camera = new THREE.PerspectiveCamera(
      //   70,
      //   window.innerWidth / window.clientHeight,
      //   1,
      //   1000
      // );
      this.scene = new THREE.Scene();
      this.scene.add(new THREE.AmbientLight("#1370fb")); //环境光
      this.scene.add(new THREE.SpotLight(0xffffff)); //环境光
      this.light = new THREE.DirectionalLight(0xdfebff, 0.45); //从正上方（不是位置）照射过来的平行光，0.45的强度
      this.light.position.set(50, 200, 100);
      this.light.position.multiplyScalar(0.3);
      this.scene.add(this.light);
      //初始化相机
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerWidth,
        1,
        1000
      );
      this.camera.position.set(250, 150, 400);
      this.camera.lookAt(this.scene.position);
      //初始化控制器
      this.controls = new OrbitControls(this.camera);
      this.controls.target.set(0, 0, 0);
      this.controls.minDistance = 80;
      this.controls.maxDistance = 400;
      this.controls.maxPolarAngle = Math.PI / 3;
      this.controls.update();
      //渲染
      this.renderer = new THREE.WebGLRenderer({
        alpha: true
      });
      this.renderer.setClearColor(0xeeeeee, 0.0);
      // this.renderer.setClearColor(0x000000);
      this.renderer.setPixelRatio(window.devicePixelRatio); //为了兼容高清屏幕
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      const container = document.getElementById("container");

      container.appendChild(this.renderer.domElement);
      window.addEventListener("resize", this.onWindowResize, false); //添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      window.addEventListener("dblclick", this.onMouseClick, false);
      // window.addEventListener("mousemove", this.updateXY, false);
      window.addEventListener("mouseleave", this.leave, false);
      // window.addEventListener("mouseenter", this.enter(1), false);
    },
    updateXY: function(event) {
      this.x = event.pageX;
      this.y = event.pageY;
      this.positionStyle = {
        top: this.y - 100 + "px",
        left: this.x + 50 + "px"
      };
    },
    //窗口监听函数
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    //外部模型加载函数
    loadObj() {
      new TGALoader()
        .setPath("static/models/")
        .load("Map__6_VR_____.tga", function() {});
      //包含材质
      new MTLLoader()
        .setPath("static/models/")
        .load("factory.mtl", materials => {
          materials.preload();
          new OBJLoader()
            .setMaterials(materials)
            .setPath("static/models/")
            .load("factory.obj", obj => {
              console.log("materials", materials);
              obj.scale.set(0.002, 0.002, 0.002);
              obj.position.set(0, 100, 0);
              this.scene.add(obj);
            });
          console.log("materials", materials);
        });
    },
    enter(i) {
      // this.workshopList.forEach((item, index, Array) => {
      //   if (item.ws_id == i) {
      //     this.content = {
      //       ws_name: item.workshop_name,
      //       machine_count: item.mCount,
      //       run_count: item.runCount,
      //       standby_count: item.standbyCount,
      //       stop_count: item.stopCount,
      //       alarm_count: item.alarmCount
      //     };
      //   }
      // });
      this.seen = true;
    },
    leave: function() {
      this.seen = false;
    },
    onMouseClick(event) {
      this.updateXY(event);
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();

      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera(mouse, this.camera);

      // 获取raycaster直线和所有模型相交的数组集合
      var intersects = raycaster.intersectObjects(this.scene.children, true);

      // console.log(intersects);
      console.log(intersects[0].object.name);
      // let Mname = intersects[0].object.name;
      // intersects[0].object.material.color.set("blue");

      var SELECTED;
      if (SELECTED == undefined) {
        //拾取物体数大于0时
        if (intersects.length > 0) {
          //获取第一个物体
          if (SELECTED != intersects[0].object) {
            //鼠标的变换
            document.body.style.cursor = "pointer";
            intersects[0].object.material.transparent = true; //透明度的变化
            intersects[0].object.material.opacity = 0.5;
            if (SELECTED) SELECTED.material.color.setHex(SELECTED.currentHex);
            SELECTED = intersects[0].object;
            SELECTED.currentHex = SELECTED.material.color.getHex(); //记录当前选择的颜色
            //改变物体的颜色(红色)
            SELECTED.material.color.set("#1370fb");
            this.seen = true;
          }
        } else {
          document.body.style.cursor = "auto";
          if (SELECTED) SELECTED.material.color.set(SELECTED.currentHex); //恢复选择前的默认颜色
          SELECTED = null;
        }
      } else {
        SELECTED.material.color.set(SELECTED.currentHex);
        SELECTED = null;
      }

      //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
      // for (var i = 0; i < intersects.length; i++) {
      //   console.log(intersects[i].object.material.color);
      //   // console.log(intersects[ i ]);
      //   // intersects[ i ].object.material.color.set( 0xff0000 );

      //   // console.log(intersects[ 0 ].object.name)
      //   // console.log(intersects[0].object);
      //   // console.log(intersects[ 0 ].object)
      // }
    },
    //获取用户登录cId
    getComId() {
      this.comId = localStorage.getItem("comId");
    },
    //change,play实现表格自动滚动
    change() {
      //把第一条数据插入数组最后一条
      this.alarmData.push(this.alarmData[0]);
      //删除数组中第一条数据
      this.alarmData.shift();
    },
    play() {
      //每两秒执行一次插入删除操作
      setInterval(this.change, 1000);
    },
    // 月报警趋势
    alarmGroupMonth() {
      const params = {
        cId: localStorage.getItem("comId")
      };
      API.alarmGroupMonth(params).then(res => {
        this.Xaxis1 = [];
        this.data1 = [];
        for (var i = 0; i < res.info.length; i++) {
          this.Xaxis1.push(res.info[i].date);
          this.data1.push(res.info[i].count);
        }
        this.chart6();
        // console.log(this.data1)
      });
    },
    // 设备报警排名
    alarmOfMachineTop() {
      const params = {
        limit: 5,
        cId: localStorage.getItem("comId")
      };
      API.alarmOfMachineTop(params).then(res => {
        // console.log(res)
        var list = [];
        this.Xaxis3 = [];
        this.devsum = [];
        for (var i = 0; i < res.info.length; i++) {
          list.push({
            name: res.info[i].workshop_name,
            value: res.info[i].machine_name
          });
          this.devsum.push(res.info[i].sum_alarm_num);
          this.Xaxis3.push(res.info[i].machine_name);
        }
        this.data3 = list;
        // console.log(list)
        this.chart1();
      });
    },
    // 设备报警类型排名
    alarmTypeTop() {
      const params = {
        limit: 5,
        cId: localStorage.getItem("comId")
      };
      API.alarmTypeTop(params).then(res => {
        // console.log(res)
        this.Xaxis2 = [];
        this.data2 = [];
        this.dataAlarm = [];
        for (var i = 0; i < res.info.length; i++) {
          this.Xaxis2.push(res.info[i].info);
          this.data2.push(res.info[i].count);
          this.dataAlarm.push({
            name:
              '<span style="color:#37a2da;">' + res.info[i].info + "</span>",
            value: res.info[i].count
          });
        }
        // this.chart2();
        this.chartAlarmTypeTop();
      });
    },
    chartAlarmTypeTop() {
      this.config = {
        data: this.dataAlarm,
        waitTime: 4000,
        unit: "次",
        rowNum: 3,
        colors: [
          "#f36c6c",
          "#e6cf4e",
          "#20d180",
          "#0093ff",
          "#1089E7",
          "#F57474",
          "#56D0E3",
          "#1089E7",
          "#F57474",
          "#1089E7",
          "#F57474",
          "#F57474"
        ]
      };
    },
    // 各设备产量排名【limit true，cId false】
    outputOfMachineTop() {
      const params = {
        limit: 5,
        cId: localStorage.getItem("comId")
      };
      API.outputOfMachineTop(params).then(res => {
        this.data5 = [];
        this.Xaxis5 = [];
        this.sumpro = [];
        // var list = [];
        for (var i = 0; i < res.info.length; i++) {
          this.Xaxis5.push(
            res.info[i].workshop_name + "\n\n" + res.info[i].machine_name
          );
          this.data5.push(
            Math.floor(
              (res.info[i].passrate / 100) * res.info[i].sum_production
            )
          );
          this.sumpro.push(res.info[i].sum_production);
        }
        this.chart5();
      });
    },
    // 生产月报
    groupByMonth() {
      API.groupByMonth().then(res => {
        this.Xaxis6 = [];
        this.sumpro = [];
        this.sumback = [];
        for (var i = 1; i < res[0].data.length; i++) {
          this.Xaxis6.push(res[0].data[i].time);
          this.sumpro.push(res[0].data[i].sumpro);
          this.sumback.push(res[0].data[i].sumback);
        }
        this.chart3();
      });
    },
    // 生产日报
    groupByDate() {
      API.groupByDate().then(res => {
        this.dayData = [];
        for (var i = 1; i < res[0].data.length; i++) {
          this.dayData.push({
            day: res[0].data[i].time,
            count: res[0].data[i].sumpro
          });
        }
        this.chart7();
      });
    },
    //表格报警信息
    ThisTimeAlarmInfo() {
      const params = {
        limit: 7,
        cId: localStorage.getItem("comId")
      };
      API.ThisTimeAlarmInfo(params).then(res => {
        this.alarmData = [];
        // console.log(res);
        for (var i = 0; i < res.info.length; i++) {
          if (res.info[i].STATUS == "1") {
            res.info[i].STATUS = "已处理";
          } else {
            res.info[i].STATUS = "未处理";
          }
          this.alarmData.push({
            name: res.info[i].workshop_name,
            time: res.info[i].time.slice(11, 19),
            info: res.info[i].info,
            result: res.info[i].machine_name,
            status: res.info[i].STATUS
          });
        }
        // console.log(this.alarmData)
      });
    },
    // 设备运行时长
    sumRtimeOfMachineTop() {
      const params = {
        limit: 7,
        cId: localStorage.getItem("comId")
      };
      API.sumRtimeOfMachineTop(params).then(res => {
        // console.log(res)
        this.Xaxis8 = [];
        this.runtime = [];
        for (var i = 0; i < res.info.length; i++) {
          this.Xaxis8.push(res.info[i].machine_name);
          this.runtime.push((res.info[i].sum_rtime / 60 / 60).toFixed(2));
        }
        this.chart8();
      });
    },
    chart1() {
      var myChart = echarts.init(document.getElementById("box_01"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "18%",
          top: "10%",
          containLabel: true
        },
        legend: {
          // data: ['1', '2'],
          data: ["报警次数"],
          right: 0,
          top: 0,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        xAxis: {
          type: "category",
          data: this.Xaxis3,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#00C2FF"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: "Microsoft YaHei"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#00C2FF"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.3)"
            }
          },
          axisTick: {
            show: false
          }
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 8,
        //     xAxisIndex: [0],
        //     bottom: '8%',
        //     start: 10,
        //     end: 50,
        //     handleIcon:
        //       'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        //     handleSize: '110%',
        //     handleStyle: {
        //       color: '#d3dee5',
        //     },
        //     textStyle: {
        //       color: '#fff',
        //     },
        //     borderColor: '#00C2FF',
        //   },
        //   {
        //     type: 'inside',
        //     show: true,
        //     height: 10,
        //     start: 1,
        //     end: 35,
        //   },
        // ],
        series: [
          {
            name: "报警次数",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#C3BC30"
                  },
                  {
                    offset: 1,
                    color: "#F18B00"
                  }
                ]),
                barBorderRadius: 5
              }
            },
            data: this.devsum
          }
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
        ]
      };

      var app = {
        currentIndex: -1
      };
      setInterval(function() {
        var dataLen = option.series[0].data.length;

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        //console.log(app.currentIndex);
        // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
      }, 2000);
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart2() {
      var attackSourcesData = this.data2;
      var attackSourcesName = this.Xaxis2;
      console.log(attackSourcesData);
      this.chart = echarts.init(document.getElementById("box_02"));
      function contains(arr, dst) {
        var i = arr.length;
        while ((i -= 1)) {
          if (arr[i] == dst) {
            return i;
          }
        }
        return false;
      }

      var attackSourcesColor = [
        "#f36c6c",
        "#e6cf4e",
        "#20d180",
        "#0093ff",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
      ];

      function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function(item, i) {
          var itemStyle = {
            color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
          };
          sss.push({
            value: item,
            itemStyle: itemStyle
          });
        });
        return sss;
      }

      this.alarmOption = {
        tooltip: {
          trigger: "item",
          show: true
        },
        legend: {
          show: false,
          selectedMode: false
        },
        grid: {
          left: "35%",
          right: "12%",
          bottom: "3%",
          top: 0
        },
        dataZoom: [
          {
            show: false,
            type: "slider",
            yAxisIndex: 0,
            zoomLock: true,
            width: 8,
            handleSize: 0,
            showDetail: false,
            start: 0,
            end: 50,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            // handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            id: "insideY",
            yAxisIndex: 0,
            start: 0,
            end: 50,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true
          }
        ],
        xAxis: [
          {
            splitLine: {
              show: false
            },
            type: "value",
            show: false
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: false
            },
            axisLine: {
              //y轴
              show: false
            },
            type: "category",
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#00C2FF",
                fontSize: 10
              }
            },
            data: this.Xaxis2
          }
        ],
        series: [
          {
            name: "报警信息",
            type: "bar",
            barWidth: 10, // 柱子宽度
            label: {
              show: true,
              position: "right", // 位置
              color: "#1CD8A8",
              fontSize: 10,
              fontWeight: "bold", // 加粗
              distance: 5 // 距离
            }, // 柱子上方的数值
            itemStyle: {
              barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                ["#2FAEF2", "#1CD8A8"].map((color, offset) => ({
                  color,
                  offset
                }))
              ) // 渐变
            },
            data: this.data2
          }
        ]
      };
      this.chart.setOption(this.alarmOption);
      this.autoMave();
      window.addEventListener("resize", function() {
        this.chart.resize();
      });
    },
    //自动滚动
    autoMave() {
      setInterval(() => {
        if (
          Number(this.alarmOption.dataZoom[0].end) ===
          this.data2.length - 1
        ) {
          this.alarmOption.dataZoom[0].end = 50;
          this.alarmOption.dataZoom[0].start = 0;
        } else {
          this.alarmOption.dataZoom[0].end =
            this.alarmOption.dataZoom[0].end + 10;
          this.alarmOption.dataZoom[0].start =
            this.alarmOption.dataZoom[0].start + 10;
        }
        if (this.alarmOption.dataZoom[0].end == 100) {
          this.alarmOption.dataZoom[0].end = 50;
          this.alarmOption.dataZoom[0].start = 0;
        }
        this.chart.setOption(this.alarmOption);
      }, 2000);
    },
    chart3() {
      const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
      const xData = this.Xaxis6;
      const option = {
        legend: {
          icon: "circle",
          top: "5%",
          right: "5%",
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: "#ffffff"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
            }
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)"
        },
        grid: {
          left: "2%",
          right: "8%",
          bottom: "2%",
          top: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisLine: {
              lineStyle: {
                color: "#00C2FF" //x轴颜色
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              // interval: 0,
              textStyle: {
                color: "#00C2FF" //坐标轴字颜色
              }
            },
            axisPointer: {
              label: {
                padding: [5, 5, 5],
                backgroundColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fff" // 0% 处的颜色
                    },
                    {
                      offset: 0.9,
                      color: "#fff" // 0% 处的颜色
                    },
                    {
                      offset: 0.9,
                      color: "#33c0cd" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#33c0cd" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            boundaryGap: true
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00C2FF" //y轴颜色
              }
            },
            axisLabel: {
              textStyle: {
                color: "#00C2FF"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "月产量",
            type: "line",
            data: this.sumpro,
            symbolSize: 1,
            symbol: "circle",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#9effff"
                },
                {
                  offset: 1,
                  color: "#9E87FF"
                }
              ]),
              shadowColor: "rgba(158,135,255, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20
            },
            itemStyle: {
              normal: {
                color: colorList[0],
                borderColor: colorList[0]
              }
            }
          },
          {
            name: "月回退量",
            type: "line",
            data: this.sumback,
            symbolSize: 1,
            symbol: "circle",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#73DD39"
                },
                {
                  offset: 1,
                  color: "#73DDFF"
                }
              ]),
              shadowColor: "rgba(115,221,255, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20
            },
            itemStyle: {
              normal: {
                color: colorList[1],
                borderColor: colorList[1]
              }
            }
          }
        ]
      };

      let chart = document.getElementById("box_06");
      let myChart = echarts.init(chart);
      let i = 0;
      setInterval(function() {
        // console.log(i)
        i = i === xData.length ? 0 : i + 1;
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0, // 显示第几个series
          dataIndex: i // 显示第几个数据
        });
      }, 2000);
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart5() {
      var myChart = echarts.init(document.getElementById("box_05"));
      var data1 = this.data5;
      var data2 = this.sumpro;
      var option = {
        title: {
          text: "设备产量",
          left: "5%",
          top: "12%",
          textStyle: {
            color: "#fff",
            fontSize: "15"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter(params) {
            if (params[3].value == 0) {
              return (
                params[0].name +
                "<br><br>总产量：" +
                params[3].value +
                "<br>合格量：" +
                params[1].value +
                "<br>合格率: --"
              );
            } else {
              return (
                params[0].name +
                "<br><br>总产量：" +
                params[3].value +
                "<br>合格量：" +
                params[1].value +
                "<br>合格率: " +
                ((params[1].value / params[3].value) * 100).toFixed(2) +
                "%"
              );
            }

            ///
          }
        },
        grid: {
          left: "6%",
          right: "2%",
          bottom: "1%",
          top: "32%",
          containLabel: true
        },
        xAxis: {
          data: this.Xaxis5,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
            //margin: 20, //刻度标签与轴线之间的距离。
          }
        },
        yAxis: {
          type: "value",
          // name: "产量",
          // color: "#fff",
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
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          }
        },
        series: [
          {
            //三个最低下的圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [25, 5],
            symbolOffset: [0, 3],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function(params) {
                var a = params.dataIndex;

                if (a === 0) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#FF9A22" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FFD56E" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 1) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#00EC28" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#5DF076" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 2) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#12B9DB" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#6F8EF2" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 3) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#8331D9" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#7F2CF1" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 4) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#4FC3B2" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#5AD1BD" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                }
              }
            },
            data: [1, 1, 1, 1, 1]
          },
          //下半截柱状图
          {
            name: "回退量",
            type: "bar",
            barWidth: 25,
            barGap: "-100%",
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function(params) {
                var a = params.dataIndex;

                if (a === 0) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#FF9A22" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FFD56E" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 1) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#00EC28" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#5DF076" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 2) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#12B9DB" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#6F8EF2" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 3) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#8331D9" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#7F2CF1" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else if (a === 4) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#4FC3B2" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#5AD1BD" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                }
              }
            },
            data: data1
          },
          {
            name: "", //头部
            type: "pictorialBar",
            symbolSize: [25, 5],
            symbolOffset: [0, -3],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              color: "#163F7A",
              opacity: 1
            },
            data: data2
          },
          {
            name: "总产量",
            type: "bar",
            barWidth: 25,
            barGap: "-100%",
            z: 0,
            itemStyle: {
              color: "#163F7A",
              opacity: 0.7
            },
            data: data2
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart6() {
      var myChart = echarts.init(document.getElementById("box_03"));
      var option = {
        title: {
          text: "月报警趋势",
          left: "5%",
          top: "10%",
          textStyle: {
            color: "#D5CBE8",
            fontSize: "15"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B"
            }
          }
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "2%",
          top: "30%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#44607C"
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 10,
                color: "#D5CBE8"
              }
            },
            axisTick: {
              show: false
            },
            data: this.Xaxis1
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位（%）",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "none"
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 10,
                color: "#D5CBE8"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#57617B"
              }
            }
          }
        ],
        series: [
          {
            name: "报警次数",
            type: "line",
            smooth: true,
            stack: "总量",
            symbol: "circle",
            symbolSize: 2,
            showSymbol: false,
            animationDelay: 1000,
            animationDuration: 1000,
            markPoint: {
              symbol:
                "path://M783.136 180.064C771.872 168.832 757.152 160 742.4 160L281.6 160C266.848 160 252.128 168.832 240.864 180.064 229.632 191.328 224 209.248 224 224l0 460.8c0 14.752 5.632 26.272 16.864 37.536C252.128 733.568 266.848 736 281.6 736l115.2 0 115.2 115.2 115.2-115.2 115.2 0c14.752 0 29.472-2.432 40.736-13.664C794.368 711.072 800 699.552 800 684.8L800 224C800 209.248 794.368 191.328 783.136 180.064z",
              symbolOffset: [0, "-60%"],
              symbolSize: 25, //这里可以改变大小
              data: [
                {
                  type: "max",
                  name: "最大值"
                }
              ],
              label: {
                offset: [0, -2]
              },
              animationDelay: 2000,
              animationDuration: 1000
            },
            lineStyle: {
              normal: {
                width: 2,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#64C3FA" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#A774FC" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                opacity: 0.9
              }
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
                      color: "rgba(52, 79, 168, 0.8)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(52, 79, 168, 0.6)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: "#3A5493",
                borderColor: "",
                borderWidth: 10
              }
            },
            data: this.data1
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart7() {
      var myChart = echarts.init(document.getElementById("box_07"));
      var getData = this.dayData;
      var data1 = [];
      for (var i = 0; i < getData.length; i++) {
        data1.push([getData[i].day, getData[i].count]);
      }
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function name(params) {
            return (
              params.seriesName +
              "<br>日期：" +
              params.data[0] +
              "<br>产量：" +
              params.data[1]
            );
          }
        },
        calendar: [
          {
            top: "20%",
            left: "5%",
            right: "5%",
            // containLabel: true,
            bottom: "2%",
            range: [data1[0][0], data1[data1.length - 1][0]],
            orient: "vertical",
            cellSize: 40,
            itemStyle: {
              color: "#0D0F4B"
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#204371",
                width: 2,
                type: "solid"
              }
            },
            yearLabel: {
              margin: 50,
              show: false,
              color: "#ffffff"
            },
            monthLabel: {
              show: false,
              firstDay: 1,
              nameMap: "cn",
              margin: 10,
              color: "#ffffff"
            },
            dayLabel: {
              firstDay: 1,
              nameMap: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
              textStyle: {
                color: "#ffffff",
                fontSize: "8px"
              }
            }
          }
        ],
        series: [
          {
            name: "日产量",
            type: "effectScatter",
            coordinateSystem: "calendar",
            data: data1,
            symbolSize: function(val) {
              val = val[1] / 5;
              val = val < 5 ? 5 : Math.min(val, 10);
              return val;
            },
            itemStyle: {
              normal: {
                color: "#00D3C6",
                fontSize: "8px"
              }
            },
            label: {
              show: true,
              formatter(params) {
                return params.value[0].split("-")[2];
              },
              offset: [12, -2],
              color: "#ffffff",
              fontSize: "5px"
            }
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    chart8() {
      var myChart = echarts.init(document.getElementById("box_08"));
      var option = {
        grid: {
          left: "4%",
          right: "4%",
          bottom: "2%",
          top: "20%",
          containLabel: true
        },
        xAxis: {
          data: this.Xaxis8,
          axisLine: {
            lineStyle: {
              color: "#3d5269"
            }
          },
          axisLabel: {
            color: "#fff",
            fontSize: 10
          }
        },
        yAxis: {
          name: "运行时长:小时",
          nameTextStyle: {
            color: "#fff",
            fontSize: 10
          },
          axisLine: {
            lineStyle: {
              color: "#3d5269"
            }
          },
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#2d3d53"
            }
          }
        },
        series: [
          {
            type: "bar",
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
                      color: "#5ef3ff"
                    },
                    {
                      offset: 1,
                      color: "#06a4f4"
                    }
                  ],
                  false
                )
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 10,
                color: "#ffffff",
                position: "top"
              }
            },
            data: this.runtime
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    loginout() {
      var self = this;
      this.$confirm("您确定要退出吗？", "退出管理平台", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const info = {
            userkey: localStorage.getItem("token")
          };
          self.$router.push({ path: "/" }).catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.el-table {
  height: 100%;
  width: 96% !important;
  background-color: transparent !important;
  color: #00d4c7 !important;
  font-size: 0.2rem !important;
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
  src: url("~@/assets/font/DS-DIGIT.TTF");
}
.home {
  position: relative;
  width: 100%;
  height: calc(100% - 1.1rem);
  .section {
    top: 0;
    left: 0;
    z-index: 2;
    position: absolute;
    width: 99.8%;
    // display: flex;
    // border: 1px solid red;
    border-radius: 5px;
    height: 100%;
    // background: rgba(20, 35, 90, 0.4);
    .cloum {
      // flex: 1;
      float: left;
      width: 28%;
      margin: 0.2rem 0.2rem 0.1rem 0.2rem;
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
#container {
  top: 0;
  left: 0;
  z-index: 1;
  height: 99.8%;
  position: absolute;
  width: 95%;
  margin: 0 auto;
  // height: 800px;
  overflow: hidden;
}
.hover_con {
  z-index: 999;
  position: absolute;
  width: 10%;
  padding: 0.1rem;
  background: rgba(1, 19, 67, 0.8);
  border: 2px solid #00a1ff;
  border-radius: 8px;
  hr {
    border: 0.5px solid #00a1ff;
  }
  span {
    font-size: 0.1rem;
    line-height: 0.15rem;
    padding: 0.2rem;
    // text-align: center;
    color: #00a1ff;
    font-weight: 600;
  }
  p {
    font-size: 0.1rem;
    line-height: 0.15rem;
    padding: 0.2rem;
    // text-align: center;
    color: #fff;
    font-weight: 600;
    // text-shadow: 2px 2px 2px grey;
  }
}
</style>
