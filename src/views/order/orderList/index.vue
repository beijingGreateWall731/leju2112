<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :inline="false" size="mini">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号">
              <el-input v-model="form.orderSn" placeholder="订单编号" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单类型">
              <!-- orderType (integer, optional): 订单类型：0->正常订单；1->秒杀订单 , -->
              <el-select v-model="form.orderType" placeholder="订单类型" clearable>
                <el-option

                  label="正常订单"
                  :value="0"
                />
                <el-option

                  label="秒杀订单"
                  :value="1"
                />
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">

            <el-form-item label="支付方式">
              <!-- payType (integer, optional): 支付方式：0->未支付；1->支付宝；2->微信 , -->
              <el-select v-model="form.payType" placeholder="订单类型" clearable>
                <el-option
                  label="未支付"
                  :value="0"
                />
                <el-option
                  label="支付宝"
                  :value="1"
                />
                <el-option
                  label="微信"
                  :value="2"
                />
              </el-select>
            </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单状态">
              <!--status (integer, optional): 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->退货；5->无效订单 -->
              <el-select v-model="form.status" placeholder="订单状态" clearable>
                <el-option
                  label="待付款"
                  :value="0"
                />
                <el-option
                  label="待发货"
                  :value="1"
                />
                <el-option
                  label="已发货"
                  :value="2"
                />
                <el-option
                  label="已完成"
                  :value="3"
                />
                <el-option
                  label="退货"
                  :value="4"
                />
                <el-option
                  label="无效"
                  :value="5"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-form-item>
              <el-button type="primary" @click="doSearchOrder">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

    </el-card>

    <el-card shadow="always" class="margin-30">
      <el-table :data="orderList" border stripe>
        <el-table-column
          type="index"
          label="#"
          align="center"
          width="50"
        />
        <el-table-column
          prop="orderSn"
          label="订单编号"
          align="center"
        />
        <el-table-column
          prop="id"
          label="订单id"
          align="center"
        />
        <el-table-column
          label="支付方式"
          align="center"
        >
          <template slot-scope="scope">
            <!-- payType (integer, optional): 支付方式：0->未支付；1->支付宝；2->微信 , -->
            <el-tag v-if="scope.row.payType == 0" type="info" size="mini" effect="dark"> 未支付 </el-tag>
            <el-tag v-if="scope.row.payType == 1" type="success" size="mini" effect="dark"> 支付宝 </el-tag>
            <el-tag v-if="scope.row.payType == 2" type="danger" size="mini" effect="dark"> 微信 </el-tag>

          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          align="center"
        >
          <template slot-scope="scope">
            <!-- status (integer, optional): 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->退货；5->无效订单 -->
            <!-- <el-tag v-if="scope.row.status == 0" type="info" size="mini" effect="dark" closable> 待付款 </el-tag>
            <el-tag v-if="scope.row.status == 1" type="success" size="mini" effect="dark" closable> 待发货 </el-tag>
            <el-tag v-if="scope.row.status == 2" type="danger" size="mini" effect="dark" closable> 已发货 </el-tag>
            <el-tag v-if="scope.row.status == 3" type="danger" size="mini" effect="dark" closable> 已完成 </el-tag>
            <el-tag v-if="scope.row.status == 4" type="danger" size="mini" effect="dark" closable> 退货 </el-tag>
            <el-tag v-if="scope.row.status == 5" type="danger" size="mini" effect="dark" closable> 无效订单 </el-tag> -->
            <el-tag :type="scope.row.status | orderStatusType" size="mini" effect="dark"> {{ scope.row.status | orderStatus }} </el-tag>

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
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="goOrderDetail(scope.row.id)">查看订单</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="paginationParams.start"
        :page-sizes="paginationParams.pageSizes"
        :page-size="paginationParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationParams.totalPage"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </el-card>

  </div>
</template>
<script>
import {
  findOrdersByPage as findOrdersByPageApi
} from '@/api/order/order'
import mix from '@/mixins'
export default {
  name: 'OrderList',
  filters: {
    orderStatus(val) {
      // status (integer, optional): 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->退货；5->无效订单

      switch (val) {
        case 0:
          return '待付款'
        case 1:
          return '待发货'
        case 2:
          return '已发货'
        case 3:
          return '已完成'
        case 4:
          return '退货'
        case 5:
          return '无效订单'
      }
    },
    orderStatusType(val) {
      // status (integer, optional): 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->退货；5->无效订单

      switch (val) {
        case 0:
          return 'success'
        case 1:
          return 'info'
        case 2:
          return 'danger'
        case 3:
          return 'waring'
        case 4:
          return 'info'
        case 5:
          return 'info'
      }
    }
  },
  mixins: [mix],
  data() {
    return {
      form: {},
      orderList: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getOrderList()
  },
  mounted() {
  },
  methods: {
    doSearchOrder() {
      this.getOrderList()
    },
    getOrderList() {
      findOrdersByPageApi(this.paginationParams.start, this.paginationParams.limit, this.form)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            console.log(data)
            this.orderList = data.rows
            this.paginationParams.totalPage = data.total
          } else {
            this.$message.error(message)
          }
        })
    },
    goOrderDetail(id) {
      this.$router.push({ name: 'OrderDetail', params: { id }})
    },
    sizeChange(e) {

    },
    currentChange(e) {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
