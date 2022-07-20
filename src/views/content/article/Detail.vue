<template>
  <div class="article-detail-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span> {{ id?"修改文章":"新增文章" }}</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title " placeholder="标题" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <!-- isShow (integer, optional): 是否显示: 0 否; 1 是 , -->
            <el-form-item label="是否显示">
              <el-switch v-model="form.isShow" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="13" :offset="0">
            <el-form-item label="摘要">
              <el-input v-model="form.summary" type="textarea" placeholder="摘要" rows="3" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="封面图片">
              <el-upload
                ref="uploadCoverImg"
                class="upload-demo"
                :action="uploadFileOss"
                :headers="token"
                :on-success="imageUploadSucc"
                :before-upload="beforeAvatarUpload"
                :show-file-list="true"
              >
                <img v-if="form.coverImg" width="100" height="100" :src="form.coverImg" alt="">
                <el-button v-else size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="切换富文本类型">
              <!-- editorType (integer, optional): 编辑器类型: 0 富文本; 1 markdown , -->
              <el-radio v-model="form.editorType" :label="0" @change="changeEditor">富文本</el-radio>
              <el-radio v-model="form.editorType" :label="1" @change="changeEditor">markdown</el-radio>
              <span style="color:#e6a23c;"> <i class="el-icon-warning" /> 注意!切换编辑器会清空编辑内容</span>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <!-- 富文本编辑器 -->
            <div v-if="form.editorType==0">
              <Tinymce v-model="form.content1" />
            </div>
            <!-- markdown编辑器 -->
            <div v-if="form.editorType==1">
              <mavon-editor ref="markdownEditor" v-model="form.content1" @imgAdd="$imgAdd" />
            </div>

          </el-col>

        </el-row>

        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="4" :offset="10">
              <el-button type="primary" @click="addOrUpdateArticle">
                {{ id?'立即修改':'立即添加' }}
              </el-button>
            </el-col>

          </el-row>

        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import {
  addArticle as addArticleApi,
  productArticle as productArticleApi,
  updateArticle as updateArticleApi
} from '@/api/content/article'
import axios from 'axios'
import mix from '@/mixins'
export default {
  name: 'ArticleDetail',
  components: {
    Tinymce
  },
  mixins: [mix],
  data() {
    return {
      id: '', // 文章id
      form: {
        isShow: 1,
        editorType: 0,
        coverImg: ''
      },
      rules: {
        author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题名称', trigger: 'blur' }]
      }
    }
  },
  computed: {

  },
  watch: {
  },
  created() {
    console.log(this.$route.params.id)
    this.id = this.$route.params.id
    if (this.id) {
      this.getArticleDetail()
    }
  },
  mounted() {

  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      axios({
        url: this.uploadFileOss,
        method: 'post',
        data: formdata,
        headers: this.token
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */

        const { success, data, message } = res.data
        if (success) {
          this.$refs.markdownEditor.$img2Url(pos, data.fileUrl)
        } else {
          this.$message.error(message)
        }
      })
    },
    getArticleDetail() {
      productArticleApi(this.id)
        .then(res => {
          // console.log(res)
          const { success, data, message } = res
          if (success) {
            this.form = data.productArticle
          } else {
            this.$message.error(message)
          }
        })
    },
    addOrUpdateArticle() {
      this.$refs['form'].validate((valid) => {
        if (valid) { // 校验成功
          // 发Ajax请求
          console.log(this.form)
          // console.log(this.form.content1)
          // console.log(this.$refs.markdownEditor.d_render)
          if (this.form.editorType === 0) { // 富文本
            this.form.content2 = this.form.content1
          } else if (this.form.editorType === 1) { // markdown
            this.form.content2 = this.$refs.markdownEditor.d_render
          }
          let api = null
          if (this.id) { // 修改文章
          // 修改是必须有文章id
            this.form.id = this.id
            api = updateArticleApi
          } else {
            api = addArticleApi
          }
          api(this.form)
            .then(res => {
              console.log(res)
              const { success, message } = res

              if (success) {
                // 提示，添加成功
                const msg = this.id ? '修改成功' : '添加成功'
                this.$message.success(msg)
                // 跳转文章列表页面
                this.$router.push({ name: 'ContentArticle' })
              } else {
                this.$message.error(message)
              }
            })
        } else {
          this.$message.error('注意表单验证！')
        }
      })
    },
    // 封面图片上传成功
    imageUploadSucc(res, file, fileList) {
      // console.log('res==>', res)

      // console.log('file==>', file)
      // console.log('fileList==>', fileList)
      const { success, data, message } = res
      if (success) {
        this.form.coverImg = data.fileUrl
        // 清除上传列表
        this.$refs['uploadCoverImg'].clearFiles()
      } else {
        this.$message.error(message)
      }
    },
    // 封面图片上传之前的校验
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/gif'
      const reg = /^image\/(jpeg|png|webp|gif)$/
      const isLt1dot5M = file.size / 1024 / 1024 < 1.5
      const isRequestImgFormat = reg.test(file.type)
      if (!isRequestImgFormat) {
        this.$message.error('上传头像图片只能是 jpeg|png|webp|gif 格式!')
        return false
      }
      if (!isLt1dot5M) {
        this.$message.error('上传头像图片大小不能超过 1.5MB!')
        return false
      }
      return isRequestImgFormat && isLt1dot5M
    },
    // 改变编辑器
    changeEditor() {
      // console.log(111)
      this.form.content1 = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.article-detail-main{
  .margin-30{
    margin: 30px;
  }
}
</style>
