<template>
  <div class="gl-content-wrapper">
    <div class="ui mini form">
      <div>
        <!--<input type="text" placeholder="输入实体编码或查询KEY..." v-model="form.entity" readonly>-->
        <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="addForm"><i class="add icon"></i>表单-->
        <!--</div>-->
        <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="addTabs"><i class="add icon"></i>选项卡-->
        <!--</div>-->
        <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="addList"><i class="add icon"></i>列表-->
        <!--</div>-->
        <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="addToolbar"><i class="add icon"></i>工具条-->
        <!--</div>-->
        <!--<div class="five ui mini icon buttons">-->
        <!--<button class="ui button" @click="addHeader">标题</button>-->
        <!--<button class="ui button" @click="addForm">表单</button>-->
        <!--<button class="ui button" @click="addTabs">选项卡</button>-->
        <!--<button class="ui button" @click="addList">列表</button>-->
        <!--<button class="ui button" @click="addToolbar">工具条</button>-->
        <!--</div>-->
        <div class="ui text mini menu" style="margin: 0em -.5em">
          <div class="header item"><i class="plus icon" style="margin-left: 0.5em"></i>添加：</div>
          <a class="item" @click="addHeader">标题</a>
          <a class="item" @click="addForm">表单</a>
          <a class="item" @click="addTreeForm">树表单</a>
          <a class="item" @click="addTabs">选项卡</a>
          <a class="item" @click="addList">列表</a>
          <a class="item" @click="addToolbar">工具条</a>
        </div>
        <!--<div class="ui basic mini labels" :class="$gl.ui.color.primary">-->
        <!--<i class="plus icon" style="margin-left: 0.5em"></i>-->
        <!--<a class="ui label" @click="addHeader">标题</a>-->
        <!--<a class="ui label" @click="addForm">表单</a>-->
        <!--<a class="ui label" @click="addTabs">选项卡</a>-->
        <!--<a class="ui label" @click="addList">列表</a>-->
        <!--<a class="ui label" @click="addToolbar">工具条</a>-->
        <!--</div>-->
      </div>
      <div class="ui fitted divider" style="margin-top: 0.25em;"></div>
      <draggable :list="cards">
        <!--<transition-group>-->
        <div class="ui cards gl-settings" v-if="cards" v-for="(card,index) in cards" :key="index">
          <div class="ui card">
            <!--共用头部-->
            <div class="content gl-hover-header">
              <div class="right floated gl-hover-content">
                <i class="arrow up icon gl-action" title="向上"
                   @click="$gl.utils.moveup(cards, index)" v-if="index!==0"></i>
                <i class="arrow down icon gl-action" title="向下"
                   @click="$gl.utils.movedown(cards, index)"
                   v-if="index!==cards.length-1"></i>
                &nbsp;&nbsp;
                <i class="plus icon gl-action" title="添加" :class="$gl.ui.color.primary"
                   @click="addCardItem(card)" v-if="card.items"></i>
                &nbsp;&nbsp;
                <i class="remove red icon gl-action" title="删除" :class="$gl.ui.color.negative"
                   @click="$gl.utils.remove(cards, index,'是否删除')"></i>
              </div>
              <div class="" v-html="dict[card.type]"></div>
            </div>
            <!--以下为各类card的专属设置-->
            <template v-if="card.type==='tab'">
              <div class="content" v-if="card.items">
                <div class="ui fluid action input" style="margin-bottom: 3px"
                     v-for="(item,index) in card.items">
                  <label class="ui label">
                    <!--<i class="arrow up icon"  title="向上"-->
                    <!--@click="$gl.utils.moveup(card.items, index)" v-if="index!==0"></i>-->
                    <i class="arrow down icon gl-action" title="向下"
                       @click="$gl.utils.movedown(card.items, index)"
                       v-if="index!==card.items.length-1"></i>
                    <i class="remove red icon gl-action" title="删除"
                       :class="$gl.ui.color.negative"
                       @click="$gl.utils.remove(card.items, index,'是否删除')"></i>
                  </label>
                  <input type="text" placeholder="未设置..." v-model="item.name" readonly>
                  <div class="ui mini button" @click="loadMeta"><i class="cog icon"
                                                                     title="设置"></i></div>
                </div>
              </div>
              <!--<div class="extra content">-->
              <!--<button class="ui button">xx</button>-->
              <!--</div>-->
            </template>
            <template v-else-if="card.type==='form'">
              <div class="content">
                <div class="ui fluid action input">
                  <input type="text" placeholder="未设置..." v-model="card.name" readonly>
                  <div class="ui mini button" @click="openFormDesigner(card)">
                    <i class="cog icon" title="设置"></i>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="card.type==='list'">
              <div class="content">
                <div class="ui fluid action input">
                  <input type="text" placeholder="未设置..." v-model="card.name" readonly>
                  <div class="ui mini button" @click="openListDesigner(card)">
                    <i class="cog icon" title="设置"></i>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="card.type==='header'">
              <div class="content">
                <div class="ui fluid action input">
                  <input type="text" placeholder="未设置..." v-model="card.name">
                </div>
              </div>
            </template>
            <template v-else-if="card.type==='toolbar'">
              <div class="content">
                <div class="ui fluid action input">
                  <input type="text" placeholder="未设置..." v-model="card.name">
                </div>
              </div>
            </template>
          </div>
        </div>
        <!--</transition-group>-->
      </draggable>
    </div>
  </div>
</template>
<script>
  import uiDataTemplate from './dataTemplate.js'
  import Draggable from 'vuedraggable'

  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        cards: this.editorStore.editingPage.content.opts.ui.cards,
        dict: {
          header: '<i class="heading icon"></i>标题(header)',
          list: '<i class="list icon"></i>列表(List)',
          form: '<i class="wpforms icon"></i>表单(Form)',
          treeForm: '<i class="wpforms icon"></i>树表单(TreeForm)',
          tab: '<i class="sitemap icon"></i>选项卡(Tab)',
          toolbar: '<i class="crosshairs icon"></i>工具条(Toolbar)',
          'ht-table': '<i class="table icon"></i>表格(Table)'
        }
      }
    },
    watch: {
      'editorStore.editingPage.id': function (val, oval) {
//        this.form.code = this.editingPage.code
//        this.form.description = this.editingPage.description
      }
    },
    mounted: function () {
      // this.sortCards()
      // this.sortCardItems()
      console.log('plugins > form-combination > Settings > editorStore.editingPage: ', this.editorStore.editingPage)
    },
    methods: {
      addHeader(e) {
        this.cards.push(uiDataTemplate.header)
      },
      addForm(e) {
        this.cards.push(uiDataTemplate.form)
      },
      addTreeForm(e) {
        this.cards.push(uiDataTemplate.treeForm)
      },
      addTabs(e) {
        this.cards.push(uiDataTemplate.tabs)
      },
      addList(e) {
        this.cards.push(uiDataTemplate.list)
      },
      addToolbar(e) {
        this.cards.push(uiDataTemplate.toolbar)
      },
      addCardItem(card) {
        card.items.push({
          type: 'form',
          name: 'form1',
          opts: {
            layout: '', // html
            theme: '', // vue file
            fields: [],
            rules: [] // validate rules
          }
        })
      },
      loadMeta() {
      },
      openFormDesigner(card) {
        // console.log('ui.toolbar.dropdown.actions>', this.editorStore.editingPage.content.opts.ui.toolbar.dropdown.actions)
        let thisVue = this
        this.$gl.ui.openVueByPath(this, '/views/platform-ide/plugins/form-combination/FormDesigner',
          {
            title: '表单配置',
            contentStyle: {
              padding: '0 em',
              'overflow-y': 'hidden'
            },
            opts: {
              table: card.opts.table,
              form: card.opts,
              editorStore: thisVue.editorStore
            }
          }, {
            close: function (e, value) {
              card.opts.table = value
              console.log('editorStore', thisVue.editorStore)
              console.log('value>', value)
            }
          }
        )
      },
      openListDesigner(card) {
        // console.log('ui.toolbar.dropdown.actions>', this.editorStore.editingPage.content.opts.ui.toolbar.dropdown.actions)
        let thisVue = this
        this.$gl.ui.openVueByPath(this, '/views/platform-ide/plugins/table/SettingsGuide', {
          title: '列表查询页面配置向导',
          opts: {
            entityOrQueryKey: card.name,
            editorStore: this.editorStore
          }
        })
      },
      commit() {
        return {code: 0, msg: ''}
      }
    },
    components: {Draggable}
  }
</script>
<style scoped>
  .ui.cards.gl-settings > .card {
    border-top: solid 3px rgba(0, 0, 0, .50);
  }

  .content.gl-hover-header {
    cursor: move;
  }
</style>

