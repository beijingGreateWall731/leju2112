
import request from '@/api/request'

/**
 * 获取公司地址列表
 * @returns
 */
export function addressList() {
  return request({
    url: '/lejuAdmin/companyAddress/addressList',
    method: 'get'

  })
}
/**
 * 设置默认发货地址
 * @returns
 */
export function setSendOne(data) {
  return request({
    url: '/lejuAdmin/companyAddress/setSendOne',
    method: 'post',
    data

  })
}
/**
 * 新增地址
 * @param {*} data
 * @returns
 */
export function saveAddress(data) {
  return request({
    url: '/lejuAdmin/companyAddress/save',
    method: 'post',
    data

  })
}
/**
 * 获取地址详情
 * @param {*} id
 * @returns
 */
export function companyAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`

  })
}

/**
 * 更新地址
 * @param {*} data
 * @returns
 */
export function updateAddress(data) {
  return request({
    url: `/lejuAdmin/companyAddress/update`,
    method: 'post',
    data

  })
}
