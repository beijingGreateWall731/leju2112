<template>
  <div class="order-main">
    <div id="order" class="order" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  mixins: [],
  props: {
    orderData: {
      required: true,
      type: Array,
      default: function() {
        return []
      }
    }
  },
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
      const dateList = []
      const orderList = []
      const returnList = []
      this.orderData.forEach(ele => {
        dateList.push(ele.date)
        orderList.push(ele.orderNum)
        returnList.push(ele.returnNum)
      })
      const orderEcharts = echarts.init(document.getElementById('order'))
      const option = {
        color: ['#9e02f3', '#24a7ff'],
        title: {
          text: '订单退单柱状图',
          textStyle: {
            color: '#ff0000'
          }
        },
        legend: {
          bottom: 0
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,.5)',
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          data: dateList,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ff0000'
            }
          },
          axisLabel: {
            show: true,
            rotate: 30
          }
        },
        yAxis: {},
        series: [
          {
            name: '订单',
            type: 'bar',
            data: orderList
          },

          {
            name: '退单',
            type: 'bar',
            data: returnList
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
