<template>
  <div class="order-main">
    <div id="pie" class="order" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  mixins: [],

  data() {
    return {
      msg: 'hello world'
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      const orderEcharts = echarts.init(document.getElementById('pie'))
      const option = {
        title: {
          text: '购买终端'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,.5)',
          textStyle: {
            color: '#ffffff'
          },
          formatter: '{b}数量：{c}个;占比({d}%)'
        },

        series: [
          {
            name: '购买终端',
            type: 'pie',
            radius: [50, 100],
            roseType: 'area',
            data: [
              { value: 1048, name: 'Android' },
              { value: 735, name: 'IOS' },
              { value: 580, name: 'pc web' },
              { value: 484, name: 'wap app' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      orderEcharts.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.order-main{
  width: 100%;
  height: 100%;
  .order{
     width: 100%;
     height: 100%;
  }
}
</style>
