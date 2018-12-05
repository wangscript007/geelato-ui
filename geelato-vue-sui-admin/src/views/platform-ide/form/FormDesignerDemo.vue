<template>
  <form-designer :opts="{form:options}"></form-designer>
</template>

<script>
  import FormDesigner from '../plugins/form-combination/FormDesigner'
  import formData from './formData'

  export default {
    name: "FormDesignerDemo",
    data() {
      return {
        options: {
          // #以下表单默认示例配置
          defaultEntity: formData[0].data.defaultEntity,
          properties: formData[0].data.properties,
          layout: formData[0].data.layout,
          ds: formData[0].data.ds,
          vars: formData[0].data.vars,
        }
      }
    },
    mounted: function () {
      console.log(formData[0])
    },
    components: {FormDesigner}
  }
</script>

<style scoped>

</style>
