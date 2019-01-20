export default {
  name: '平台监控',
  code: 'platform-monitor',
  version: '0.1.0',
  modules: [
    {
      title: '平台管理',
      code: 'platform',
      resize: 'min',
      index: '/#/m/platform-monitor/log/Visit',
      menu: [
        {
          title: '平台监控',
          clazz: 'tv',
          items: [
            {title: '访问日志', href: '/#/m/platform-monitor/log/Visit'},
            {title: '接口日志', href: '/#/m/platform-monitor/log/Interface'},
            {title: '数据库监控', href: '/#/m/platform-monitor/db/Index'},
            {title: '缓存监控', href: '/#/m/platform-monitor/cache/Index'},
            {title: '服务器监控', href: '/#/m/platform-monitor/server/Index'},
            {title: '在线用户', href: '/#/m/platform-monitor/online/Index'},
            {title: 'SBA监控', href: '/#/m/platform-monitor/sba/Index'}
          ]
        }
      ]
    }
  ],
  entityNames: {}
}
