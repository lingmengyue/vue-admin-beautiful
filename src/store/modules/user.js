/**
 * @author chuzhixin 1204505056@qq.com
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
// 调用位置在：项目根目录/src/api/user.js文件里面写的这三个方法
import { getUserInfo, login, logout } from '@/api/user'
// 调用位置在：项目根目录/src/utils/accessToken.js文件里面写的这三个方法
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
// 调用位置在：项目根目录/src/config/index.js文件里面配置的标题名与token名
import { title, tokenName } from '@/config'
// 调用ant-design-vue的组件
import { message, notification } from 'ant-design-vue'

// 配置属性
const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
})
// 设置获取对应属性的方法
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}
// 对属性进行设置的方法，方法名命名规则为：set+对应属性名，例如要对state里面avatar值进行设置，那么方法名为setAvatar
const mutations = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置accessToken
   * @param {*} state 设置的属性，对应上面设置的state常量
   * @param {*} accessToken
   */
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    // 此处的setAccessToken调用的是accessToken.js文件中的setAccessToken方法
    setAccessToken(accessToken)
  },
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
   * @author chuzhixin 1204505056@qq.com
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('setUsername', 'admin(未开启登录拦截)')
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 登录方法
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    // 获取login方法返回的data对象
    const { data } = await login(userInfo)
    console.log(data)
    const accessToken = data[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      notification.open({
        message: `欢迎登录${title}`,
        description: `${thisTime}！`,
      })
    } else {
      message.error(`登录接口异常，未正确返回${tokenName}...`)
    }
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch, state }) {
    const { data } = await getUserInfo(state.accessToken)
    if (!data) {
      message.error(`验证失败，请重新登录...`)
      return false
    }
    let { username, avatar, roles, ability } = data
    if (username && roles && Array.isArray(roles)) {
      dispatch('acl/setRole', roles, { root: true })
      if (ability && ability.length > 0)
        dispatch('acl/setAbility', ability, { root: true })
      commit('setUsername', username)
      commit('setAvatar', avatar)
    } else {
      message.error('用户信息接口异常')
    }
  },

  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAll')
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 重置accessToken、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch }) {
    await dispatch('setAccessToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    removeAccessToken()
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置token
   */
  setAccessToken({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
}
export default { state, getters, mutations, actions }
