<template>
  <div class="ui vertical mini menu dnd-toolbox dnd-sidebar">
    <div class="ui accordion item">
      <div class="title">
        说明<i class="info teal icon"></i>
      </div>
      <div class="content">
        <div class="ui teal message">表单容器可放置一到多个字段容器（如两列8-8、三列均分1-1-1）,字段容器内可以放置字段。
        </div>
      </div>
    </div>
    <div class="ui accordion item">
      <div class="title active">
        表单容器
      </div>
      <div class="content active">
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>表头-大标题</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'element',ui:'header'}">
            <div class="ui vertical clearing segment">
              <h4 class="ui left floated header">
                <i class="browser icon"></i>
                <label class="content">标题</label>
              </h4>
              <!--<h4 class="ui right floated header">-->
              <!--<div data-dnd-allow="control,field" class="dnd-target">-->
              <!--</div>-->
              <!--</h4>-->
            </div>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>分隔-子标题</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'element',ui:'header'}">
            <h4 class="ui dividing header">
              <i class=""></i>&nbsp;&nbsp;<label>子标题</label>
            </h4>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>容器-表单主体</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'divForm'}">
            <form action="#" class="ui mini form dnd-target gl-form" data-dnd-allow="fields,element,collection,layout,table">
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="ui accordion item">
      <div class="title active">
        字段
      </div>
      <div class="content active">
        <table class="compact">
          <tbody>
          <tr data-setting-value>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-i-cursor" aria-hidden="true"></i><label>单行</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'singleText'}">
                  <!-- gl-required表示是否启用required的选项，required表示字段默认为必填-->
                  <div class="required field gl-required">
                    <label>单行</label>
                    <!-- gl-control 用于选择器控制取值、设置值等-->
                    <input class="gl-control" type="text" placeholder="">
                  </div>
                </div>
              </div>
            </td>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-edit" aria-hidden="true"></i><label>多行</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'multiText'}">
                  <div class="required field">
                    <label>多行</label>
                    <textarea class="form-control" rows="4"></textarea>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr data-setting-value>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-calendar" aria-hidden="true"></i><label>日期</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'date'}">
                  <div class="required field">
                    <label>日期</label>
                    <div class="ui calendar">
                      <div class="ui input right icon">
                        <i class="calendar icon"></i>
                        <input type="text" placeholder="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-clock-o" aria-hidden="true"></i><label>时间</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'time'}">
                  <div class="required field">
                    <label>时间</label>
                    <div class="ui calendar">
                      <div class="ui input right icon">
                        <i class="wait icon"></i>
                        <input type="text" placeholder="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr data-setting-value>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-envelope" aria-hidden="true"></i><label>邮件</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'email'}">
                  <div class="required field">
                    <label>邮件</label>
                    <input type="text" class="gl-control" placeholder="邮箱地址">
                  </div>
                </div>
              </div>
            </td>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-phone" aria-hidden="true"></i><label>电话</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'phone'}">
                  <div class="required field">
                    <label>电话</label>
                    <input type="text" class="gl-control" placeholder="如13900000000">
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr data-setting-value>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                    <span class="dnd-title"><i class="fa fa-dot-circle-o"
                                               aria-hidden="true"></i><label>单选</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'checkbox'}">
                  <div class="field">
                    <label>单选</label>
                    <script type="application/json">
                      {
                        "name": "radio_checkbox",
                        "type": "radio",
                        "data": [{"text":"项1", "value":"1"}, {"text":"项2", "value": "2"}]
                      }
                    </script>
                  </div>
                </div>
              </div>
            </td>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                    <span class="dnd-title"><i class="fa fa-check-square-o"
                                               aria-hidden="true"></i><label>多选</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'checkbox'}">
                  <div class="field">
                    <label>多选</label>
                    <script type="application/json">
                      {
                        "name": "checkbox",
                        "type": "checkbox",
                        "data": [{"text":"项1", "value":"1"}, {"text":"项2", "value": "2"}]
                      }
                    </script>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr data-setting-value>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                    <span class="dnd-title"><i class="fa fa-list" aria-hidden="true"></i><label>下拉
                    </label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'select'}">
                  <div class="required field gl-required">
                    <label>下拉</label>
                    <select class="ui fluid dropdown">
                      <option value="">默认</option>
                      <option value="AL">Alabama</option>
                    </select>
                  </div>
                </div>
              </div>
            </td>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-clock-o" aria-hidden="true"></i><label>多选</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'label'}">
                  <div class="form-group">
                    <span class="control-label col-md-3"><label>多选</label><i class="required">*</i></span>
                    <div class="col-md-9">
                      <div class="input-group date-picker input-daterange" data-date="10/11/2012"
                           data-date-format="mm/dd/yyyy">
                        <input type="text" class="form-control" name="from">
                        <span class="input-group-addon"> 到 </span>
                        <input type="text" class="form-control" name="to"></div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr data-setting-value>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                    <span class="dnd-title"><i class="fa fa-file-picture-o"
                                               aria-hidden="true"></i><label>图片</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'label'}">
                  <div class="form-group">
                    <span class="control-label col-md-3"><label>图片</label><i class="required">*</i></span>
                    <div class="col-md-4">
                      <div class="input-group date date-picker" data-date-format="dd-mm-yyyy"
                           data-date-start-date="+0d">
                        <input type="text" class="form-control" readonly="">
                        <span class="input-group-btn">
                            <button class="btn default" type="button">
                              <i class="fa fa-calendar"></i>
                            </button>
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-upload" aria-hidden="true"></i><label>上传</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'label'}">
                  <div class="form-group">
                    <span class="control-label col-md-3"><i class="required">*</i><label>上传</label></span>
                    <div class="col-md-9">
                      <div class="input-group date-picker input-daterange" data-date="10/11/2012"
                           data-date-format="mm/dd/yyyy">
                        <input type="text" class="form-control" name="from">
                        <span class="input-group-addon"> 到 </span>
                        <input type="text" class="form-control" name="to"></div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr data-setting-value>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-group" aria-hidden="true"></i><label>组织</label></span>
                </div>
                <toolbar></toolbar>
                <div class="dnd-content" data-meta="{type:'field', ui:'label'}">
                  <div class="form-group">
                    <span class="control-label col-md-3"><i class="required">*</i><label>组织</label></span>
                    <div class="col-md-4">
                      <div class="input-group date date-picker" data-date-format="dd-mm-yyyy"
                           data-date-start-date="+0d">
                        <input type="text" class="form-control" readonly="">
                        <span class="input-group-btn">
                            <button class="btn default" type="button">
                              <i class="fa fa-calendar"></i>
                            </button>
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td colspan="12">
              <div class="dnd-item">
                <div class="dnd-dsc">
                  <span class="dnd-title"><i class="fa fa-user" aria-hidden="true"></i><label>人员</label></span>
                </div>
                <!--<toolbar></toolbar>-->
                <div class="dnd-content" data-meta="{type:'field', ui:'label'}">
                  <div class="form-group">
                    <span class="control-label col-md-3"><i class="required">*</i><label>人员</label></span>
                    <div class="col-md-4">
                      <div class="input-group date-picker input-daterange" data-date="10/11/2012"
                           data-date-format="mm/dd/yyyy">
                        <input type="text" class="form-control" name="from">
                        <span class="input-group-addon"> 到 </span>
                        <input type="text" class="form-control" name="to"></div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import dndHandler from '../../../components/designer/dndHandler'
//  import toolbar from './stage/stage-toolbar'

  export default {
    data () {
      return {}
    },
    mounted: function () {
      $(this.$el).find('.ui.accordion').accordion()
      let $items = $(this.$el).find('.dnd-item')
      dndHandler.bindDragObjects($items, 'field')
    },
    methods: {},
    components: {}
  }
</script>
<style>
</style>
