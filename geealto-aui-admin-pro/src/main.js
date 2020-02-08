// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
// >>=============================================
import 'geelato-ui-ant/lib/geelato-ui-ant.css'
import geelatoAui from 'geelato-ui-ant'
import ApiSettings from './ApiSettings'
import GlPage from '@/runtime/gl-page/index.js'
import './reset.css'

Vue.prototype.$globalVue = Vue
const auiOptions = {
  // 修改服务地址，默认为http://localhost:8080/api
  api: new ApiSettings({
    baseURL: 'http://localhost:8080/api'
  })
}
Vue.use(geelatoAui, auiOptions)
Vue.use(GlPage)
// <<=============================================

Vue.config.productionTip = false
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
