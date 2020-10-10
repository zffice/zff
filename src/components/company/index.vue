<template>
  <div id="index">
    <section class="boxwrap">
  
    </section>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'cindex',
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {
   
  },
}
</script>
<style >
.el-col-5{
  width: 20%;
}
</style>
<style lang="scss" scoped>
#bottom {
  width: 100%;
  height: 100%;
}
.boxwrap {
  display: flex;
}
.el-main {
        .item_3{
           height: 94%;
           float: left;
        }
        .item_4{
          margin-left:7%;
           height: 94%;
           float: left;
        }
        .title{
          font-size:.3rem;
          color:#fff;
          line-height:.5rem;
        }
        .content{
          font-weight:700;
          font-size:.3rem;
          background-image:-webkit-linear-gradient(bottom,#3962d4,#9db5eb);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
    }
</style>

