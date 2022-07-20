<template>
  <div class="addrss-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="primary" size="mini" @click="showDialog">新增</el-button>
      </div>
      <el-table :data="addressList" border stripe>
        <el-table-column
          type="index"
          label="#"
          width="50"
          align="center"
        />
        <el-table-column
          label="地址名称"
          prop="addressName"
          align="center"
        />
        <el-table-column
          label="默认发货地址"

          align="center"
        >
          <template slot-scope="scope">
            <!-- sendStatus (integer, optional): 默认发货地址：0->否；1->是 -->
            <el-switch v-model="scope.row.sendStatus" :active-value="1" :inactive-value="0" @change="sendStatusChange(scope.row.id)" />

          </template>
        </el-table-column>
        <el-table-column
          label="收货人姓名"
          prop="name"
          align="center"
        />
        <el-table-column
          label="收货人电话"
          prop="phone"
          align="center"
        />
        <el-table-column
          label="收货人地址"
          prop="detailAddress"
          align="center"
        />
        <el-table-column
          label="默认收货地址"

          align="center"
        >
          <template slot-scope="scope">
            <!-- receiveStatus (integer, optional): 是否默认收货地址：0->否；1->是 , -->
            <el-switch v-model="scope.row.receiveStatus" :active-value="1" :inactive-value="0" />

          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
        />
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button type="text" size="mini" style="color:#409eff" @click="goEditAddress(scope.row.id)">编辑</el-button>
            <el-button type="text" size="mini" style="color:red">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <AddressDetail ref="addressDetail" :article-id="id" @refreshdata="refreshAddressList" />
  </div>
</template>
<script>
import {
  addressList as addressListApi,
  setSendOne as setSendOneApi,
  companyAddress as companyAddressApi
} from '@/api/order/address'

import AddressDetail from './components'
export default {
  name: 'Address',
  components: {
    AddressDetail
  },
  mixins: [],
  data() {
    return {
      id: '',
      addressList: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getAddressList()
  },
  mounted() {
  },
  methods: {
    getAddressList() {
      addressListApi()
        .then(res => {
          // console.log(res)
          const { success, data, message } = res
          if (success) {
            this.addressList = data.items
          } else {
            this.$message.error(message)
          }
        })
    },
    sendStatusChange(id) {
      // console.log('id===>', id)
      setSendOneApi({ id })
        .then(res => {
          console.log(res)
          const { success, message } = res
          if (success) {
            // 刷新列表
            this.getAddressList()
          } else {
            this.$message.error(message)
          }
        })
    },
    showDialog() {
      // this.dialogVisible = true
      this.$refs.addressDetail.open()
    },
    refreshAddressList() {
      this.getAddressList()
    },
    goEditAddress(id) {
      console.log('id==>', id)
      this.id = id
      //
      companyAddressApi(id)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.$refs.addressDetail.open(data.address)
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
