// 导入组件，组件必须声明 name
import GlForm from './src/Index'

// 为组件提供 install 安装方法，供按需引入
GlForm.install = function (Vue) {
  Vue.component(GlForm.name, GlForm)
}

// 默认导出组件
export default GlForm
