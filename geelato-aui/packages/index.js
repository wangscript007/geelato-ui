// 导入颜色选择器组件
import GlPageLoader from './gl-page-loader'
import GlModal from './gl-modal'
import GlForm from './gl-form'
import GlTable from './gl-table'
import STable from './gl-table/src/s-table'
import PageManager from './PageManager'
import Api from './Api'

// 存储组件列表
const components = [
  GlPageLoader,
  GlModal,
  GlForm,
  GlTable,
  STable
]

let uiApi = new Api()
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  //
  Vue.prototype.$pageManager = new PageManager(GlModal)
  Vue.prototype.$api = Vue.prototype.$api || uiApi

  // 遍历注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

function setApi(api) {
  uiApi = api || new Api()
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 服务端访问api
  setApi,
  api: uiApi,
  // 以下是具体的组件列表
  GlPageLoader,
  GlModal,
  GlForm,
  GlTable
}
