<template>
  <div>
    <!-- 对话框 -->
    <el-dialog
      title="地址详情"
      :visible.sync="dialogVisible"
      width="60%"
      @close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" size="mini">
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="发货地址" prop="addressName">
              <el-input v-model="form.addressName" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="发货人姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="发货人手机号">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="邮政编码">
              <el-input v-model="form.postCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="收货地址">
              <el-cascader
                v-model="selectedOptions"

                style="width:100%"
                size="mini"
                :options="options"
                @change="handleAddressChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="详细地址">
              <el-input v-model="form.detailAddress" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancleClose">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveAddress as saveAddressApi,
  updateAddress as updateAddressApi
} from '@/api/order/address'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import { initFormData } from '@/utils'
export default {
  name: 'AddressDetail',
  mixins: [],
  // props: ['articleId'],
  props: {
    articleId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: regionDataPlus, // 省市区数据源
      selectedOptions: ['410000', '410100', '410102'],
      dialogVisible: false,
      form: {
        name: '李四'

      },
      rules: {
        addressName: [{ required: true, message: '请输入收货地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    console.log('articleId===>', this.articleId)
  },
  mounted() {
    console.log('articleId===>mounted', this.articleId)
  },
  methods: {
    open(address = {}) {
      this.dialogVisible = true
      // console.log(address)
      if (address.createTime) {
        this.form = address
        this.selectedOptions = this.form.cityCode.split(',')
      }
    },
    // 取消按钮事件
    handleCancleClose() {
      this.dialogVisible = false
    },
    // 对话框关闭
    handleClose() {
      console.log('对话框关闭...')

      // 表单重置
      this.$refs.form.resetFields()
      // this.$refs.form.clearValidate()
      // this.form = {
      //   name: '李四'
      // }
      // 初始值

      this.form = {}
      console.log(this.$options.data())
      initFormData(this, 'form')
      // this.form = this.$options.data()['form']
    },
    // 三级联动发生改变触发
    handleAddressChange(value) {
      console.log(value)
      this.selectedOptions = value
    },
    addOrUpdateAddress() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.cityCode = this.selectedOptions.join(',')
          this.form.province = CodeToText[this.selectedOptions[0]]
          this.form.city = CodeToText[this.selectedOptions[1]]
          this.form.region = CodeToText[this.selectedOptions[2]]
          console.log(this.form)
          var api = null
          if (this.form.id) {
            api = updateAddressApi
          } else {
            api = saveAddressApi
          }
          api(this.form)
            .then(res => {
              console.log(res)
              const { success, message } = res
              if (success) {
                // 关闭对话框
                this.dialogVisible = false
                // 通知父组件刷新列表
                // this.getAddressList()
                this.$emit('refreshdata')
              } else {
                this.$message.error(message)
              }
            })
        } else {
          this.$message.error('请注意表单校验！')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
