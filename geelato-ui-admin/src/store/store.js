import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 平台的一些配置信息
    platform: {
      currentModule: {},
      // 页面上方展示的信息，可为HTML格式
      headerTitle: ''
    },
    currentProject: {},
    user: {}
  },
  mutations: {
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
    },
    [types.CHANGE_HEADER_TITLE]: (state, data) => {
      state.platform.headerTitle = data
    }
  }
})
