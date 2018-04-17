<template>
  <td class="gl-cell" @click="$_click" :style="{width:width}">
    <template v-if="field==='name'">
      <div class="treeNodeFlag" :style="{width: treeNodeFlagWidth}" @click="$_treeNodeClick">{{treeNodeFlag}}</div>
    </template>
    <template v-if="editable&&editType==='text'">
      <input type="text" v-model="editText" :style="{border: '0',width:inputWidth}" @keyup.enter="$_submit">
    </template>
    <template v-else>
      <div style="display: inline-block" :style="{width:inputWidth}">{{editText}}</div>
    </template>
  </td>
</template>
<script>
  export default {
    props: {
      text: '',
      field: '',
      level: {default: 1},
      width: {default: ''},
      type: {default: 'text'},
      editable: {default: false}
    },
    data () {
      return {
        editType: this.type,
        editText: this.text,
        treeNodeFlagWidth: '5%',
        inputWidth: '95%',
        treeNodeFlag: ''
      }
    },
//    watch: {
//      treeNodeFlagWidth: function (val, oldVal) {
//        console.log('new width:', val)
//      }
//    },
    mounted () {
      this.editType = 'text'
      this.treeNodeFlagWidthInt = 0 + 5 * this.level
      this.inputWidthInt = 100 - this.treeNodeFlagWidthInt - 3
      this.treeNodeFlagWidth = this.treeNodeFlagWidthInt + '%'
      this.inputWidth = this.inputWidthInt + '%'
      this.treeNodeFlag = this.$parent.hasChildRow ? (this.$parent.isOpen ? '-' : '+') : ''
    },
    updated () {
    },
    methods: {
      $_click: function () {
        if (this.editable) {
        }
        // 设置input的宽度
      },
      $_treeNodeClick: function () {
        if (this.treeNodeFlag === '+') {
          this.$emit('treeNodeAction', 'open')
          this.treeNodeFlag = '-'
        } else if (this.treeNodeFlag === '-') {
          this.$emit('treeNodeAction', 'close')
          this.treeNodeFlag = '+'
        }
      },
      $_submit: function (item) {
        console.log('keyup.enter>' + this.editText + '', item)
      }
    },
    components: {}
  }
</script>
<style>
  .ui[class*="very compact"].table td.gl-cell {
    padding: 0.0em 0.2em;
  }

  .gl-cell {
    /*text-align: center;*/
  }


</style>
