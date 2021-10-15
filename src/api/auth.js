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

export async function roleMange(data) {
  return request({
    url: '/auth/roleMange',
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

export async function roleDelete(data) {
  return request({
    url: '/auth/roleDelete',
    method: 'post',
    data,
  })
}

export async function adminMange(data) {
  return request({
    url: '/auth/adminMange',
    method: 'post',
    data,
  })
}

export async function adminList() {
  return request({
    url: '/auth/adminList',
    method: 'get',
  })
}

export async function adminDelete(data) {
  return request({
    url: '/auth/adminDelete',
    method: 'post',
    data,
  })
}
