/**
 * @author chuzhixin 1204505056@qq.com
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterRoutes } from '@/utils/routes'

const state = () => ({
  routes: [],
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  menuList: (state) => state.menuList,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes
  },
  setMenuList(state, routes) {
    state.menuList = routes
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = routes
  },
}
const actions = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description intelligence模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setRoutes({ commit }) {
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
    commit('setRoutes', finallyRoutes)
    return [...asyncRoutes]
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description all模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setAllRoutes({ commit }) {
    // 获取路由数据 mock模式下在路由数据@/mock/controller/router.js
    // 发起对应接口文件路径在@api/router.js
    console.log('setAllRoutes_in')
    let { data } = await getRouterList()
    commit('setMenuList', data)
    // if (data[data.length - 1].path !== '*')
    //   data.push({ path: '/*', redirect: '/404', hidden: true })
    const asyncRoutes = convertRouter(data)
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
    commit('setRoutes', finallyRoutes)
    return [...asyncRoutes]
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 画廊布局、综合布局设置路由
   * @param {*} { commit }
   * @param accessedRoutes 画廊布局、综合布局设置路由
   */
  setPartialRoutes({ commit }, accessedRoutes) {
    commit('setPartialRoutes', accessedRoutes)
  },
}
export default { state, getters, mutations, actions }
