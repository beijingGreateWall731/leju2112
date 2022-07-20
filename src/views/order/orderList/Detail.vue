<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <el-steps :active="orderBase.status + 1">
        <el-step title="待付款" :description="orderBase.createTime" />
        <el-step title="待发货" :description="orderBase.paymentTime" />
        <el-step title="已发货" :description="orderBase.deliveryTime" />
        <el-step v-if="orderBase.status !== 4" title="已完成" :description="orderBase.receiveTime" />
        <el-step v-if="orderBase.status !== 3 " title="退货" :description="orderBase.finishTime" />
      </el-steps>
      <el-divider direction="horizontal" />
      <!-- 订单信息 -->
      <div>
        <h5>订单信息：
          <el-tag v-if="orderBase.status == 0" type="danger" size="mini" effect="dark">待付款</el-tag>
          <el-tag v-if="orderBase.status == 1" type="info" size="mini" effect="dark">待发货</el-tag>
          <el-tag v-if="orderBase.status == 2" type="success" size="mini" effect="dark">已发货</el-tag>
          <el-tag v-if="orderBase.status == 3" type="waring" size="mini" effect="dark">已完成</el-tag>
          <el-tag v-if="orderBase.status == 4" type="danger" size="mini" effect="dark">退货</el-tag>

        </h5>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>
              订单金额:
              <span style="color:red;"> {{ orderBase.totalAmount }} </span>
            </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>
              订单编号:
              <span style="color:red;"> {{ orderBase.orderSn }} </span>
            </p>
          </el-col>
          <el-col :span="6" :offset="0" />
          <el-col :span="6" :offset="0" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>
              下单时间:
              <span> {{ orderBase.createTime }} </span>
            </p>
          </el-col>
          <el-col :span="6" :offset="0" />
          <el-col :span="6" :offset="0" />
          <el-col :span="6" :offset="0" />
        </el-row>
        <el-divider direction="horizontal" />

      </div>
      <!-- 收货人信息 -->
      <div>
        <h5>收货人信息:</h5>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>
              收货人: {{ orderBase.receiverName }}

            </p>
          </el-col>
          <el-col :span="6" :offset="0" />
          <el-col :span="6" :offset="0" />
          <el-col :span="6" :offset="0" />
        </el-row>

      </div>
      <!-- 商品信息 -->
      <div>
        <h5>商品信息:</h5>
        <el-table :data="orderItems" border stripe>
          <el-table-column
            prop="productName"
            label="商品名称"
            align="center"
          />
          <el-table-column

            label="商品图片"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <img width="100" height="100" :src="scope.row.productSkuPic" alt="">
            </template>
          </el-table-column>
          <el-table-column

            label="是否退货"
            align="center"
          >
            <template slot-scope="scope">
              <div> {{ scope.row.isReturn == 1?'是':'否' }} </div>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <!-- 费用信息 -->
      <div>
        <h5>费用信息:</h5>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>
              运费金额:
              <span style="color:red;">0</span>
            </p>
          </el-col>
          <el-col :span="6" :offset="0" />
        </el-row>
        <!-- 发货 -->
        <div v-if="orderBase.status == 1">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="mini">
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item label="物流公司" prop="deliveryCompany">
                  <el-select v-model="form.deliveryCompany" clearable>
                    <el-option
                      label="顺丰1"
                      value="顺丰1"
                    />
                    <el-option
                      label="顺丰2"
                      value="顺丰2"
                    />
                    <el-option
                      label="顺丰3"
                      value="顺丰3"
                    />
                    <el-option
                      label="顺丰4"
                      value="顺丰4"
                    />
                  </el-select>

                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="物流单号" prop="deliverySn">
                  <el-input v-model="form.deliverySn" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" :offset="8">
                <el-form-item>
                  <el-button type="primary" @click="doSendProduct">确认发货</el-button>
                </el-form-item>
              </el-col>

            </el-row>

          </el-form>

        </div>
      </div>

      <!-- 物流信息
       -->
      <div>
        <h5>物流信息: [{{ orderBase.deliveryCompany }}] [{{ orderBase.deliverySn }}]</h5>
        <!-- <el-table :data="" border stripe>
          <el-table-column
            v-for="col in columns"
            :key="col.id"
            :prop="col.id"
            :label="col.label"
            :width="col.width"
          />
        </el-table> -->

      </div>
    </el-card></div>
</template>
<script>
import {
  orderDetail as orderDetailApi,
  sendDone as sendDoneApi
} from '@/api/order/order'
export default {
  name: 'OderDetail',
  mixins: [],
  data() {
    return {
      orderId: '',
      orderBase: {},
      orderItems: [],
      form: {},
      rules: {
        deliverySn: [{ required: true, message: '请填写物流单号', trigger: 'blur' }],
        deliveryCompany: [{ required: true, message: '请填写物流公司', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.orderId = this.$route.params.id
    this.getOrderDetail()
  },
  mounted() {
  },
  methods: {
    getOrderDetail() {
      orderDetailApi(this.orderId)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            // console.log(data)
            this.orderBase = data.orderDetail.orderBase
            this.orderItems = data.orderDetail.orderItems
          } else {
            this.$message.error(message)
          }
        })
    },
    doSendProduct() {
      sendDoneApi({
        orderId: this.orderId,
        ...this.form
      })
        .then(res => {
          // console.log(res)
          const { success, message } = res
          if (success) {
            this.$message.success('发货成功')
            this.getOrderDetail()
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
