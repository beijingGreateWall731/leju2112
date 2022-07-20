
import request from '@/api/request'

/**
 * 获取品牌列表
 *
 * @returns
 */
export function findAllBrand() {
  return request({
    url: '/lejuAdmin/brand/findAllBrand'

  })
}

/**
 *
 * @param {*} start
 * @param {*} limit
 * @param {*} data
 * @returns
 */
export function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data

  })
}
/**
 *
 * @returns
 */
export function getAllCategory() {
  return request({
    url: `/lejuAdmin/category/getAllCategory`

  })
}

/**
 *
 * @param {*} data
 * @returns
 */
export function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data

  })
}
