import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/store'
import Layout from '../components/layout/Layout.vue'
import Login from '../views/platform/Login.vue'
// import GridView from '../components/layout/PageBar'

import page from '../views/page/index.vue'
// import pageContainer from '../components/page/page-loader.vue'
// import AccountProfile from '../views/profile/Account'
// const GridView = () => import('@/components/grid/FilterGrid.vue')

import GL from '../common/core.js'
import config from '../common/config.js'
import * as vueFiles from './vue-files.js'

Vue.use(VueRouter)

// router.beforeEach((to, from, next) => {
//   // if ((to.path !== '/login.html') && (!sessionStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') === 'undefined')) {
//   //   next({
//   //     path: '/login.html'
// // query: { redirect: to.fullPath }
// //     })
// //   } else { next() }
//
// //   $.ajax({
// //     url: GL.ctx.url.root + 'api/sys/auth/isLogged',
// //     success: function (data) {
// //       GL.ctx.profile = data.user // kendo.observable(data.user);
// //   //        GL.ctx.sysConfig = arrayToObject(data.sysConfig, 'code');
// //  //        GL.ctx.userConfig = arrayToObject(data.userConfig, 'code');
// //       // 如果登录之后检查isLogged为false，可能是未设置好跨域登陆--user-data-dir=XXX
// //       if (data.user && data.user.id) {
// //         GL.ctx.profile.isLogged = true
// //       } else {
// //         GL.showMsg('showMsg')
// //         GL.ctx.profile = {isLogged: false}
// //         var reloadURL = 'login.html' + window.location.search
// //         window.location.replace(reloadURL, true)
// //       }
// //     },
// //     error: function (data) {
// //       console.debug('login fail>', data)
// //       GL.showMsg('未登录...可能服务地址不正确或服务未启动。')
// //     }
// //   })
// })
// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

let moduleRoutes = [
  {path: 'page/:moduleName/:pageCode', component: page},
  // {path: 'p/:moduleName/:pageCode', component: pageContainer},
  {
    path: 'platform/profile/user-profile',
    component: resolve => require(['../views/platform/profile/user-profile.vue'], resolve)
  },
  {path: 'designer', component: resolve => require(['../views/geemeta/gm-designer/editor.vue'], resolve)},
  {path: 'preview/:pageCode', component: resolve => require(['../views/geemeta/gm-designer/preview.vue'], resolve)},
  {path: 'project/task', component: resolve => require(['../views/project-base/task/index.vue'], resolve)},
  {
    path: 'project/requirement',
    component: resolve => require(['../views/project-base/requirement/index.vue'], resolve)
  },
  {path: 'geelato-ui/table', component: resolve => require(['../views/platform/ui/table.vue'], resolve)}
  // {
  //   path: 'project-metro/info/select-project',
  //   component: resolve => require(['../views/project-metro/info/select-project.vue'], resolve)
  // }

  // loadDynamic('../views/geemeta/gm-designer/editor.vue')}
  // {path: 'profile/account', component: AccountProfile},
  // {path: 'meta', component: require('../views/geemeta/GL-meta/index.vue')}
]

addVueFileRoutes(moduleRoutes)

let routes = [
  {
    path: '/',
    redirect: '/m/'
  },
  {
    path: '/m/',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: moduleRoutes
  },
  {
    path: '/login', component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // alert('router.beforeEach')
  // console.log('to', to)
  // console.log('from', from)
  // console.log('next', next)
  // console.log('router', router)
  // console.log('GL.security.profile().user', GL.security.profile().user)
  // console.log('router.getMatchedComponents(to)>', router.getMatchedComponents(to).length)
  // console.log('router.options.routes>', router.options.routes)

  // 对于未匹配到的路由
  // if (router.getMatchedComponents(to).length === 0) {
  //   for (let index in router.options.routes) {
  //     let route = router.options.routes[index]
  //     if (route.path === '/m/') {
  //       let path = to.path.replace('/m/', '')
  //       // 默认添加到路由表，匹配views目录下，对应路径的vue文件
  //       console.log('router.options.routes>', router.options.routes)
  //       router.addRoutes(
  //         [{
  //           path: '/m/',
  //           component: Layout,
  //           meta: {
  //             requireAuth: true
  //           },
  //           children: [{
  //             path: path,
  //             component: resolve => require(['../views/' + path + '.vue'], resolve)
  //           }]
  //         }
  //         ]
  //       )
  //     }
  //   }
  // }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (GL.security.profile().user) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/**
 * 将url与文件地址一致的文件添加到路由表中，来源：
 * 1、/api/config.js 中的菜单链接href
 * 2、/router/vue-files.js 中的文件
 */
function addVueFileRoutes (moduleRoutes) {
  let staticRouteDict = {}
  for (var i in moduleRoutes) {
    let route = moduleRoutes[i]
    staticRouteDict[route.path] = true
  }
// 从配置的菜单中，添加路由
  for (var j in config.modules) {
    if (config.modules[j].menu) {
      for (var k in config.modules[j].menu) {
        let menuItemGroup = config.modules[j].menu[k]
        for (let l in menuItemGroup.items) {
          addVueFileToRoutes(menuItemGroup.items[l].href)
        }
      }
    }
  }
// 从配置的静态路由表中，添加路由
  for (var fileIndex in vueFiles.default) {
    addVueFileToRoutes(vueFiles.default[fileIndex])
  }

  function addVueFileToRoutes (url) {
    // console.log('url', url)
    if (url) {
      var startIndex = url.indexOf('/#/m/')
      startIndex = startIndex > -1 ? startIndex + 5 : 0
      var queryIndex = url.indexOf('?')
      queryIndex = queryIndex > 0 ? queryIndex : url.length
      let path = url.substring(startIndex, queryIndex)
      if (!staticRouteDict[path] && path.indexOf('http:') !== 0 && path.indexOf('https:') !== 0) {
        console.log('push path>', path + '  >   ' + '../views/' + path + '.vue')
        moduleRoutes.push({
          path: path,
          component: resolve => require(['../views/' + path + '.vue'], resolve)
        })
      }
    }
  }
}

export default router
