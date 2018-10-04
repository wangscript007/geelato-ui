<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
-->
<template>
   <gl-form-base >

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
                form: this.opts.values
            }
        },
        created: function () {
        },
        mounted: function () {
        },
        methods: {

        },
        components: {}
    }
</script>
<style scoped>
</style>
