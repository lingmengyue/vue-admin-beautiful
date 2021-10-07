import request from '@/utils/request'

export function getRouterList(params) {
  return request({
    url: '/auth/menu/navigate',
    method: 'get',
    params,
  })
}
