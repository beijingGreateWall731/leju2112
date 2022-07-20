<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <!-- 订单信息： -->
      <div>
        <h5>订单信息：
          <el-tag v-if="orderReturnApply.status==0" type="danger" size="mini" effect="dark">待处理</el-tag>
          <el-tag v-if="orderReturnApply.status==1" type="info" size="mini" effect="dark">退货中</el-tag>
          <el-tag v-if="orderReturnApply.status==2" type="success" size="mini" effect="dark">已完成</el-tag>
          <el-tag v-if="orderReturnApply.status==3" type="warning" size="mini" effect="dark">已拒绝</el-tag>

        </h5>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>订单编号:
              <span> {{ orderReturnApply.orderSn }} </span>
              <!-- 传递的是订单id -->
              <router-link :to="{name:'OrderDetail',params:{id:orderReturnApply.orderId}}">查看订单详情</router-link>
              <!-- <router-link :to="`/order/orderdetail/${orderReturnApply.orderId}`">查看订单详情</router-link> -->
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>申请时间 <span>{{ orderReturnApply.createTime }}</span></p>
          </el-col>

        </el-row>
        <el-divider direction="horizontal" />

      </div>
      <!-- 退货商品 -->
      <div>
        <el-table :data="[orderReturnApply]" border stripe>
          <el-table-column

            label="商品图片"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <img width="100" height="100" :src="scope.row.productPic" alt="">
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>联系人: <span> {{ orderReturnApply.returnPhone }} </span> </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>联系电话: <span> {{ orderReturnApply.returnPhone }} </span> </p>
          </el-col>
        </el-row>
        <el-divider direction="horizontal" />

      </div>
      <!-- 费用信息 -->
      <div>
        <h5>费用信息:</h5>
        <el-form v-if="orderReturnApply.status == 0" ref="form" :model="form" label-width="80px" :inline="false" size="mini">
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="退款金额">
                <el-input v-model="form.returnAmount" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="处理人">
                <el-input v-model="form.handleMan" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="处理备注">
                <el-input v-model="form.handleNote" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="agreeReturn">同意</el-button>
            <el-button>拒绝</el-button>
          </el-form-item>
        </el-form>
        <el-divider direction="horizontal" />

      </div>
      <!-- 处理结果 -->
      <div v-if="orderReturnApply.status == 1 ||orderReturnApply.status==2">
        <h5>处理结果:</h5>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p> 处理人：{{ orderReturnApply.handleMan }} </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p> 处理备注：{{ orderReturnApply.handleNote }} </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p> 处理时间：{{ orderReturnApply.handleTime }} </p>
          </el-col>

        </el-row>
        <el-form v-if="orderReturnApply.status==1" ref="receiveForm" :model="receiveForm" label-width="80px" :inline="false" size="mini">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="收货人">
                <el-input v-model="receiveForm.receiveMan" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="收货备注">
                <el-input v-model="receiveForm.receiveNote" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="confirmRecevie">确认收货</el-button>

          </el-form-item>
        </el-form>
        <el-divider />

      </div>
      <!-- 收货信息 -->
      <div v-if="orderReturnApply.status==2">
        <p> {{ orderReturnApply.receiveMan }} </p>
        <p> {{ orderReturnApply.receiveNote }} </p>
        <p> {{ orderReturnApply.receiveTime }} </p>
      </div>
    </el-card>

  </div>
</template>
<script>
import {
  orderReturn as orderReturnApi,
  agreeApply as agreeApplyApi,
  receiveProduct as receiveProductApi
} from '@/api/order/returnOrder'

export default {
  name: 'ReturnDetail',
  mixins: [],
  data() {
    return {
      returnId: '',
      orderReturnApply: {},
      form: {},
      receiveForm: {}
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.returnId = this.$route.params.id
    this.getReturnDetail()
  },
  mounted() {
  },
  methods: {
    getReturnDetail() {
      orderReturnApi(this.returnId)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            // console.log(data)
            this.orderReturnApply = data.orderReturnApply
          } else {
            this.$message.error(message)
          }
        })
    },
    agreeReturn() {
      agreeApplyApi(this.returnId, {
        id: this.returnId,
        ...this.form
      })
        .then(res => {
          const { success, message } = res
          if (success) {
            this.$message.success('同意了')
            this.getReturnDetail()
          } else {
            this.$message.error(message)
          }
        })
    },
    confirmRecevie() {
      receiveProductApi(this.returnId, {
        id: this.returnId,
        ...this.receiveForm
      })
        .then(res => {
          const { success, message } = res
          if (success) {
            this.getReturnDetail()
          } else {
            this.$message.error(message)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
