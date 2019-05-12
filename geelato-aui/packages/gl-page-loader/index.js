// 导入组件，组件必须声明 name
import GlPageLoader from './src/Index'

// 为组件提供 install 安装方法，供按需引入
GlPageLoader.install = function (Vue) {
  Vue.component(GlPageLoader.name, GlPageLoader)
}

// 默认导出组件
export default GlPageLoader
