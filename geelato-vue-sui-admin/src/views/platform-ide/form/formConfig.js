export default [
    {
        text: '综合示例', value: 0, data: {
            type: 'object',
            defaultEntity: 'platformUser',
            properties: {
                name: {
                    control: 'input',
                    title: '名称',
                    // 是否禁用
                    disabled: true,
                    // 是否只读
                    readonly: false,
                    // 是否隐藏
                    hidden: false,
                },
                loginName: {
                    control: 'input',
                    title: '登录名',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入登录名'
                        }
                    ]
                },
                password: {
                    control: 'password',
                    title: '密码',
                    tips: '至少6位',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入密码'
                        },
                        {
                            type: 'minLength[6]',
                            prompt: '密码长度至少6位'
                        }
                    ]
                },
                confirmPassword: {
                    control: 'password',
                    title: '确认密码',
                    rules: [
                        {
                            type: 'match[password]',
                            prompt: '两次输入的密码不一致'
                        }
                    ]
                },
                email: {
                    control: 'email',
                    title: '邮箱',
                    placeholder: 'xxx@xxx.xxx',
                },
                age: {
                    control: 'input',
                    title: '年龄',
                    // 值
                    value: '20',
                },
                sex: {
                    control: 'dropdown',
                    title: '性别',
                    // 若数据是动态生产成，可配置ds，基于ds加载的数据最终会设置到data中
                    data: [
                        {text: '保密', value: ''},
                        {text: '男', value: 'male'},
                        {text: '女', value: 'female'}
                    ],
                    value: ''
                },
                tel: {
                    control: 'input',
                    title: '电话',
                    field: 'telephone',
                    entity: 'platformUser',
                    placeholder: '电话号码',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入电话号码'
                        }
                    ]
                },
                province: {
                    control: 'dropdown',
                    title: '省份',
                    ds: 'province',
                    // 广东省
                    value: '440000'
                },
                city: {
                    control: 'dropdown',
                    title: '城市',
                    // 基于数据源，数源名称可自取，如cityDS，不一定需等于本属性名
                    ds: 'city'
                },
                enable: {
                    control: 'checkbox',
                    title: '启用',
                    value: true
                },
                description: {
                    control: 'textarea',
                    title: '描述',
                }
            },
            layout: {
                type: 'table',
                data: [
                    // [label col-num,field col-num]
                    [{name: [4, 8]}, {loginName: [4, 8]}],
                    [{email: [4, 8]}, {age: [4, 8]}],
                    [{sex: [4, 8]}, {tel: [4, 8]}],
                    [{province: [4, 8]}, {city: [4, 8]}],
                    [{password: [4, 8]}, {confirmPassword: [4, 8]}],
                    [{enable: [4, 8]}, {'': [4, 8]}],
                    [{description: [4, 20]}]
                ]
            },
            ds: {
                province: {
                    entity: 'platform_province',
                    // default false
                    lazy: false,
                    // 支持字段重命名
                    fields: 'name text,code value'
                },
                city: {
                    entity: 'platform_city',
                    lazy: true,
                    fields: 'name text,code value',
                    // 带参数查询的数据源
                    params: {
                        // 该信息会自动加入计算属性中，当province的值变动时，该数据源会重新加载计算
                        provinceCode: 'gs:$ctx.province'
                    }
                }
            }
        }
    }
]
