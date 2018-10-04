<template>
    <div :style="{height:editorMainHeight}">
        <codemirror ref="cm" v-model="code" :options="cmOptions"></codemirror>
    </div>
</template>
<script>
    import {codemirror} from 'vue-codemirror'
    import CodeMirror from 'codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/ambiance.css'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/addon/edit/matchbrackets.js' // 括号匹配
    import 'codemirror/addon/hint/show-hint.css' // 自动补全
    import 'codemirror/addon/hint/show-hint.js' // 自动补全
    import 'codemirror/addon/hint/anyword-hint.js' // 自动补全
    import 'codemirror/addon/hint/javascript-hint.js' // sql自动补全
    import jsonFormat from './jsonFormat.js'

    export default {
        props: {
            editorMainHeight: {
                type: String,
                default: function () {
                    return '480px'
                }
            },
            text: {
                type: String
            }
        },
        data() {
            return {
                code: '',
                cmOptions: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    line: true,
                    styleSelectedText: true,
                    mode: 'application/json',
                    // mode: 'text/javascript',
                    foldGutter: true,
                    lineWrapping: true, // 折叠
                    matchBrackets: true, // 括号匹配
                    extraKeys: {'Ctrl-Space': 'autocomplete'} // ctrl-space唤起智能提示
                },
                editor: undefined
            }
        },
        watch: {},
        mounted() {
            let thisVue = this
            jsonFormat.set(CodeMirror)
            thisVue.$_setValue(this.text)
            thisVue.$_format()
            thisVue.editor = this.$refs.cm.codemirror
            thisVue.editor.setSize('100%', this.editorMainHeight)
            thisVue.editor.on('change', function (editor, changes) {
                // thisVue.$_format()
            })
            // this.editor.focus()
        },
        methods: {
            $_format() {
                let totalLines = this.$refs.cm.codemirror.lineCount();
                console.log('totalLines', totalLines)
                this.$refs.cm.codemirror.autoFormatRange({line: 0, ch: 0}, {line: totalLines});
            },
            $_setValue(contentString = '') {
                this.$refs.cm.codemirror.setValue(contentString)
            },
            $_getValue() {
                return this.$refs.cm.codemirror.getValue()
            },
        },
        components: {codemirror}
    }
</script>
<style>
</style>

