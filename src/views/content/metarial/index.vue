<template>
  <div class="material-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="primary" size="default">新增</el-button>

      </div>
      <div class="card-container">
        <el-card
          v-for="item in list"
          :key="item.id"
          shadow="never"

          style="width:18%;height:400px;margin-bottom:10px;"
        >
          <div slot="header">
            <span>创建时间:{{ item.createTime }}</span>
          </div>
          <div>
            <!-- <img width="90%" height="280" :src="item.ossUrl" alt=""> -->
            <el-image style="width:90%; height:280px" :src="item.ossUrl" :preview-src-list="srcList" />

          </div>
          <el-button type="danger" size="mini">删除</el-button>

        </el-card>
      </div>

    </el-card>

  </div>
</template>
<script>
import {
  findMaterialByPage as findMaterialByPageApi
} from '@/api/content/material'
import mix from '@/mixins'
export default {
  name: 'Metarial',
  mixins: [mix],
  data() {
    return {
      list: [],
      srcList: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getMetarialList()
  },
  mounted() {
  },
  methods: {
    getMetarialList() {
      findMaterialByPageApi(this.paginationParams.start, this.paginationParams.limit)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            this.list = data.rows
            this.srcList = this.list.map(ele => ele.ossUrl)
          } else {
            this.$message.error(message)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.material-main{
  .card-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
