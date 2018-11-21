/**
 *  table 插件，采用json编辑器
 */
export const Config = {
  file: {
    title: '列表页面-Json',
    type: 'listJson',
    icon: 'th list icon',
    description: '通过直接配置json的方式，配置列表'
  },
  toolbar: [],
  stagePanels: [{
    name: 'ui',
    title: 'ui',
    path: 'common/StageUi.vue',
    opts: {
      component: '/components/page/table',
      ui: {
        title: '示例实体',
        entity: 'platform_demo_entity',
        layout: {
          type: 'horizontal',
          max: 'table'
        },
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
                modal: {
                  title: '示例实体管理',
                  type: 'href',
                  value: '/components/page/TableForm.vue',
                  opts: {
                    entityName: 'platform_demo_entity',
                    fields: 'id,name,type,code,content,description',
                    layout: [
                      [{name: [4, 8]}, {code: [4, 8]}],
                      [{type: [4, 8]}],
                      [{content: [4, 20]}],
                      [{description: [4, 20]}]
                    ]
                  }
                },
                color: 'primary'
              },
              {title: '删除', click: 'delete', confirm: '确定删除？', color: 'negative'}
            ]
          }
        },
        tips: {
          // 展示位置：header|footer|none，当为none或空时，则不展示。
          display: 'none',
          // 提示内容，html格式 <div>这是提示内容<div>
          html: ''
        },
        // 选择的行数据
        selected: [],
        table: {
          // type：checkbox、radio；title默认为空，可选。
          select: {field: 'id', title: '选择', type: 'checkbox'},
          dropdown: {
            title: '操作',
            actions: [
              // {title: '修改', click: 'open', visible: 'js:@.id'},
              {
                title: '修改',
                click: 'modal',
                modal: {
                  title: '示例实体',
                  type: 'href',
                  value: '/components/page/TableForm.vue',
                  opts: {
                    entityName: 'platform_demo_entity',
                    fields: 'id,name,code,description',
                    layout: [
                      [{name: [4, 8]}, {code: [4, 8]}],
                      [{description: [4, 20]}]
                    ],
                    model: {id: '@.id'}
                  }
                }
              }
              // {title: '直接调用js', click: 'js:alert(\'aaaa\')'}
            ]
          },
          columns: [
            {field: 'id', title: '序号', visible: false, width: '', 'text-align': 'left'},
            {field: 'name', title: '名称', type: 'string', format: '', width: '', 'text-align': 'left'},
            {field: 'code', title: '编码', type: 'string', format: '', width: '', 'text-align': 'left'},
            {field: 'description', title: '描述', type: 'string', format: '', width: '', 'text-align': 'left'}
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
  }],
  settingPanels: [
    {name: 'properties', title: '基本信息', path: 'common/Settings.vue'},
    {name: 'table-json', title: '表格组件', path: 'common/SettingsJson.vue'}
  ]
}
