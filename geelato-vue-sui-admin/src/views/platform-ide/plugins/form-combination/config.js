import formTemplate from './dataTemplate.js'

/**
 *  插件定义
 */
export const Config = {
  file: {
    title: '高级表单',
    type: 'form-combination',
    icon: 'th list icon',
    description: '可组合的高级表单'
  },
  toolbar: [],
  stagePanels: [{
    name: 'ui',
    title: 'ui',
    path: 'common/StageUi.vue',
    opts: {
      component: '/components/gl-form-combination/Index',
      ui: {
        cards: [
          {type: 'header', name: '标题...', opts: {}},
          formTemplate.simple,
          {
            type: 'ht-table',
            name: 'platform_demo_entity',
            opts: {table: {width: 720, colNum: 24, rowNum: 12, mergeCells: [], ds: []}}
          },
          {
            type: 'tab',
            items: [
              {
                type: 'form',
                name: 'form1',
                opts: {
                  table: {},
                  layout: '', // html
                  theme: '', // vue file
                  fields: [],
                  rules: [] // validate rules
                }
              },
              {
                type: 'form',
                name: 'form2',
                opts: {
                  layout: '', // html
                  theme: '', // vue file
                  fields: [],
                  rules: [] // validate rules
                }
              },
              {
                type: 'list',
                name: 'list',
                opts: {
                  layout: '', // html
                  theme: '', // vue file
                  fields: [],
                  rules: [] // validate rules
                }
              }
            ]
          },
          {
            type: 'toolbar',
            name: '',
            opts: {
              actions: [
                {
                  title: '创建',
                  click: 'modal',
                  modal: {
                    title: '编辑示例实体',
                    type: 'page',
                    value: '/components/page/PageLoader.vue',
                    opts: {
                      code: '',
                      query: {}
                      // entityName: 'platform_demo_entity',
                      // fields: 'id,name,type,code,content,description',
                      // layout: [
                      //   [{name: [4, 8]}, {code: [4, 8]}],
                      //   [{type: [4, 8]}],
                      //   [{content: [4, 20]}],
                      //   [{description: [4, 20]}]
                      // ]
                    }
                  },
                  color: 'primary'
                },
                {title: '删除', click: 'delete', confirm: '确定删除？', color: 'negative'}
              ]
            }
          }
        ]
      }
    }
  }],
  settingPanels: [
    {name: 'properties', title: '基本信息', path: 'common/Settings.vue'},
    {name: 'form-combination', title: '页面组成', path: 'form-combination/Settings.vue'}
  ]
}
