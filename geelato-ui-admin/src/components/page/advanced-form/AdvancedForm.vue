<!--
  高级的页面表单，可组合表单
-->
<template>
  <div>
    <div v-for="(card,index) in cards" :key="index">
      <template v-if="card.type==='form'" @click="$_updateTableColSize">
        <ht-table ref="formTable" :width="card.opts.table.width" :col-num="card.opts.table.colNum"
                  :row-num="card.opts.table.rowNum" :merge-cells="card.opts.table.mergeCells" :ds="card.opts.table.ds"></ht-table>
      </template>
      <template v-else-if="card.type==='tab'">
        <sui type="tab" selector=".ui.menu>.item">
          <div class="ui pointing secondary menu">
            <a class="item" v-for="(item,itemIndex) in card.items" :data-tab="'tab_'+item.name" :key="itemIndex">{{item.name}}</a>
          </div>
          <div class="ui tab segment" v-for="(item,itemIndex) in card.items" :data-tab="'tab_'+item.name"
               :key="itemIndex">
            <div class="ui top attached tabular menu">
              <a class="active item" data-tab="first/a">1A</a>
              <a class="item" data-tab="first/b">1B</a>
              <a class="item" data-tab="first/c">1C</a>
            </div>
            <div class="ui bottom attached active tab segment" data-tab="first/a">1A</div>
            <div class="ui bottom attached tab segment" data-tab="first/b">1B</div>
            <div class="ui bottom attached tab segment" data-tab="first/c">1C</div>
          </div>
        </sui>
      </template>
      <template v-else-if="card.type==='list'">
        这是一个列表
      </template>
      <template v-else-if="card.type==='header'">
        <h4 class="ui dividing header">{{card.name}}</h4>
      </template>
      <template v-else-if="card.type==='toolbar'">
        <toolbar :actions="card.opts.actions"></toolbar>
      </template>
      <resize-observer @notify="$_updateTableColSize"/>
    </div>
  </div>
</template>
<script>
  import Toolbar from '../Toolbar'
  import HtTable from '../ht-table/Index.vue'

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
    data () {
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
      }
    },
    watch: {},
    mounted: function () {
      console.log('mounted', this.$el, this.$el.clientWidth)
      this.$_updateTableColSize()
    },
    methods: {
      $_updateTableColSize () {
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
      }
    },
    components: {HtTable, Toolbar}
  }
</script>
<style scoped>
</style>
