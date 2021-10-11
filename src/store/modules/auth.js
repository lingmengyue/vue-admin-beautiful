/**
 * @author wuhuazhen
 * @description 菜单添加与修改
 */
import { menuMange } from '@/api/auth'
const state = () => ({
  username: '',
  avatar: '',
})
const getters = {
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}
const mutations = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}

const actions = {
  async menuMange({ state }, menuData) {
    console.log('menuData', menuData)
    console.log('state', state)
    const { data } = await menuMange(menuData)
    console.log('return data:', data)
    return 'ok'
  },
  /**
   * 删除菜单
   * @param menuID 菜单ID
   * @returns {Promise<void>}
   */
  async menuDelete(menuID) {
    console.log('menuID', menuID)
    // const { data } = await menuMange(menuData)
    // console.log('return data:', data)
  },
}
export default { state, getters, mutations, actions }
