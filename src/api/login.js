import request from '@/api/request'

/**
 * 登录接口
 * @param {*} data 传递的参数 {username:'xxxx',password:'xxx'}
 * @returns Promise
 */
export function doLogin(data) {
  return request({
    url: '/lejuAdmin/index/login',
    method: 'post',
    data
  })
}

