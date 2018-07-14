<template>
  <div class="ui mini form gl-form">
    <div class="ui error message segment"></div>
    <!--<div class="field">-->
    <!--<label>名称</label>-->
    <!--<input type="text" placeholder="中文名称" name="name" v-model="editorStore.editingPage.name" readonly>-->
    <!--</div>-->
    <div class="field">
      <label>编码</label>
      <input type="text" placeholder="英文字符，用于前端调用" name="code" v-model="form.code">
    </div>
    <div class="field">
      <label>描述</label>
      <textarea rows="12" v-model="form.description"></textarea>
    </div>
    <div class="ui fitted divider"></div>
    <table class="ui  table ">
      <tr>
        <td colspan="4">最后保存时间</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="4">最后保存人员</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      editorStore: {
        type: Object
      }
    },
    data () {
      return {
        form: {
          code: '',
          description: ''
        }
      }
    },
    watch: {
      'editorStore.editingPage.id': function (val, oval) {
        console.log('editorStore.editingPage.id', this.editorStore.editingPage, this.form)
        this.form.code = this.editorStore.editingPage.code
        this.form.description = this.editorStore.editingPage.description
      }
    },
    mounted: function () {
    },
    methods: {
      $_commit () {
        let myForm = $(this.$el).form({
          on: 'blur',
          fields: {
//            name: {
//              identifier: 'name',
//              rules: [
//                {
//                  type: 'empty',
//                  prompt: '请输入值'
//                }
//              ]
//            },
            code: {
              identifier: 'code',
              rules: [
                {
                  type: 'empty',
                  prompt: '编码不能为空，请输入值。'
                }
              ]
            }
          }
        })
        console.log(this.editorStore.editingPage, this.form)
        // myForm.form('get values')
        if (myForm.form('validate form')) {
          this.editorStore.editingPage.code = this.form.code
          this.editorStore.editingPage.description = this.form.description
          return {code: 0, msg: ''}
        } else {
          return {code: -1, msg: ''}
        }
      }
    },
    components: {}
  }
</script>
<style>
</style>

