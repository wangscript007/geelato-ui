<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
-->
<template>
    <gl-form-base :opts="formOptions" ref="glForm">
    </gl-form-base>
</template>
<script>
    export default {
        props: {
            opts: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
                formOptions: this.opts
            }
        },
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            genForm() {
                this.$refs.glForm.reset({ui: JSON.parse(this.$refs.jsonCM.getValue())})
            },
            validate() {
                this.$refs.glForm.validate()
            },
            clearValidateMessage() {
                this.$refs.glForm.clearValidateMessage()
            },
            save() {
                let thisVue = this
                let formValues = this.$refs.glForm.getValues()
                this.$gl.data.save(this.opts.ui.entityName, this.form).then(function (res) {
                    if (typeof thisVue.$parent.close === 'function') {
                        thisVue.$parent.close()
                    }
                })

            },
            /**
             * 设置弹层的操作按钮及操作事件
             */
            setModal() {
                let modal = this.$parent
                if (!modal.addAction) {
                    return
                }
                modal.addAction({name: 'save', title: '保存', fn: this.save})
                // cancel是modal内容的方法，这里可以简写成：{name: 'cancel'}
                modal.addAction({name: 'cancel', title: '取消', fn: modal.cancel})
                modal.updateActions()
            }
        },
        components: {}
    }
</script>
<style scoped>
</style>
