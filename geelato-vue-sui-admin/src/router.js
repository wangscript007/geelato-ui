import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Login from './views/platform-core/security/Login.vue'
import geelato from './geelato.js'

Vue.use(VueRouter)

// router.beforeEach((to, from, next) => {
//     console.log('to.path>', to.path)
//     if ((to.path !== '/#/login') && (!sessionStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') === 'undefined')) {
//         next({
//             path: '/#/login',
//             query: {redirect: to.fullPath}
//         })
//     } else {
//         next()
//     }

// $.ajax({
//     url: geelato.ctx.url.root + 'api/sys/auth/isLogged',
//     success: function (data) {
//         geelato.ctx.profile = data.user // kendo.observable(data.user);
//         //        geelato.ctx.sysConfig = arrayToObject(data.sysConfig, 'code');
//         //        geelato.ctx.userConfig = arrayToObject(data.userConfig, 'code');
//         // 如果登录之后检查isLogged为false，可能是未设置好跨域登陆--user-data-dir=XXX
//         if (data.user && data.user.id) {
//             geelato.ctx.profile.isLogged = true
//         } else {
//             geelato.showMsg('showMsg')
//             geelato.ctx.profile = {isLogged: false}
//             var reloadURL = 'login.html' + window.location.search
//             window.location.replace(reloadURL, true)
//         }
//     },
//     error: function (data) {
//         console.debug('login fail>', data)
//         geelato.showMsg('未登录...可能服务地址不正确或服务未启动。')
//     }
// })
// })
// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//     store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }


let routes = [
    {
        path: '/',
        redirect: '/m/'
    },
    // {
    //     path: '/m/',
    //     component: GlLayout,
    //     meta: {
    //         requireAuth: true
    //     },
    //     children: moduleRoutes
    // },
    {
        path: '/login', component: Login, meta: {requireAuth: false}
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
    // console.log('geelato.security.profile().user', geelato.security.profile().user)
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
    //           component: GlLayout,
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
    // if (to.matched.some(r => r.meta.requireAuth)) {
    console.log('to.matched', to)
    if (to.matched.some(r => r.meta.requireAuth !== false)) {
        console.log('geelato.security.profile().user>', geelato.security.profile().user)
        if (geelato.security.profile().user) {
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


// {
//     path: '/about',
//         name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
// }
export default router
