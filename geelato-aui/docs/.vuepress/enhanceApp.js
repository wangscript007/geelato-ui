/**
 * 扩展 VuePress 应用
 */
import AntDesign from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

// 导入组件库
import geelatoAui from './../../packages/index'

import apiHelper from './apiHelper'

export default ({
                  Vue, // VuePress 正在使用的 Vue 构造函数
                  options, // 附加到根实例的一些选项
                  router, // 当前应用的路由实例
                  siteData // 站点元数据
                }) => {


  apiHelper.interceptors(geelatoAui.api.getService())
  Vue.prototype.$gl = {
    api: geelatoAui.api
  }
  // 注册组件库
  Vue.use(geelatoAui)
  Vue.use(AntDesign)
}
