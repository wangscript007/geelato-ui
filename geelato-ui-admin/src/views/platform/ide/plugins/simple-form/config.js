/**
 *  插件定义
 */
export const Config = {
  file: {
    title: '简单表单',
    type: 'simpleForm',
    icon: 'th list icon'
  },
  toolbar: [],
  stagePanels: [{
    name: 'ui',
    title: 'ui',
    path: 'common/StageUi.vue',
    opts: {
      component: '/components/page/TableForm',
      ui: {
        entityName: 'platform_demo_entity',
        fields: 'id,name,code,description',
        layout: [
          [{name: [3, 5]}, {code: [3, 5]}, {description: [3, 5]}],
          [{description: [4, 20]}]
        ],
        model: {id: '@.id'}
      }
    }
  }],
  settingPanels: [
    {name: 'properties', title: '基本信息', path: 'common/settings.vue'},
    {name: 'simple-form', title: '表单组件', path: 'simple-form/settings.vue'}
  ]
}
