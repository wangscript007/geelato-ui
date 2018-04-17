import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 平台的一些配置信息
    platform: {
      // 用于刷新路由
      routeViewKey: '1',
      currentModule: {},
      // 页面上方展示的信息，可为HTML格式
      headerTitle: ''
    },
    project: {
      current: {},
      last: []
    },
    // 当前正在浏览的项目
    currentProject: {},
    // 最新浏览的项目
    lastProjects: [],
    // 当前用户信息
    user: {}
  },
  mutations: {
    [types.ROUTE_VIEW_KEY]: (state, data) => {
      state.platform.routeViewKey = data
    },
    [types.LOGIN]: (state, data) => {
      // localStorage.user = JSON.stringify(data.user)
      state.user = data.user
    },
    [types.LOGOUT]: (state) => {
      state.user = {}
    },
    [types.CHANGE_MODULE]: (state, data) => {
      state.platform.currentModule = data
    },
    [types.CHANGE_PROJECT]: (state, data) => {
      state.currentProject = data
      for (var i in state.lastProjects) {
        let project = state.lastProjects[i]
        if (project.name === data.name) {
          // TODO 改成id
          return
        }
      }
      state.lastProjects.push(data)
    },
    [types.CHANGE_HEADER_TITLE]: (state, data) => {
      state.platform.headerTitle = data
    }
  }
})
