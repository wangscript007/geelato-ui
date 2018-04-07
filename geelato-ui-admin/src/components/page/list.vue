<template>
  <div class="ui grid">
    <!--查询条件-->
    <div v-if="opts.ui.query.show" class="four wide column gl-table-query" :style="{display:(isMax?'none':'')}">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">{{opts.ui.title}}
        </div>
        <div class="ui right secondary mini menu">
          <div class="item">
            <button class="ui mini button" :class="theme">添加</button>&nbsp;
          </div>
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui middle aligned divided  selection list">
        <div class="item">
          <div class="content">
            <div class="description">新线规划</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="description">前期工程</div>
          </div>
        </div>
        <div class="item">
          <div class="description">施工-土建工程</div>
        </div>
        <div class="item">
          <div class="content">
            <div class="description">施工-机电工程</div>
          </div>
        </div>
      </div>
    </div>
    <!--查询列表-->
    <div :class="{ 'sixteen wide':isMax, 'twelve wide':!isMax }" class="column gl-table-main">
      <!--工具条-->
      <div class="ui borderless secondary menu gl-header">
        <a class="item gl-page-sidebar-toggle" @click="$_toggleSidebar">
          <i class="sidebar icon"></i>
        </a>
        <div class="item gl-title" style="font-weight: bold">
        </div>
        <div class="ui right secondary  borderless mini menu">
          <div v-if="opts.ui.toolbar.dropdown" class="item">
            <button class="ui mini button" :class="theme">保存</button>&nbsp;
            <!--<button class="ui mini button">删除</button>&nbsp;-->
            <!--<button class="ui mini button">导出</button>-->
            <template v-for="(item, index) in opts.ui.toolbar.dropdown.actions">
              <button class="ui mini button" :class="theme" @click="$_click(item,$event)">{{item.title}}</button>&nbsp;
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
      <div class="ui accordion">
        <div class="title active">
          <i class="dropdown icon"></i>
          基本信息
        </div>
        <div class="content active">
          <form class="ui mini form">
            <div class="field">
              <label>任务类型</label>
              <input type="text" name="first-name" placeholder="">
            </div>
            <div class="field">
              <label>描述</label>
              <textarea rows="4"></textarea>
            </div>
          </form>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
          任务表单字段、展示列表配置
        </div>
        <div class="content active">
          <table class="ui striped compact small table">
            <thead>
            <th>字段</th>
            <th>是否需要</th>
            <th>重命名</th>
            </thead>
            <tbody>
            <tr>
              <td>任务名称</td>
              <td>
                <div class="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden" checked>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>进度百分比</td>
              <td>
                <div class="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden">
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>计划开始时间</td>
              <td>
                <div class="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden">
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>计划结束时间</td>
              <td>
                <div class="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden">
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>扩展字段1</td>
              <td>
                <div class="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden">
                </div>
              </td>
              <td>责任部门</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
          默认流程
        </div>
        <div class="content active">
          无流程
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
          指标范围
        </div>
        <div class="content active">
          <div class="ui info message">选择适用于本任务的指标范围</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../common/utils'

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
        theme: this.$GL.ui.theme.color.primary,
        // 最大时，不展示查询区
        isMax: false,
        // 关闭tips
        showTips: true,
        // 查询的结果数据
        queryResult: {},
        lastGql: {}
      }
    },
    mounted () {
      this.$_loadData()
      this.$_initUi()
//      console.log('this.opts', this.opts)
//      $(this.$el).find('.ui.cards')()
//      $(this.$el).find('.ui.checkbox').checkbox()
    },
    updated () {
    },
    methods: {
      $_initUi () {
        $(this.$el).find('.ui.accordion').accordion()
        $(this.$el).find('.ui.accordion').accordion('exclusive', false)
        $(this.$el).find('.ui.dropdown').dropdown()
        $(this.$el).find('.ui.checkbox').checkbox()
        $(this.$el).find('.ui.menu .item').tab()
      },
      $_loadData (queryParams) {
        let thisVue = this
        this.$GL.data.queryByGql(genGql(queryParams)).then(function (data) {
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
      $_saveData () {
      },
      $_toggleSidebar () {
        this.isMax = !this.isMax
      },
      $_eval (expression, ctx) {
        return utils.invoke(expression, ctx)
      },
      $_submit () {
      },
      $_reset () {
      },
      // 选择一条数据
      $_selectRow (row) {
        this.$emit('$_selectRows', [row])
      },
      // query组件的查询回调，获取查询条件信息，并调用$_loadData查询数据，并以数据驱动刷新页面
      $_formQueryCallback (data) {
        this.$_loadData(data)
        this.selectedRows = []
      },
      $_click (action, event, rowItem) {
        console.log('click action>', action)
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
                }
              })
            } else {
              // TODO
            }
            break
          case 'delete':
            let msg = action.confirm || '确定删除'
            if (confirm(msg)) {
              console.log('rowItem>', rowItem)
              let kv = rowItem ? {id: rowItem.id} : {}
              thisVue.$GL.data.delete(thisVue.opts.ui.entity, kv).then(function () {
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
    components: {}
  }
</script>
<style scoped>
</style>
