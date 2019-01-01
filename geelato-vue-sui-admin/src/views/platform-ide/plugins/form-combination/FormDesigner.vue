<!--
  表单配置页面
-->
<template style="overflow-y: hidden">
  <div class="gl-designer-form">
    <div class="split split-horizontal toolbar">
      <sui type="tab" selector=".ui.menu>.item" ref="toolbarTabs">
        <div class="ui pointing secondary menu" style="margin: 0.1rem 0px;">
          <a class="item active" data-tab="tab-field-selector">字段</a>
          <a class="item" data-tab="tab-layout-selector">布局</a>
          <!--<a class="item right floated"-->
          <!--style="padding-right: 0px;padding-left: 0px; background-color: rgb(238, 238, 238);"><i-->
          <!--class="caret left icon"></i></a>-->
        </div>
        <div class="ui tab active" data-tab="tab-field-selector" :style="heightStyle" style="padding-top: 0.5em">
          <div class="ui middle aligned selection list">
            <draggable @start="drag=true" @end="drag=false"
                       :options="{group:{name:'field', pull:'clone', put:false },sort:false}">
              <div class="item toolbar-item" v-for="control in toolbar.controls" :data-control="control.value">
                <i class="icon" :class="control.icon"></i>
                <div class="content">
                  {{control.text}}
                </div>
              </div>
            </draggable>
          </div>
          <!--<h5 class="ui dividing header">-->
          <!--基础字段-->
          <!--</h5>-->
          <!--<div class="ui middle aligned selection list">-->
          <!--<draggable @start="drag=true" @end="drag=false"-->
          <!--:options="{group:{name:'field', pull:'clone', put:false },sort:false}">-->
          <!--<div class="item toolbar-item" v-for="control in toolbar.controls" :data-control="control.value">-->
          <!--<i class="icon" :class="control.icon"></i>-->
          <!--<div class="content">-->
          <!--{{control.text}}-->
          <!--</div>-->
          <!--</div>-->
          <!--</draggable>-->
          <!--</div>-->
          <!--<h5 class="ui dividing header" style="clear: both">-->
          <!--页面布局(24列布局)-->
          <!--</h5>-->
          <!--<div class="ui middle aligned selection list">-->
          <!--<draggable v-model="toolbar.layout" element="table" @start="drag=true" @end="drag=false"-->
          <!--:options="{group:{name:'layout', pull:'clone', put:false },sort:false}">-->
          <!--<tr>-->
          <!--<td colspan="24">-->
          <!--<div class="item toolbar-item">-->
          <!--<i class="heading icon"></i>-->
          <!--<div class="content">分组标题</div>-->
          <!--</div>-->
          <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td colspan="24">-->
          <!--<div class="item toolbar-item">-->
          <!--<i class="th icon"></i>-->
          <!--<div class="content">一行一列 4-8</div>-->
          <!--</div>-->
          <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td colspan="24">-->
          <!--<div class="item toolbar-item">-->
          <!--<i class="th icon"></i>-->
          <!--<div class="content">一行一列 4-20</div>-->
          <!--</div>-->
          <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td colspan="24">-->
          <!--<div class="item toolbar-item">-->
          <!--<i class="th icon"></i>-->
          <!--<div class="content">一行二列 4-8-4-8</div>-->
          <!--</div>-->
          <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td colspan="24">-->
          <!--<div class="item toolbar-item">-->
          <!--<i class="th icon"></i>-->
          <!--<div class="content">一行三列 3-5-3-5-3-5</div>-->
          <!--</div>-->
          <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td colspan="24">-->
          <!--<div class="item toolbar-item">-->
          <!--<i class="th icon"></i>-->
          <!--<div class="content">一行四列 2-4-2-4-2-4</div>-->
          <!--</div>-->
          <!--</td>-->
          <!--</tr>-->
          <!--</draggable>-->
          <!--</div>-->
        </div>
        <div class="ui tab" data-tab="tab-layout-selector" :style="heightStyle" style="padding-top: 0.5em">
          <div class="ui middle aligned selection list">
            <draggable v-model="toolbar.layout" element="table" @start="drag=true" @end="drag=false"
                       :options="{group:{name:'layout', pull:'clone', put:false },sort:false}">
              <tr>
                <td colspan="24">
                  <div class="item toolbar-item">
                    <i class="heading icon"></i>
                    <div class="content">分组标题</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="24">
                  <div class="item toolbar-item">
                    <i class="th icon"></i>
                    <div class="content">一行一列 4-8</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="24">
                  <div class="item toolbar-item">
                    <i class="th icon"></i>
                    <div class="content">一行一列 4-20</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="24">
                  <div class="item toolbar-item">
                    <i class="th icon"></i>
                    <div class="content">一行二列 4-8-4-8</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="24">
                  <div class="item toolbar-item">
                    <i class="th icon"></i>
                    <div class="content">一行三列 3-5-3-5-3-5</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="24">
                  <div class="item toolbar-item">
                    <i class="th icon"></i>
                    <div class="content">一行四列 2-4-2-4-2-4</div>
                  </div>
                </td>
              </tr>
            </draggable>
          </div>
        </div>
      </sui>
    </div>
    <div class="split split-horizontal stage">
      <sui type="tab" selector=".ui.menu>.item">
        <div class="ui pointing secondary menu" style="margin: 0.1rem 0px;">
          <!--<a class="item" style="padding-right: 0px;padding-left: 0px; background-color: rgb(238, 238, 238);"><i-->
          <!--class="caret right icon"></i></a>-->
          <a class="item active" data-tab="tab-designer"><i class="edit icon"></i>设计</a>
          <a class="item" data-tab="tab-preview"><i class="eye icon"></i>预览</a>
          <a class="item" data-tab="tab-json"><i class="code icon"></i>JSON配置</a>
          <!--<a class="item float right"-->
          <!--style="padding-right: 0px;padding-left: 0px; background-color: rgb(238, 238, 238);"><i-->
          <!--class="caret left icon"></i></a>-->
        </div>
        <div class="ui tab active" data-tab="tab-designer" :style="heightStyle">
          <div class="ui small compact form">
            <draggable v-model="layout.data" element="table" class="gl-form gl-col-24"
                       :options="{group:{name:'layout'},chosenClass:'active'}"
                       @start="drag=true"
                       @add="$_addRow" @change="$_updateLayout" @choose="$_onChooseRow">
              <tr v-for="(row,rowIndex) in layout.data">
                <!--行数据为分组标题-->
                <template v-if="$_isGroupRow(row)">
                  <td colspan="24" class="gl-form-group-title" :style="row[0].$style"
                      @mouseover.self="$_onRowOver($event,rowIndex)"
                      @mouseout.self="$_onRowOut($event,rowIndex)">
                    <span class="gl-designer-form-row-remove" title="删除当前行"
                          @click="$_removeRow(rowIndex)">
                      <i class="bordered inverted red remove small icon"></i>
                    </span>
                    <div v-html="row[0].$title||'&nbsp;'"></div>
                  </td>
                </template>
                <!--行数据非分组标题-->
                <template v-else>
                  <template v-for="(cell,cellIndex) in row"
                            v-if="property=$_getProperty(Object.keys(cell)[0])">
                    <td :colspan="Object.values(cell)[0][0]" :rowspan="Object.values(cell)[0][2]" class="title"
                        @mouseover.self="$_onRowOver($event,rowIndex)"
                        @mouseout.self="$_onRowOut($event,rowIndex)">
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
                      <draggable :options="{group:{name:'field'},chosenClass:'active',sort:false}"
                                 @start="$_onStartDragField($event,rowIndex,cellIndex,$_getProperty(Object.keys(cell)[0]).field)"
                                 @end="drag=false"
                                 @add="$_addField($event,rowIndex,cellIndex,$_getProperty(Object.keys(cell)[0]).field)"
                                 @choose="$_onChooseField($event,rowIndex,cellIndex,Object.keys(cell)[0])"
                                 @clone="$_onCloneField($event,rowIndex,cellIndex,$_getProperty(Object.keys(cell)[0]).field)">
                        <template v-if="property.control==='input'">
                          <input type="text" :placeholder="property.placeholder" :name="Object.keys(cell)[0]" readonly>
                          <!--:readonly="property.readonly===true" :disabled="property.disabled===true"-->
                        </template>
                        <template v-else-if="property.control==='date'">
                          <div class="ui right icon input">
                            <input type="text" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                   readonly>
                            <i class="calendar alternate outline icon"></i>
                          </div>
                        </template>
                        <template v-else-if="property.control==='time'">
                          <div class="ui right icon input">
                            <input type="text" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                   readonly>
                            <i class="clock alternate outline icon"></i>
                          </div>                        </template>
                        <template v-else-if="property.control==='textarea'">
                          <textarea rows="5" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                    readonly></textarea>
                        </template>
                        <template v-else-if="property.control==='checkbox'">
                          <sui-checkbox :name="Object.keys(cell)[0]" readonly></sui-checkbox>
                          {{property.placeholder}}
                        </template>
                        <template v-else-if=" property.control==='dropdown'">
                          <sui-dropdown selection :options="template.options" :name="Object.keys(cell)[0]"
                                        readonly></sui-dropdown>
                        </template>
                        <template v-else-if=" property.control==='rating'">
                          <sui-rating :rating="3" :max-rating="5" readonly/>
                        </template>
                        <template v-else-if="property.control==='email'">
                          <input type="email" :placeholder="property.placeholder" :name="Object.keys(cell)[0]" readonly>
                        </template>
                        <template v-else-if="property.control==='password'">
                          <input type="password" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                 readonly>
                        </template>
                        <!--<template v-else>-->
                        <!--<input type="text" :placeholder="property.placeholder" :name="Object.keys(cell)[0]" readonly>-->
                        <!--</template>-->
                        <span class="gl-designer-form-field-remove" title="清空字段"
                              @click="$_removeField($event,rowIndex,cellIndex,Object.keys(cell)[0])">
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
          <!--<div style="position: relative;z-index: 10000" :style="hoverToolbarStyle">-->
          <!--<span v-if="hoverRowIndex>=0" title="删除当前行"-->
          <!--@click="$_removeRow(hoverRowIndex)">-->
          <!--<i class="bordered inverted red remove small icon"></i>-->
          <!--</span>-->
          <!--</div>-->
        </div>
        <div class="ui tab" data-tab="tab-preview" :style="heightStyle">
          <gl-form-base :opts="{ui:config}">
          </gl-form-base>
        </div>
        <div class="ui tab" data-tab="tab-json" style="overflow-y: hidden;padding-top: 0.3em">
          <json-code-mirror ref="jsonCM" :text="configText"
                            :editorMainHeight="heightStyle['max-height']"></json-code-mirror>
        </div>
      </sui>
    </div>
    <div class="split split-horizontal settings">
      <sui type="tab" selector=".ui.menu>.item" ref="settingsTabs">
        <div class="ui pointing secondary menu" style="margin: 0.1rem 0px;">
          <!--<a class="item"-->
          <!--style="padding-right: 0px;padding-left: 0px; background-color: rgb(238, 238, 238);"><i-->
          <!--class="caret right icon"></i></a>-->
          <a class="item active" data-tab="tab-form">表单</a>
          <a class="item" data-tab="tab-field">字段</a>
          <a class="item" data-tab="tab-cell">单元格</a>
          <a class="item" data-tab="tab-group">分组标题</a>
        </div>
        <div class="ui tab active" data-tab="tab-form" :style="heightStyle" style="padding-top: 0.5em">
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
        <div class="ui tab" data-tab="tab-field" :style="heightStyle" style="padding-top: 0.5em">
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
                <input type="text" placeholder="code" v-model="currentPropertyName" readonly>
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
                <!--<label><a @click="alert('a')">数据源(ds)</a>  <a>数据(data)</a></label>-->
                <!--<div class="ui mini buttons">-->
                <!--<button class="ui button active">数据源(ds)</button>-->
                <!--<button class="ui button">数据(data)</button>-->
                <!--</div>-->
                <div class="ui text menu">
                  <div class="header item">选择数据来源：</div>
                  <a class="item" :class="{active:currentDataSrouce==='ds'}" @click="currentDataSrouce='ds'">
                    数据源(ds)
                  </a>
                  <a class="item" :class="{active:currentDataSrouce==='data'}" @click="currentDataSrouce='data'">
                    数据(data)
                  </a>
                </div>
                <input v-show="currentDataSrouce==='ds'" type="text" placeholder=""
                       v-model="properties[currentPropertyName].ds">
                <textarea v-show="currentDataSrouce==='data'" rows="4"
                          v-model="properties[currentPropertyName].data"></textarea>
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
        <div class="ui tab" data-tab="tab-cell" :style="heightStyle" style="padding-top: 0.5em">
        </div>
        <div class="ui tab" data-tab="tab-group" :style="heightStyle" style="padding-top: 0.5em">
          <template v-if="currentGroup">
            <!--<h5 class="ui dividing header">-->
            <!--<i class="affiliatetheme icon"></i>-->
            <!--标题-->
            <!--</h5>-->
            <div class="ui mini form gl-form gl-content-wrapper">
              <div class="field">
                <label>标题</label>
                <input type="text" v-model="layout.data[currentGroup.rowIndex][0].$title">
              </div>
              <div class="field">
                <label>样式</label>
                <textarea v-model="layout.data[currentGroup.rowIndex][0].$style"></textarea>
                <div class="ui list">
                  <div class="item" v-for="item in template.style.groupTitle">
                    <a class="header" @click="layout.data[currentGroup.rowIndex][0].$style+=(';\r\n'+item.style)">{{item.style}}</a>
                    &nbsp;&nbsp;&nbsp;{{item.description}}
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <gl-message class="warning segment" :closable="false">请先点击选取分组标题行</gl-message>
          </template>
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
  import styleTemplate from './style.js'

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
        defaultEntity: this.opts.form.defaultEntity,
        properties: this.opts.form.properties,
        layout: this.opts.form.layout,
        ds: this.opts.form.ds,
        vars: this.opts.form.vars,
        // **************以下编辑器配置**************
        template: {
          property: {
            control: 'input',
            title: '',
            // 是否禁用
            disabled: false,
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
          },
          options: [],
          style: styleTemplate
        },
        toolbar: {
          layout: [
            [{'': [24], $title: '分组标题', $style: "background-color:#FFF"}],
            [{'': [4, 8]}],
            [{'': [4, 20]}],
            [{'': [4, 8]}, {'': [4, 8]}],
            [{'': [3, 5]}, {'': [3, 5]}, {'': [3, 5]}],
            [{'': [2, 4]}, {'': [2, 4]}, {'': [2, 4]}, {'': [2, 4]}]
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
          ]
        },
        heightStyle: {
          'max-height': this.$parent.isModal ? 'calc(100vh - 15em)' : 'calc(100vh - 7em)',
          'min-height': this.$parent.isModal ? 'calc(100vh - 20em)' : 'calc(100vh - 7em)',
          'overflow-y': 'auto'
        },
        // **************以下编辑状态**************
        // 当前编辑的字段属性
        currentPropertyName: '',
        // 当前编辑的组信息
        currentGroup: '',
        hoverRowIndex: -1,
        hoverToolbarStyle: {
          top: '0px',
          left: '0px'
        },
        // 字段当前的数类型 ds or data
        currentDataSrouce: 'ds'
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
      console.log('opts>', this.opts)
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
      $_addRow(evt) {
        if (this.$_isGroupRow(this.layout.data[evt.newIndex])) {
          this.$_editGroup(evt.newIndex)
        } else {
          this.currentGroup = ''
        }
        console.log('$_addRow>', evt, this.layout.data[evt.newIndex], evt.newIndex)
      },
      $_removeRow(rowIndex) {
        this.layout.data.splice(rowIndex, 1)
        console.log('$_removeRow>', this.layout.data)
      },
      $_onRowOver(evt, rowIndex) {
        this.hoverRowIndex = rowIndex
        console.log('$_onRowOver', evt, rowIndex)
      },
      $_onRowOut(evt, rowIndex) {
        this.hoverRowIndex = -1
        console.log('$_onRowOut', evt, rowIndex)
      },
      /**
       * 是否分组标题行
       * @param row
       * @returns {boolean}
       */
      $_isGroupRow(row) {
        // row data e.g.: [{'': [24],  $title: '',$style:''}]
        return row.length === 1 && row[0].$title !== undefined
      },
      $_onChooseRow(evt) {
        let row = this.layout.data[evt.oldIndex]
        if (this.$_isGroupRow(row)) {
          this.$_editGroup(evt.oldIndex)
        } else {
          this.currentGroup = ''
        }
      },
      $_editGroup(rowIndex) {
        this.currentGroup = {rowIndex: rowIndex, row: this.layout.data[rowIndex]}
        this.$_selectSettingTab('tab-group')
      },
      $_addField(evt, rowIndex, cellIndex, propertyName) {
        // if (evt.oldIndex > 0) {
        //   return false
        // }
        let cell = this.layout.data[rowIndex][cellIndex]
        // this.layout.data[rowIndex][cellIndex][propertyName] =
        if (propertyName === undefined) {
          this.currentPropertyName = 'p_' + this.$gl.utils.uuid(8)
          this.$set(this.properties, this.currentPropertyName, JSON.parse(JSON.stringify(this.template.property)))
          this.$set(this.properties[this.currentPropertyName], 'entity', this.defaultEntity)
          this.$set(this.properties[this.currentPropertyName], 'control', evt.item.dataset.control)
          // this.properties[this.currentPropertyName] = JSON.parse(JSON.stringify(this.template.property))
          // this.properties[this.currentPropertyName].entity = this.defaultEntity
          this.layout.data[rowIndex][cellIndex] = {}
          this.layout.data[rowIndex][cellIndex][this.currentPropertyName] = cell[""]
        } else {
          this.currentPropertyName = propertyName
        }
        evt.item.parentElement.removeChild(evt.item)
        console.log('addField', evt, this.layout.data)
        this.$_selectSettingTab('tab-field')
      },
      $_onChooseField(evt, rowIndex, cellIndex, propertyName) {
        // propertyName 对于新添加的字段，propertyName对应的field为空，即这里propertyName为空
        let cell = this.layout.data[rowIndex][cellIndex]
        console.log('$_onChooseField', evt, rowIndex, cellIndex, propertyName, this.layout.data, this.properties)
        this.currentPropertyName = propertyName
        this.$_selectSettingTab('tab-field')
      },
      $_removeField(evt, rowIndex, cellIndex, propertyName) {
        console.log('$_removeField>', evt, rowIndex, cellIndex, this.layout.data[rowIndex][cellIndex], propertyName)
        if (propertyName === undefined || '') {
          return
        } else {
          // 清除选中状态
          if (this.currentPropertyName === propertyName) {
            this.currentPropertyName = ''
          }
          // 删除属性
          delete this.properties[propertyName]
          // 清除布局内容
          let cell = this.layout.data[rowIndex][cellIndex]
          this.layout.data[rowIndex][cellIndex] = {}
          this.layout.data[rowIndex][cellIndex][''] = cell[propertyName]
        }
        this.$forceUpdate()
      },
      $_updateLayout(evt) {
        this.$forceUpdate()
      },
      $_onStartDragField(evt, rowIndex, cellIndex, propertyName) {
        console.log('$_onStartDragField', evt, rowIndex, cellIndex, propertyName)
        return false
      },
      $_onCloneField(evt, rowIndex, cellIndex, propertyName) {
        let origEl = evt.item;
        let cloneEl = evt.clone;
        console.log('$_onCloneField', evt, rowIndex, cellIndex, propertyName, origEl, cloneEl)
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

  /*.gl-designer-form .toolbar, .gl-designer-form .stage, .gl-designer-form .settings {*/
  /*border: solid 1px rgba(0, 0, 0, .25);*/
  /*}*/

  .gl-designer-form .toolbar {
    min-width: 16em;
  }

  .gl-designer-form .ui.tab {
    overflow-x: hidden;
  }

  .gl-designer-form .toolbar .ui.tab .item {
    margin: 0.125em 0.125em;
    float: left;
    width: 7.5em;
    cursor: move;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;
    color: rgba(0, 0, 0, 1);
    border-radius: 0
  }

  .gl-designer-form .toolbar .ui.tab table tr td .item {
    width: 15em !important;
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

  .gl-designer-form .stage table {
    table-layout: fixed;
  }

  .gl-designer-form .stage table > tr.sortable-chosen > td {
    background-color: #fffde6;
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

  td.gl-designer-form-field:hover input, td.gl-designer-form-field:hover textarea {
    width: 75% !important;
    display: inline-block;
    cursor: pointer;
  }

</style>
