<template>
  <div class="ui grid">
    <!--查询条件-->
    <div v-if="opts.ui.query.show" class="four wide column gl-table-query" :style="{display:(isMax?'none':'')}">
      <div v-if="opts.ui.query.tree">
        <div class="ui borderless secondary menu gl-header">
          <div class="item">{{opts.ui.query.tree.title}}
          </div>
          <div class="ui right secondary mini menu">
            <div class="item">
              <!--<button class="ui primary basic button">查询</button>&nbsp;-->
              <!--<button class="ui primary basic button">重置</button>-->
            </div>
          </div>
        </div>
        <div class="ui fitted divider"></div>
        <table-tree :opts="opts.ui.query.tree" @click="$_clickTreeNode"></table-tree>
      </div>
      <div v-if="opts.ui.query.filter">
        <div class="ui borderless secondary menu gl-header">
          <div class="item">查询过滤
          </div>
          <div class="ui right secondary mini menu">
            <div class="item">
              <button class="ui mini basic button" :class="$GL.ui.color.primary">查询</button>&nbsp;
              <button class="ui mini basic button" :class="$GL.ui.color.primary">重置</button>
            </div>
          </div>
        </div>
        <div class="ui fitted divider"></div>
        <div class="ui filter">
          xxx
        </div>
      </div>
      <div v-if="opts.ui.query.mix">
        <div class="ui borderless secondary menu gl-header">
          <div class="item" style="font-weight: bold">查询过滤
          </div>
          <!-- 当查询条件多于8个时，才会在上方展示查询、重置按钮，这样页面简洁点，在内容较多，不便拖动时才在上方展示-->
          <div class="ui right secondary mini menu" v-if="opts.ui.query.mix.fields&&opts.ui.query.mix.fields.length>8">
            <div class="item">
              <button class="ui mini basic button" :class="$GL.ui.color.primary" @click="$_submit">查询</button>&nbsp;
              <button class="ui mini basic button" :class="$GL.ui.color.primary" @click="reset">重置</button>
            </div>
          </div>
        </div>
        <div class="ui fitted divider" style="margin-bottom: 0.5em"></div>
        <table-query ref="queryForm" :opts="opts.ui.query.mix" v-model="mixQuery"
                     @input="formQueryCallback"></table-query>
      </div>
    </div>
    <!--查询列表-->
    <div :class="{ 'sixteen wide':isMax, 'twelve wide':!isMax }" class="column gl-table-main">
      <!--工具条-->
      <div class="ui borderless secondary menu gl-header">
        <a class="item gl-page-sidebar-toggle" @click="toggleSidebar">
          <i class="sidebar icon"></i>
        </a>
        <div class="item gl-title" style="font-weight: bold">{{opts.ui.title}}
        </div>
        <div class="ui right secondary  borderless mini menu">
          <div v-if="opts.ui.toolbar.dropdown" class="item">
            <!--<button class="ui mini button">新增</button>&nbsp;-->
            <!--<button class="ui mini button">删除</button>&nbsp;-->
            <!--<button class="ui mini button">导出</button>-->
            <template v-for="(item, index) in opts.ui.toolbar.dropdown.actions">
              <button class="ui mini button" :class="item.click==='delete'?$GL.ui.color.negative:$GL.ui.color.primary"
                      @click="$_click(item,$event)">
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
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui info message" v-if="showTips&&opts.ui.tips&&opts.ui.tips.display==='header'">
        <i class="close icon" @click="showTips=false"></i>
        <div v-html="opts.ui.tips.html"></div>
      </div>
      <!--结果列表-->
      <table class="ui selectable compact table gl-compact">
        <thead>
        <tr>
          <th style="width: 1em">
            <div class="ui master checkbox" v-if="opts.ui.mode!=='select'">
              <input type="checkbox">
              <label></label>
            </div>
          </th>
          <th style="width:5em">操作</th>
          <th v-for="(item, index) in opts.ui.table.columns" v-if="item.visible!==false">
            {{item.title}}
          </th>
        </tr>
        </thead>
        <tbody v-if="queryResult.data&&queryResult.data.length>0">
        <tr v-for="(rowItem,rowIndex) in queryResult.data">
          <td>
            <div class="ui child checkbox"
                 v-if="opts.ui.mode!=='select'">
              <input type="checkbox" :data-rowId="rowItem[opts.ui.table.select.field]">
              <label></label>
            </div>
            <div v-if="opts.ui.mode==='select'">
              <div class="ui mini buttons" :class="$GL.ui.color.primary">
                <div class="ui button" @click="$_selectRow(rowItem)">选择</div>
              </div>
            </div>
          </td>
          <td>
            <div class="ui mini buttons" :class="$GL.ui.color.primary">
              <div class="ui button"
                   v-if="opts.ui.table.dropdown.actions.length===1?item=opts.ui.table.dropdown.actions[0]:''"
                   @click="$_click(item,$event,rowItem)">{{item.title}}
              </div>
              <!--<div class="ui button" style="padding-left: 0.9em;padding-right: 0.5em"></div>-->
              <div class="ui floating dropdown icon button" v-else-if="opts.ui.table.dropdown.actions.length>1">
                <i class="dropdown icon"></i>
                <div class="menu">
                  <template v-for="(item, index) in opts.ui.table.dropdown.actions">
                    <div class="item" @click="$_click(item,$event,rowItem)"
                         v-if="$_eval(item.visible,rowItem)!==true">
                      {{item.title}}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </td>
          <td v-for="(item, index) in opts.ui.table.columns" v-if="item.visible!==false">
            {{rowItem[item.field]}}
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td class="warning" :colspan="opts.ui.table.columns.length+1" style="text-align: center;height: 2.6em">没有记录
          </td>
        </tr>
        </tbody>
      </table>
      <div class="gl-table-info"></div>
      <div class="gl-table-stat"></div>
    </div>
  </div>
</template>
<script>
  import utils from '../../common/utils'
  import TableQuery from './table-query.vue'
  import TableTree from './table-tree.vue'

  export default {
    props: {
      opts: {
        type: Object,
        required: true
      },
      query: {
        type: Object
      }
    },
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        // 关闭tips
        showTips: true,
        // 查询的结果数据
        queryResult: {},
        // 通过formQueryMethodInfo的变化，来驱动调用query组件的相应方法
        formQueryMethodInfo: {method: '', args: ''},
        mixQuery: {},
        columns: [],
        visibleColumns: [],
        selectedRows: [],
        checkedIds: [],
        currentTreeNode: {id: ''},
        lastGql: {}
      }
    },
    mounted () {
      this.loadData()
//      console.log('this.opts', this.opts)
//      $(this.$el).find('.ui.cards')()
//      $(this.$el).find('.ui.checkbox').checkbox()
    },
    updated () {
      $(this.$el).find('.ui.dropdown').dropdown()
      this.$_initCheckbox()
    },
    methods: {
      loadData () {
        let thisVue = this
        this.$GL.data.queryByGql(genGql(this.lastMixQueryData)).then(function (data) {
          thisVue.queryResult = data
        })

        // 构建列表查询gql
        function genGql (queryData) {
          let root = {}
          if (queryData) {
            for (let i in queryData) {
              root[i] = queryData[i]
            }
          }
          let fsAry = []
          for (let i in thisVue.opts.ui.table.columns) {
            let col = thisVue.opts.ui.table.columns[i]
            fsAry.push(col.field)
          }
          root['@fs'] = fsAry.join(',')
          root['@order'] = thisVue.opts.ui.table.order
          root['@p'] = thisVue.opts.ui.table.p
          let gql = {}
          gql[thisVue.opts.ui.entity] = root
          console.log('创建的gql > ', gql)
          return gql
        }
      },
      saveData () {
      },
      toggleSidebar () {
        this.isMax = !this.isMax
      },
      $_initCheckbox () {
        let thisVue = this
        var $masterCheckbox = $(thisVue.$el).find('.ui.table .master.checkbox')
        var $childCheckbox = $(thisVue.$el).find('.ui.table .child.checkbox')
        $masterCheckbox.checkbox({
          onChecked: function () {
            $childCheckbox.checkbox('check')
          },
          onUnchecked: function () {
            $childCheckbox.checkbox('uncheck')
          }
        })

        $childCheckbox.checkbox({
          onChange: function () {
            let allChecked = true
            let allUnchecked = true
//            console.log('change checkbox >', this)
            thisVue.checkedIds = []
            // check to see if all other siblings are checked or unchecked
            $childCheckbox.each(function () {
              if ($(this).checkbox('is checked')) {
                thisVue.checkedIds.push(this.getElementsByTagName('input')[0].getAttribute('data-rowId'))
                allUnchecked = false
              } else {
                allChecked = false
              }
            })
            // set parent checkbox state, but dont trigger its onChange callback
            if (allChecked) {
              $masterCheckbox.checkbox('set checked')
            } else if (allUnchecked) {
              $masterCheckbox.checkbox('set unchecked')
            } else {
              $masterCheckbox.checkbox('set indeterminate')
            }
          }
        })
      },
      $_resetCheckbox () {
        let thisVue = this
        thisVue.checkedIds = []
        var $masterCheckbox = $(thisVue.$el).find('.ui.table .master.checkbox')
        var $childCheckbox = $(thisVue.$el).find('.ui.table .child.checkbox')
        $masterCheckbox.checkbox('uncheck')
        $childCheckbox.checkbox('uncheck')
      },
      $_eval (expression, ctx) {
        return utils.invoke(expression, ctx)
      },
      $_submit () {
        // 调研查询子vue的查询方法
        this.$refs.queryForm.$_submit()
      },
      reset () {
        this.$refs.queryForm.$_reset()
      },
      // 选择一条数据
      $_selectRow (row) {
        this.$emit('$_selectRows', [row])
      },
      // query组件的查询回调，获取查询条件信息，并调用loadData查询数据，并以数据驱动刷新页面
      formQueryCallback (data) {
        this.lastMixQueryData = data
        this.loadData()
        this.selectedRows = []
      },
      $_clickTreeNode (data) {
        this.currentTreeNode = data
      },
      $_click (action, event, rowItem) {
        console.log('click action >', action)
        console.log('click event  >', event)
        console.log('click rowItem>', rowItem)
        let thisVue = this
        switch (action.click) {
          case 'modal':
            // 传递上下文的$treeNodeId给打开的页面
            var kvs = {$treeNodeId: thisVue.currentTreeNode.id, $treeNodeText: thisVue.currentTreeNode.text}
            $.extend(true, kvs, rowItem)
            // 对modal中的变量进行变换，转换之后才可传参给模态窗口
            let modal = utils.invoke(action.modal, kvs)
            console.log('resolved modal>', modal)
            if (modal.type === 'href') {
              thisVue.$GL.ui.openVueByPath(this, modal.value, modal, {
                refreshTable: function () {
                  // 在modal中注册刷新操作
                  thisVue.$_submit()
                },
                close: function () {
                  // 在modal中注册刷新操作
                  thisVue.$_submit()
                }
              })
            } else {
              // TODO
            }
            break
          case 'delete':
            let msg = action.confirm || '确定删除'
            if (confirm(msg) && thisVue.checkedIds.length !== 0) {
//              console.log('checkedIds>', thisVue.checkedIds)
              let kv = {'id|in': thisVue.checkedIds.join(',')}
              thisVue.$GL.data.delete(thisVue.opts.ui.entity, kv).then(function () {
                thisVue.$_resetCheckbox()
                thisVue.$_submit()
              })
            }
            break
          case 'xls':
            console.log('xls')
            break
          case 'word':
            console.log('export:word')
            break
          case 'pdf':
            console.log('pdf')
            break
          case 'print':
            console.log('export:print')
            break
          default:
            if (action.click.indexOf('js:') === 0) {
              utils.eval(action.click.replace('js:', ''), thisVue)
            } else {
              console.error('该操作：' + action.click + '，未配置处理方法')
            }
            break
        }
      }
    },
    components: {TableQuery, TableTree}
  }
</script>
<style scoped>
</style>
