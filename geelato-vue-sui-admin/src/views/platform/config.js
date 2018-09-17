export default {
    modules: [
        {
            title: '个人工作台',
            code: 'grgzt',
            index: '/#/m/project-base/center/projects',
            // max or min
            resize: 'min',
            html: '',
            menu: [
                {
                    title: '工作台',
                    class: 'fa fa-connectdevelop',
                    items: [
                        {title: '我的工作台', href: '/#/m/platform/workbench/index'}
                    ],
                    active: true
                },
                {
                    title: '会议及任务管理',
                    class: 'fa fa-connectdevelop',
                    items: [
                        {title: '我的会议管理', href: '/#/m/meeting/info/my-meeting'},
                        {title: '会议综合查询', href: '/#/m/meeting/info/query'},
                        {title: '会议任务跟踪', href: '/#/m/project-base/task/meeting-task'}
                        // {title: '任务执行跟踪', href: '/#/m/project-base/task/index'},
                        // {title: '任务跟踪管理', href: '/#/m/project-base/center/report'}
                    ]
                },
                {
                    title: '业务流程管理',
                    class: 'fa fa-connectdevelop',
                    items: [
                        {title: '业务流程发起', href: '/#/m/platform/workflow/index'},
                        {title: '我的待办流程', href: '/#/m/platform/workflow/todo'},
                        {title: '我的已办流程', href: '/#/m/platform/workflow/todo'},
                        {title: '流程委托授权', href: '/#/m/platform/workflow/index'}
                        // {title: '我的流程管理', href: '/#/m/platform/workflow/index'}
                    ]
                }, {
                    title: '项目管理',
                    class: 'fa fa-connectdevelop',
                    items: [
                        {title: '我的项目管理', href: '/#/m/project-base/center/projects'},
                        {title: '项目综合查询', href: '/#/m/project-base/center/projects'},
                        {title: '我的项目计划', href: '/#/m/project-base/center/projects'}
                        // {title: '创建项目', href: '/#/m/platform/workflow/index'}
                        // {title: '我参与的项目', href: '/#/m/platform/meeting/index'},
                        // {title: '前期工程项目', href: '/#/m/platform/meeting/index'},
                        // {title: '前期工程项目', href: '/#/m/platform/meeting/index'},
                        // {title: '土建工程项目', href: '/#/m/platform/meeting/index'}
                    ]
                }]
        },
        {
            title: '系统管理',
            code: 'dev',
            resize: 'max',
            index: '/#/m/platform/profile/UserProfile',
            menu: [
                {
                    title: '系统管理',
                    class: 'icon-settings',
                    items: [
                        {title: '个人信息', href: '/#/m/platform/profile/UserProfile'},
                        {title: '用户信息', href: '/#/m/platform/security/user/List'},
                        {title: '角色信息', href: '/#/m/platform/security/role/List'},
                        {title: '数据字典', href: '/#/m/platform/dict/List'},
                    ]
                }
            ]
        }
    ],
    entityNames: {
        dev: {
            project: 'platform_dev_project',
            pageConfig: 'platform_page_config',
            demoEntity: 'platform_demo_entity'
        },
        common: {
            treeNode: 'platform_tree_node',
            dict: 'sys_dict'
        }
    },
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
