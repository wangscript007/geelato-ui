<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
-->
<template>
  <table class="ui small compact form gl-form gl-col-24">
    <thead></thead>
    <tbody>
    <tr v-for="row in opts.layout">
      <template v-for="cell in row" v-if="item=metaMap[Object.keys(cell)[0]]">
        <td :colspan="Object.values(cell)[0][0]">{{item.title}}</td>
        <td :colspan="Object.values(cell)[0][1]">
          <template v-if="item.type==='String'&&item.charMaxLength<255">
            <input type="text" v-model="form[Object.keys(cell)[0]]">
          </template>
          <template v-else-if="item.type==='String'&&item.charMaxLength>255">
            <textarea rows="5" v-model="form[Object.keys(cell)[0]]"></textarea>
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
            ],
            model: {}
          }
        }
      }
    },
    data () {
      return {
        meta: [],
        form: {}
      }
    },
    computed: {
      /**
       * 将元数据数组转成对象格式，如 {id: {…}, name: {…}, loginName: {…}, description: {…}}
       * */
      metaMap: function () {
        let result = {}
        for (let i in this.meta) {
          let field = this.meta[i]
          result[field.name] = field
        }
//        console.log('元数据：', result)
        return result
      }
    },
    created: function () {
      this.$_loadData()
      this.$_setModal()
    },
    mounted: function () {
    },
    methods: {
      $_loadData () {
        let theVue = this
        let id = this.opts.model && this.opts.model.id ? this.opts.model.id : -1
        this.$GL.data.query(theVue.opts.entityName, {id: id}, theVue.opts.fields, true).then(function (res) {
//          console.log('res>', res)
          theVue.form = res.data && res.data.length > 0 ? res.data[0] : {}
          theVue.meta = res.meta
        })
//        console.log('this.opts>', this.opts)
      },
      $_save () {
        let thisVue = this
        if (typeof this.$parent.$_close === 'function') {
          this.$GL.data.save(this.opts.entityName, this.form).then(function (res) {
//            console.log('save form res>', res)
            thisVue.$parent.$_close()
          })
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
        // $_cancel是modal内容的方法，这里可以简写成：{name: '$_cancel'}
        modal.$_addAction({name: '$_cancel', title: '取消', fn: modal.$_cancel})
        modal.$_updateActions()
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
