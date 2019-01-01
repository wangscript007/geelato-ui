import dataTemplate from './dataTemplate'

/**
 *  @name 业务服务插件
 *  @description 业务服务插件定义
 */
export const Config = {
  file: {
    title: '接口页面',
    type: 'api',
    icon: 'th plug icon'
  },
  toolbar: [],
  stagePanels: [
    {
      name: 'ui',
      title: 'ui',
      path: 'common/StageUi.vue',
      opts: dataTemplate.simple.opts
    }
    // {name: 'mvel', title: 'sql', path: 'common/StageMvel.vue', opts: {}},
    // {name: 'sql', title: 'sql', path: 'common/StageSql.vue', opts: {}}
  ],
  settingPanels: [
    {name: 'properties', title: '基本信息', path: 'common/Settings.vue'}]
}
