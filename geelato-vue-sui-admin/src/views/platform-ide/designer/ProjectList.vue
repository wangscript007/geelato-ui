<template>
  <div>
    <gl-table :opts="config.opts" :query="{em:'platform_dev_project'}" :opener="opener" :modal="modal"
              @selectRow="$_select"></gl-table>
  </div>
</template>

<script>
  export default {
    props: {
      opts: {
        type: Object,
        required: true
      },
      opener: Object,
      modal: Object
    },
    data() {
      return {
        config: {
          code: '',
          component: '',
          opts: {
            ui: {
              title: '项目列表信息',
              entity: 'platform_dev_project',
              // layout: {
              //   type: 'horizontal',
              //   max: 'table'
              // },
              query: {
                show: true,
                mix: {
                  fields: [
                    // cop：比较操作符，eq：等于；default：默认值
                    {field: 'name', title: '名称', cop: 'contains', type: 'string', default: '', placeholder: ''},
                    // and：并且
                    {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                  ]
                }
              },
              toolbar: {
                title: '',
                dropdown: {
                  title: '',
                  actions: []
                }
              },
              info: '',
              table: {
                select: {field: 'id', title: '', type: ''},
                dropdown: {
                  title: '操作',
                  actions: [
                    {
                      title: '选择',
                      click: 'js:$ctx.opener.$_selected($ctx.data);$ctx.modal.$_close()'
                    }
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
    mounted() {
    },
    methods: {
      $_select(item) {
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
