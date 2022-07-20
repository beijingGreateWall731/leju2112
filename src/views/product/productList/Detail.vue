<template>
  <div class="product-detail-main">
    <el-steps :active="step" finish-status="success">
      <el-step title="步骤 1" />
      <el-step title="步骤 2" />
      <el-step title="步骤 3" />
    </el-steps>

    <el-card shadow="never" class="margin-30">

      <el-form ref="form" :model="product" :rules="rules" label-width="80px" :inline="false" size="mini">
        <section v-show="step===1">

          <div class="common-header">
            <h5 class="title">基本信息</h5>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="product.name" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="商品编码">
                <el-input v-model="product.productSn" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="商品分类">
                <el-select v-model="product.productCategoryId" style="width:100%;" placeholder="商品分类" clearable>
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="商品品牌">
                <el-select v-model="product.brandId" style="width:100%;" placeholder="商品品牌" clearable>
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>

              </el-form-item>
            </el-col>

          </el-row>

          <div class="common-header">
            <h5 class="title">商品属性</h5>
            <el-divider />
          </div>

          <el-row :gutter="20">
            <el-col :span="8" :offset="0">

              <el-form-item label="商品原价">
                <el-input-number
                  v-model="product.originalPrice"
                  style="width:100%;"
                  size="small"
                  :min="1"
                  :max="10000"
                  :step="5"
                />

              </el-form-item>

            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="促销类型">
                <el-select v-model="product.promotionType" style="width:100%" disabled placeholder="促销类型" clearable>
                  <!-- // 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 , -->
                  <el-option
                    v-for="item in promotionTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="缩略图">
                <el-upload
                  ref="picUplaod"
                  class="avatar-uploader"
                  :action="uploadFileOss"
                  :headers="token"
                  :on-success="handlePicSuccess"
                >
                  <img v-if="product.pic" width="150" height="150" :src="product.pic">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>

          </el-row>

        </section>
        <section v-show="step === 2">

          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="画册图片">
                <el-upload
                  :action="uploadFileOss"
                  :headers="token"
                  list-type="picture-card"
                  :file-list="albumPicList"
                  :on-success="handleAlbumPicsSucc"
                >
                  <i slot="default" class="el-icon-plus" />
                  <div slot="file" slot-scope="{file}">

                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download" />
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0" />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="sku设置">
                <div>
                  <span> 颜色：</span>
                  <el-checkbox-group v-model="colorSkuTemp.selectSku" style="display:inline-block;">
                    <el-checkbox v-for="item in colorSkuTemp.skuList" :key="item" :label="item">
                      {{ item }}
                      <el-button style="color:red;" type="text" size="mini" @click="deleteSkuItem('color',item)">删除</el-button>

                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div>
                  <span> 大小：</span>
                  <el-checkbox-group v-model="sizeSkuTemp.selectSku" style="display:inline-block;">
                    <el-checkbox v-for="item in sizeSkuTemp.skuList" :key="item" :label="item">
                      {{ item }}
                      <el-button style="color:red;" type="text" size="mini" @click="deleteSkuItem('size',item)">删除</el-button>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>

                <div>
                  <el-input v-model="colorSkuTemp.text" style="width:200px;" placeholder="颜色描述：比如土豪金" size="small" clearable />
                  <el-button style="margin-left:10px;" type="default" size="small" @click="addSkuItem('color')">创建颜色选项</el-button>
                  <el-input v-model="sizeSkuTemp.text" style="width:200px;margin-left:10px;" placeholder="大小描述：比如128g" size="small" clearable />
                  <el-button style="margin-left:10px;" type="default" size="small" @click="addSkuItem('size')">创建大小选项</el-button>
                  <el-button type="primary" size="small" @click="createSkuList">生成sku列表</el-button>

                </div>
                <!-- sku列表 -->
                <el-table :data="pmsSkuStockList" border stripe>
                  <el-table-column
                    type="index"
                    align="center"
                    label="#"
                    width="50"
                  />
                  <el-table-column

                    align="center"
                    label="图片"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <el-upload
                        :ref="`upload_${scope.row.tempId}`"
                        :action="uploadFileOss"
                        :headers="token"
                        :on-success="skuCoverImgUploadSucc"
                        @click.native="selectUplaodTempId(scope.row.tempId)"
                      >
                        <img v-if="scope.row.pic" :src="scope.row.pic" width="80" height="80" alt="">
                        <el-button v-else slot="trigger" size="small" type="primary">select file</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column

                    align="center"
                    label="颜色"
                    width="300"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.color" size="mini" clearable />

                    </template>
                  </el-table-column>
                  <el-table-column

                    align="center"
                    label="大小"
                    width="300"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.size" size="mini" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column

                    align="center"
                    label="sku编码"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.skuCode" size="mini" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    align="center"
                    label="操作"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <el-button type="text" size="mini" style="color:red;" @click="removeSkuItem(scope.row.tempId)">删除</el-button>

                    </template>
                  </el-table-column>
                </el-table>

              </el-form-item>
            </el-col>

          </el-row>

        </section>
        <section v-show="step === 3">
          第三页内容
        </section>

        <el-form-item>
          <el-button v-if="step === 1 || step === 2" type="primary" @click="nextStep">
            {{ step===1?'下一步，填写库存信息':'' }}
            {{ step===2?'下一步，填写移动端信息':'' }}
          </el-button>
          <el-button v-if="step!==1" type="default" @click="goBack">返回上一步</el-button>
          <el-button v-if="step===3" type="primary" @click="addProductAndSku">提交保存</el-button>

        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>
<script>
import {
  getAllCategory,
  findAllBrand as findAllBrandApi,
  addProductAndSkus as addProductAndSkusApi
} from '@/api/product'
import mix from '@/mixins'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'ProductDetail',
  mixins: [mix],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      step: 1,
      product: {
        pic: ''
      },
      rules: {
        name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }]
      },
      categoryList: [],
      brandList: [],
      //  <!-- // 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 , -->
      promotionTypeList: [
        {
          label: '没有促销使用原价',
          value: 0
        },

        {
          label: '使用促销价',
          value: 1
        },
        {
          label: '使用会员价',
          value: 2
        },
        {
          label: '使用阶梯价格',
          value: 3
        },
        {
          label: '使用满减价格',
          value: 4
        },
        {
          label: '限时购',
          value: 5
        }

      ],
      albumPicList: [], // 画册
      colorSkuTemp: {
        text: '',
        selectSku: ['土豪金', '玫瑰红'],
        skuList: ['土豪金', '玫瑰红', '天空蓝']
      },
      sizeSkuTemp: {
        text: '',
        selectSku: ['128g', '1024g'],
        skuList: ['128g', '156g', '1024g']
      },
      pmsSkuStockList: [], // skulist
      tempId: '' // 上传的是哪个sku的图片

    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getCategoryList()
    this.getBrandList()

    // this.getProductDetail()
    // .then(res =>{
    //   let arr = res.data.product.albumPics.split(',')
    //   arr.forEach(ele=>{
    //     this.albumPicList.push({
    //       name:'dd',
    //       uid:'dddd',
    //       url:ele
    //     })
    //   })
    //   this.albumPicList =arr
    // })
  },
  mounted() {
  },
  methods: {
    addProductAndSku() {
      this.pmsSkuStockList.forEach(ele => {
        ele.spData = JSON.stringify([
          {
            key: '颜色',
            value: ele.color
          },
          {
            key: '大小',
            valeu: ele.size
          }
        ])
      })
      var product = {
        'pmsSkuStockList': this.pmsSkuStockList,
        'product': {
          'albumPics': this.albumPicList.map(ele => ele.response.data.fileUrl).join(','), // 画册图片，连产品图片限制为5张，以逗号分割 ,会在移动端商品详情页展示
          'brandId': '1531172090421547009', // 关联的 品牌id
          'brandName': '99999', // 品牌名称

          'description': ' 意式极简北欧轻奢卧室电视柜高款现代北欧储', // 意式极简北欧轻奢卧室电视柜高款现代北欧储物柜小户型精品家具 卧室电视柜（两门）
          // detail是进入详情页展示的内容
          'detailDesc': ' 家具新品大赏：1件7.5折，2件7.2折，满额在享2', // 家具新品大赏：1件7.5折，2件7.2折，满额在享2%现金返现，超值好礼送不停！时间：11.14-11.20

          'detailMobileHtml': '<p>你好</p>', // 移动端展示方式,商品的富文本内容,放到这个字段
          'detailTitle': ' 电视柜 意式极简北欧轻奢卧室电视柜高款现', // 简野 电视柜 意式极简北欧轻奢卧室电视柜高款现代北欧储物柜小户型精品家具 卧室电视柜（两门）

          'keywords': '地中海,凳子', // 关键词,逗号分割,  地中海,凳子,xxx
          'lowStock': 111, // 预警库存(预留)

          'name': '简野（JIANYE）ZY-22', // 商品名称 简野（JIANYE）ZY-22
          'newStatus': 1, // 新品状态:0->不是新品；1->新品 ,新品会在移动端首页推荐
          'note': '', // 备注,比如小舅子供货不入账 ,
          'originalPrice': 10000, // 原价
          'pic': 'https://img12.360buyimg.com/n7/jfs/t1/50699/31/18471/332008/629345caE5913516c/4df0726c5252015c.jpg', // 封面图片
          'previewStatus': 1, // 是否为预告商品：0->不是；1->是 ,
          'price': 8888, // 当前价格

          'productCategoryId': '1528369702476288001', // 分类id
          'productCategoryName': '衣服', // 分类名称
          'productSn': '354434545', // 商品编码,需要手填.

          // 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 ,
          'promotionType': 1,
          // 上架状态：0->下架；1->上架 ,
          'publishStatus': 1,
          // 推荐状态；0->不推荐；1->推荐 ,
          'recommendStatus': 1,
          // 销量,不用处理
          'sale': 0,
          //  以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 ,
          'serviceIds': '1,2,3', // 1,2
          'sort': 0, // 排序,降序.值越大越靠前
          'stock': 1111111, // 库存
          'subTitle': '二级标题', // 二级标题
          'unit': '台', // 单位,比如 斤/辆/台
          'verifyStatus': 1, //  审核状态：0->未审核；1->审核通过 ,
          'weight': 0.001 // 商品重量，默认为千克
        }
      }
      console.log('this.product==>', product)
      addProductAndSkusApi(product)
        .then(res => {
          const { success, message } = res
          if (success) {
            this.$router.push({ name: 'productlist' })
          } else {
            this.$message.error(message)
          }
        })
    },
    handleRemove(file) {
      console.log(file)
      this.albumPicList = this.albumPicList.filter(item => item.uid !== file.uid)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 画册上传成功
    handleAlbumPicsSucc(res, file, fileList) {
      console.log('res==>', res)
      console.log('file==>', file)
      console.log('fileList==>', fileList)
      this.albumPicList = fileList
      // 提交的数据
      console.log('albumpic==>', this.albumPicList.map(item => item.response.data.fileUrl).join(','))
    },
    // 缩略图上传成功
    handlePicSuccess(res) {
      console.log(res)
      const { success, data, message } = res
      if (success) {
        this.product.pic = data.fileUrl
      } else {
        this.$message.error(message)
      }
      this.$refs.picUplaod.clearFiles()
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
    getCategoryList() {
      getAllCategory()
        .then(res => {
          // console.log(res)
          const { success, data, message } = res
          if (success) {
            const item = data.items.find(item => item.category.name === '乐居')
            if (item) {
              this.categoryList = item.children
            }
          } else {
            this.$message.error(message)
          }
        })
    },
    // 添加颜色和大小选项
    addSkuItem(type) {
      if (type === 'color') {
        const text = this.colorSkuTemp.text
        if (this.colorSkuTemp.skuList.indexOf(text) !== -1) {
          this.$message.warning(`选项${text}已存在`)
          return
        }
        this.colorSkuTemp.skuList.push(text)
        this.colorSkuTemp.text = ''
      } else if (type === 'size') {
        const text = this.sizeSkuTemp.text
        if (this.sizeSkuTemp.skuList.indexOf(text) !== -1) {
          this.$message.warning(`选项${text}已存在`)
          return
        }
        this.sizeSkuTemp.skuList.push(this.sizeSkuTemp.text)
        this.sizeSkuTemp.text = ''
      }
    },
    // 删除颜色和大小选项
    deleteSkuItem(type, value) {
      if (type === 'color') {
        const index = this.colorSkuTemp.skuList.findIndex(ele => ele === value)
        this.colorSkuTemp.skuList.splice(index, 1)
      } else if (type === 'size') {
        const index = this.sizeSkuTemp.skuList.findIndex(ele => ele === value)
        this.sizeSkuTemp.skuList.splice(index, 1)
      }
    },
    // 生成skulist
    createSkuList() {
      // console.log('1111')
      this.pmsSkuStockList = []
      for (let i = 0; i < this.colorSkuTemp.selectSku.length; i++) {
        for (let j = 0; j < this.sizeSkuTemp.selectSku.length; j++) {
          this.pmsSkuStockList.push({
            'tempId': uuidv4(), // 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
            'lockStock': 5, // 锁定库存
            'lowStock': 10, // 库存警戒线
            'pic': '', // 图片
            'price': 4999, // 当前价格

            'promotionPrice': 0, // 单品促销价格
            'sale': 0, // 销量
            'skuCode': '', // sku的编码,手动填写
            // spData:  [{"key":"颜色","value":"蓝色"},{"key":"容量","value":"32G"}]
            // 'spData': JSON.stringify([
            //   {
            //     key: '颜色',
            //     value: this.colorSkuTemp.selectSku[i]
            //   },
            //   {
            //     key: '大小',
            //     valeu: this.sizeSkuTemp.selectSku[j]
            //   }
            // ]), // sku属性，json格式String类型 ,
            'stock': 10000, // 库存
            'color': this.colorSkuTemp.selectSku[i],
            'size': this.sizeSkuTemp.selectSku[j]
          })
        }
      }

      // console.log('2222=>', this.pmsSkuStockList)
    },
    // sku 封面图片上传成功回调
    skuCoverImgUploadSucc(res) {
      // console.log(res)
      const { success, data, message } = res
      if (success) {
        const { fileUrl } = data
        const item = this.pmsSkuStockList.find(ele => ele.tempId === this.tempId)
        if (item) {
          item.pic = fileUrl
        }
        // console.log('ddd=>', `upload_${this.tempId}`)
        // console.log('  this.$refs[`upload_${this.tempId}`]==>', this.$refs[`upload_${this.tempId}`])
        this.$refs[`upload_${this.tempId}`].clearFiles()
        // 清空tempid
        this.tempId = ''
      } else {
        this.$message.error(message)
      }
    },
    // 删除sku item
    removeSkuItem(tempId) {
      this.pmsSkuStockList = this.pmsSkuStockList.filter(ele => ele.tempId !== tempId)
    },
    // 标识哪个sku
    selectUplaodTempId(tempId) {
      // console.log(111)
      this.tempId = tempId
    },
    nextStep() {
      this.step++
    },
    goBack() {
      this.step--
    }
  }
}
</script>
<style lang="scss" scoped>
.product-detail-main{
  .el-steps{
    padding: 50px 300px;
    background-color: #fff;
  }
  .common-header{
    .title{
      margin: 10px 0;
    }
    .el-divider--horizontal{
      margin: 10px 0;
    }
  }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  ::v-deep label{
    font-weight: normal;
  }
}

</style>
