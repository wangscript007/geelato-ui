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
// 导入依赖表单验证
import VeeValidate from 'vee-validate'
// 引入中文包，提示信息可以以中文形式显示
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n'

import 'geelato-ui-ant/lib/geelato-ui-ant.css'
import geelatoAui from 'geelato-ui-ant'
import ApiSettings from './ApiSettings'
import GlPage from '@/runtime/components/gl-page/index.js'
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
// 注册组件库
Vue.use(VueI18n)
Vue.use(VeeValidate, {
  i18n: new VueI18n({
    locale: 'zh_CN'
  }),
  i18nRootKey: 'validations',
  dictionary: {
    zh_CN
  },
  // fixed：The computed property "fields" is already defined in data.
  errorBagName: 'errorBags',
  fieldsBagName: 'fieldBags'
})

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
