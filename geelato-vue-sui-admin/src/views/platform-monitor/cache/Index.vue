<template>
  <div class="gl-page-content-wrapper">
    <table class="ui selectable compact celled table gl-compact">
      <thead>
      <tr>
        <th style="width: 1em">
          <div class="ui master checkbox">
            <input type="checkbox">
            <label></label>
          </div>
        </th>
        <th style="width:5em">操作</th>
        <th>区域</th>
        <th>级别</th>
        <th>键</th>
        <th>值</th>
      </tr>
      </thead>
      <tbody>
      <!--<tr v-for="(rowDataItem,rowIndex) in queryResult.data" :key="rowIndex">-->
        <!--<td v-if="opts.mode!=='select'">-->
          <!--<div class="ui child checkbox">-->
            <!--<input type="checkbox" :data-rowId="rowDataItem[opts.table.select.field]">-->
            <!--<label></label>-->
          <!--</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div v-if="opts.mode==='select'">-->
            <!--<div class="ui mini buttons" :class="$gl.ui.color.primary">-->
              <!--<div class="ui button" @click="selectRow(rowDataItem)">选择</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-if="opts.mode!=='select'" class="ui mini buttons" :class="$gl.ui.color.primary">-->
            <!--<div class="ui button"-->
                 <!--v-if="opts.table.dropdown.actions.length===1?item=opts.table.dropdown.actions[0]:''"-->
                 <!--@click="click(item,$event,rowDataItem)">{{item.title}}-->
            <!--</div>-->
            <!--&lt;!&ndash;<div class="ui button" style="padding-left: 0.9em;padding-right: 0.5em"></div>&ndash;&gt;-->
            <!--<div class="ui floating dropdown icon button"-->
                 <!--v-else-if="opts.table.dropdown.actions.length>1">-->
              <!--<i class="dropdown icon"></i>-->
              <!--<div class="menu">-->
                <!--<template v-for="(item, index) in opts.table.dropdown.actions">-->
                  <!--<div class="item" :key="index" @click="click(item,$event,rowDataItem)"-->
                       <!--v-if="eval(item.visible,rowDataItem)!==true">-->
                    <!--{{item.title}}-->
                  <!--</div>-->
                <!--</template>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</td>-->
        <!--&lt;!&ndash;展示列数据 visible el:表达式  format：格式化&ndash;&gt;-->
        <!--<td v-for="(item, index) in opts.table.columns" :key="index" v-if="item.visible!==false"-->
            <!--:style="{'text-align':item.textAlign}">-->
          <!--<template v-if="item.el">-->
            <!--{{$gl.utils.eval(item.el,rowDataItem)}}-->
          <!--</template>-->
          <!--<template v-else>-->
            <!--{{ rowDataItem[item.field]}}-->
          <!--</template>-->
        <!--</td>-->
      <!--</tr>-->
      </tbody>
      <!--<tbody v-else>-->
      <!--<tr>-->
        <!--<td class="warning" :colspan="opts.table.columns.length+1"-->
            <!--style="text-align: center;height: 2.6em">没有记录-->
        <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    created() {

    },
    mounted() {
      this.$gl.data.queryList('/cache/list').then(function (res) {
        console.log('res>', res)
      })
    },
    methods: {}
  }
</script>
<style>
</style>
