export default {
    name: '平台核心',
    version: '0.1.0',
    modules: [
        {
            title: '个人工作台',
            code: 'workbench',
            index: '/#/m/project-base/center/projects',
            // max or min
            resize: 'min',
            html: '',
            menu: [
                {
                    title: '工作台',
                    clazz: 'fa fa-connectdevelop',
                    items: [
                        {title: '我的工作台', href: '/#/m/platform-core/workbench/index'}
                    ],
                    active: true
                },
                {
                    title: '会议及任务',
                    clazz: 'fa fa-connectdevelop',
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
                    clazz: 'fa fa-connectdevelop',
                    items: [
                        {title: '业务流程发起', href: '/#/m/platform-core/workflow/index'},
                        {title: '我的待办流程', href: '/#/m/platform-core/workflow/todo'},
                        {title: '我的已办流程', href: '/#/m/platform-core/workflow/todo'},
                        {title: '流程委托授权', href: '/#/m/platform-core/workflow/index'}
                        // {title: '我的流程管理', href: '/#/m/platform-core/workflow/index'}
                    ]
                }, {
                    title: '项目管理',
                    clazz: 'fa fa-connectdevelop',
                    items: [
                        {title: '我的项目管理', href: '/#/m/project-base/center/projects'},
                        {title: '项目综合查询', href: '/#/m/project-base/center/projects'},
                        {title: '我的项目计划', href: '/#/m/project-base/center/projects'}
                        // {title: '创建项目', href: '/#/m/platform-core/workflow/index'}
                        // {title: '我参与的项目', href: '/#/m/platform-core/meeting/index'},
                        // {title: '前期工程项目', href: '/#/m/platform-core/meeting/index'},
                        // {title: '前期工程项目', href: '/#/m/platform-core/meeting/index'},
                        // {title: '土建工程项目', href: '/#/m/platform-core/meeting/index'}
                    ]
                }]
        },
        {
            title: '平台管理',
            code: 'platform',
            resize: 'min',
            index: '/#/m/platform-core/security/role/List',
            menu: [
                {
                    title: '组织用户',
                    clazz: 'sitemap',
                    items: [
                        {title: '用户信息', href: '/#/m/platform-core/security/user/List'},
                        {title: '组织信息', href: '/#/m/platform-core/org/Index'},
                        {title: '岗位信息', href: '/#/m/platform-core/settings/theme/Index'}
                    ]
                },
                {
                    title: '权限管理',
                    clazz: 'lock',
                    items: [
                        {title: '角色设置', href: '/#/m/platform-core/security/role/List'},
                        {title: '菜单权限', href: '/#/m/platform-core/settings/menu/Index'}
                    ]
                },
                {
                    title: '平台设置',
                    clazz: 'cog',
                    items: [
                        {title: '插件管理', href: '/#/m/platform-core/settings/plugin/Index'},
                        {title: '模块管理', href: '/#/m/platform-core/settings/module/Index'},
                        {title: '个人信息', href: '/#/m/platform-core/profile/UserProfile'},
                        {title: '参数设置', href: '/#/m/platform-core/settings/parameter/Index'},
                        {title: '外观设置', href: '/#/m/platform-core/settings/theme/Index'},
                        {title: '数据字典', href: '/#/m/platform-core/settings/dict/Index'},
                        {title: '省份信息', href: '/#/m/platform-core/settings/province/List'},
                        {title: '城市信息', href: '/#/m/platform-core/settings/city/List'},
                        {title: '行政区信息', href: '/#/m/platform-core/settings/district/Index'}
                    ]
                }
            ]
        }
    ],
    entityNames: {
        common: {
            treeNode: 'platform_tree_node',
            dict: 'platform_dict'
        }
    }
}
