<template>
  <div class="product-list-main">
    <el-collapse>
      <el-collapse-item title="商品管理介绍">
        <div style="text-indent: 5px;">商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情</div>
      </el-collapse-item>
    </el-collapse>

    <el-collapse class="margin-30">
      <el-collapse-item title="条件查询">
        <el-form ref="form" :model="form" label-width="80px" :inline="false" size="small">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="商品名称">
                <el-input v-model="form.name" placeholder="商品名称/模糊查询" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="商品货号">
                <el-input v-model="form.productSn" placeholder="商品货号" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="品牌">
                <el-select v-model="form.brandId" style="width:100%" placeholder="品牌" clearable>
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="上架状态">
                <!-- publishStatus (integer, optional): 上架状态，0->下架；1->上架 ,字典 -->
                <el-select v-model="form.publishStatus" style="width:100%" placeholder="上架状态" clearable>
                  <el-option
                    label="下架"
                    :value="0"
                  />
                  <el-option
                    label="上架"
                    :value="1"
                  />
                </el-select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="审核状态">
                <!-- verifyStatus (integer, optional): 审核状态：0->未审核；1->审核通过 -->
                <el-select v-model="form.verifyStatus" style="width:100%" placeholder="审核状态" clearable>
                  <el-option
                    label="未审核"
                    :value="0"
                  />
                  <el-option
                    label="审核通过"
                    :value="1"
                  />
                </el-select>
              </el-form-item></el-col>
            <el-col :span="6" :offset="12">

              <el-form-item>
                <el-button>重置</el-button>
                <el-button type="primary" @click="searchProduct">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

      </el-collapse-item>
    </el-collapse>
    <!-- 商品列表 -->
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="primary" size="mini" @click="goAddProduct">新增</el-button>
        <el-button type="primary" size="mini" @click="exportExcel">导出商品列表excel表格</el-button>

      </div>
      <el-table :data="productList" border stripe>
        <el-table-column
          type="index"
          align="center"
          label="#"
          width="50"
        />
        <el-table-column

          label="图片"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <img width="80" height="80" :src="scope.row.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="分类名称"
          prop="productCategoryName"
          align="center"
          width="50"
        />
        <el-table-column
          label="重量"
          prop="weight"
          align="center"
          width="50"
        />
        <el-table-column
          label="操作"
          fixed="right"

          align="center"
          width="120"
        >
          <template>
            <el-button type="text" size="small" style="color:#409eff">编辑</el-button>
            <el-button type="text" size="small" style="color:red">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>
<script>
import {
  findAllBrand as findAllBrandApi,
  productsByPage as productsByPageApi
} from '@/api/product'
import mix from '@/mixins'
export default {
  name: 'ProductList',
  mixins: [mix],
  data() {
    return {
      form: {},
      brandList: [],
      productList: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getBrandList()
    this.getProductList()
  },
  mounted() {
  },
  methods: {
    exportExcel() {
      // const data = [
      //   ['华为手机', '4999', '华为'],
      //   ['华为手表', '4999', '华为'],
      //   ['华为电脑', '4999', '华为'],
      //   ['华为耳机', '4999', '华为'],
      //   ['华为路由器', '4999', '华为'],
      //   ['华为交换机', '4999', '华为']
      // ]

      const tHeader = ['Id', 'name', 'brandName', 'price', 'createTime', 'ddd']
      const filterVal = ['id', 'name', 'brandName', 'price', 'createTime']
      const list = this.productList
      const data = this.formatJson(filterVal, list)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '商品数据', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    getBrandList() {
      findAllBrandApi()
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.brandList = data.items
          } else {
            this.$message.error(message)
          }
        })
    },
    getProductList() {
      productsByPageApi(this.paginationParams.start, this.paginationParams.limit, this.form)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.productList = data.rows
          } else {
            this.$message.error(message)
          }
        })
    },
    // 搜索商品
    searchProduct() {

    },
    goAddProduct() {
      this.$router.push({ name: 'productlistDetail' })
    }
  }
}
</script>
<style lang="scss" scoped>
.product-list-main{
  .el-collapse{
    padding-bottom: 10px;
    background-color: #fff;
    ::v-deep .el-collapse-item__header{
      text-indent: 5px;
    }
  }
}

</style>
