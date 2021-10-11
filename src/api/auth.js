import request from '@/utils/request'
export async function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export async function menuMange(data) {
  return request({
    url: '/auth/menu/menuMange',
    method: 'post',
    data,
  })
}

export async function menuDelete(data) {
  return request({
    url: '/auth/menu/menuDelete',
    method: 'post',
    data,
  })
}

export async function roleList() {
  return request({
    url: '/auth/roleList',
    method: 'get',
  })
}
