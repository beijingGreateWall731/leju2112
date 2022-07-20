<template>
  <div>
    <el-checkbox v-model="expandedAll" @change="handleExpandedAll">展开关闭</el-checkbox>
    <el-checkbox v-model="selectedAll" @change="handleSelectedAll">全选反选</el-checkbox>

    <el-tree
      ref="mytree"
      :props="props"
      :data="menuList"
      show-checkbox
      node-key="id"
    />

    <el-button type="primary" size="default" @click="submit">提交</el-button>

  </div>
</template>
<script>
import {
  findAllPermissions as findAllPermissionsApi
} from '@/api/auth'
export default {
  name: 'Roles',
  mixins: [],
  data() {
    return {
      menuList: [],
      props: {
        label: 'title'
      },
      expandedAll: false,
      selectedAll: false,
      permissionIds: []
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.getMenuList()
  },
  mounted() {
  },
  methods: {
    submit() {
      const myTree = this.$refs.mytree
      this.permissionIds = myTree.getCheckedKeys()
      console.log(myTree.getCheckedKeys())
    },
    handleSelectedAll(e) {
      console.log('全选反选', e)
      const myTree = this.$refs.mytree
      if (e) {
        this.selecterdAllPermissionIds(this.menuList)
        // this.menuList.forEach(ele => {
        //   this.permissionIds.push(ele.id)
        // })
        myTree.setCheckedKeys(this.permissionIds)
      } else {
        this.permissionIds = []
        myTree.setCheckedKeys([])
      }
    },
    // 递归
    selecterdAllPermissionIds(list) {
      list.forEach(ele => {
        this.permissionIds.push(ele.id)
        if (ele.children && ele.children.length > 0) {
          // 这个合适吗？耦合性高
          this.selecterdAllPermissionIds(ele.children)

          // arguments.callee(ele.children)
          // arguments.caller
        }
      })
    },
    handleExpandedAll(e) {
      console.log('展开关闭', e)
      // console.log(this.$refs.mytree)
      const nodesMap = this.$refs.mytree.store.nodesMap
      for (const key in nodesMap) {
        nodesMap[key].expanded = e
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
