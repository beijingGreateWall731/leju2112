<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <el-table :data="returnList" border stripe>
        <el-table-column
          type="index"
          align="center"
          label="#"
          width="50"
        />
        <el-table-column
          prop="orderSn"
          label="订单标号"
          align="center"
        />
        <el-table-column

          label="退单状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="danger" size="mini" effect="dark">待处理</el-tag>
            <el-tag v-if="scope.row.status==1" type="info" size="mini" effect="dark">退货中</el-tag>
            <el-tag v-if="scope.row.status==2" type="success" size="mini" effect="dark">已完成</el-tag>
            <el-tag v-if="scope.row.status==3" type="warning" size="mini" effect="dark">已拒绝</el-tag>

          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
        />
        <el-table-column
          fixed="right"

          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <!-- 传递的是退单id -->
            <el-button type="primary" size="mini" @click="goReturnDetail(scope.row.id)">查看详情</el-button>

          </template>
        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>
<script>
import {
  findReturnApply as findReturnApplyApi
} from '@/api/order/returnOrder'
import mix from '@/mixins'
export default {
  name: 'ReturnList',
  mixins: [mix],
  data() {
    return {
      returnList: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getReturnList()
  },
  mounted() {
  },
  methods: {
    getReturnList() {
      findReturnApplyApi(this.paginationParams.start, this.paginationParams.limit)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.returnList = data.rows
            this.paginationParams.totalPage = data.total
          } else {
            this.$message.error(message)
          }
        })
    },
    goReturnDetail(id) {
      this.$router.push({ name: 'ReturnDetail', params: { id }})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
