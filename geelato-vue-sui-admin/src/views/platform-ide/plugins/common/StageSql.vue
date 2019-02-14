<template>
    <json-code-mirror ref="cm" :text="jsonCM" mode="text/x-yaml"></json-code-mirror>
</template>
<script>
    import JsonCodeMirror from '../../../../components/gl-codemirror/Index'
    // import '../../../../../../static/plugins/codemirror/lib/codemirror.css'
    // import CodeMirror from '../../../../../../static/plugins/codemirror/lib/codemirror.js'
    // import '../../../../../../static/plugins/codemirror/theme/ambiance.css'
    // import '../../../../../../static/plugins/codemirror/mode/sql/sql.js'
    // import '../../../../../../static/plugins/codemirror/addon/edit/matchbrackets.js' // 括号匹配
    // import '../../../../../../static/plugins/codemirror/addon/hint/show-hint.css' // 自动补全
    // import '../../../../../../static/plugins/codemirror/addon/hint/show-hint.js' // 自动补全
    // import '../../../../../../static/plugins/codemirror/addon/hint/anyword-hint.js' // 自动补全
    // import '../../../../../../static/plugins/codemirror/addon/hint/sql-hint.js' // sql自动补全

    export default {
        props: {
            editorStore: {
                type: Object,
                required: true
            },
            editorMainHeight: {
                type: String,
                default: function () {
                    return '480px'
                }
            }
        },
        data() {
            return {
                editor: {}
            }
        },
        watch: {
            'editorStore.editingPage': function (val, oval) {
                this.init()
                this.reset()
            }
        },
        mounted: function () {
            this.init()
            this.reset()
        },
        methods: {
            init() {
                let thisVue = this
                thisVue.editor = thisVue.$refs.cm.editor
                thisVue.editor.focus()
            },
            focus() {
                this.editor.focus()
            },
            reset() {
                if (this.editorStore.editingPage.content.opts) {
                    this.setValue(this.editorStore.editingPage.content.opts.sql)
                } else {
                    this.setValue('')
                }
                this.focus()
            },
            setValue(contentString = '') {
                return this.editor.setValue(contentString)
            },
            commit() {
                this.editorStore.commitOpts('sql', this.editor.getValue())
                return {code: 0, msg: '', data: this.editor.getValue()}
            }
        },
        components: {JsonCodeMirror}
    }
</script>
<style>
</style>

