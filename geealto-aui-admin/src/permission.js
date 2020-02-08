import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// add by geelato
import { RouteView } from '@/layouts'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const defaultRoutePath = '/dashboard/workplace'

// add by geelato
const geelatoRoutes = [{
  path: '/dashboardx',
  name: 'dashboardx',
  redirect: '/dashboardx/workplace',
  component: RouteView,
  meta: { title: '仪表盘x', keepAlive: true, permission: ['dashboard'] },
  children: [
    {
      path: '/dashboardx/analysis',
      name: 'Analysisx',
      component: () => import('@/views/dashboard/Analysis'),
      meta: { title: '分析页x', keepAlive: false, permission: ['dashboard'] }
    },
    // 外部链接
    {
      path: 'https://www.baidu.com/',
      name: 'Monitorx',
      meta: { title: '监控页（外部）x', target: '_blank' }
    },
    {
      path: '/dashboardx/workplace',
      name: 'Workplacex',
      component: () => import('@/views/dashboard/Workplace'),
      meta: { title: '工作台x', keepAlive: true, permission: ['dashboard'] }
    },
    {
      path: '/dashboardx/test-work',
      name: 'TestWorkx',
      component: () => import('@/views/dashboard/TestWork'),
      meta: { title: '测试功能', keepAlive: true, permission: ['dashboard'] }
    }
  ]
}]

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            const roles = res.result && res.result.role
            console.log('roles: ', roles)
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // add by geelato
              // store.getters.addRouters.concat(geelatoRoutes)
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)

              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
