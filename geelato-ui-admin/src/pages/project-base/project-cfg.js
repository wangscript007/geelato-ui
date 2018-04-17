class ProjectCfg {
  constructor () {
    this.pageCfgs = [
      // 项目管理
      {
        code: 'prj_project_info_list',
        component: '/components/page/table',
        opts: {
          ui: {
            mode: 'select',
            title: '项目信息',
            entity: 'prj_project_info',
            query: {
              // 是否隐藏整个查询区域
              show: true,
              // null或''表示不展示tree过滤区域
              tree: null,
              // null或''表示不展示常用过滤器区域
              filter: null,
              // null或''表示不展示综合查询区域
              mix: {
                // 可用于查询的字段
                fields: [
                  // cop：比较操作符，eq：等于；default：默认值
                  {field: 'name', title: '名称', cop: 'eq', type: 'string', defalut: '张', placeholder: ''},
                  // cop：比较操作符，contains：包含；lop：逻辑操作符，or：或者
                  {field: 'code', title: '编码', cop: 'contains', type: 'string', lop: 'or'},
                  // and：并且
                  {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                ]
              }
            },
            // --end query --
            toolbar: {
              title: '',
              dropdown: {
                title: '',
                actions: [
                  {
                    title: '创建',
                    click: 'modal',
                    modal: {title: '项目信息', type: 'href', value: '/views/project-base/info/project-info.vue'}
                  },
                  {title: '删除', click: 'delete', confirm: '确定删除？'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出EXCEL', click: 'xls'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出PDF', click: 'pdf'},
                  // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                  {title: '打印', click: 'print'}
                ]
              }
            },
            tips: {
              // 展示位置：header|footer|none，当为none或空时，则不展示。
              display: 'none',
              // 提示内容，html格式
              html: '<div>这是提示内容<div>'
            },
            // 选择的行数据
            selected: [],
            table: {
              // type：checkbox、radio；title默认为空，可选。
              select: {field: 'id', title: '选择', type: 'checkbox'},
              dropdown: {
                title: '操作',
                actions: [
                  {
                    title: '详细',
                    click: 'modal',
                    modal: {
                      type: 'page',
                      value: 'sys_role_list_detail',
                      query: {}
                    }
                  },
                  {
                    title: '修改',
                    click: 'modal',
                    modal: {
                      title: '项目信息',
                      type: 'href',
                      value: '/views/project-base/info/project-info.vue',
                      data: {id: '@.id', name: '@.name'}
                    },
                    hidden: 'js:@.id < 0'
                  },
                  {title: '删除', click: 'delete', hidden: 'js:@.id > 0', confirm: '确定删除？'},
                  {title: '直接调用js', click: 'js:alert(\'aaaa\')'}]
              },
              columns: [
                {field: 'id', title: '序号', visible: false},
                {field: 'name', title: '名称', type: 'string', format: ''},
                {field: 'code', title: '编码', type: 'string', format: ''},
                {field: 'description', title: '描述', type: 'string', format: ''}
              ],
              p: '1,10',
              order: 'name|+'
            },
            stat: '',
            // 状态
            state: {
              selectedRows: {},
              clickedRow: {}
            }
          }
        }
      },
      // 参建单位
      {
        code: 'prj_project_unit_list',
        component: '/components/page/table',
        opts: {
          ui: {
            mode: 'select',
            title: '参建单位',
            entity: 'prj_project_unit',
            query: {
              // 是否隐藏整个查询区域
              show: true,
              // null或''表示不展示tree过滤区域
              tree: null,
              // null或''表示不展示常用过滤器区域
              filter: null,
              // null或''表示不展示综合查询区域
              mix: {
                // 可用于查询的字段
                fields: [
                  // cop：比较操作符，eq：等于；default：默认值
                  {field: 'name', title: '名称', cop: 'eq', type: 'string', defalut: '张', placeholder: ''},
                  // cop：比较操作符，contains：包含；lop：逻辑操作符，or：或者
                  {field: 'code', title: '编码', cop: 'contains', type: 'string', lop: 'or'},
                  // and：并且
                  {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                ]
              }
            },
            // --end query --
            toolbar: {
              title: '',
              dropdown: {
                title: '',
                actions: [
                  {
                    title: '创建',
                    click: 'modal',
                    modal: {title: '单位信息', type: 'href', value: '/views/project-base/info/project-unit.vue'}
                  },
                  {title: '删除', click: 'delete', confirm: '确定删除？'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出EXCEL', click: 'xls'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出PDF', click: 'pdf'},
                  // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                  {title: '打印', click: 'print'}
                ]
              }
            },
            tips: {
              // 展示位置：header|footer|none，当为none或空时，则不展示。
              display: 'none',
              // 提示内容，html格式
              html: '<div>这是提示内容<div>'
            },
            // 选择的行数据
            selected: [],
            table: {
              // type：checkbox、radio；title默认为空，可选。
              select: {field: 'id', title: '选择', type: 'checkbox'},
              dropdown: {
                title: '操作',
                actions: [
                  {
                    title: '详细',
                    click: 'modal',
                    modal: {
                      type: 'page',
                      value: 'sys_role_list_detail',
                      query: {}
                    }
                  },
                  {
                    title: '修改',
                    click: 'modal',
                    modal: {
                      title: '项目信息',
                      type: 'href',
                      value: '/views/project-base/info/project-info.vue',
                      data: {id: '@.id', name: '@.name'}
                    },
                    hidden: 'js:@.id < 0'
                  },
                  {title: '删除', click: 'delete', hidden: 'js:@.id > 0', confirm: '确定删除？'},
                  {title: '直接调用js', click: 'js:alert(\'aaaa\')'}]
              },
              columns: [
                {field: 'id', title: '序号', visible: false},
                {field: 'name', title: '名称', type: 'string', format: ''},
                {field: 'code', title: '编码', type: 'string', format: ''},
                {field: 'type', title: '类型', type: 'string', format: ''},
                {field: 'description', title: '描述', type: 'string', format: ''}
              ],
              p: '1,10',
              order: 'name|+'
            },
            stat: '',
            // 状态
            state: {
              selectedRows: {},
              clickedRow: {}
            }
          }
        }
      },
      // 项目人员
      {
        code: 'prj_project_member_list',
        component: '/components/page/table',
        opts: {
          ui: {
            mode: 'select',
            title: '项目人员',
            entity: 'prj_project_member',
            query: {
              // 是否隐藏整个查询区域
              show: true,
              // null或''表示不展示tree过滤区域
              tree: null,
              // null或''表示不展示常用过滤器区域
              filter: null,
              // null或''表示不展示综合查询区域
              mix: {
                // 可用于查询的字段
                fields: [
                  // cop：比较操作符，eq：等于；default：默认值
                  {field: 'name', title: '名称', cop: 'contains', type: 'string', defalut: '', placeholder: ''},
                  // cop：比较操作符，contains：包含；lop：逻辑操作符，or：或者
                  {field: 'unitName', title: '单位名称', cop: 'contains', type: 'string', lop: 'or'},
                  // and：并且
                  {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                ]
              }
            },
            // --end query --
            toolbar: {
              title: '',
              dropdown: {
                title: '',
                actions: [
                  {
                    title: '创建',
                    click: 'modal',
                    modal: {title: '人员信息', type: 'href', value: '/views/project-base/info/project-member.vue'}
                  },
                  {title: '删除', click: 'delete', confirm: '确定删除？'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出EXCEL', click: 'xls'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出PDF', click: 'pdf'},
                  // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                  {title: '打印', click: 'print'}
                ]
              }
            },
            tips: {
              // 展示位置：header|footer|none，当为none或空时，则不展示。
              display: 'none',
              // 提示内容，html格式
              html: '<div>这是提示内容<div>'
            },
            // 选择的行数据
            selected: [],
            table: {
              // type：checkbox、radio；title默认为空，可选。
              select: {field: 'id', title: '选择', type: 'checkbox'},
              dropdown: {
                title: '操作',
                actions: [
                  {
                    title: '详细',
                    click: 'modal',
                    modal: {
                      type: 'page',
                      value: 'sys_role_list_detail',
                      query: {}
                    }
                  },
                  {
                    title: '修改',
                    click: 'modal',
                    modal: {
                      title: '人员信息',
                      type: 'href',
                      value: '/views/project-base/info/project-member.vue',
                      data: {id: '@.id', name: '@.name'}
                    },
                    hidden: 'js:@.id < 0'
                  },
                  {title: '删除', click: 'delete', hidden: 'js:@.id > 0', confirm: '确定删除？'},
                  {title: '直接调用js', click: 'js:alert(\'aaaa\')'}]
              },
              columns: [
                {field: 'id', title: '序号', visible: false},
                {field: 'unitName', title: '单位名称', type: 'string', format: ''},
                {field: 'unitType', title: '单位类型', type: 'string', format: ''},
                {field: 'post', title: '岗位/职务', type: 'string', format: ''},
                {field: 'name', title: '姓名', type: 'string', format: ''},
                {field: 'phone', title: '手机', type: 'string', format: ''},
                {field: 'description', title: '描述', type: 'string', format: ''}
              ],
              p: '1,10',
              order: 'name|+'
            },
            stat: '',
            // 状态
            state: {
              selectedRows: {},
              clickedRow: {}
            }
          }
        }
      }
    ]
  }
}

let instance = new ProjectCfg()
export default instance
