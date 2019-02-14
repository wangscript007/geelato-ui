<!--
  高级的页面表单，可组合表单
-->
<template>
  <div>
    <div v-for="(card,index) in cards" :key="index">
      <template v-if="card.type==='form'">
        <gl-form-base :opts="card.opts" :query="query" :ref="'form_'+index">
        </gl-form-base>
      </template>
      <gl-tree-form v-if="card.type==='treeForm'" :opts="card.opts" :query="card.query||query" :ref="'form_'+index">
      </gl-tree-form>
      <!--<template v-if="card.type==='ht-table'" @click="updateTableColSize">-->
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
            <gl-form-base v-if="item.type==='form'" :opts="item.opts" :query="query" :ref="'form_'+index+'_'+itemIndex">
            </gl-form-base>
            <gl-tree-form v-if="item.type==='treeForm'" :opts="item.opts" :query="query"
                          :ref="'form_'+index+'_'+itemIndex">
            </gl-tree-form>
            <template v-else>
              <!--card.type:{{card.type}}-->
            </template>
          </div>
        </sui>
      </template>
      <template v-else-if="card.type==='list'">
        <gl-table :opts="card.opts" :query="card.query||query"></gl-table>
      </template>
      <template v-else-if="card.type==='header'">
        <h4 class="ui dividing header" v-html="card.name">
        </h4>
      </template>
      <template v-else-if="card.type==='toolbar'">
        <gl-toolbar
            v-if="!(card.opts.appendToParent&&modal&&(typeof modal.appendToolbar === 'function')&&modal.appendToolbar(card.opts)===true)"
            v-bind="card.opts" :ctx="self()"></gl-toolbar>
      </template>
      <template v-else>
        <!--未支持的类型：{{card.type}}，card:-->
        <br>
      </template>
      <!--<resize-observer @notify="updateTableColSize"/>-->
    </div>
  </div>
</template>
<script>
  import GlToolbar from '../gl-toolbar/Index'
  import HtTable from '../ht-table/Index'

  export default {
    props: {
      // ui的配置信息，用于渲染ui
      opts: {
        type: Object,
        required: true
      },
      updateSeq: {
        type: String
      },
      // 业务数据信息，用于获取填充表单值
      query: {
        type: Object
      },
      // 打开本组件的来源组件
      opener: {
        type: Object,
        required: false
      },
      // 通过modal窗口打开该页面时，可获取到该窗口的引用
      modal: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        lastFormNum: 0,
        cards: this.opts.cards,
        // 工具体内置的方法，用于工作条配置时，选取
        toolbarDefaultActions: [
          {name: 'save', title: '保存', color: 'primary', click: this.save, opts: {}, callback: {}},
          {name: 'openPage', title: '打开', color: 'primary', click: this.openPage, opts: {}, callback: {}}]
      }
    },
    computed: {
      formNum: function () {
        let num
        for (let card in this.cards) {
          if (card.type === 'form') {
            num++
          }
        }
        this.lastFormNum = num
        return num
      },
      $opener: function () {
        return this.opener
      }
    },
    watch: {},
    created: function () {
      this.appendActionToParent()
    },
    mounted: function () {
      // console.log('gl-form-combination > mounted > query: ', this.query)
      this.updateTableColSize()
    },
    methods: {
      self() {
        return this
      },
      updateTableColSize() {
        if (!this.$refs.formTable) {
          return
        }
        let size = {width: this.$el.clientWidth, colWidths: this.$el.clientWidth / 24}
        if (this.$refs.formTable.resize) {
          this.$refs.formTable.resize(size)
        } else {
          for (let index in this.$refs.formTable) {
            this.$refs.formTable[index].resize(size)
          }
        }
      },
      validate() {
        let thisVue = this
        let validateInfoAry = []
        for (let index in thisVue.cards) {
          let card = thisVue.cards[index]
          console.log('gl-form-combination > Index > validate > card: ', card)
          if (card.type === 'form' || card.type === 'treeForm') {
            let v = thisVue.$refs['form_' + index][0]
            validateInfoAry.push(v.validate())
          } else if (card.type === 'tab') {
            for (let itemIndex in card.items) {
              let tabCard = card.items[itemIndex]
              console.log('gl-form-combination > Index > tabCard: ', tabCard, index, itemIndex)
              if (tabCard.type === 'form' || tabCard.type === 'treeForm') {
                let v = thisVue.$refs['form_' + index + '_' + itemIndex][0]
                validateInfoAry.push(v.validate())
              }
            }
          }
        }

        let isSuccess = true
        for (let index in validateInfoAry) {
          let validateInfo = validateInfoAry[index]
          if (!validateInfo.isSuccess) {
            isSuccess = false
            break;
          }
        }

        return {code: isSuccess ? 0 : -1, isSuccess: isSuccess, result: validateInfoAry}
      },
      getGql() {
        let thisVue = this
        let formVueAry = []
        for (let index in thisVue.cards) {
          let card = thisVue.cards[index]
          console.log('gl-form-combination > Index > getGql > card: ', card)
          if (card.type === 'form' || card.type === 'treeForm') {
            let v = thisVue.$refs['form_' + index][0]
            formVueAry.push(v)
          } else if (card.type === 'tab') {
            for (let itemIndex in card.items) {
              let tabCard = card.items[itemIndex]
              console.log('gl-form-combination > Index > getGql > tabCard: ', tabCard, index, itemIndex)
              if (tabCard.type === 'form' || tabCard.type === 'treeForm') {
                let v = thisVue.$refs['form_' + index + '_' + itemIndex][0]
                formVueAry.push(v)
              }
            }
          }
        }
        let gqlAry = []
        for (let index in formVueAry) {
          let formVue = formVueAry[index]
          console.log('gl-form-combination > getGql > formVue: ', formVue)
          let gql = formVue.getGql()
          console.log('gl-form-combination > getGql> gql: ', gql)
          gqlAry.push(gql)
        }
        return gqlAry
      },
      save(successCallback) {
        let thisVue = this
        let validateInfo = thisVue.validate()
        if (!validateInfo.isSuccess) {
          return false
        }
        let gql = thisVue.getGql()
        if (typeof gql === 'object' && gql.length > 0) {
          for (let i in gql) {
            // TODO 三层或更多层嵌套时
            save(gql[i])
          }
        } else {
          save(gql)
        }

        // if (isSaveAndCloseParent && this.modal && typeof this.modal.close === 'function') {
        //   this.modal.close()
        // }

        function save(gql) {
          if (gql && gql !== {}) {
            let gqlOne = gql.length === 1 ? gql[0] : gql
            thisVue.$gl.data.saveByGql(null, gqlOne, '保存成功', '保存失败').then(function (res) {
              if (successCallback && typeof successCallback === "function") {
                successCallback()
              } else if (successCallback && typeof successCallback === "object" && successCallback.length > 0) {
                for (let i in successCallback) {
                  successCallback[i]()
                }
              }
            })
          }
        }
      },
      setValues(values) {
        let thisVue = this
        for (let index in thisVue.cards) {
          let card = thisVue.cards[index]
          console.log('gl-form-combination > Index > card: ', card)
          if (card.type === 'form' || card.type === 'treeForm') {
            let v = thisVue.$refs['form_' + index][0]
            typeof v.setValues === 'function' ? v.setValues(values) : null
          } else if (card.type === 'tab') {
            for (let itemIndex in card.items) {
              let tabCard = card.items[itemIndex]
              console.log('gl-form-combination > Index > tabCard: ', tabCard, index, itemIndex)
              if (tabCard.type === 'form' || tabCard.type === 'treeForm') {
                let v = thisVue.$refs['form_' + index + '_' + itemIndex][0]
                typeof v.setValues === 'function' ? v.setValues(values) : null
              }
            }
          }
        }
      },
      openPage(modalOpts) {
        this.$gl.ui.openPage()
      },
      /**
       * 若工具体中的方法合并到父组件中
       * 若父组件存在方法addAction，则表示可合并子组件中的action
       * 如，在modal中打开该组件时，则将工具条中的action合并到modal的工具条中
       */
      appendActionToParent() {
        let parent = this.$parent
        if (!parent.addAction || typeof  parent.addAction !== 'function') {
          return
        }
        // parent.addAction({name: 'save', title: '保存', fn: this.save})
        // cancel是modal内容的方法，这里可以简写成：{name: 'cancel'}
        // parent.addAction({name: 'cancel', title: '取消', fn: parent.cancel})
        parent.updateActions()
      }
    },
    components: {HtTable, GlToolbar}
  }
</script>
<style scoped>
</style>
