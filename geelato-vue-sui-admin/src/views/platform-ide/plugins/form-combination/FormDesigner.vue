<!--
  表单配置页面
-->
<template>
  <div class="gl-designer-form" style="height: 565px">
    <div class="split split-horizontal toolbar">
      <h5 class="ui dividing header">
        基础字段
      </h5>
      <div class="ui middle aligned selection list">
        <draggable @start="drag=true" @end="drag=false"
                   :options="{group:{name:'field', pull:'clone', put:false },sort:false}">
          <div class="item toolbar-item">
            <i class="keyboard outline icon"></i>
            <div class="content">
              单行文本
            </div>
          </div>
          <div class="item toolbar-item">
            <i class="keyboard outline icon"></i>
            <div class="content">
              多行文本
            </div>
          </div>
          <div class="item toolbar-item">
            <i class="dot circle outline icon"></i>
            <div class="content">
              单选
            </div>
          </div>
          <div class="item toolbar-item">
            <i class="check square outline icon"></i>
            <div class="content">
              复选
            </div>
          </div>
          <div class="item toolbar-item">
            <i class="calendar alternate outline icon"></i>
            <div class="content">
              日期选择
            </div>
          </div>
          <div class="item toolbar-item">
            <i class="clock outline icon"></i>
            <div class="content">
              时间选择
            </div>
          </div>
          <div class="item toolbar-item">
            <i class="caret square down outline icon"></i>
            <div class="content">
              下拉选择
            </div>
          </div>
          <div class="item toolbar-item">
            <i class="star outline icon"></i>
            <div class="content">
              评分
            </div>
          </div>
        </draggable>
      </div>
      <h5 class="ui dividing header" style="clear: both">
        页面布局
      </h5>
      <div class="ui middle aligned selection list">
        <draggable v-model="toolbar.layout" element="tr" @start="drag=true" @end="drag=false"
                   :options="{group:{name:'layout', pull:'clone', put:false },sort:false}">
          <!--<div class="item" v-for="(item,index) in toolbar.layout">-->
          <!--<i :class="item.icon"></i>-->
          <!--<div class="content">{{item.text}}</div>-->
          <!--</div>-->
          <div class="item toolbar-item">
            <i class="th icon"></i>
            <div class="content">一行一列</div>
          </div>
          <div class="item toolbar-item">
            <i class="th icon"></i>
            <div class="content">一行二列</div>
          </div>
          <div class="item toolbar-item">
            <i class="th icon"></i>
            <div class="content">一行三列</div>
          </div>
          <div class="item toolbar-item">
            <i class="th icon"></i>
            <div class="content">一行四列</div>
          </div>
          <div class="item toolbar-item">
            <i class="th icon"></i>
            <div class="content">分组标题</div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="split split-horizontal stage">
      <sui type="tab" selector=".ui.menu>.item">
        <div class="ui pointing secondary menu">
          <a class="item active" data-tab="tab-designer"><i class="edit icon"></i>设计</a>
          <a class="item" data-tab="tab-preview"><i class="eye icon"></i>预览</a>
          <a class="item" data-tab="tab-json"><i class="code icon"></i>JSON配置</a>
        </div>
        <div class="ui tab active" data-tab="tab-designer">
          <div class="ui small compact form">
            <draggable v-model="layout.data" element="table" class="gl-form gl-col-24"
                       :options="{group:{name:'layout'},chosenClass:'active'}"
                       @start="drag=true"
                       @add="$_addRow" @change="$_updateLayout">
              <tr v-for="(row,rowIndex) in layout.data">
                <!--行数据为分组标题，[{'': [24],  $title: '',$style:''}]-->
                <template v-if="row.length===1&&row[0].$title!==undefined">
                  <td colspan="24" class="gl-form-group-title" :style="row[0].$style">
                    <span class="gl-designer-form-row-remove" title="删除当前行"
                          @click="$_removeRow(rowIndex)">
                      <i class="bordered inverted red remove small icon"></i>
                    </span>
                    <div v-html="row[0].$title"></div>
                  </td>
                </template>
                <!--行数据非分组标题-->
                <template v-else>
                  <template v-for="(cell,cellIndex) in row"
                            v-if="property=$_getProperty(Object.keys(cell)[0])">
                    <td :colspan="Object.values(cell)[0][0]" :rowspan="Object.values(cell)[0][2]" class="title">
                    <span v-if="cellIndex===0" class="gl-designer-form-row-remove" title="删除当前行"
                          @click="$_removeRow(rowIndex)">
                      <i class="bordered inverted red remove small icon"></i>
                    </span>
                      <!--<div class="ui red mini button gl-designer-form-row-remove">删行</div>-->
                      <span v-if="property.tips" :data-tooltip="property.tips">
                            <i class="info circle icon"></i>
                        </span>
                      <span class="gl-required">{{$_isRequired(property)?'*':''}}</span>
                      {{property.title||Object.keys(cell)[0]}}&nbsp;
                    </td>

                    <td class="gl-designer-form-field" :colspan="Object.values(cell)[0][1]"
                        :rowspan="Object.values(cell)[0][2]">
                      <draggable :options="{group:{name:'field'},chosenClass:'active',sort:false}" @start="drag=true"
                                 @end="drag=false"
                                 @add="$_addField($event,rowIndex,cellIndex,$_getProperty(Object.keys(cell)[0]).field)"
                                 @choose="$_onChoose">
                        <template v-if="property.control==='input'">
                          <input type="text" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                 :readonly="property.readonly===true"
                                 :disabled="property.disabled===true">
                        </template>
                        <template v-else-if="property.control==='textarea'">
                        <textarea rows="5" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                  :readonly="property.readonly===true"
                                  :disabled="property.disabled===true"></textarea>
                        </template>
                        <template v-else-if="property.control==='checkbox'">
                          <sui-checkbox :name="Object.keys(cell)[0]" :readonly="property.readonly===true"
                                        :disabled="property.disabled===true"></sui-checkbox>
                          {{property.placeholder}}
                        </template>
                        <template v-else-if=" property.control==='dropdown'">
                          <sui-dropdown selection :name="Object.keys(cell)[0]" :readonly="property.readonly===true"
                                        :disabled="property.disabled===true"></sui-dropdown>
                        </template>

                        <template v-else-if="property.control==='email'">
                          <input type="email" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                 :readonly="property.readonly===true"
                                 :disabled="property.disabled===true">
                        </template>
                        <template v-else-if="property.control==='password'">
                          <input type="password" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                 :readonly="property.readonly===true"
                                 :disabled="property.disabled===true">
                        </template>
                        <span class="gl-designer-form-field-remove" title="删除当前字段"
                              @click="$_removeField($event,rowIndex,cellIndex,$_getProperty(Object.keys(cell)[0]).field)">
                      <i class="bordered inverted red trash small icon"></i>
                    </span>
                        <!--这是一个占位元素，只有拖动到该元素上才有效-->
                        <div style="width: 100%;height: 3px;background-color:rgba(0,0,0,0)"></div>
                        <!--<div>{{control}}</div>-->
                      </draggable>
                    </td>
                  </template>
                </template>
              </tr>
            </draggable>
          </div>
        </div>
        <div class="ui tab" data-tab="tab-preview">
          <gl-form-base :opts="{ui:config}">
          </gl-form-base>
        </div>
        <div class="ui tab" data-tab="tab-json">
          <json-code-mirror ref="jsonCM" :text="configText"></json-code-mirror>
        </div>
      </sui>
    </div>
    <div class="split split-horizontal settings">
      <sui type="tab" selector=".ui.menu>.item" ref="settingsTabs">
        <div class="ui pointing secondary menu">
          <a class="item active" data-tab="tab-form">表单</a>
          <a class="item" data-tab="tab-field">字段</a>
          <a class="item" data-tab="tab-cell">单元格</a>
        </div>
        <div class="ui tab active" data-tab="tab-form">
          <h5 class="ui dividing header">
            <i class="sticky note outline icon"></i>
            基础
          </h5>
          <div class="ui mini form gl-form gl-content-wrapper">
            <div class="field">
              <label>默认实体(defaultEntity)</label>
              <input type="text" placeholder="platformDemo" v-model="defaultEntity">
            </div>
            <div class="field">
              <label>表单描述(description)</label>
              <textarea rows="4"></textarea>
            </div>
          </div>
          <h5 class="ui dividing header">
            <i class="database icon"></i>
            数据
          </h5>
          <div class="ui mini form gl-form gl-content-wrapper">
            <div class="field">
              <label>数据源定义(ds)</label>
              <textarea rows="4">{"province":{
      "entity":"platform_province",
      "lazy":false,
      "fields":"name text,code value",
      "description":"这是一个拉列表数据源"
    },
    "city":{
      "entity":"platform_city",
      "lazy":true,
      "fields":"name text,code value",
      "params":{
        "provinceCode":"gs:$ctx.form.province"
      },
      "description":"这是一个拉列表数据源，带参数"
    }
  }</textarea>
            </div>
          </div>
          <h5 class="ui dividing header">
            <i class="code icon"></i>
            变量(vars)
          </h5>
          <div class="ui mini form gl-form gl-content-wrapper">
            <div class="field">
              <label>变量1</label>
              <input type="text" placeholder="" name="code">
            </div>
            <div class="field">
              <label>变量2</label>
              <input type="text" placeholder="" name="code">
            </div>
            <div class="field">
              <label>变量3</label>
              <input type="text" placeholder="" name="code">
            </div>
          </div>
        </div>
        <div class="ui tab" data-tab="tab-field">
          <template v-if="currentPropertyName">
            <h5 class="ui dividing header">
              <i class="affiliatetheme icon"></i>
              外观
            </h5>
            <div class="ui mini form gl-form gl-content-wrapper">
              <div class="ui error message segment"></div>
              <div class="field">
                <label>标题(title)</label>
                <input type="text" placeholder="" v-model="properties[currentPropertyName].title">
              </div>
              <div class="field">
                <label>控件(control)</label>
                <!--<input type="text" placeholder="" v-model="properties[currentPropertyName].control">-->
                <sui-dropdown
                    placeholder=""
                    selection
                    :options="toolbar.controls"
                    v-model="properties[currentPropertyName].control"
                    :value="properties[currentPropertyName].control"
                />
              </div>
              <div class="field">
                <label>提示(tips)</label>
                <input type="text" placeholder="" v-model="properties[currentPropertyName].tips">
              </div>
              <div class="field">
                <label>禁用(disabled)</label>
                <input type="checkbox" v-model="properties[currentPropertyName].disabled"/>
              </div>
              <div class="field">
                <label>只读(readonly)</label>
                <input type="checkbox" v-model="properties[currentPropertyName].readonly"/>
              </div>
              <div class="field">
                <label>占位符(placeholder)</label>
                <input type="text" placeholder="" v-model="properties[currentPropertyName].placeholder">
              </div>
            </div>
            <h5 class="ui dividing header">
              <i class="database icon"></i>
              数据
            </h5>
            <div class="ui mini form gl-form gl-content-wrapper">
              <div class="field">
                <label>标识(key)</label>
                <input type="text" placeholder="code" v-model="currentPropertyName">
              </div>
              <div class="field">
                <label>绑定实体(entity)</label>
                <input type="text" placeholder="如：platformDemo" v-model="properties[currentPropertyName].entity">
              </div>
              <div class="field">
                <label>绑定字段(field)</label>
                <input type="text" placeholder="" v-model="properties[currentPropertyName].field">
              </div>
              <div class="field">
                <label>值(value)</label>
                <input type="text" placeholder="" v-model="properties[currentPropertyName].value">
              </div>
              <div class="field">
                <label>在服务端计算值(isComputeInServer)</label>
                <input type="checkbox"/>
              </div>
              <div class="field">
                <label>数据源(ds)</label>
                <input type="text" placeholder="" v-model="properties[currentPropertyName].ds">
              </div>
              <div class="field">
                <label>数据(data)</label>
                <textarea rows="4" v-model="properties[currentPropertyName].data"></textarea>
              </div>
            </div>
            <h5 class="ui dividing header">
              <i class="lock icon"></i>
              权限
            </h5>
            <div class="ui mini form gl-form gl-content-wrapper">
              <div class="ui error message segment"></div>
              <div class="field">
                <label>标题</label>
                <input type="text" placeholder="" name="code">
              </div>
              <div class="field">
                <label>类型</label>
                <input type="text" placeholder="" name="code">
              </div>
              <div class="field">
                <label>模板</label>
                <input type="text" placeholder="" name="code">
              </div>
            </div>
            <h5 class="ui dividing header">
              <i class="list icon"></i>
              规则
            </h5>
            <div class="ui mini form gl-form gl-content-wrapper">
              <div class="ui error message segment"></div>
              <div class="field">
                <label>必填</label>
                <input type="text" placeholder="" name="code">
              </div>
              规则列表，[{type:xx,prompt:''}]
            </div>
          </template>
          <template v-else>
            <gl-message class="warning segment" :closable="false">请先点击选取字段</gl-message>
          </template>
        </div>
        <div class="ui tab" data-tab="tab-cell">
        </div>
      </sui>
    </div>
  </div>
</template>
<script>
  import Draggable from 'vuedraggable'
  import Split from 'split.js'
  import JsonCodeMirror from '../../../../components/gl-codemirror/Index'
  import formData from '../../form/formData.js'

  export default {
    props: {
      opts: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        // #以下表单默认示例配置
        defaultEntity: 'platformDemo',
        properties: formData[0].data.properties,
        layout: formData[0].data.layout,
        ds: formData[0].data.ds,
        vars: formData[0].data.vars,
        // #以下编辑器配置
        template: {
          property: {
            control: 'input',
            title: '',
            // 是否禁用
            disabled: true,
            // 是否只读
            readonly: false,
            // 是否隐藏，hidden隐藏与否在layout中控制，故没有hidden这个配置
            placeholder: '',
            // 是否在服务端计算
            isComputeInServer: false,
            // 数据源
            ds: '',
            // 数据
            data: '',
            // 校验规则
            rules: [
              {
                type: 'empty',
                prompt: '请输入电话号码'
              }
            ],
            // 字段描述
            description: ''
          }
        },
        toolbar: {
          layout: [
            [{'': [4, 20]}],
            [{'': [4, 8]}, {'': [4, 8]}],
            [{'': [3, 5]}, {'': [3, 5]}, {'': [3, 5]}],
            [{'': [2, 4]}, {'': [2, 4]}, {'': [2, 4]}, {'': [2, 4]}],
            [{'': [24], $title: '分组标题', $style: "background-color:#FFF"}]
          ],
          controls: [
            {value: 'input', text: '单行文本', icon: 'keyboard outline'},
            {value: 'textarea', text: '多行文本', icon: 'keyboard outline'},
            {value: 'checkbox', text: '单选', icon: 'dot circle outline', opts: {type: 'radio'}},
            {value: 'checkbox', text: '复选', icon: 'check square outline', opts: {type: 'checkbox'}},
            {value: 'date', text: '日期选择', icon: 'calendar alternate outline', opts: {}},
            {value: 'time', text: '时间选择', icon: 'clock outline', opts: {}},
            {value: 'dropdown', text: '下拉选择', icon: 'caret square down outline', opts: {}},
            {value: 'rating', text: '评分', icon: 'star outline', opts: {}}
          ],
          dict: {
            '单行文本': {control: 'input'},
            '多行文本': {control: 'textarea'},
            '单选': {control: 'checkbox', opts: {type: 'radio'}},
            '复选': {control: 'checkbox', opts: {type: 'checkbox'}},
            '日期选择': {control: 'date', opts: {}},
            '时间选择': {control: 'time', opts: {}},
            '下拉选择': {control: 'dropdown', opts: {}},
            '评分': {control: 'rating', opts: {}}
          }
        },
        // #以下编辑状态
        // 当前编辑的字段属性
        currentPropertyName: ''
      }
    },
    computed: {
      config: function () {
        return {
          defaultEntity: this.defaultEntity,
          properties: this.properties,
          layout: this.layout,
          ds: this.ds,
          vars: this.vars
        }
      },
      configText: function () {
        return JSON.stringify(this.config)
      }
    },
    created: function () {
    },
    mounted: function () {
      this.spliter = Split(['.toolbar', '.stage', '.settings'], {
        sizes: [18.75, 56.25, 25],
        gutterSize: 4
        // minSize: 200
      })
      this.$_initConvertData()
    },
    methods: {
      $_initConvertData() {
        let thisVue = this
        for (let key in this.properties) {
          // 设置一些默认值，添加默认配置等
          let property = this.properties[key]
          // identifier 是 semantic ui form validate 需用到的属性
          property.identifier = key
          // 未设置实体时，默认为defaultEntity
          property.entity = property.entity || this.defaultEntity
          property.field = property.field || key
          // property.title = property.title || '标题'
          // !!!需采用vm.$set的方式来设置值，确保值变化可被检测 @see https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
          // this.$set(this.form, key, property.value === undefined ? '' : property.value)
          // this.form[key] = property.value === undefined ? '' : property.value
          // 依据字段类型，自动构建字段验证规则信息，基于semantic ui form validate
          if (property.control === 'email' && (!property.rules)) {
            property.rules = []
            this.properties[key].rules.push({type: 'email'})
          }
        }
      },
      $_getProperty(name) {
        if (!name || !this.properties[name]) {
          return {control: 'null', title: ' '}
        }
        return this.properties[name]
      },
      /**
       * 检查字段是否必填
       * @param property 字段配置信息
       * @returns {boolean}
       */
      $_isRequired(property) {
        if (!property.rules || property.rules.length === 0) {
          return false
        } else {
          return property.rules.filter(item => item.type === 'empty' || item.type === 'checked').length > 0
        }
      },
      $_getValue() {
      },
      $_onFieldDrag(a, b, c, d) {
        console.log('$_onFieldDrag>', a, 'B>', b, 'C>', c, 'D>', d)
      },
      $_cloneRow(a, b, c, d) {
        console.log('$_cloneRow>', a, 'B>', b, 'C>', c, 'D>', d)
        a.dragged = '<tr><td>abd</td></tr>'
        return '<tr><td>abd</td></tr>'
      },
      $_addRow(evt) {
        console.log('$_addRow>', evt, this.layout.data)
      },
      $_removeRow(rowIndex) {
        this.layout.data.splice(rowIndex, 1)
        console.log('$_removeRow>', this.layout.data)
      },
      $_addField(evt, rowIndex, cellIndex, propertyName) {
        if (propertyName === undefined) {
          this.currentPropertyName = 'p_' + this.$gl.utils.uuid(8)
          this.properties[this.currentPropertyName] = JSON.parse(JSON.stringify(this.template.property))
          this.properties[this.currentPropertyName].entity = this.defaultEntity
        } else {
          this.currentPropertyName = propertyName
        }
        // evt.item.innerText
        this.$_selectSettingTab('tab-field')
      },
      $_removeField(evt, rowIndex, cellIndex, propertyName) {
        console.log('$_removeField>', evt, rowIndex, cellIndex, this.layout.data[rowIndex][cellIndex], propertyName)
        if (propertyName === undefined) {
          return
        } else {
          // 清除选中状态
          if (this.currentPropertyName === propertyName) {
            this.currentPropertyName = ''
          }
          console.log('delete', delete this.properties[propertyName], this.properties)
        }
      },
      $_updateLayout(evt) {
        this.$forceUpdate()
      },
      $_onChoose(/**Event*/evt) {
        console.log('$_onChoose', evt)
        evt.oldIndex;  // element index within parent
      },
      $_openTrSettings() {

      },
      $_openTdSettings() {

      },
      $_openControlSettings() {

      },
      $_getConfigText() {
        this.configText = JSON.stringify(this.config)
        return this.configText
      },
      $_selectSettingTab(tabName) {
        this.$refs.settingsTabs.sui.tab('change tab', tabName);
      }
    },
    components: {Draggable, JsonCodeMirror}
  }
</script>
<style scoped>
  .gl-designer-form .toolbar .item {
    margin: 0.125em 0.125em;
    float: left;
    width: 7.5em;
    cursor: move;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;
    color: rgba(0, 0, 0, 1);
    border-radius: 0
  }

  .gl-designer-form .toolbar-item:hover {
    border: 1px dotted #2185d0;
  }

  .gl-designer-form .split > .header {
    padding-top: 1.4em;
    padding-left: 1em;
  }

  .gl-designer-form .split.settings .header {
    padding-left: 1em;
  }

  .gl-designer-form .toolbar-item .content {
    display: inline-block;
    margin-left: 0.125em;
    line-height: 2em;
  }

  .gl-designer-form .stage table tr:hover {
    border: 2px dotted #2185d0;
    cursor: move;
  }

  .gl-designer-form .stage table tr.active {
    border: 2px dotted #2185d0;
  }

  .gl-designer-form .stage table td:hover {
    /*border: 1px dotted #ff9e0b;*/
    background-color: #fffde6;
    cursor: move;
  }

  .gl-designer-form .stage table td.active {
    background-color: #fffde6;
  }

  .gl-designer .split {
    margin: 0;
    padding: 0;
  }

  .gl-designer-form .split p, .split-flex p {
    /*padding: 20px;*/
  }

  .gl-designer-form .split, .split-flex {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*overflow-y: hidden;*/
    overflow-x: hidden;
  }

  .gl-designer .split-horizontal {
    overflow-y: scroll
  }

  .gl-designer-form .gutter {
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .gl-designer-form .gutter.gutter-horizontal {
    /*background-image: url('grips/vertical.png');*/
    cursor: ew-resize;
  }

  .gl-designer-form .gutter.gutter-vertical {
    /*background-image: url('grips/horizontal.png');*/
    cursor: ns-resize;
  }

  .gl-designer-form .split.split-horizontal, .gutter.gutter-horizontal {
    height: 100%;
    float: left;
  }

  /*删除图标*/
  .gl-designer-form-row-remove, .gl-designer-form-field-remove {
    display: none;
    cursor: pointer;
    float: left;
    /*margin: 0px;*/
    /*padding: 1px;*/
  }

  tr:hover .gl-designer-form-row-remove {
    display: inline-block;
  }

  td:hover .gl-designer-form-field-remove {
    display: inline;
    float: right;
    /*!*margin-left: 20px;*!*/
    /*position: relative;*/
    /*left: 20px;*/
    /*top: -18px;*/
  }

  td.gl-designer-form-field:hover input {
    width: 75% !important;
    display: inline-block;
  }

</style>
