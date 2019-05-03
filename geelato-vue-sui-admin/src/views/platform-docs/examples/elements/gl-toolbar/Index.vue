<template>
  <div>
    <gl-toolbar :actions="json.actions" :css="json.css"></gl-toolbar>

    <h4 class="ui divider">&nbsp;
    </h4></div>
</template>
<script>

  export default {
    props: {},
    data() {
      return {
        json: {
          actions: [
            {
              title: '创建',
              click: 'modal',
              modal: {
                title: '用户信息',
                type: 'staticPage',
                value: '/components/gl-form-simple/Index.vue',
                opts: {
                  ui: {
                    entityName: 'platform_user',
                    fields: 'id,name,loginName,description',
                    layout: [
                      [{name: [4, 8]}, {loginName: [4, 8]}],
                      [{description: [4, 20]}]
                    ]
                  }
                }
              }
            },
            {title: '删除', click: 'delete', confirm: '确定删除？'}
            // // 弹出页面提示导出多少条记录
            // {title: '导出EXCEL', click: 'xls'},
            // // 弹出页面提示导出多少条记录
            // {title: '导出PDF', click: 'pdf'},
            // // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
            // {title: '打印', click: 'print'}
          ],
          css: {align: 'right', dividing: ''}
        }
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>
<style scoped>
</style>
