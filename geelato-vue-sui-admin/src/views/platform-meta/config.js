export default {
    name: '平台元数据',
    version: '0.1.0',
    modules: [
        {
            title: '平台管理',
            code: 'platform',
            resize: 'min',
            index: '/#/m/platform-meta/selector/Index',
            menu: [
                {
                    title: '元数据管理',
                    class: 'database',
                    items: [
                        {title: '元数据查看', href: '/#/m/platform-meta/selector/Index'}
                    ]
                }
            ]
        }
    ],
    entityNames: {},
    /**
     * 在此配置的文件地址清单，将会在启动时，注册到路由表中，如：
     * '/#/m/project-metro/info/select-project'
     * 注册为：
     * {
     *  path:'project-metro/info/select-project',
     *  component: resolve => require(['../views/project-metro/info/select-project.vue'], resolve)
     * }
     *
     * @type {[string]}
     */
    vueFiles: [
        '/#/m/project-base/info/select-project'
    ]
}
