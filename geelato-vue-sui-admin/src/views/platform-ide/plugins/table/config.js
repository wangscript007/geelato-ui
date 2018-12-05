/**
 *  插件定义
 */
import dataTemplate from './dataTemplate'

export const Config = {
  file: {
    title: '列表页面',
    type: 'list',
    icon: 'th list icon',
    description: '通过定制的界面配置列表'
  },
  toolbar: [],
  stagePanels: [{
    name: 'ui',
    title: 'ui',
    path: 'common/StageUi.vue',
    opts: dataTemplate.simple.opts
  }],
  settingPanels: [
    {name: 'properties', title: '基本信息', path: 'common/Settings.vue'},
    {name: 'ui-table', title: '表格组件', path: 'table/Settings.vue'}
  ]
}
