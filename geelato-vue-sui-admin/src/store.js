import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const types = {
    ROUTE_VIEW_KEY: 'route_view_key',
    LOGIN: 'login',
    LOGOUT: 'logout',
    CHANGE_MODULE: 'change_module',
    CHANGE_PROJECT: 'change_project',
    CHANGE_HEADER_TITLE: 'change_header_title',
    CHANGE_LAYOUT: 'change_layout'
}

export default new Vuex.Store({
    state: {
        // 平台的一些配置信息
        platform: {
            // 用于刷新路由
            routeViewKey: '1',
            currentModule: {},
            currentLayout: {content: {height: ''}},
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
        [types.CHANGE_LAYOUT]: (state, data) => {
            state.platform.currentLayout = data
        },
        [types.CHANGE_MODULE]: (state, data) => {
            state.platform.currentModule = data
            console.log('state.platform.currentModule>', state.platform.currentModule)
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

