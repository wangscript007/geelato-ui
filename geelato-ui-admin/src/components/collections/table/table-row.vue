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
</style>
