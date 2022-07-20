<template>
  <div>
    <countTo :start-val="startVal" :end-val="endVal" :duration="3000" />
  </div>
</template>
<script>
import countTo from 'vue-count-to'
export default {
  components: {
    countTo
  },
  mixins: [],
  data() {
    return {
      startVal: 0,
      endVal: 3999999999
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
