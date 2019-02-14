<template>
    <json-code-mirror ref="cm" :text="cm" mode="application/json"></json-code-mirror>
</template>
<script>
    import JsonCodeMirror from '../../../../components/gl-codemirror/Index'

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
                this.editor = thisVue.$refs.cm.editor
                thisVue.editor.on('change', function (editor, changes) {
                    console.log('change json', changes)
                    thisVue.getValue()
                })
                thisVue.focus()
            },
            focus() {
                this.editor.focus()
            },
            reset() {
                if (this.editorStore.editingPage.content.opts) {
                    this.setValue(this.editorStore.editingPage.content.opts.json)
                } else {
                    this.setValue('')
                }
                this.focus()
            },
            setValue(contentString = '') {
                return this.editor.setValue(contentString)
            },
            commit() {
                this.editorStore.commitOpts('json', this.editor.getValue())
                return {code: 0, msg: '', data: this.editor.getValue()}
            }
        },
        components: {JsonCodeMirror}
    }
</script>
<style>
</style>

