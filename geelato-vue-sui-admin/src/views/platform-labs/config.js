export default {
  name: '实验室',
  code: 'platform-lab',
  version: '0.1.0',
  modules: [
    {
      title: '组件示例',
      code: 'labs',
      index: '/#/m/platform-labs/ui/TreeDemo',
      resize: 'min',
      html: '',
      menu: [
        {
          title: 'Mix',
          clazz: 'fa fa-connectdevelop',
          items: [
            {title: '生命周期', href: '/#/m/platform-labs/ui/VueLifeCycle'},
            {title: 'SUI封装', href: '/#/m/platform-labs/ui/Index'},
            {title: 'Sync', href: '/#/m/platform-labs/ui/Sync'},
            {title: 'tree demo', href: '/#/m/platform-labs/ui/TreeDemo'},
            {title: 'bugs', href: '/#/m/platform-labs/bugs/dropdown/DropdownInSlot'},
            {title: 'SUI-VUE', href: '/#/m/platform-labs/ui/Sui'},
            {title: 'SplitExampleOne', href: '/#/m/platform-labs/split/ExampleOne'},
            {title: 'SplitMix', href: '/#/m/platform-labs/split/Index'},
            {title: '动态页面加载', href: '/#/m/platform-core/pages/PageLoader?p=list_byf48EYk'},
            {title: '动态页面加载', href: '/#/m/platform-core/pages/PageLoader?p=form-combination_Ygvv7IXs'}
          ],
          active: true
        }, {
          title: 'Gl-x组件',
          clazz: 'fa fa-connectdevelop',
          items: [
            {title: 'gl-toolbar', href: '/#/m/platform-labs/ui/Toolbar'}
          ],
          active: true
        }]
    },
  ],
  entityNames: {}
}
