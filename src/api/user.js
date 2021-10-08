import request from '@/utils/request'
// 获取设置的token名字，默认为accessToken
import { tokenName } from '@/config'

export async function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export async function socialLogin(data) {
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: '/auth/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
