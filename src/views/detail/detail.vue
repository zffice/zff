<template>
  <div class="detail">
    <header class="header">
      <div class="title">智能工厂生产车间大屏</div>
      <div id="date"></div>
    </header>
    <section class="section">
      <div class="cloum">
        <div class="navmenu">
          <el-menu class="navone" default-active="3">
            <el-menu-item index="1">
              <span slot="title">一车间</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">二车间</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">三车间</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">四车间</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span slot="title">五车间</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="cloum2">
        <div class="clocen">
          <div class="items">
            <div class="mask">设备一</div>
            <div class="item">
              <img src="../../assets/images/sb.png" alt="" />
              <div class="imgdata">
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                <div class="item_1"></div>
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
              </div>
              <div class="imgdata">
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                <div class="item_1"></div>
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
              </div>
            </div>
          </div>
          <div class="items">
            <div class="mask">设备二</div>
            <div class="item">
              <img src="../../assets/images/sb.png" alt="" />
              <div class="imgdata">
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                <div class="item_1"></div>
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
              </div>
              <div class="imgdata">
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                <div class="item_1"></div>
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
              </div>
            </div>
          </div>
          <div class="items">
            <div class="mask">设备三</div>
            <div class="item">
              <img src="../../assets/images/sb.png" alt="" />
              <div class="imgdata2">
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                <div class="item_1"></div>
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
              </div>
              <div class="imgdata2">
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
                <div class="item_1"></div>
                <dv-decoration-10 style="width:100%;height:5px;margin:auto" />
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="bottom"></div>
      </div>
      <div class="cloum">
        <div class="navmenu">
          <el-menu class="navtwo" default-active="2">
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
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/api/busin'
import workShop from '@/components/workshop/index'
import linePercent from '@/components/line/line'
import lineOne from '@/components/line/lineOne'
import Vue from 'vue'
import { scrollBoard } from '@jiaminghi/data-view'
import echarts from 'echarts'
export default {
  name: 'Detail',
  components: {
    workShop,
    linePercent,
    lineOne,
  },
  data() {
    return {}
  },
  mounted() {
    require('../../assets/js/common.js')
  },
  methods: {},
}
</script>
<style scoped>
.detail .section .cloum .navmenu .el-menu {
  border-right: solid 0px #e6e6e6;
  background-color: transparent;
}
.detail .section .cloum .navmenu .el-menu-item {
  border: #5483ed solid 1px;
  border-left: 0px;
  border-radius: 50px;
  background: rgba(56, 77, 154, 0.4);
  text-align: right;
  font-size: 0.3rem;
  font-weight: 600;
  color: #ffff;
  margin: 0.5rem 1rem;
}
.detail .section .cloum .navmenu .navtwo .el-menu-item {
  text-align: left;
  margin: 0.5rem 1rem;
}
.detail .section .cloum .navmenu .el-menu-item,
.el-submenu__title {
  height: 1rem;
  line-height: 1rem;
}
/* //设置鼠标悬停时el-menu-item的样式 */
.detail .section .cloum .navmenu .navone .el-menu-item:hover {
  border-right: #33a2ef solid 6px !important;
  background-color: rgba(161, 176, 203, 0.4) !important;
  color: #38b2ff !important;
}
/* //设置选中el-menu-item时的样式 */
.detail .section .cloum .navmenu .navone .el-menu-item.is-active {
  border-right: #33a2ef solid 6px !important;
  background-color: #cfe0ee !important;
  color: #38b2ff !important;
}
/* //设置鼠标悬停时el-menu-item的样式 */
.detail .section .cloum .navmenu .navtwo .el-menu-item:hover {
  border-left: #33a2ef solid 6px !important;
  background-color: rgba(161, 176, 203, 0.4) !important;
  color: #38b2ff !important;
}
/* //设置选中el-menu-item时的样式 */
.detail .section .cloum .navmenu .navtwo .el-menu-item.is-active {
  border-left: #33a2ef solid 6px !important;
  background-color: #cfe0ee !important;
  color: #38b2ff !important;
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
  background: url('~@/assets/beijing.png') no-repeat;
  height: 100vh;
  background-size: 100% 100%;

  .header {
    background: url('~@/assets/header.png') no-repeat;
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
    .cloum {
      float: left;
      margin: 0.2rem;
      width: 18%;
      height: 90vh;
      border: 1px solid #274774;
      display: flex;
      justify-content: right;
      align-items: center;
      border-radius: 0 50% 50% 0;
      .navmenu {
        width: 100%;
        // border: 1px solid #335533;
        height: 70%;
      }
    }
    .cloum:nth-child(3) {
      border-radius: 50% 0 0 50%;
    }
    .cloum2 {
      float: left;
      margin: 0.2rem;
      width: 59.3%;
      height: 90vh;
      // border: 1px solid #274774;
      .clocen {
        width: 100%;
        height: 80%;
        .items {
          width: 32%;
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
              padding: 5% 28%;
            }
            .imgdata {
              width: 92%;
              height: 28%;
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
              margin: 0 0.2rem;
              float: left;
              background: rgba(21, 49, 122, 0.5);
              .item_1 {
                width: 100%;
                height: 97%;
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
        height: 15%;
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
