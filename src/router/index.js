import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/source',
    name: 'auth',
    alwaysShow: true,
    meta: { title: '权限管理', icon: 'order' },
    children: [
      {
        path: 'source', // /auth/source
        name: 'authsource', // 唯一
        component: () => import('@/views/auth/source/index'),
        meta: { title: '资源管理', icon: 'el-icon-remove' }
      },
      {
        path: 'roles', // /auth/roles
        name: 'authroles', // 唯一
        component: () => import('@/views/auth/roles/index'),
        meta: { title: '角色管理', icon: 'el-icon-remove' }
      }

    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Product',
    alwaysShow: true,
    meta: { title: '商品管理', icon: 'order' },
    children: [
      {
        path: 'list', // /product/list
        name: 'productlist', // 唯一
        component: () => import('@/views/product/productList/index'),
        meta: { title: '商品列表', icon: 'el-icon-remove' }
      },
      {
        path: 'list/detail', // /product/address
        name: 'productlistDetail', // 唯一
        hidden: true,
        component: () => import('@/views/product/productList/Detail'),
        meta: { title: '商品详情', icon: 'el-icon-remove', activeMenu: '/product/list' }
      },
      {
        path: 'category', // /product/list
        name: 'productCategory', // 唯一
        component: () => import('@/views/product/category/index'),
        meta: { title: '商品分类', icon: 'el-icon-remove' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/address',
    name: 'Order',
    alwaysShow: true,
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'address', // /Order/address
        name: 'OrderAddress', // 唯一
        component: () => import('@/views/order/address/index'),
        meta: { title: '地址列表', icon: 'el-icon-remove' }
      },
      {
        path: 'orderlist', // /Order/address
        name: 'OrderList', // 唯一
        component: () => import('@/views/order/orderList/index'),
        meta: { title: '订单列表', icon: 'el-icon-remove' }
      },
      {
        path: 'orderdetail/:id', //
        name: 'OrderDetail', // 唯一
        hidden: true,
        component: () => import('@/views/order/orderList/Detail'),
        meta: { title: '订单详情', icon: 'el-icon-remove', activeMenu: '/order/orderlist' }
      },
      {
        path: 'returnlist', //
        name: 'ReturnList', // 唯一

        component: () => import('@/views/order/returnList/index'),
        meta: { title: '退单列表', icon: 'el-icon-remove' }
      },
      {
        path: 'returnlist/detail/:id', //
        name: 'ReturnDetail', // 唯一
        hidden: true,
        component: () => import('@/views/order/returnList/Detail'),
        meta: { title: '退单列表', icon: 'el-icon-remove', activeMenu: '/order/returnlist' }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'article', // /content/article
        name: 'ContentArticle', // 唯一
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章列表', icon: 'table' }
      },
      {
        path: 'article/detail',
        name: 'ContentArticleDetail', // 唯一
        hidden: true,
        component: () => import('@/views/content/article/Detail'),
        meta: { title: '文章详情', icon: 'table', activeMenu: '/content/article' }
      },
      {
        path: 'article/edit/:id',
        name: 'ContentArticleDetailEdit', // 唯一
        hidden: true,
        component: () => import('@/views/content/article/Detail'),
        meta: { title: '文章详情', icon: 'table', activeMenu: '/content/article' }
      },
      {
        path: 'metarial',
        name: 'ContentMetarial',
        component: () => import('@/views/content/metarial/index'),
        meta: { title: '素材列表', icon: 'tree' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
