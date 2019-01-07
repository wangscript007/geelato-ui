<!--
  高级的页面表单，可组合表单
-->
<template>
  <div>
    <div v-for="(card,index) in cards" :key="index">
      <template v-if="card.type==='form'">
        <gl-form-base :opts="card.opts&&card.opts.ui?card.opts:{ui:card.opts}" :query="query"
                      :ref="'card_'+index">
        </gl-form-base>
      </template>
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
            <gl-form-base v-if="item.type==='form'" :opts="{ui:item.opts}" :query="query">
            </gl-form-base>
            <template v-else>
              card.type:{{card.type}}
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
        <toolbar :actions="card.opts.actions"></toolbar>
      </template>
      <template v-else>
        未支持的类型：{{card.type}}，card:
        <br>
        {{card}}
      </template>
      <!--<resize-observer @notify="$_updateTableColSize"/>-->
    </div>
  </div>
</template>
<script>
  import Toolbar from '../gl-toolbar/Index'
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
        cards: this.opts.ui.cards
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
      this.$_setModal()
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
          if (card.type === 'form') {
            // console.log('gql', thisVue.$refs)
            // console.log('gql', thisVue.$refs['card_' + index])
            let formVue = thisVue.$refs['card_' + index][0]
            // formVue.$_reset(formVue.$props.opts)
            formVue.$_validate()
            let gql = formVue.$_getGql()
            console.log('$_getGql', gql)

            thisVue.$gl.data.saveByGql(null, gql, '保存成功', '保存失败').then(function (res) {
//            console.log('save form res>', res)
              if (typeof thisVue.$parent.$_close === 'function') {
                thisVue.$parent.$_close()
              }
            })
          }
        }
      },
      /**
       * 设置弹层的操作按钮及操作事件
       */
      $_setModal() {
        let modal = this.$parent
        if (!modal.$_addAction) {
          return
        }
        modal.$_addAction({name: '$_save', title: '保存', fn: this.$_save})
        // $_cancel是modal内容的方法，这里可以简写成：{name: '$_cancel'}
        modal.$_addAction({name: '$_cancel', title: '取消', fn: modal.$_cancel})
        modal.$_updateActions()
      }
    },
    components: {HtTable, Toolbar}
  }
</script>
<style scoped>
</style>
