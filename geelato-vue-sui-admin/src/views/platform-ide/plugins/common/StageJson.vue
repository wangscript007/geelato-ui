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
                this.$_init()
                this.$_reset()
            }
        },
        mounted: function () {
            this.$_init()
            this.$_reset()
        },
        methods: {
            $_init() {
                let thisVue = this
                this.editor = thisVue.$refs.cm.editor
                thisVue.editor.on('change', function (editor, changes) {
                    console.log('change json', changes)
                    thisVue.$_getValue()
                })
                thisVue.$_focus()
            },
            $_focus() {
                this.editor.focus()
            },
            $_reset() {
                if (this.editorStore.editingPage.content.opts) {
                    this.$_setValue(this.editorStore.editingPage.content.opts.json)
                } else {
                    this.$_setValue('')
                }
                this.$_focus()
            },
            $_setValue(contentString = '') {
                return this.editor.setValue(contentString)
            },
            $_commit() {
                this.editorStore.commitOpts('json', this.editor.getValue())
                return {code: 0, msg: '', data: this.editor.getValue()}
            }
        },
        components: {JsonCodeMirror}
    }
</script>
<style>
</style>

