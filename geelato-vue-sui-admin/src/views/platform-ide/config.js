export default {
    name: '开发集成',
    version: '0.1.0',
    modules: [
        {
            title: '开发集成',
            code: 'ide',
            index: '/#/m/platform-ide/form/FormPreview',
            resize: 'min',
            html: '',
            menu: [
                {
                    title: '表单示例',
                    class: '',
                    items: [
                        {title: '表单预览展示', href: '/#/m/platform-ide/form/FormPreview'},
                        {title: '生成表单配置', href: '/#/m/platform-ide/form/GenFormConfig'}
                    ],
                    active: true
                }]
        },
    ],
    entityNames: {},
    vueFiles: []
}
