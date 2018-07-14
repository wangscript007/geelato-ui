/**
 *  插件定义
 */
export const Config = {
  file: {
    title: '接口页面',
    type: 'api',
    icon: 'th plug icon'
  },
  toolbar: [],
  stagePanels: [
    {name: 'mvel', title: 'mvel', path: 'common/stage-mvel.vue', opts: {}},
    {name: 'sql', title: 'sql', path: 'common/stage-sql.vue', opts: {}},
    {name: 'json', title: 'json', path: 'common/stage-json.vue', opts: {}}
  ],
  settingPanels: [
    {name: 'properties', title: '基本信息', path: 'common/settings.vue'},
    {name: 'ui-table', title: '表格组件', path: 'table/settings.vue'}
  ]
}
