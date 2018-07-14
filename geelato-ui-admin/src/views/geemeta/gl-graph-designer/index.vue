<template>
  <div class="gl-graph-designer">
    <div class="ui small borderless menu" style="margin: 0 0 1px 0;padding: 0;background-color: #f1f1f1">
      <a class="item">文件</a>
      <a class="item">B</a>
      <a class="item"><i class="theme icon"></i></a>
    </div>
    <div class="ui grid" style="margin: 0;padding: 0">
      <div class="three wide column" style="margin: 0;padding: 0">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular mini menu">
            <a class="item active" data-tab="first">项目</a>
            <a class="item" data-tab="second">工具</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="first">
            <project :ds="ds.project" @openPage="onOpenPage"
                     @newPage="onNewPage"></project>
          </div>
          <div class="ui bottom attached tab segment" data-tab="second">
            <toolbox-element></toolbox-element>
            <div class="element" draggable>
              <input type="checkbox" name="xx">sss
            </div>
          </div>
        </sui>
      </div>
      <div class="nine wide column" style="margin: 0;padding: 0 1px">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular mini menu">
            <a class="item active" data-tab="stage-ui">界面</a>
            <a class="item" data-tab="stage-code">代码</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="stage-ui" style="margin: 0;padding: 1px">
            <div id="gl-table-form"></div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="stage-code">
            Code
          </div>
        </sui>
      </div>
      <div class="four wide column" style="margin: 0;padding: 0">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular mini menu">
            <a class="item active" data-tab="first">字段</a>
            <a class="item" data-tab="second">Second</a>
            <a class="item" data-tab="third">Third</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="first">
            First
          </div>
          <div class="ui bottom attached tab segment" data-tab="second">
            Second
          </div>
          <div class="ui bottom attached tab segment" data-tab="third">
            Third
          </div>
        </sui>
      </div>
    </div>
  </div>
</template>

<script>
  import Project from '../gm-designer/toolbox-project.vue'
  import ToolboxElement from './toolbox-element.vue'

  export default {
    data () {
      return {
        ds: {
          project: {id: ''}
        }
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {Project, ToolboxElement}
  }
</script>

<style>
  .gl-graph-designer td[gl-field] {
    background-color: #b4e7ff;
  }
</style>
