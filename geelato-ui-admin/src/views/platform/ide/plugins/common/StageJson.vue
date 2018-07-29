<template>
  <div><textarea class="stage-code-mirror"></textarea></div>
</template>
<script>
  import '../../../../../../static/plugins/codemirror/lib/codemirror.css'
  import CodeMirror from '../../../../../../static/plugins/codemirror/lib/codemirror.js'
  import '../../../../../../static/plugins/codemirror/theme/ambiance.css'
  import '../../../../../../static/plugins/codemirror/mode/javascript/javascript.js'
  import '../../../../../../static/plugins/codemirror/addon/edit/matchbrackets.js' // 括号匹配
  import '../../../../../../static/plugins/codemirror/addon/hint/show-hint.css' // 自动补全
  import '../../../../../../static/plugins/codemirror/addon/hint/show-hint.js' // 自动补全
  import '../../../../../../static/plugins/codemirror/addon/hint/anyword-hint.js' // 自动补全
  import '../../../../../../static/plugins/codemirror/addon/hint/javascript-hint.js' // sql自动补全

  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      },
      editorMainHeight: {
        type: String,
        defalut: function () {
          return '480px'
        }
      }
    },
    data () {
      return {
        editor: {}
      }
    },
    watch: {
      'editorStore.editingPage': function (val, oval) {
        this.$_init()
        this.$_reset()
      }
    },
    mounted: function () {
      this.$_init()
      this.$_reset()
    },
    methods: {
      $_init () {
        let thisVue = this
        thisVue.editor = CodeMirror.fromTextArea($(thisVue.$el).find('.stage-code-mirror').get(0), {
          lineNumbers: true,
          mode: 'application/json',
          matchBrackets: true, // 括号匹配
          extraKeys: {'Ctrl-Space': 'autocomplete'} // ctrl-space唤起智能提示
        })
        thisVue.editor.setSize('100%', this.editorMainHeight)
        thisVue.editor.on('change', function (editor, changes) {
          console.log('change json', changes)
          thisVue.$_getValue()
        })
        thisVue.$_focus()
      },
      $_focus () {
        this.editor.focus()
      },
      $_reset () {
        if (this.editorStore.editingPage.content.opts) {
          this.$_setValue(this.editorStore.editingPage.content.opts.json)
        } else {
          this.$_setValue('')
        }
        this.$_focus()
      },
      $_setValue (contentString = '') {
        return this.editor.setValue(contentString)
      },
      $_commit () {
        this.editorStore.commitOpts('json', this.editor.getValue())
        return {code: 0, msg: '', data: this.editor.getValue()}
      }
    },
    components: {}
  }
</script>
<style>
</style>

