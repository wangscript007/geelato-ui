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
            $_genForm() {
                this.$refs.glForm.$_reset({ui: JSON.parse(this.$refs.jsonCM.$_getValue())})
            },
            $_validate() {
                this.$refs.glForm.$_validate()
            },
            $_clearValidateMessage() {
                this.$refs.glForm.$_clearValidateMessage()
            },
            $_save() {
                let thisVue = this
                let formValues = this.$refs.glForm.$_getValues()
                this.$gl.data.save(this.opts.ui.entityName, this.form).then(function (res) {
                    if (typeof thisVue.$parent.$_close === 'function') {
                        thisVue.$parent.$_close()
                    }
                })

            },
            /**
             * 设置弹层的操作按钮及操作事件
             */
            $_setModal() {
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
