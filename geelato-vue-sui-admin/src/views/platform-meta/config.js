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
    entityNames: {}
}
