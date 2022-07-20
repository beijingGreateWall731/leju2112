<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span><!-- card title --></span>
      </div>
      <el-table
        v-if="categoryList && categoryList.length>0"
        :data="categoryList"
        border
        stripe
        row-key="id"
        :tree-props="{children: 'arr'}"
      >
        <el-table-column
          label="菜单名称"
          prop="name"
        />
        <el-table-column
          label="icon"
        >
          <template slot-scope="scope">
            <img width="80" height="80" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="分类名字"
          prop="name"
        />
        <el-table-column
          label="排序"
          prop="sort"
        />
        <el-table-column
          label="显示状态"
        >
          <template slot-scope="scope">
            <div> {{ scope.row.showStatus == 1?'显示':'隐藏' }} </div>
          </template>
        </el-table-column>
        <el-table-column
          label="导航栏状态"
        >
          <template slot-scope="scope">
            <div> {{ scope.row.navStatus == 1?'显示':'隐藏' }} </div>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          prop="description"
        />
        <el-table-column
          label="创建时间"
          prop="createTime"
        />

      </el-table>

    </el-card>

  </div>
</template>
<script>
import {
  getAllCategory
} from '@/api/product'
export default {
  mixins: [],
  data() {
    return {
      categoryList: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    getAllCategory()
      .then(res => {
        // console.log(res)
        const { success, data, message } = res
        if (success) {
          const { items } = data
          items.forEach(item => {
            this.categoryList.push({
              ...item.category,
              arr: item.children
            })
          })
        } else {
          this.$message.error(message)
        }
      })
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
