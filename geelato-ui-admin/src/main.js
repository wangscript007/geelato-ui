// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import Vue from 'vue/dist/vue.esm.js'
import App from './App'
import router from './router'
import store from './store/store'
import core from './common/core.js'
import cfg from './common/config.js'
import data from './mock/data.js'
import projectConfig from './common/project/config.js'
import Sui from './components/sui/index.vue'
import Message from './components/message/index.vue'
import LayoutLr from './components/mix/page-layout-lr'

Vue.config.productionTip = false

Vue.prototype.$GL = core
Vue.prototype.$CFG = cfg
Vue.prototype.$TD = data

Vue.component('sui', Sui)
Vue.component('message', Message)
Vue.component('layoutLr', LayoutLr)
// 测试演示的数据
data.setStore(store)
// 项目管理平台配置
projectConfig.setStore(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

// Vue.config.errorHandler = function (err, vm) {
//   // handle error
// }

// **********************设置插件的默认值**********************
$.fn.extend({
  findIncludeSelf: function (selector) {
    // let result = this.wrap('<div></div>').find(selector)
    // this.unwrap('<div></div>')
    // return result
    return this.find(selector).addBack(selector)
  }
})

$.fn.calendar.settings.text = {
  days: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  today: '今天',
  now: '现在',
  am: '上午',
  pm: '下午'
}
$.fn.calendar.settings.popupOptions = {
  position: 'bottom right',
  lastResort: 'bottom right',
  prefer: 'opposite',
  hideOnScroll: false
}
$.fn.calendar.settings.className.table = 'ui mini compact celled center aligned unstackable table'
