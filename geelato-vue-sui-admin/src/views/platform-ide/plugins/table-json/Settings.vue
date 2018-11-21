<template>
  <div class="gl-content-wrapper">
    <div class="ui mini form">
      <div class="ui accordion item">
        <div class="title">
          绑定的实体编码
          <div class="ui fitted divider" style="margin-top: 0.25em;"></div>
        </div>
        <div class="active content">
          <div class="ui fluid action input">
            <input type="text" placeholder="输入实体编码或查询KEY..." v-model="form.entity" readonly>
            <div class="ui mini button" :class="$gl.ui.color.primary" @click="$_loadMeta">设置</div>
          </div>
        </div>
      </div>
      <div class="ui accordion item">
        <div class="title">
          关联引用的页面
          <div class="ui fitted divider" style="margin-top: 0.25em;"></div>
        </div>
        <div class="active content">
          <div v-if="form.refPages.length===0">
            <div class="ui info message">无关联的页面</div>
          </div>
          <table v-else class="ui mini form gl-form compact gl-col-24">
            <tbody>
            <tr>
              <td colspan="8" title="页面编码">页面编码<i class="fa fa-question-circle"></i></td>
              <td colspan="16"><input type="text"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        form: {
          entity: this.editorStore.editingPage.content.opts.ui ? this.editorStore.editingPage.content.opts.ui.entity : '',
          refPages: []
        }
      }
    },
    watch: {
      'editorStore.editingPage.id': function (val, oval) {
//        this.form.code = this.editingPage.code
//        this.form.description = this.editingPage.description
      }
    },
    mounted: function () {
    },
    methods: {
      $_addQuery (e) {
        console.log(e)
        // js阻止事件冒泡
        e.cancelBubble = true
        e.stopPropagation()

        // js阻止链接默认行为，没有停止冒泡
        // oEvent.preventDefault();
      },
      $_loadMeta () {
        console.log('ui.toolbar.dropdown.actions>', this.editorStore.editingPage.content.opts.ui.toolbar.dropdown.actions)
        this.$gl.ui.openVueByPath(this, '/views/platform-ide/plugins/common/settings-json', {
          title: '列表查询页面配置',
          opts: {
            entityOrQueryKey: this.form.entity,
            editorStore: this.editorStore
          }
        })
      },
      $_commit () {
        return {code: 0, msg: ''}
      }
    },
    components: {}
  }
</script>
<style>
</style>

