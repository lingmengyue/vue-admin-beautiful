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
  /**
   * 菜单管理，添加与删除
   * @param state
   * @param menuData
   * @returns {Promise<string>}
   */
  async menuMange({ state }, menuData) {
    console.log('state', state)
    await menuMange(menuData)
  },

  async menuDelete({ state }, menuID) {
    console.log('vuex menuID', menuID)
    console.log('state', state)
    // const { data } = await menuMange(menuData)
    // console.log('return data:', data)
  },
}
export default { state, getters, mutations, actions }
