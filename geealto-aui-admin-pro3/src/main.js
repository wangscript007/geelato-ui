// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style

// add by geelato
// >>=============================================
// 导入依赖表单验证
import VeeValidate from 'vee-validate'
// 引入中文包，提示信息可以以中文形式显示
import zhCN from 'vee-validate/dist/locale/zh_CN'
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
// 注册组件库
Vue.use(VueI18n)
Vue.use(VeeValidate, {
  i18n: new VueI18n({
    locale: 'zh_CN'
  }),
  i18nRootKey: 'validations',
  dictionary: {
    zhCN
  },
  // fixed：The computed property "fields" is already defined in data.
  errorBagName: 'errorBags',
  fieldsBagName: 'fieldBags'
})
// <<=============================================

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
