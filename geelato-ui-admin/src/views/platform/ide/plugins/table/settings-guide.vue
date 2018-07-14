<template>
  <div class="ui mini form">
    <div class="ui five top attached steps">
      <div class="step" :class="{active:step==='stepA'}" @click="step='stepA'">
        <i class="table icon"></i>
        <div class="content">
          <div class="title">绑定实体</div>
          <div class="description"></div>
        </div>
      </div>
      <div class="step" :class="{active:step==='stepB',disabled:!bindEntity}" @click="step='stepB'">
        <i class="search icon"></i>
        <div class="content">
          <div class="title">设置查询条件</div>
          <div class="description"></div>
        </div>
      </div>
      <div class="step" :class="{active:step==='stepC',disabled:!bindEntity}" @click="step='stepC'">
        <i class="columns icon"></i>
        <div class="content">
          <div class="title">设置展示列</div>
          <div class="description"></div>
        </div>
      </div>
      <div class="step" :class="{active:step==='stepD',disabled:!bindEntity}" @click="step='stepD'">
        <i class="crosshairs icon"></i>
        <div class="content">
          <div class="title">设置工具栏按钮</div>
          <div class="description"></div>
        </div>
      </div>
      <div class="step" :class="{active:step==='stepE',disabled:!bindEntity}" @click="step='stepE'">
        <i class="crosshairs icon"></i>
        <div class="content">
          <div class="title">设置行操作按钮</div>
          <div class="description"></div>
        </div>
      </div>
    </div>
    <div class="ui attached segment" v-show="step==='stepA'">
      <div class="ui icon info message segment">
        <i class="info mini icon"></i>
        <div class="">
          <template v-if="bindEntity">已绑定实体为<span style="font-weight: bold">{{bindEntity}}</span>
            <template v-if="selectedEntity&&selectedEntity!==bindEntity">，是否重新绑定为<span
              style="font-weight: bold">{{selectedEntity}}</span>，
              <div class="ui mini button" :class="$gl.ui.color.primary"
                   @click="$_bindEntity">
                重新绑定
              </div>
            </template>
          </template>
          <template v-else>未绑定实体
            <template v-if="selectedEntity">，是否绑定为<span style="font-weight: bold">{{selectedEntity}}</span>，
              <div class="ui mini button" :class="$gl.ui.color.primary"
                   @click="$_bindEntity">
                绑定
              </div>
            </template>
            <template v-else>
              ，请选择实体进行绑定。
            </template>
          </template>
        </div>
      </div>
      <meta-selector @select="$_selectMeta" :defaultEntity="selectedEntity"></meta-selector>
    </div>
    <!--查询条件-->
    <div class="ui attached segment" v-show="step==='stepB'">
      <div class="ui compact grid">
        <div class="eight wide column">
          <div class="ui borderless secondary menu gl-header">
            <div class="item" style="margin-right: -1em;padding-right: 0">
              从以下字段元数据列表中选择查询条件，通过点击<i class="plus icon" :class="$gl.ui.color.primary"></i>加入右侧。
            </div>
          </div>
          <div class="ui fitted divider"></div>
          <table class="ui compact  table">
            <tr>
              <th>序号</th>
              <th>列编码</th>
              <th>标题</th>
              <th>类型</th>
              <th>可空</th>
              <!--<th>最大长度</th>-->
              <!--<th>精度（precision）</th>-->
              <!--<th>小数位数（scale）</th>-->
              <th></th>
            </tr>
            <tr v-for="(item,index) in selectedMeta">
              <td>{{index+1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.title}}</td>
              <td>{{item.type}}</td>
              <td>{{item.nullable}}</td>
              <!--<td>{{item.charMaxLength}}</td>-->
              <!--<td>{{item.precision}}</td>-->
              <!--<td>{{item.scale}}</td>-->
              <td><i class="plus icon" :class="$gl.ui.color.primary" style="cursor: pointer" title="加入查询条件"
                     @click="$_addQueryMixItem(item,index)"></i></td>
            </tr>
          </table>
        </div>
        <div class="eight wide column">
          <div class="ui borderless secondary menu gl-header">
            <div class="item" style="margin-right: -1em;padding-right: 0">
              设置综合查询条件
            </div>
            <div class="ui right secondary mini menu">
              <div class="item">
                <!--<div class="ui mini button" :class="$gl.ui.color.primary"-->
                <!--@click="$_addQueryColumnItem({name: '无', title: '列', type: 'string', format: '',visible: true})">-->
                <!--添加虚拟列-->
                <!--</div>-->
              </div>
            </div>
          </div>
          <div class="ui fitted divider"></div>
          <table class="ui compact  table">
            <tr>
              <th>与或</th>
              <th>字段</th>
              <th>字段名</th>
              <th>比较符</th>
              <th>操作</th>
            </tr>
            <!--{field: 'loginName', title: '登录名', cop: 'contains', type: 'string', lop: 'or'},-->
            <tr v-for="(item,index) in ui.query.mix.fields">
              <td style="cursor: pointer"
                  @click="item.lop=(item.lop==='or'?'and':'or')">
                {{item.lop==='or'?'或':'且'}}
              </td>
              <td>{{item.field}}</td>
              <td style="margin: 0;padding: 1px"><input type="text" v-model="item.title"/></td>
              <td>
                <sui ref="copDropdown" type="dropdown">
                  <div class="ui dropdown">
                    <div class="text">{{dict.cop[item.cop]}}</div>
                    <i class="dropdown icon"></i>
                    <div class="menu">
                      <div v-for="(value,key) in dict.cop" class="item" :data-value="key" :data-text="value">{{value}}
                      </div>
                    </div>
                  </div>
                </sui>
              </td>
              <td><i class="remove red icon" style="cursor: pointer" title="删除"
                     @click="$_removeQueryMixItem(item,index)"></i>
                <i class="arrow up icon" style="cursor: pointer" title="向上"
                   @click="$_upQueryMixItem(item,index)" v-if="index!==0"></i>
                <i class="arrow down icon" style="cursor: pointer" title="向下"
                   @click="$_downQueryMixItem(item,index)" v-if="index!==ui.query.mix.fields.length-1"></i></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!--展示列-->
    <div class="ui attached segment" v-show="step==='stepC'">
      <div class="ui compact grid">
        <div class="seven wide column">
          <div class="ui borderless secondary menu gl-header">
            <div class="item" style="margin-right: -1em;padding-right: 0">
              从以下字段元数据列表中选择列表项，通过点击<i class="plus icon" :class="$gl.ui.color.primary"></i>加入右侧。
            </div>
          </div>
          <div class="ui fitted divider"></div>
          <table class="ui compact  table">
            <tr>
              <th>列编码</th>
              <th>标题</th>
              <th>类型</th>
              <!--<th>可空</th>-->
              <!--<th>最大长度</th>-->
              <!--<th>精度（precision）</th>-->
              <!--<th>小数位数（scale）</th>-->
              <th></th>
            </tr>
            <tr v-for="(item,index) in selectedMeta">
              <td>{{item.name}}</td>
              <td>{{item.title}}</td>
              <td>{{item.type}}</td>
              <!--<td>{{item.nullable}}</td>-->
              <!--<td>{{item.charMaxLength}}</td>-->
              <!--<td>{{item.precision}}</td>-->
              <!--<td>{{item.scale}}</td>-->
              <td><i class="plus icon" :class="$gl.ui.color.primary" style="cursor: pointer" title="加入"
                     @click="$_addQueryColumnItem(item,index)"></i></td>
            </tr>
          </table>
        </div>
        <div class="nine wide column">
          <div class="ui borderless secondary menu gl-header">
            <div class="item" style="margin-right: -1em;padding-right: 0">
              设置查询结果列
            </div>
            <div class="ui right secondary mini menu">
              <div class="item">
                <div class="ui mini button" :class="$gl.ui.color.primary"
                     @click="$_addQueryColumnItem({name: '无', title: '列', type: 'string', format: '',visible: true})">
                  添加虚拟列
                </div>
              </div>
            </div>
          </div>
          <div class="ui fitted divider"></div>
          <table class="ui compact celled table">
            <tr>
              <th>序号</th>
              <th>列编码</th>
              <th>列名</th>
              <th>值表达式</th>
              <th>操作</th>
            </tr>
            <!--{field: 'loginName', title: '登录名', cop: 'contains', type: 'string', lop: 'or'},-->
            <template v-for="(item,index) in ui.table.columns">
              <tr :key="item.field">
                <td style="cursor: pointer"
                    @click="openedStatus.resultTableIndex=openedStatus.resultTableIndex===index?-1:index">{{index+1}}
                </td>
                <!--click控制明细行是否展示-->
                <td style="cursor: pointer"
                    @click="openedStatus.resultTableIndex=openedStatus.resultTableIndex===index?-1:index">
                  {{item.field}}
                </td>
                <td style="margin: 0;padding: 1px"><input type="text" v-model="item.title"/></td>
                <td style="margin: 0;padding: 1px"><input type="text" v-model="item.format" placeholder="默认为当前字段值"/>
                </td>
                <td><i class="remove red icon" style="cursor: pointer" title="删除"
                       @click="$_removeQueryColumnItem(item,index)"></i>
                  <i class="arrow up icon" style="cursor: pointer" title="向上"
                     @click="$_upQueryColumnItem(item,index)" v-if="index!==0"></i>
                  <i class="arrow down icon" style="cursor: pointer" title="向下"
                     @click="$_downQueryColumnItem(item,index)" v-if="index!==ui.table.columns.length-1"></i></td>
              </tr>
              <tr v-if="openedStatus.resultTableIndex===index">
                <td colspan="5">
                  <table class="ui mini table gl-compact gl-col-24 gl-form">
                    <tr>
                      <td>列宽</td>
                      <td><input type="text" placeholder="5em、50px" v-model="item.width"/></td>
                      <td>对齐</td>
                      <td>
                        <checkbox :opts="{
                            name: 'align_checkbox',
                            type: 'radio',
                            data: [{text: '左', value: 'left'}, {text: '中', value: 'middle'},{text:'右',value:'right'}]
                          }" v-model="item['text-align']"></checkbox>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div>
    <!--工具操作栏-->
    <div class="ui attached segment" v-show="step==='stepD'">
      <div class="ui compact grid">
        <div class="five wide column">
          <div class="ui borderless secondary menu gl-header">
            <div class="item" style="margin-right: -1em;padding-right: 0">
              从以下常规操作列表中选择，通过点击<i class="plus icon" :class="$gl.ui.color.primary"></i>加入右侧。
            </div>
          </div>
          <div class="ui fitted divider"></div>
          <table class="ui compact  table">
            <tr>
              <th>标题</th>
              <th>点击事件</th>
              <!--<th title="confirm">确认信息</th>-->
              <!--<th title="hidden">隐藏条件</th>-->
              <!--<th>参数</th>-->
              <th></th>
            </tr>
            <tr v-for="(item,index) in baseToolbarActions">
              <td>{{item.title}}</td>
              <td>{{item.click}}</td>
              <!--<td>{{item.confirm}}</td>-->
              <!--<td>{{item.hidden}}</td>-->
              <!--<td></td>-->
              <td><i class="plus icon" :class="$gl.ui.color.primary" style="cursor: pointer" title="加入"
                     @click="$_addToolbarActionItem(item,index)"></i></td>
            </tr>
          </table>
        </div>
        <div class="eleven wide column">
          <div class="ui borderless secondary menu gl-header">
            <div class="item" style="margin-right: -1em;padding-right: 0">
              工具栏
            </div>
            <div class="ui right secondary mini menu">
              <div class="item">
              </div>
            </div>
          </div>
          <div class="ui fitted divider"></div>
          <table class="ui compact table">
            <tr>
              <th>标题</th>
              <th>点击事件</th>
              <th title="confirm">确认信息</th>
              <th title="hidden">隐藏条件</th>
              <th style="width: 4em">颜色</th>
              <th>排序</th>
            </tr>
            <template v-for="(item,index) in  ui.toolbar.dropdown.actions">
              <tr :key="item.field">
                <td style="margin: 0;padding: 1px"><input type="text" v-model="item.title"/></td>
                <td style="margin: 0;padding: 1px"><input type="text" v-model="item.click"/></td>
                <td style="margin: 0;padding: 1px"><input type="text" v-model="item.confirm" placeholder="确定？"/></td>
                <td style="margin: 0;padding: 1px"><input type="text" v-model="item.hidden" placeholder="js:@.xx===yy"/>
                </td>
                <td style="margin: 0;padding: 1px;text-align: center">
                  <sui type="dropdown" selector=".ui.dropdown" v-model="item.color">
                    <select name="color" class="ui compact dropdown" id="select">
                      <!--<option :value="item.color"><div class="ui empty circular label" :class="$gl.ui.color[item.color]"></div></option>-->
                      <option v-for="(value,key) in baseColors" :value="key" :selected="item.color===key">
                        <div class="ui empty circular label" :class="value"></div>
                      </option>
                    </select>

                    <!--<div class="ui dropdown">-->
                    <!--<div class="default text">-->
                    <!--<div class="ui empty circular label" :class="$gl.ui.color[item.color]"></div>-->
                    <!--</div>-->
                    <!--<i class="dropdown icon"></i>-->
                    <!--<div class="menu">-->
                    <!--<div class="scrolling menu">-->
                    <!--<div v-for="(value,key) in baseColors" class="item" :data-value="key">-->
                    <!--<div class="ui empty circular label" :class="value"></div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--<div class="ui dropdown">-->
                    <!--<input type="hidden" name="gender" />-->
                    <!--<span class="text">-->
                    <!--<div class="ui empty circular label" :class="$gl.ui.color[item.color]"></div>-->
                    <!--</span>-->
                    <!--<i class="dropdown icon"></i>-->
                    <!--<div class="menu">-->
                    <!--<div class="scrolling menu">-->
                    <!--<div v-for="(value,key) in baseColors" class="item" data-value="key">-->
                    <!--<div class="ui empty circular label" :class="value"></div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                  </sui>
                </td>
                <td>
                  <div class="ui icon mini buttons">
                    <button class="ui button" @click="$_removeToolbarActionItem(item,index)" title="删除"><i
                      class="remove red icon"></i></button>
                    <button class="ui button" @click="$_upToolbarActionItem(item,index)" v-if="index!==0" title="向上"><i
                      class="arrow up icon" :class="$gl.ui.color.primary"></i></button>
                    <button class="ui button" @click="$_downToolbarActionItem(item,index)"
                            v-if="index!==ui.toolbar.dropdown.actions.length-1" title="向下"><i
                      class="arrow down icon" :class="$gl.ui.color.primary"></i></button>
                    <button class="ui button"
                            @click="openedStatus.toolbarTableIndex=openedStatus.toolbarTableIndex===index?-1:index"
                            title="参数"><i
                      class="expand icon" :class="$gl.ui.color.primary"></i></button>
                  </div>
                  <!--<i class="remove red icon" style="cursor: pointer" title="删除"-->
                  <!--@click="$_removeToolbarActionItem(item,index)"></i>-->
                  <!--<i class="arrow up icon" style="cursor: pointer" title="向上"-->
                  <!--@click="$_upToolbarActionItem(item,index)" v-if="index!==0"></i>-->
                  <!--<i class="arrow down icon" style="cursor: pointer" title="向下"-->
                  <!--@click="$_downToolbarActionItem(item,index)"-->
                  <!--v-if="index!==ui.toolbar.dropdown.actions.length-1"></i>-->
                </td>
              </tr>
              <tr v-if="openedStatus.toolbarTableIndex===index">
                <td colspan="8">
                  <div class="ui segment info message">
                    {{item.modal?'参数配置说明XXX':'该事件无需配置参数。'}}
                  </div>
                  <json-editor v-if="item.modal" v-model="item.modal.opts" :show-btns="false" mode="form"
                               @json-change=""></json-editor>
                  <!--<table class="ui mini table gl-compact gl-col-24 gl-form">-->
                  <!--<tr>-->
                  <!--<td>页面</td>-->
                  <!--<td><input type="text" placeholder="5em、50px" /></td>-->
                  <!--<td>对齐</td>-->
                  <!--<td>-->
                  <!--<checkbox :opts="{-->
                  <!--name: 'align_checkbox',-->
                  <!--type: 'radio',-->
                  <!--data: [{text: '左', value: 'left'}, {text: '中', value: 'middle'},{text:'右',value:'right'}]-->
                  <!--}" v-model="item['text-align']"></checkbox>-->
                  <!--</td>-->
                  <!--</tr>-->
                  <!--</table>-->
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div>
    <!--单行操作-->
    <div class="ui attached segment" v-show="step==='stepE'">
      <p>E</p>
    </div>
    <!--<div class="ui attached bottom buttons">-->
    <!--<div class="ui button">保存</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import MetaSelector from '../../../meta/meta-selector.vue'
  import Message from '../../../../../components/message/index'
  import config from '../../../../../common/config.js'
  import Checkbox from '../../../../../components/modules/checkbox.vue'
  import JsonEditor from 'vue-json-editor'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {entityOrQueryKey: '', editorStore: {}}
        },
        required: true
      }
    },
    data () {
      return {
        step: 'stepA',
        form: {
          entityOrQueryKey: this.opts.entityOrQueryKey
        },
        baseToolbarActions: [
          {title: '新增', click: 'modal', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '删除', click: 'delete', modal: '', confirm: '是否删除？', js: '', hidden: '', color: 'primary'},
          {title: 'js', click: 'js', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '导出xls', click: 'xls', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '导出word', click: 'word', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '导出pdf', click: 'pdf', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '打印', click: 'print', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '弹层', click: 'modal', modal: '', confirm: '', js: '', hidden: '', color: 'primary'}
        ],
        baseColumnActions: [
          {title: '详情', click: 'modal', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '删除', click: 'delete', modal: '', confirm: '是否删除？', js: '', hidden: '', color: 'primary'},
          {title: 'js', click: 'js', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '弹层', click: 'modal', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '导出xls', click: 'xls', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '导出word', click: 'word', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '导出pdf', click: 'pdf', modal: '', confirm: '', js: '', hidden: '', color: 'primary'},
          {title: '打印', click: 'print', modal: '', confirm: '', js: '', hidden: '', color: 'primary'}
        ],
        baseColors: config.color,
        openedStatus: {resultTableIndex: 1, toolbarTableIndex: 1},
        dict: {
          cop: {
            contains: '包含',
            eq: '等于',
            lt: '小于',
            lg: '大于',
            lte: '小于等于',
            lge: '大于等于',
            neq: '不等于'
          }
        },
        // 已绑定的实体
        bindEntity: '',
        // 选择的实体
        selectedEntity: '',
        selectedMeta: [],
        ui: {
          title: 'XX信息',
          entity: '',
          query: {
            // 是否隐藏整个查询区域
            show: true,
            // null或''表示不展示tree过滤区域
            tree: null,
            // null或''表示不展示常用过滤器区域
            filter: null,
            // null或''表示不展示综合查询区域
            mix: {
              fields: [
                // {field: 'name', title: '名称', cop: 'eq', type: 'string', lop: 'or'},
                // {field: 'loginName', title: '登录名', cop: 'contains', type: 'string', lop: 'or'},
                // {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                // {field: 'active', title: '激活', cop: 'eq', type: 'boolean', default: false},
                // {field: 'birthday', title: '生日', cop: 'gte', type: 'date', format: 'yyyy-mm-dd'},
                // {
                //   field: 'sex',
                //   title: '性别',
                //   cop: 'eq',
                //   type: 'select',
                //   default: 'male',
                //   options: [{key: '男', value: 'male'}, {key: '女', value: 'female'}]
                // }
              ]
            }
          },
          toolbar: {
            title: '',
            dropdown: {
              title: '',
              actions: [
                // {
                //   title: '创建',
                //   click: 'modal',
                //   modal: {
                //     title: '用户信息',
                //     type: 'href',
                //     value: '/components/page/table-form.vue',
                //     opts: {
                //       entityName: 'sys_user',
                //       fields: 'id,name,loginName,description',
                //       layout: [
                //         [{name: [4, 8]}, {loginName: [4, 8]}],
                //         [{description: [4, 20]}]
                //       ]
                //     }
                //   }
                // },
                // {title: '删除', click: 'delete', confirm: '确定删除？'}
                // // 弹出页面提示导出多少条记录
                // {title: '导出EXCEL', click: 'xls'},
                // // 弹出页面提示导出多少条记录
                // {title: '导出PDF', click: 'pdf'},
                // // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                // {title: '打印', click: 'print'}
              ]
            }
          },
          info: '',
          table: {
            select: {field: 'id', title: '', type: 'checkbox'},
            dropdown: {
              title: '操作',
              actions: [
                // {
                //   title: '修改',
                //   click: 'modal',
                //   modal: {
                //     title: '用户信息',
                //     type: 'href',
                //     value: '/components/page/table-form.vue',
                //     opts: {
                //       entityName: 'sys_user',
                //       fields: 'id,name,loginName,description',
                //       layout: [
                //         [{loginName: [4, 8]}, {name: [4, 8]}],
                //         [{description: [4, 20]}]
                //       ],
                //       model: {id: '@.id'}
                //     }
                //   }
                // }
                // {
                //   title: '详细',
                //   click: 'modal',
                //   modal: {
                //     type: 'page',
                //     value: 'sys_user_list_detail',
                //     opts: {}
                //   }
                // }
              ]
            },
            columns: [
              // {field: 'id', title: '', visible: false},
              // {field: 'name', title: '名称', type: 'string', format: ''},
              // {field: 'loginName', title: '登录名', type: 'string', format: ''},
              // {field: 'description', title: '描述', type: 'string', format: ''}
            ],
            p: '1,10'
            // order: 'name|+'
          },
          stat: ''
        }
      }
    },
    mounted: function () {
      if (this.opts.editorStore.editingPage.content.opts.ui) {
        this.ui = this.opts.editorStore.editingPage.content.opts.ui
        this.bindEntity = this.opts.editorStore.editingPage.content.opts.ui.entity
        this.selectedEntity = this.opts.editorStore.editingPage.content.opts.ui.entity
      }
    },
    methods: {
      $_addQuery (e) {
        console.log(e)
        // js阻止事件冒泡
        e.cancelBubble = true
        e.stopPropagation()

        // js阻止链接默认行为，没有停止冒泡
        // oEvent.preventDefault();
      },
      $_selectMeta (entity) {
        this.selectedEntity = entity.name
        this.selectedMeta = entity.meta
      },
      $_bindEntity () {
        this.bindEntity = this.selectedEntity
        this.ui.entity = this.selectedEntity
        this.step = 'stepB'
      },
      $_addQueryMixItem (item) {
        // {field: 'loginName', title: '登录名', cop: 'contains', type: 'string', lop: 'or'},
        this.ui.query.mix.fields.push({
          field: item.name,
          title: item.title,
          // String Long Date int
          cop: 'String'.indexOf(item.type) !== -1 ? 'contains' : 'equals',
          type: item.type,
          lop: 'and'
        })
      },
      $_removeQueryMixItem (item, index) {
        this.ui.query.mix.fields.splice(index, 1)
      },
      $_upQueryMixItem (item, index) {
        let field = this.ui.query.mix.fields[index - 1]
        this.ui.query.mix.fields.splice(index - 1, 1)
        this.ui.query.mix.fields.splice(index, 0, field)
      },
      $_downQueryMixItem (item, index) {
        let field = this.ui.query.mix.fields[index]
        this.ui.query.mix.fields.splice(index, 1)
        this.ui.query.mix.fields.splice(index + 1, 0, field)
      },
      $_addQueryColumnItem (item) {
        // {field: 'name', title: '名称', type: 'string', format: '',visible: true},,
        this.ui.table.columns.push({
          field: item.name,
          title: item.title,
          type: item.type,
          format: '',
          visible: true,
          width: '',
          'text-align': 'left'
        })
      },
      $_removeQueryColumnItem (item, index) {
        this.ui.table.columns.splice(index, 1)
      },
      $_upQueryColumnItem (item, index) {
        let field = this.ui.table.columns[index - 1]
        this.ui.table.columns.splice(index - 1, 1)
        this.ui.table.columns.splice(index, 0, field)
      },
      $_downQueryColumnItem (item, index) {
        let field = this.ui.table.columns[index]
        this.ui.table.columns.splice(index, 1)
        this.ui.table.columns.splice(index + 1, 0, field)
      },
      $_addToolbarActionItem (item) {
        this.ui.toolbar.dropdown.actions.push(item)
      },
      $_removeToolbarActionItem (item, index) {
        this.ui.toolbar.dropdown.actions.splice(index, 1)
      },
      $_upToolbarActionItem (item, index) {
        let field = this.ui.toolbar.dropdown.actions[index - 1]
        this.ui.toolbar.dropdown.actions.splice(index - 1, 1)
        this.ui.toolbar.dropdown.actions.splice(index, 0, field)
      },
      $_downToolbarActionItem (item, index) {
        let field = this.ui.toolbar.dropdown.actions[index]
        this.ui.toolbar.dropdown.actions.splice(index, 1)
        this.ui.toolbar.dropdown.actions.splice(index + 1, 0, field)
      }
      // $_convertCop (cop) {
      //   switch (cop) {
      //     case 'contains':
      //       return '包含'
      //     case 'eq':
      //       return '等于'
      //     case 'lt':
      //       return '小于'
      //     case 'lg':
      //       return '大于'
      //     case 'lte':
      //       return '小于等于'
      //     case 'lge':
      //       return '大于等于'
      //     case 'neq':
      //       return '不等于'
      //   }
      // },
      // $_save () {
      //   this.opts.editorStore.editingPage.content.opts.ui = this.ui
      // }
    },
    components: {MetaSelector, Message, Checkbox, JsonEditor}
  }
</script>
<style>
</style>

