export default {
    name: '开发集成',
    version: '0.1.0',
    modules: [
        {
            title: '开发集成',
            code: 'ide',
            index: '/#/m/platform-ide/designer/Index',
            resize: 'max',
            html: '',
            menu: [
                {
                    title: '表单示例',
                    class: '',
                    items: [
                        {title: '表单预览展示', href: '/#/m/platform-ide/form/FormPreview'},
                        {title: '生成表单配置', href: '/#/m/platform-ide/form/GenFormConfig'},
                        {title: 'IDE', href: '/#/m/platform-ide/designer/Index'}
                    ],
                    active: true
                }]
        },
    ],
    entityNames: {
        dev: {
            project: 'platform_dev_project',
            pageConfig: 'platform_page_config',
            demoEntity: 'platform_demo_entity'
        }
    }
}
