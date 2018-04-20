<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
-->
<template>
  <table class="ui small compact form gl-form gl-col-24" v-show="isMounted">
    <thead></thead>
    <tbody>
    <tr v-for="row in opts.layout">
      <template v-for="cell in row" v-if="item=metaMap[Object.keys(cell)[0]]">
        <td :colspan="Object.values(cell)[0][0]">{{item.title}}</td>
        <td :colspan="Object.values(cell)[0][1]">
          <template v-if="item.type==='String'&&item.charMaxLength<255">
            <input type="text">
          </template>
          <template v-else-if="item.type==='String'&&item.charMaxLength>255">
            <textarea rows="5"></textarea>
          </template>
        </td>
      </template>
    </tr>
    </tbody>
    <tfoot>
    </tfoot>
  </table>
</template>
<script>
  //  import utils from '../../common/utils'

  export default {
    props: {
      opts: {
        type: Object,
        required: false,
        default: function () {
          return {
            entityName: '',
            fields: '',
            layout: [
//              [{name: [3, 9]}, {name: [3, 9]}],
//              [{id: [3, 9]}, {loginName: [3, 9]}],
//              [{description: [3, 21]}]
            ]
          }
        }
      }
    },
    data () {
      return {
        meta: [],
        isMounted: false
      }
    },
    computed: {
      metaMap: function () {
        let result = {}
        for (let i in this.meta) {
          let field = this.meta[i]
          result[field.name] = field
        }
        console.log(result)
        return result
      }
    },
    created: function () {
      let theVue = this
      this.$GL.data.query(this.opts.entityName, {id: -1}, this.opts.fields, true).then(function (res) {
        theVue.meta = res.meta
      })
      this.$_loadData()
      this.$_setModal()
    },
    mounted: function () {
      this.isMounted = true
    },
    methods: {
      $_loadData () {
      },
      $_save () {
        if (typeof this.$parent.$_close === 'function') {
          this.$parent.$_close()
        }
      },
      /**
       * 设置弹层的操作按钮及操作事件
       */
      $_setModal () {
        let modal = this.$parent
        if (!modal.$_addAction) {
          return
        }
        modal.$_addAction({name: '$_save', title: '保存', fn: this.$_save})
        modal.$_addAction({
          name: '$_submit',
          title: '暂存',
          fn: function () {
            alert('submit')
          }
        })
        modal.$_addAction({name: '$_cancel', title: '取消', fn: modal.$_close})
        modal.$_updateActions()
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
