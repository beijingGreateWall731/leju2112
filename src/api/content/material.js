
import request from '@/api/request'

/**
 * 获取素材列表
 * @param {*} start 第几页
 * @param {*} limit 每页几条数据
 * @returns
 */
export function findMaterialByPage(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/1/10`,
    method: 'get'
  })
}
