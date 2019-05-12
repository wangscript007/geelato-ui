// 导入组件，组件必须声明 name
import GlModal from './src/Index'

// 为组件提供 install 安装方法，供按需引入
GlModal.install = function (Vue) {
  Vue.component(GlModal.name, GlModal)
}

// 默认导出组件
export default GlModal
