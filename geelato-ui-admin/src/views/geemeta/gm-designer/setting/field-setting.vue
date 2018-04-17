<template>
  <div id="designer_field_setting" class="ui vertical mini menu dnd-sidebar">
    <div v-if="!editingElement.content" class="item">
      <div style="text-align: center;color: red">
        请先在设计界面中选需设置的对象。
      </div>
    </div>
    <div v-if="editingElement.content&&current.selector.data" class="ui accordion item">
      <div class="title active">数据</div>
      <div class="content active">
        <table class="ui mini form gl-form compact gl-col-24">
          <tbody>
          <tr v-if="current.selector.data.name">
            <td colspan="8" title="页面展示的字段名称。">名称<i class="fa fa-question-circle"></i></td>
            <td colspan="16"><input type="text" v-model="cfg.data.name"></td>
          </tr>
          <tr v-if="current.selector.data.defaultValue">
            <td colspan="8" title="页面初始展示时，该字段的值。">初始值<i class="fa fa-question-circle"></i></td>
            <td colspan="16"><input type="text" v-model="cfg.data.defaultValue"></td>
          </tr>
          <tr v-if="current.selector.data.placeholder">
            <td colspan="8" title="页面初始展示时，在输入框中的提示内容。">提示值<i class="fa fa-question-circle"></i></td>
            <td colspan="16"><input type="text" v-model="cfg.data.placeholder"></td>
          </tr>
          <tr v-if="current.selector.data.field">
            <td colspan="8" title="对应数据库实体的字段。">字段<i class="fa fa-question-circle"></i></td>
            <td colspan="16"><input type="text" v-model="cfg.data.field"></td>
          </tr>
          <tr v-if="current.selector.data.value">
            <td colspan="8" title="">数据源<i class="fa fa-question-circle"></i></td>
            <td colspan="16">
              <textarea rows="5" v-model="cfg.data.value"></textarea>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="editingElement.content&&current.selector.facade" class="ui accordion item">
      <div class="title active">外观</div>
      <div class="content active">
        <table class="ui mini form gl-form compact gl-col-24">
          <tbody>
          <tr v-if="current.selector.facade.format">
            <td colspan="8" title="format">格式</td>
            <td colspan="16"><input type="text" v-model="cfg.facade.format"></td>
          </tr>
          <tr v-if="current.selector.facade.icons&&current.selector.facade.icons.length">
            <td colspan="8" title="i.icon">图标</td>
            <td colspan="16">
              <i v-for="(icon,index) in current.selector.facade.icons" v-model="cfg.facade.icons[index]"
                 :class="icon.class" @click="selectIcon" :data-id="icon.id"></i>
            </td>
          </tr>
          <tr v-if="current.selector.facade.class">
            <td colspan="8" title="class">类</td>
            <td colspan="16"><textarea rows="2" v-model="cfg.facade.class"></textarea></td>
          </tr>
          <tr v-if="current.selector.facade.style">
            <td colspan="8" title="style">样式</td>
            <td colspan="16"><input type="text" v-model="cfg.facade.style"></td>
          </tr>
          <tr v-if="current.selector.facade.tip">
            <td colspan="8" title="tip">提示</td>
            <td colspan="16">
              <textarea rows="2" v-model="cfg.facade.tip"></textarea>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="editingElement.content&&current.selector.rule" class="ui accordion item">
      <div class="title active">规则</div>
      <div class="content active">
        <table class="ui mini form gl-form compact gl-col-24">
          <tbody>
          <tr v-if="current.selector.rule.required&&current.selector.rule.required.active">
            <td colspan="8">必填</td>
            <td colspan="16">
              <div class="ui checkbox">
                <input type="checkbox" name="fun" tabindex="0" class="hidden" v-model="cfg.rule.required.value">
                <label>必填</label>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="editingElement.content&&current.selector.auth&&(current.selector.auth.role||current.selector.permission)"
         class="ui accordion item">
      <div class="title">权限</div>
      <div class="content">
        <table class="ui mini form gl-form compact gl-col-24">
          <tbody>
          <tr v-if="current.selector.auth.role">
            <td colspan="8">显示给</td>
            <td colspan="16">
              <select v-model="cfg.auth.role">
                <option>所有人</option>
                <option>管理员</option>
              </select>
            </td>
          </tr>
          <tr v-if="current.selector.auth.permission">
            <td colspan="8">权限字符</td>
            <td colspan="16">
              <input type="text" v-model="cfg.auth.permission">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  //  import dndHandler from '../../../common/dndHandler'
  import settingOptions from '../../../../components/designer/settingOptions'
  import dndOptions from '../../../../components/designer/dndOptions'
  import settingHandler from '../../../../components/designer/SettingHandler'
  //  import FieldDefinition from '../../../common/SettingPanel'
  import FieldDefinition from '../../../../components/designer/FieldDefinition'
  import DndContent from '../../../../components/designer/DndContent'
  import utils from '../../../../common/utils'

  export default {
    props: {
      editingPage: {},
      editingElement: new DndContent()
    },
    data () {
      return {
        cfg: new FieldDefinition(),
        current: {
          selector: {}
        },
        //  即$(this.editingElement.content)
        $content: null
      }
    },
    watch: {
      // 每次在外部vue中点设置时，更新actionSeq的值，触发调用此方法
      'editingElement.id': function (val, oldVal) {
        let thisVue = this
        let handler = this.getHandler()
        if (handler) {
          console.log('this.$content>', this.$content)
          handler.setConfig(this.cfg, this.$content)
          this.current.selector = handler.selector
          // -->获取内容中的所有icon，并更新到当前页面信息中
          // !!icon的信息只在此设置，不在handler.selector中设置
          this.current.selector.facade = this.current.selector.facade || {}
          // 格式如：[{id:'IKJDUUNV',class:'mail icon'},{id:'POUJEVEY',class:'mail outline icon'}]
          this.current.selector.facade.icons = []
          this.$content.find('i.icon').each(function (i, item) {
            let uuid = utils.uuid(8)
            $(item).attr('data-id', uuid)
            thisVue.current.selector.facade.icons.push({id: uuid, class: item.className})
          })
          // -->本地数据源
//          this.$content.find('i.icon').each(function (i, item) {
//            let uuid = utils.uuid(8)
//            $(item).attr('data-id', uuid)
//            thisVue.current.selector.facade.icons.push({id: uuid, class: item.className})
//          })
        } else {
          console.error('未有相应的配置器，editingElement>', this.editingElement)
        }
//        this.updateCfg()
      },
      'cfg.data.name': function (val, oldVal) {
//        debugger
        this.$content.find(this.getHandler().selector.data.name).text(val)
      },
      'cfg.data.field': function (val, oldVal) {
//          this.$content.findIncludeSelf(settingOptions.selector.field).val(val)
      },
      'cfg.data.defaultValue': function (val, oldVal) {
        this.$content.find(settingOptions.selector.control).val(val)
      },
      'cfg.data.placeholder': function (val, oldVal) {
        this.$content.find(settingOptions.selector.control).attr('placeholder', val)
      },
      'cfg.data.value': function (val, oldVal) {
        console.log('this.editingPage>', this.editingPage)
        // checkbox
//        let $group = this.$content.find(['data-gl-template-groups'])
//        let templateDom = $group.children()[0]
//        let data = JSON.parse(val)
//        $group.empty()
//        for (var i in data) {
//          let html = templateDom.cloneNode(true)
//          html.outerHTML = html.outerHTML.replace('$title', data[i].title).replace('$value', data[i].value)
//          $group.append(html.outerHTML)
//        }
      },
      'cfg.facade.format': function (val, oldVal) {
//        this.$content.find(settingOptions.selector.control).attr('placeholder', val)
      },
      'cfg.facade.icons.length': function (val, oldVal) {
//        this.$content.find(this.getHandler().selector.facade.icon).attr('class', val)
      },
      'cfg.facade.class': function (val, oldVal) {
        this.$content.find(this.getHandler().selector.facade.class).attr('class', val)
      },
      'cfg.facade.style': function (val, oldVal) {
        this.$content.find(this.getHandler().selector.facade.style).attr('style', val)
      },
      'cfg.facade.tip': function (val, oldVal) {
        this.$content.find(settingOptions.selector.label).attr('title', val)
      },
      'cfg.rule.required.value': function (val, oldVal) {
//        if (!this.getHandler().selector.rule.required) {
//          return
//        }
        let $required = this.$content
        if (val) {
          $required.addClass('required')
        } else {
          $required.removeClass('required')
        }
      }
    },
    mounted: function () {

//      this.watchAndUpdateView('cfg.data.name')
    },
    updated: function () {
      if (this.$content) {
        let id = this.$content.attr(dndOptions.attr.data.id)
        this.$emit('updated', {id: id, cfg: this.cfg})
        this.$_initUi()
      }
    },
    methods: {
      $_initUi: function () {
        $(this.$el).find('.ui.accordion').accordion()
        $(this.$el).find('.ui.checkbox').checkbox()
      },
      getHandler: function () {
//        debugger
        this.$content = $(this.editingElement.content)
//        console.log('this.editingElement>', this.editingElement)
        if (this.editingElement.meta) {
          return settingHandler.getHandler(this.editingElement.meta.ui)
        } else {
          console.error('props的editingElement.meta不能为空,当前的editingElement值为：', this.editingElement)
        }
      },
      updateCfg: function () {
        console.log('updateCfg>this.editingElement>', this.editingElement)
        this.cfg.data.name = this.$content.find(settingOptions.selector.label).text()
        this.cfg.data.defaultValue = this.$content.find(settingOptions.selector.control).val()
        this.cfg.data.placeholder = this.$content.find(settingOptions.selector.control).attr('placeholder')
        this.cfg.facade.tip = this.$content.find(settingOptions.selector.label).attr('title')
        this.cfg.rule.required = this.$content.hasClass(settingOptions.selector.required.value)
      },
      /**
       * 选择更改图标及颜色
       * @param e 设置工具栏中的图标对像“i.icon”
       */
      selectIcon: function (e) {
        let thisVue = this
        this.$GL.ui.openVueByPath(this, '/views/geemeta/gm-designer/setting/icon-setting',
          {title: '<div class="ui circular label"></div><div class="content">选择图标</div>'},
          {
            selected: function (data) {
              e.target.className = data.className
              // 依据data-id更新content中的图标类
              let uuid = $(e.target).attr('data-id')
              console.log('uuid', uuid)
              thisVue.$content.find('i[data-id="' + uuid + '"]').get(0).className = data.className
              // 返回下一步modal中执行的事件
              return 'close'
            }
          })
      }
//      watchAndUpdateView: function (propNamePath) {
//        let self = this
//        let handler = this.getHandler()
//        if (handler) {
//          self.$watch(propNamePath, function (val, oldVal) {
//            handler.updateView()
//            self.$content.findIncludeSelf(settingOptions.selector.label).text(val)
//          })
//        } else {
//          console.error('未有相应的配置器，editingElement>', this.editingElement)
//        }
//      }
    },
    components: {}
  }
</script>
<style>

  #designer_field_setting {
    width: 100%;
  }

  #designer_field_setting .gl-form td:nth-child(2n+1) {
    font-weight: normal;
    text-align: right;
    padding-right: 0.2em;
    background-color: white;
  }

  #designer_field_setting .gl-form td:nth-child(2n+1) > i {
    margin-left: 2px;
  }

  #designer_field_setting .gl-form td:nth-child(2n) {
    background-color: white;
    padding: 0px;
  }

  #designer_field_setting .gl-form td:nth-child(2n) > .ui {
    margin-left: 1em;
  }

  #designer_field_setting .gl-form input, #designer_field_setting .gl-form textarea {
    width: 100%;
    border: 0px;
  }

  #designer_field_setting i.icon {
    cursor: pointer;
    padding-left: 1em;
  }

</style>
