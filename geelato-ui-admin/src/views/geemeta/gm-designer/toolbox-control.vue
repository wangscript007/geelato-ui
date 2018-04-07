<template>
  <div class="ui vertical following accordion mini menu dnd-toolbox">
    <div class="item">
      <div class="title">
        默认
      </div>
      <div class="content">
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>文本</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control', control:'label'}">
            <label>点击修改</label>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>多行文本框</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control', control:'mutilText'}">
            <textarea rows="4"></textarea>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>单行文本框</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control',control:'singleText'}">
            <div class="input-group">
                  <span class="input-group-addon">
                  <i class="fa fa-envelope"></i>
                  </span>
              <input type="text" class="form-control input-sm" placeholder="请输入...">
            </div>
          </div>
        </div>

        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>日期</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control'}">
            <input class='kendoDatePicker'/>
          </div>
        </div>

        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>JSON Editor</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control',control:'jsonEditor'}">
            <textarea data-xg='xg-jsonEditor' rows='6' readonly></textarea>
          </div>
        </div>

        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>复选框</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control',control:'checkbox'}">
            <div class="mt-checkbox-list">
              <label class="mt-checkbox mt-checkbox-outline"> &nbsp;
                <input type="checkbox" value="1" name="test"/>
                <span></span>
              </label>
            </div>
          </div>
        </div>

        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>数字</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control',control:'numericText'}">
            <div class="mt-checkbox-list">
              <input class='kendoNumericTextBox'/>
            </div>
          </div>
        </div>

        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>按钮</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control',control:'button'}">
            <button type="button" class="btn blue btn-sm">按钮</button>
          </div>
        </div>

      </div>
    </div>
    <div class="item">
      <div class="title">
        自定义
      </div>
      <div class="content">
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>文本</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'control', control:'label'}">
            <p>
              <a class="btn blue" href="ui_tabs_accordions_navs.html#collapse_control_custom"
                 target="_blank">添加</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dndHandler from '../../../components/designer/dndHandler'
  import toolbar from './stage-toolbar'
  export default {
    data () {
      return {}
    },
    mounted: function () {
      let $items = $(this.$el).find('.dnd-item')
      dndHandler.bindDragObjects($items, 'control')
      $(this.$el).find('.ui.accordion').accordion()
    },
    methods: {},
    components: {toolbar}
  }
</script>
<style>

</style>
