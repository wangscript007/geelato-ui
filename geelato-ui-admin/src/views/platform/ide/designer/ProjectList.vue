<template>
  <div>
    <gl-table :opts="options" @selectRow="$_select"></gl-table>
  </div>
</template>

<script>
  import GlTable from '../../../../components/page/table'

  export default {
    props: {
      opts: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        options: {
          ui: {
            title: '示例实体',
            mode: 'select',
            entity: 'platform_dev_project',
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
                actions: []
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
                  // {title: '修改', click: 'open', visible: 'js:@.id'},
                  {
                    title: '选择',
                    click: 'select'
                  }
                  // {title: '直接调用js', click: 'js:alert(\'aaaa\')'}
                ]
              },
              columns: [
                {field: 'id', title: '序号', visible: false, width: '', 'text-align': 'left'},
                {field: 'name', title: '名称', type: 'string', format: '', width: '', 'text-align': 'left'},
                {field: 'description', title: '描述', type: 'string', format: '', width: '', 'text-align': 'left'}
              ],
              p: '1,20',
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
    components: {GlTable}
  }
</script>

<style>

</style>
