<template>
  <div>
    <gl-table :opts="config.opts" :query="{em:'platform_dev_project'}" @selectRow="$_select"></gl-table>
  </div>
</template>

<script>
  export default {
    props: {
      opts: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
          config: {
              code: '',
              component: '',
              opts: {
                  ui: {
                      title: '用户信息',
                      entity: 'platform_dev_project',
                      layout: {
                          type: 'horizontal',
                          max: 'table'
                      },
                      query: {
                          mix: {
                              fields: [
                                  // cop：比较操作符，eq：等于；default：默认值
                                  {field: 'name', title: '名称', cop: 'eq', type: 'string', defalut: '张', placeholder: ''},
                                  // and：并且
                                  {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                              ]
                          }
                      },
                      toolbar: {
                          title: '',
                          dropdown: {
                              title: '',
                              actions: [
                                  // {
                                  //     title: '创建',
                                  //     click: 'modal',
                                  //     modal: {
                                  //         title: '用户信息',
                                  //         type: 'href',
                                  //         value: '/components/gl-form-simple/Index.vue',
                                  //         opts: {
                                  //             ui: {
                                  //                 entityName: 'platform_dev_project',
                                  //                 fields: 'id,name,loginName,description',
                                  //                 layout: [
                                  //                     [{name: [4, 8]}, {loginName: [4, 8]}],
                                  //                     [{description: [4, 20]}]
                                  //                 ]
                                  //             }
                                  //         }
                                  //     }
                                  // },
                                  // {title: '删除', click: 'delete', confirm: '确定删除？'}
                              ]
                          }
                      },
                      info: '',
                      table: {
                          select: {field: 'id', title: '', type: 'checkbox'},
                          dropdown: {
                              title: '操作',
                              actions: [
                                  {
                                      title: '修改',
                                      click: 'modal',
                                      modal: {
                                          title: '用户信息',
                                          type: 'href',
                                          value: '/components/gl-form-simple/Index.vue',
                                          opts: {
                                              ui: {
                                                  entityName: 'platform_dev_project',
                                                  fields: 'id,name,loginName,description',
                                                  layout: [
                                                      [{loginName: [4, 8]}, {name: [4, 8]}],
                                                      [{description: [4, 20]}]
                                                  ],
                                                  model: {id: '@.id'}
                                              }
                                          }
                                      }
                                  }
                                  // {
                                  //   title: '详细',
                                  //   click: 'modal',
                                  //   modal: {
                                  //     type: 'page',
                                  //     value: 'platform_dev_project_list_detail',
                                  //     opts: {}
                                  //   }
                                  // }
                              ]
                          },
                          columns: [
                              {field: 'id', title: '序号', visible: false, width: '', 'text-align': 'left'},
                              {field: 'name', title: '名称', type: 'string', format: '', width: '', 'text-align': 'left'},
                              {field: 'description', title: '描述', type: 'string', format: '', width: '', 'text-align': 'left'}
                          ],
                          p: '1,10',
                          order: 'name|+'
                      },
                      stat: ''
                  }
              }
          }
      }
    },
    mounted () {
    },
    methods: {
      $_select (item) {
        console.log('item>', item)
        this.$parent.$_callback('$_selected', item)
        this.$parent.$_close()
      }
    },
    components: {}
  }
</script>

<style>

</style>
