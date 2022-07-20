<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="warning" size="mini">初始化菜单</el-button>
        <el-button type="primary" size="mini">新增菜单</el-button>

      </div>
      <el-table :data="menuList" border row-key="id">
        <el-table-column
          label="菜单名称"
          prop="title"
        />
        <el-table-column
          label="图标"
        >
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column
          label="等级"
          prop="level"
        />
        <el-table-column
          label="权限标识符"
          prop="permissionValue"
        />
        <el-table-column
          label="路由"
          prop="path"
        />
        <el-table-column
          label="组件路径"
          prop="component"
        />
        <el-table-column
          label="是否可用"
          prop="status"
        />
        <el-table-column
          label="创建时间"
          prop="createTime"
        />

      </el-table>

    </el-card>

    <el-cascader
      v-model="pid"
      :options="formatMenuList"
      :props="{ checkStrictly: true,label:'title',value:'id',emitPath:false }"
      clearable
    />

  </div>
</template>
<script>
// lodash库   https://www.lodashjs.com/
import {
  findAllPermissions as findAllPermissionsApi
} from '@/api/auth'
// Load the full build.
// import _ from 'lodash'
var _ = require('lodash')
export default {
  name: 'Source',
  mixins: [],
  data() {
    return {
      menuList: [],
      pid: ''
    }
  },
  computed: {
    formatMenuList() {
      // 深拷贝
      var deepMenuList = _.cloneDeep(this.menuList)
      this.rebuildMenuList(deepMenuList)
      return deepMenuList
    }
  },
  watch: {
  },
  created() {
    this.getMenuList()
    console.log('___', _)
  },
  mounted() {
  },
  methods: {
    rebuildMenuList(list) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.type === 2) {
          item.disabled = true
        }
        if (item.children && item.children.length === 0) {
          delete item.children
        } else {
          this.rebuildMenuList(item.children)
        }
      }
    },
    getMenuList() {
      findAllPermissionsApi()
        .then(res => {
          // console.log(res)
          const { success, data, message } = res
          if (success) {
            this.menuList = data.menus
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
