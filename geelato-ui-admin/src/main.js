// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import Vue from 'vue/dist/vue.esm.js'
import App from './App'
import router from './router'
import store from './store/store'
import core from './common/core.js'
import cfg from './common/config.js'

Vue.config.productionTip = false

Vue.prototype.$GL = core
Vue.prototype.$CFG = cfg
// geelato.init({
//   router: router
// })

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
