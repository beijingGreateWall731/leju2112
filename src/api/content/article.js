import request from '@/api/request'

/**
 * 获取文章列表
 * @param {*} start 第几页
 * @param {*} limit 每页几条数据
 * @param {*} data 搜索参数
 * @returns
 */
export function findArticles(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}

/**
 * 更改文章状态
 * @param {*} data
 * @returns
 */
export function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'post',
    data
  })
}

/**
 * 删除文章
 * @param {*} id 文章id
 * @returns
 */
export function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete'

  })
}
/**
 * 添加文章
 * @param {*} data
 * @returns
 */
export function addArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/addArticle`,
    method: 'post',
    data

  })
}
/**
 * 获取文章详情
 * @param {*} id 文章id
 * @returns
 */
export function productArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`,
    method: 'get'

  })
}
/**
 * 修改文章
 * @param {*} data
 * @returns
 */
export function updateArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data

  })
}

