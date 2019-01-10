<!--
  高级的页面表单，可组合表单
-->
<template>
  <div>
    <div v-for="(card,index) in cards" :key="index">
      <template v-if="card.type==='form'">
        <gl-form-base :opts="card.opts&&card.opts.ui?card.opts:{ui:card.opts}" :query="query"
                      :ref="'form_'+index">
        </gl-form-base>
      </template>
      <gl-tree-form v-if="card.type==='treeForm'" :opts="card.opts" :query="query">
      </gl-tree-form>
      <!--<template v-if="card.type==='ht-table'" @click="$_updateTableColSize">-->
      <!--<ht-table ref="formTable" :width="card.opts.table.width" :col-num="card.opts.table.colNum"-->
      <!--:row-num="card.opts.table.rowNum" :merge-cells="card.opts.table.mergeCells"-->
      <!--:ds="card.opts.table.ds"></ht-table>-->
      <!--</template>-->
      <template v-else-if="card.type==='tab'">
        <sui type="tab" selector=".ui.menu>.item">
          <div class="ui pointing secondary menu">
            <a class="item" :class="{active:itemIndex===0}" v-for="(item,itemIndex) in card.items"
               :data-tab="'tab_'+item.name"
               :key="itemIndex">{{item.name}}</a>
          </div>
          <div class="ui tab segment" :class="{active:itemIndex===0}" v-for="(item,itemIndex) in card.items"
               :data-tab="'tab_'+item.name"
               :key="itemIndex">
            <!--若tab项（item）是一个表单-->
            <gl-form-base v-if="item.type==='form'" :opts="{ui:item.opts}" :query="query" :ref="'form_'+index+'_'+itemIndex">
            </gl-form-base>
            <gl-tree-form v-if="item.type==='treeForm'" :opts="item.opts" :query="query" :ref="'form_'+index+'_'+itemIndex">
            </gl-tree-form>
            <template v-else>
              <!--card.type:{{card.type}}-->
            </template>
          </div>
        </sui>
      </template>
      <template v-else-if="card.type==='list'">
        <gl-table :opts="card.opts" :query="{em:'platform_user'}"></gl-table>
      </template>
      <template v-else-if="card.type==='header'">
        <h4 class="ui dividing header" v-html="card.name">
        </h4>
      </template>
      <template v-else-if="card.type==='toolbar'">
        <gl-toolbar :actions="card.opts.actions"></gl-toolbar>
      </template>
      <template v-else>
        <!--未支持的类型：{{card.type}}，card:-->
        <br>
      </template>
      <!--<resize-observer @notify="$_updateTableColSize"/>-->
    </div>
  </div>
</template>
<script>
  import GlToolbar from '../gl-toolbar/Index'
  import HtTable from '../ht-table/Index'

  export default {
    props: {
      opts: {
        type: Object,
        required: true
      },
      updateSeq: {
        type: String
      },
      query: {
        type: Object
      }
    },
    data() {
      return {
        lastFormNum: 0,
        cards: this.opts.ui.cards,
        // 工具体内置的方法，用于工作条配置时，选取
        toolbarDefaultActions: [
          {name: '$_save', title: '保存', color: 'primary', click: this.$_save, opts: {}, callback: {}},
          {name: '$_openPage', title: '打开', color: 'primary', click: this.$_openPage, opts: {}, callback: {}}]
      }
    },
    computed: {
      // width: function () {
      //   return this.$el ? this.$el.clientWidth : undefined
      // }
      formNum: function () {
        let num
        for (let card in this.cards) {
          if (card.type === 'form') {
            num++
          }
        }
        this.lastFormNum = num
        return num
      }
    },
    watch: {},
    created: function () {
      // this.$_loadData()
      this.$_appendActionToParent()
    },
    mounted: function () {
      // console.log('mounted', this.$el, this.$el.clientWidth)
      console.log('gl-form-combination query>', this.query)
      this.$_updateTableColSize()
    },
    methods: {
      $_updateTableColSize() {
        if (!this.$refs.formTable) {
          return
        }
        let size = {width: this.$el.clientWidth, colWidths: this.$el.clientWidth / 24}
        if (this.$refs.formTable.$_resize) {
          this.$refs.formTable.$_resize(size)
        } else {
          for (let index in this.$refs.formTable) {
            this.$refs.formTable[index].$_resize(size)
          }
        }
      },
      $_save() {
        let thisVue = this
        for (let index in thisVue.cards) {
          let card = thisVue.cards[index]
          console.log('card>', card)
          if (card.type === 'form' || card.type === 'treeForm') {
            console.log('gql', thisVue.$refs)
            console.log('gql', thisVue.$refs['form_' + index])
            save(thisVue.$refs['form_' + index][0])
          } else if (card.type === 'tab') {
            for (let itemIndex in card.items) {
              let tabCard = card.items[itemIndex]
              console.log('tabCard>', tabCard, index, itemIndex)
              if (tabCard.type === 'form' || tabCard.type === 'treeForm') {
                console.log('sub gql', thisVue.$refs)
                console.log('sub gql', thisVue.$refs['form_' + index + '_' + itemIndex])
                save(thisVue.$refs['form_' + index + '_' + itemIndex][0])
              }
            }
          }
        }

        function save(formVue) {
          console.log('gl-form-combination > formVue: ', formVue)
          // formVue.$_reset(formVue.$props.opts)
          if (formVue) {
            formVue.$_validate()
            let gql = formVue.$_getGql()
            console.log('$_getGql', gql)
            thisVue.$gl.data.saveByGql(null, gql, '保存成功', '保存失败').then(function (res) {
//            console.log('save form res>', res)
              if (typeof thisVue.$parent.$_close === 'function') {
                $parent.$_close()
              }
            })
          }
        }
      },
      $_openPage(modalOpts) {
        this.$gl.ui.openPage()
      },
      /**
       * 若工具体中的方法合并到父组件中
       * 若父组件存在方法$_addAction，则表示可合并子组件中的action
       * 如，在modal中打开该组件时，则将工具条中的action合并到modal的工具条中
       */
      $_appendActionToParent() {
        let parent = this.$parent
        if (!parent.$_addAction || typeof  parent.$_addAction !== 'function') {
          return
        }
        parent.$_addAction({name: '$_save', title: '保存', fn: this.$_save})
        // $_cancel是modal内容的方法，这里可以简写成：{name: '$_cancel'}
        parent.$_addAction({name: '$_cancel', title: '取消', fn: parent.$_cancel})
        parent.$_updateActions()
      }
    },
    components: {HtTable, GlToolbar}
  }
</script>
<style scoped>
</style>
