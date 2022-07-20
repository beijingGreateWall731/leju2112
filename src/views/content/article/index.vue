<template>
  <div class="article-main">

    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input v-model="form.author" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input v-model="form.title" placeholder="标题" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- editorType (integer, optional): 编辑器类型: 0 富文本; 1 markdown , -->
            <el-form-item label="编辑类型">
              <el-select v-model="form.editorType" style="width:100%;" value-key="" placeholder="编辑类型" clearable>
                <el-option
                  label="富文本"
                  :value="0"
                />
                <el-option
                  label="markdown"
                  :value="1"
                />
              </el-select>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-form-item>
              <el-button @click="restForm">重置</el-button>
              <el-button type="primary" @click="doSearchArticle">搜索</el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
    </el-card>

    <!-- 表格 -->
    <el-card class="margin-30">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini" @click="goAddArticle">新增</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="aritcleList"
        style="width: 100%"
        border
        stripe
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column
          type="index"
          label="#"
          align="center"
          width="50"
        />
        <el-table-column
          prop="title"
          label="文章标题"
          align="center"
          width="300"
        />
        <el-table-column
          label="封面图片"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.coverImg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="300"
        />
        <el-table-column
          prop="author"
          label="文章作者"
          align="center"
          width="400"
        />
        <el-table-column

          label="是否显示"
          align="center"
          width="400"
        >
          <template slot-scope="scope">
            <!-- isShow (integer, optional): 是否显示: 0 否; 1 是 , -->
            <el-switch
              v-model="scope.row.isShow"
              :active-value="1"
              :inactive-value="0"
              @change="articleStatusChange(scope.row.id,scope.row.isShow)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="editorType"
          label="编辑器类型"
          align="center"
          width="400"
        >
          <template slot-scope="scope">
            <!-- editorType (integer, optional): 编辑器类型: 0 富文本; 1 markdown , -->
            <el-button v-if="scope.row.editorType == 0" plain type="primary" size="small">富文本</el-button>
            <el-button v-if="scope.row.editorType == 1" plain type="success" size="small">markdown</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <el-button type="text" style="color:#409eff" size="small" icon="el-icon-view" @click="goUpdateArticle(scope.row.id)">编辑文章</el-button>
            <el-button type="text" style="color:#ff0000" size="small" @click="deleteArticleById(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- style="float:right;margin:20px 0;" -->
      <el-pagination
        :current-page="paginationParams.start"
        :page-sizes="paginationParams.pageSizes"
        :page-size="paginationParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationParams.totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

  </div>
</template>
<script>
import {
  findArticles as findArticlesApi,
  changeShowStatus as changeShowStatusApi,
  delArticle as delArticleApi
} from '@/api/content/article'
import mix from '@/mixins'
import { filterNullParams } from '@/utils'
import { getUserIP } from '@/utils'
export default {
  name: 'Article',
  mixins: [mix],
  data() {
    return {
      loading: false,
      aritcleList: [],
      form: {
        author: ''
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getArticleList()
  },
  mounted() {
    getUserIP((ip) => {
      console.log('ip===>', ip)
    })
  },
  methods: {
    getArticleList() {
      // 开启进度条
      this.loading = true

      findArticlesApi(this.paginationParams.start, this.paginationParams.limit, filterNullParams(this.form))
        .then(res => {
          // console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.aritcleList = rows
            // console.log('total==>', total)
            this.paginationParams.totalPage = total
          } else {
            this.$message.error(message)
          }
          // 关闭进度条
          this.loading = false
        })
    },
    // 每页大小改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.paginationParams.limit = val
      this.paginationParams.start = 1
      this.getArticleList()
    },
    // 页码改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.paginationParams.start = val
      this.getArticleList()
    },
    // 搜索文章
    doSearchArticle() {
      this.paginationParams.start = 1
      this.getArticleList()
    },
    restForm() {
      this.paginationParams.start = 1
      this.paginationParams.limit = 10
      this.form = {}
      this.getArticleList()
    },
    // 文章状态改变
    articleStatusChange(id, isShow) {
      console.log(id, isShow)
      changeShowStatusApi({
        id,
        isShow
      })
        .then(res => {
          const { success, message } = res
          if (success) {
            this.$message.success('文章状态修改成功')
          } else {
            this.$message.error(message)
          }
        })
    },
    // 删除文章
    deleteArticleById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击了确定
        delArticleApi(id)
          .then(res => {
            const { success, message } = res

            if (success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 刷新列表
              this.getArticleList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 跳转到新增页码
    goAddArticle() {
      this.$router.push({ name: 'ContentArticleDetail' })
    },
    // goArticleDetail
    goUpdateArticle(id) {
      this.$router.push({ name: 'ContentArticleDetailEdit', params: { id }})
    }
  }

}
</script>
<style lang="scss" scoped>
.article-main{
  .margin-30{
    margin: 30px;
  }
  ::v-deep label{
    font-weight: normal;
  }
}
</style>
