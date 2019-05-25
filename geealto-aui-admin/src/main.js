// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import { VueAxiosPlus } from './utils/requestPlus'
import GlComponents from '../packages/index'

// mockrouter
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
// add by geelato
import * as platformApi from './api/platform'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(GlComponents)

// add by geelato
Vue.use(VueAxiosPlus)
Vue.prototype.$gl = {
  api: platformApi
}

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
