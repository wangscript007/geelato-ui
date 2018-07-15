<template>
  <div><textarea class="code-mirror-json"></textarea></div>
</template>
<script>
  import '../../../static/plugins/codemirror/lib/codemirror.css'
  import CodeMirror from '../../../static/plugins/codemirror/lib/codemirror.js'
  import '../../../static/plugins/codemirror/theme/ambiance.css'
  import '../../../static/plugins/codemirror/mode/javascript/javascript.js'
  import '../../../static/plugins/codemirror/addon/edit/matchbrackets.js' // 括号匹配
  import '../../../static/plugins/codemirror/addon/hint/show-hint.css' // 自动补全
  import '../../../static/plugins/codemirror/addon/hint/show-hint.js' // 自动补全
  import '../../../static/plugins/codemirror/addon/hint/anyword-hint.js' // 自动补全
  import '../../../static/plugins/codemirror/addon/hint/javascript-hint.js' // sql自动补全
  import '../../../static/plugins/extends/codemirror/formater.js' // sql自动补全

  export default {
    props: {
      value: String
    },
    data () {
      return {
        editor: undefined
      }
    },
    watch: {
      // value: {
      // handler (val, oval) {
      //   console.log('json value，new:', val, 'old：', oval)
      //   // 第一次从无值变成有值时，才需要设置
      //   if (val && !oval) {
      //     // this.$_reset(val)
      //   }
      // },
      // immediate: false
      // }
    },
    mounted: function () {
      this.$_reset(this.value)
    },
    methods: {
      $_reset (value = '') {
        let thisVue = this
        if (thisVue.editor) {
          this.editor.setValue(value)
          return
        }
        let $editor = $(thisVue.$el).find('.code-mirror-json')
        console.log('$editor', $editor)
        if ($editor.length === 0) {
          // 页面还未渲染，待有值之后再初始化渲染
          return
        }
        thisVue.editor = CodeMirror.fromTextArea($editor.get(0), {
          lineNumbers: true,
          mode: 'application/json',
          matchBrackets: true, // 括号匹配
          extraKeys: {'Ctrl-Space': 'autocomplete'} // ctrl-space唤起智能提示
        })
        thisVue.editor.setSize('100%', this.editorMainHeight)
        thisVue.editor.on('change', function (editor, changes) {
          thisVue.$emit('input', thisVue.editor.getValue())
        })
        this.editor.setValue(this.value)
      },
      $_format () {
        if (this.editor) {
          var totalLines = this.editor.lineCount()
          this.editor.autoFormatRange({line: 0, ch: 0}, {line: totalLines})
        }
      }
    },
    components: {}
  }
</script>
<style>
</style>

