
import request from '@/api/request'

export function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data

  })
}
export function orderDetail(orderId) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${orderId}`

  })
}
export function sendDone(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: 'post',
    data

  })
}
