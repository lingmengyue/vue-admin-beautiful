/**
 * @author wuhuazhen
 * @description 菜单添加与修改
 */
// import { menuMange } from '@/api/auth'

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
  // 菜单数据的添加与修改操作
  async menuMange(menuData) {
    console.log('menuData', menuData)
    // const { data } = await menuMange(menuData)
    // console.log('return data:', data)
  },
  // 菜单数据的删除
  async menuDelete({ commit }, menuID) {
    console.log('commit', commit)
    console.log('menuID', menuID)
    // const { data } = await menuMange(menuData)
    // console.log('return data:', data)
  },
}
export default { state, getters, mutations, actions }
