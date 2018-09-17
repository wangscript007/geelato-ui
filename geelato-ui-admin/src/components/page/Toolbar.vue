<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
-->
<template>
  <div class="ui right secondary  borderless mini menu">
    <div v-if="actions" class="item">
      <template v-for="(item, index) in actions">
        <!--有hidden属性，或hidden为空-->
        <!--<button class="ui mini button">新增</button>&nbsp;-->
        <!--item.click==='delete'?$gl.ui.color.negative:$gl.ui.color.primary-->
        <button class="ui mini button" :class="item.color?$gl.ui.color[item.color]:$gl.ui.color.primary"
                @click="$_click(item,$event)"
                v-if="!item.hasOwnProperty('hidden')||$utils.isEmpty(item.hidden)||$utils.eval(item.hidden)">
          {{item.title}}
        </button>&nbsp;
      </template>
      <!--<div class="ui teal mini buttons">-->
      <!--<div class="ui button" style="padding-left: 0.9em;padding-right: 0.5em">操作</div>-->
      <!--<div class="ui floating dropdown icon button">-->
      <!--<i class="dropdown icon"></i>-->
      <!--<div class="menu">-->
      <!--<div v-for="(item, index) in opts.ui.toolbar.dropdown.actions" class="item">{{item.title}}</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  //  import utils from '../../common/utils'

  export default {
    props: {
      actions: {
        type: Array,
        required: false
      },
      data () {
        return {
          meta: [],
          form: {}
        }
      },
      mounted: function () {
      },
      methods: {
        $_click (item, $event) {
        }
      },
      components: {}
    }
  }
</script>
<style scoped>
</style>
