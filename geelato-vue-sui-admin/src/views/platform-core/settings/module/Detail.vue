<template>
  <div class="gl-page-content-wrapper">
    <gl-form-combination :opts="config.opts" :query="opts.ui.model"></gl-form-combination>
  </div>
</template>
<script>
  export default {
    props: {
      opts: {
        type: Object,
        required: true
      },
      query: {
        type: Object
      }
    },
    data() {
      return {
        config: {
          code: '',
          component: '',
          opts: {
            ui: {
              cards: [
                {
                  type: 'tab',
                  items: [
                    {
                      type: 'form',
                      name: '模块信息',
                      opts: {
                        type: 'object',
                        // 表单可绑定多实体，这是默认第一实体
                        defaultEntity: 'platform_module',
                        // update|create|read
                        state: 'save',
                        properties: {
                          // 设置该id:{}，便于子实体中依赖该id
                          id: {},
                          title: {
                            control: 'input',
                            title: '名称',
                            // 是否禁用
                            disabled: false,
                            // 是否只读
                            readonly: false,
                            // 是否隐藏，hidden隐藏与否在layout中控制，故没有hidden这个配置
                            rules: [
                              {
                                type: 'empty',
                                prompt: '请输入名称'
                              }
                            ]
                          },
                          code: {
                            control: 'input',
                            title: '编码',
                            rules: [
                              {
                                type: 'empty',
                                prompt: '请输入编码'
                              }
                            ]
                          },
                          index: {
                            control: 'input',
                            title: '首页',
                            placeholder: '/#/m/platform-ide/designer/Index',
                          },
                          html: {
                            control: 'input',
                            title: '名称html格式',
                            placeholder: '<bold>系统管理</bold>',
                          },
                          resize: {
                            control: 'dropdown',
                            title: '页面大小',
                            // 若数据是动态生产成，可配置ds，基于ds加载的数据最终会设置到data中
                            data: [
                              {text: '最小化', value: 'min'},
                              {text: '最大化', value: 'max'}
                            ],
                            value: 'min'
                          },
                          seq: {
                            control: 'input',
                            title: '次序',
                            readonly: true,
                            value: -1
                          },
                          enable: {
                            control: 'checkbox',
                            title: '启用',
                            value: true
                          },
                          description: {
                            control: 'textarea',
                            title: '描述',
                          },
                        },
                        layout: {
                          type: 'table',
                          data: [
                            // [label colSpan,rowSpan,field colSpan,rowSpan]
                            [{title: [4, 8]}, {resize: [4, 8]}],
                            [{code: [4, 8]}, {enable: [4, 8]}],
                            [{html: [4, 8]}, {seq: [4, 8]}],
                            [{description: [4, 20]}]
                          ],
                          hidden: {
                            // 各表单状态，需隐藏的内容
                            update: {},
                            create: {},
                            read: {}
                          }
                        },
                        ds: {},
                        vars: {}
                      }
                    },
                    {
                      type: 'form',
                      name: '菜单信息',
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
        }
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      console.log('module detail query>', this.query)
      console.log('module detail opts>', this.opts)
    },
    methods: {}
  }
</script>
<style>
</style>
