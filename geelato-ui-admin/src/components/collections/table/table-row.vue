<template>
  <tr>
    <!--<template v-for="item,key in columns">-->
    <!--<td>{{columns[key].type}}</td>-->
    <!--</template>-->
    <td>{{rowIndex}}</td>
    <template v-for="item,key in columns">
      <gl-cell
        :level="rowData.level"
        :field="columns[key].field"
        :text="rowData[columns[key].field]"
        :type="columns[key].type"
        :editable="columns[key].editable"
        @treeNodeAction="$_treeNodeClick"
      >
        <!--<template v-if="columns[key].field==='level'">-->
        <!--</template>-->
      </gl-cell>
    </template>
    <!--<gl-cell v-for="value,key in rowData" -->
    <!--:text="value" -->
    <!--:id="rowData.id"-->
    <!--:pid="rowData.pid"-->
    <!--:level="rowData.level"-->
    <!--:type="columnMap[key].type"-->
    <!--:editable="columnMap[key].editable"></gl-cell>-->

    <!--<div class="gl-table-menu">-->
      <!--<div>功能1</div>-->
      <!--<div>功能2</div>-->
      <!--<div>功能3</div>-->
      <!--<div>功能4</div>-->
      <!--<div>功能5</div>-->
    <!--</div>-->
  </tr>
</template>
<script>
  import GlCell from './table-cell.vue'

  export default {
    props: {
      columns: {type: Array},
      rowData: {type: Object},
      rowIndex: '',
      isOpen: {type: Boolean},
      hasChildRow: {type: Boolean}
    },
    data () {
      return {}
    },
    mounted () {
//      console.log('this.rowData>', this.rowData)
    },
    updated () {
    },
    methods: {
      $_treeNodeClick (action) {
        let rowItem = {}
        rowItem.value = this.rowData
        rowItem.isOpen = this.isOpen
        rowItem.index = this.rowIndex
        if (action === 'close') {
          this.$emit('closeRow', rowItem)
        } else if (action === 'open') {
          this.$emit('openRow', rowItem)
        }
      }
    },
    components: {GlCell}
  }
</script>
<style scoped>
  /*css代码*/
  .gl-table-menu {
    width: 0; /*设置为0 隐藏自定义菜单*/
    height: 125px;
    overflow: hidden; /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
    position: absolute; /*自定义菜单相对与body元素进行定位*/
  }

  .gl-table-menu > div {
    width: 130px;
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
  }
</style>
