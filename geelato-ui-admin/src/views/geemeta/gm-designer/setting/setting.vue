<template>
  <div>
    <div id="designer-toolbox-setting-tabs" class="ui mini top attached tabular menu" style="width: 100%">
      <a class="item active " data-tab="designer-tab-setting-page">页面</a>
      <a class="item" data-tab="designer-tab-setting-field">字段</a>
      <a class="item" data-tab="designer-tab-setting-ds">数据源</a>
    </div>
    <div class="ui bottom attached tab tab-content segment active" data-tab="designer-tab-setting-page">
      <table class="ui mini form gl-form compact xg-col-24">
        <tbody>
        <tr v-if="editingPage">
          <td colspan="8" title="页面编码。">页面编码<i class="fa fa-question-circle"></i></td>
          <td colspan="16"><input type="text" v-model="editingPage.code"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ui bottom attached tab tab-content segment stage-code" data-tab="designer-tab-setting-field">
      <field-setting :editingPage="editingPage" :editingElement="editingPage.editingElement"></field-setting>
    </div>
    <div class="ui bottom attached tab tab-content segment stage-code" data-tab="designer-tab-setting-ds">
      数据源
    </div>
  </div>
</template>
</div>
<script>
  import dndOptions from '../../../../components/designer/dndOptions'
  import settingHandler from '../../../../components/designer/SettingHandler'
  import utils from '../../../../common/utils'
  import fieldSetting from './field-setting.vue'
  import EditingPageDefinition from '../../../../pages/EditingPageDefinition'

  export default {
    props: {
      editingPage: new EditingPageDefinition()
    },
//    data () {
//    },
    watch: {
      'editingPage.editingElement.id': function (val, oldVal) {
        let thisVue = this
        console.log('editingPage.editingElement.id>>>>>>>>>>>>>>>', thisVue.editingPage.editingElement)
        if (thisVue.editingPage.editingElement.meta) {
          if (thisVue.editingPage.editingElement.meta.type === 'field') {
            $('.tabular.menu').tab('change tab', 'designer-tab-setting-field')
          }
        }
      },
      // 每次在外部vue中点设置时，更新actionSeq的值，触发调用此方法
      'options.actionSeq': function (val, oldVal) {
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
          console.error('未有相应的配置器，options>', this.options)
        }
//        this.updateCfg()
      }
    },
    mounted: function () {
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
//        $(this.$el).find('.ui.accordion').accordion()
//        $(this.$el).find('.ui.checkbox').checkbox()
        $(this.$el).find('.ui.menu>.item[data-tab]').tab()
      },
      getHandler: function () {
//        debugger
        this.$content = $(this.options.content)
//        console.log('this.options>', this.options)
        if (this.options.meta) {
          return settingHandler.getHandler(this.options.meta.ui)
        } else {
          console.error('props的options.meta不能为空,当前的options值为：', this.options)
        }
      }
    },
    components: {fieldSetting}
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
