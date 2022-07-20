<template>
  <div id="dashboard" class="dashboard-main">
    <!-- 全屏 -->
    <el-button type="primary" size="default" @click="doFullScreen">全屏</el-button>

    <!-- 完成百分比 -->
    <div class="box">
      <div id="child" class="child" />
    </div>
    <div id="demo" class="demo" />
    <!-- 订单柱状图 -->
    <div class="order-container">
      <OrderEcharts :order-data="orderData" />
    </div>
    <!-- 销售额 -->
    <div class="sale-container">
      <SaleEcharts />
    </div>

    <!-- 字符云 -->
    <div class="world-clound">
      <WorldEcharts />
    </div>
    <!-- 购买终端 -->
    <div class="pie-container">
      <PieEcharts />
    </div>
    <!-- 中国地图 -->
    <div class="china-map">
      <MapEcharts />
    </div>
    <div class="bg-animate">
      <BG />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
import OrderEcharts from './components/OrderEcharts.vue'
import { randomOrderData } from './mockOrderData'
import SaleEcharts from './components/SaleEcharts.vue'
import WorldEcharts from './components/WorldEcharts.vue'
import PieEcharts from './components/PieEcharts.vue'
import MapEcharts from './components/MapEcharts.vue'
import BG from './components/BG.vue'
import screenfull from 'screenfull'
export default {
  name: 'Dashboard',
  components: {
    OrderEcharts,
    SaleEcharts,
    WorldEcharts,
    PieEcharts,
    MapEcharts,
    BG
  },
  data() {
    return {
      target: 100,
      done: 40
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    orderData() {
      return randomOrderData()
    }
  },

  mounted() {
    const p = this.done / this.target * 100 + '%'
    document.getElementById('child').style.setProperty('--animateWidth', p)
    const eDemo = echarts.init(document.getElementById('demo'))
    // const eDemo = echarts.init(document.getElementById('demo'))
    const options = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },

        {
          name: 'ddd',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }

      ]
    }
    eDemo.setOption(options)
  },
  methods: {
    doFullScreen() {
      if (screenfull.isEnabled) {
        // screenfull.request(document.getElementById('dashboard'))

        screenfull.toggle(document.getElementById('dashboard'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// css原子化  css in js
.dashboard-main{
  background-color: #0f1c3c;
  overflow: auto;
  .demo{
    width: 400px;
    height: 400px;
    border: 1px solid red;
  }
  .order-container{
    width: 600px;
    height: 400px;
    margin: 30px auto;
  }
  .box{
    position: relative;
    width: 600px;
    height: 10px;
    background-color: red;
    margin: 30px auto;
    border-radius: 10px;
    .child{
      position: absolute;
      top: 0;
      left: 0;
      // width: 80%;
      height: 100%;
      background-color: blue;
      border-radius: 10px;
      animation: sliding 2s linear 2s   forwards;
      &::after{
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: 10px;
        right: -20px;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 20px solid gold;
      }
    }
  }
  .world-clound{
    width: 400px;
    height: 400px;
    margin: 30px auto;
    border: 1px solid red;
  }
  .pie-container{
    width: 400px;
    height: 500px;
     margin: 30px auto;
  }
  .china-map{
     width: 800px;
    height: 800px;
     margin: 30px auto;
  }
  .bg-animate{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 15%;
  }
  @keyframes sliding {
    from{
      width: 0%;
    }
    to{
      // --target:100;
      // --done:'80%';
      width:var(--animateWidth)
    }
  }
}
</style>
