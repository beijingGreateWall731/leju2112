<template>
  <div class="world-coloud-main">
    <div id="worldCloud" class="world-cloud" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
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
    var chart = echarts.init(document.getElementById('worldCloud'))
    chart.setOption({
      tooltip: {

      },
      series: [{
        type: 'wordCloud',

        // The shape of the "cloud" to draw. Can be any polar equation represented as a
        // callback function, or a keyword present. Available presents are circle (default),
        // cardioid (apple or heart shape curve, the most known polar equation), diamond (
        // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

        shape: 'circle',

        // Keep aspect ratio of maskImage or 1:1 for shapes
        // This option is supported from echarts-wordcloud@2.1.0
        keepAspect: false,

        // A silhouette image which the white area will be excluded from drawing texts.
        // The shape option will continue to apply as the shape of the cloud to grow.

        // maskImage: maskImage,

        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.

        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,

        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.

        sizeRange: [12, 60],

        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

        rotationRange: [-90, 90],
        rotationStep: 30,

        // size of the grid in pixels for marking the availability of the canvas
        // the larger the grid size, the bigger the gap between words.

        gridSize: 8,

        // set to true to allow word being draw partly outside of the canvas.
        // Allow word bigger than the size of the canvas to be drawn
        drawOutOfBound: false,

        // If perform layout animation.
        // NOTE disable it will lead to UI blocking when there is lots of words.
        layoutAnimation: true,

        // Global text style
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // Color can be a callback function or a color string
          color: function() {
            // Random color
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        },
        emphasis: {
          focus: 'self',

          textStyle: {
            textShadowBlur: 10,
            textShadowColor: '#333'
          }
        },

        // Data is an array. Each array item must have name and value property.
        data: [
          {
            name: '总出行9次',
            value: 3000

          },
          {
            name: '特级席次偏好',
            value: 2500
          },
          {
            name: '6-12出行偏好',
            value: 2300
          },
          {
            name: '价格不敏感',
            value: 2000
          },
          {
            name: '时间敏感',
            value: 1900
          },
          {
            name: '高铁偏好',
            value: 1800
          },
          {
            name: '常用北京南站',
            value: 1700
          },

          {
            name: '总出行9次',
            value: 3100
          },
          {
            name: '特级席次偏好',
            value: 2150
          },
          {
            name: '6-12出行偏好',
            value: 2020
          },
          {
            name: '价格不敏感',
            value: 2100
          },
          {
            name: '时间敏感',
            value: 1910
          },
          {
            name: '高铁偏好',
            value: 1810
          },
          {
            name: '常用北京南站',
            value: 1720
          },
          {
            name: '6-12出行偏好',
            value: 202214
          },
          {
            name: '价格不敏感',
            value: 21014
          },
          {
            name: '时间敏感',
            value: 19114
          },
          {
            name: '高铁偏好',
            value: 18114
          },
          {
            name: '常用北京南站',
            value: 114214
          },

          {
            name: '6-12出行偏好',
            value: 1020
          },
          {
            name: '价格不敏感',
            value: 1100
          },
          {
            name: '6-12出行偏好',
            value: 120
          },
          {
            name: '价格不敏感',
            value: 100
          }
        ]
      }]
    })
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.world-coloud-main{
  width: 100%;
  height: 100%;
  .world-cloud{
    width: 100%;
    height: 100%;
  }
}
</style>
