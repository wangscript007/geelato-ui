// 导入组件，组件必须声明 name
import GlTable from './src/Index'

// 为组件提供 install 安装方法，供按需引入
GlTable.install = function (Vue) {
  Vue.component(GlTable.name, GlTable)
}

// 默认导出组件
export default GlTable
