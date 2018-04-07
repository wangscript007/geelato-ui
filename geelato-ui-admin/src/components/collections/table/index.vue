<template>
  <div>
    <table class="gl-table">
      <thead>
      <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
      <th v-for="col in columns">{{col.title}}</th>
      </thead>
      <tbody>
      <gl-row v-for="item in treeDataSource" :key="item.seq" :columns="columns" :rowData="item.value"
              :rowIndex="item.seq" :hasChildRow="item.hasChildRow" :isOpen="item.isOpen"
              @closeRow="$_closeRow"
              @openRow="$_openRow"
      ></gl-row>
      </tbody>
    </table>
  </div>
</template>
<script>
  import GlRow from './table-row.vue'

  export default {
    props: {
      width: {type: String},
      columns: {type: Array},
      dataSource: {type: Array}
    },
    data () {
      return {
        columnMap: {},
        treeDataSource: [],
        cfg: {}
      }
    },
    created () {
      this.$_convertDataSource()
    },
    mounted () {
      $(this.$el).find('.gl-table').colResizable({
        liveDrag: true,
        //        gripInnerHtml: '<div class=\'grip\'></div>',
        //        draggingClass: 'dragging',
        resizeMode: 'fit',
        disabledColumns: [0]
      })
//      this.$_convertToColumnMap()
//      this.$_convertToTreeDataSource()
    },
    updated () {
    },
    methods: {
//      $_convertToColumnMap () {
//        for (var index in this.columns) {
//          let col = this.columns[index]
//          this.columnMap[col.field] = col
//        }
//      },
      // 确保有level字段、按树排序，pid、id
      $_convertDataSource () {
        let items = []
        for (var index in this.dataSource) {
          let value = this.dataSource[index]
          // 增加排序号
          let item = {
            seq: parseInt(index) + 1,
            value: value,
            hasChildRow: true,
            isOpen: true
          }
          items.push(item)
        }
        // TODO
        this.treeDataSource = items
      },
      $_closeRow (rowItem) {
        console.log('closeRow>', rowItem)
      },
      $_openRow (rowItem) {
        console.log('openRow>', rowItem)
      }
    },
    components: {GlRow}
  }
</script>
<style>
  table.gl-table {
    border-collapse: collapse;
    width: 100%;
  }

  table.gl-table, .gl-table th, td {
    border: 1px solid #d8d8d8;
  }

  table.gl-table td:first-child, table.gl-table th {
    background-color: #eeeeee;
    text-align: center;
  }

  .gl-cell .treeNodeFlag {
    font-size: 1em;
    font-weight: bold;
    display: inline-block;
    text-align: right;
    cursor: pointer;
  }

  /*.gl-table {*/
  /*border: 1px;*/
  /*}*/

  /*.gl-table td {*/
  /*border: 1px;*/
  /*}*/
</style>
