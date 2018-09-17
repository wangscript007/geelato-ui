<!--
  表单配置页面
-->
<template>
  <div class="gl-table-form"></div>
</template>
<script>
  import HandsonTable from 'handsontable'
  import 'handsontable/dist/handsontable.full.min.css'

  export default {
    props: {
      colNum: {
        type: [Number, String],
        default: 24
      },
      rowNum: {
        type: [Number, String],
        default: 12
      },
      width: {
        type: [Number, String],
        default: this.defaultColWidth * this.colNum
      },
      mergeCells: {
        type: Array,
        default: function () {
          return []
        }
      },
      ds: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        hot: undefined,
        defaultColWidth: 30,
        colWidths: this.defaultColWidth
      }
    },
    computed: {},
    watch: {
      mergeCells: {
        handler (val, oval) {
          console.log('mergeCells', val, oval)
          this.$_updateTable(this.colNum, this.rowNum)
        },
        // immediate: true,
        deep: true
      }
    },
    created: function () {
    },
    mounted: function () {
      this.$_initTable(this.colNum, this.rowNum)
    },
    methods: {
      $_initTable (colNum, rowNum) {
        let thisVue = this
        let container = thisVue.$el
        thisVue.hot = new HandsonTable(container, thisVue.$_genSettings(colNum, rowNum))
        bindDragStart()

        function bindDragStart () {
          $('.gl-table-form-designer .element').each(function (index, item) {
            item.ondragstart = function (e) {
              e.dataTransfer.setData('suiHTML', e.target.innerHTML)
            }
          })
        }
      },
      $_updateTable (colNum, rowNum) {
        let thisVue = this
        thisVue.hot.updateSettings(thisVue.$_genSettings(colNum, rowNum))
      },
      $_genSettings (colNum, rowNum, mergeCells) {
        let thisVue = this
        let data = []
        let columns = []
        // var data = [
        //   ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        //   ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        // ]
        let rowDataTemplate = []
        for (let i = 0; i < colNum; i++) {
          rowDataTemplate.push('')
          columns.push({renderer: suiRenderer})
        }
        if (this.ds && this.ds.length > 0) {
          data = this.ds
        }
        let rowDataTemplateStirng = JSON.stringify(rowDataTemplate)
        for (let i = 0; i < rowNum; i++) {
          data.push(JSON.parse(rowDataTemplateStirng))
        }
//         let columns = [
//           {
//             renderer: suiRenderer
// //            editor: false
//           },
//           {renderer: suiRenderer}
//         ]
        function suiRenderer (instance, td, row, col, prop, value, cellProperties) {
          td.innerHTML = value
          // 设置为可拖放
          td.ondragover = function (e) {
            e.preventDefault()
          }
          // 拖放后
          td.ondrop = function (e) {
            e.preventDefault()
            thisVue.hot.setDataAtCell(row, col, e.dataTransfer.getData('suiHTML'))
            setCellToField(row, col)
//            console.log('drop>', e)
          }
          // td.style.width = '3.25%'
          return td
        }

        /**
         * 将单元格转成字段格式
         * @param row
         * @param col
         */
        function setCellToField (row, col) {
          let cell = thisVue.hot.getCell(row, col)
//          $(cell).addClass('field')
          $(cell).attr('gl-field', true)
          thisVue.hot.setCellMeta(row, col, 'readOnly', true)
        }

        function genMergeCells () {
          let mergeCells = genCell()

          function genCell () {
            return [
              {row: 0, col: 0, rowspan: 1, colspan: 3},
              {row: 0, col: 3, rowspan: 1, colspan: 9},
              {row: 0, col: 12, rowspan: 1, colspan: 3},
              {row: 0, col: 15, rowspan: 1, colspan: 9}
            ]
          }

          return mergeCells
        }

//        function bindCellClick () {
//          console.log('tds>', $('#gl-table-form table td'))
//          $('#gl-table-form table td').on('click', function (e) {
//            console.log('e>', e)
//          })
//        }

        function afterOnCellMouseDown (e, coords, td) {
          console.log(e, coords, td)
        }

        return {
          rowHeaders: false,
          colHeaders: false,
          data: data,
          columns: columns,
          // contextMenu: true, // 右键单元格菜单
          contextMenu: {
            callback: function (key, options) {
//                let cm = hot.getPlugin('contextMenu')
              if (key === 'short') {
                console.log('options', options)
              } else if (key === 'to_field') {
                let selected = thisVue.hot.getSelected() ? thisVue.hot.getSelected()[0] : []
                for (let rowIndex = selected[0]; rowIndex <= selected[2]; rowIndex++) {
                  for (let colIndex = selected[1]; colIndex <= selected[3]; colIndex++) {
                    setCellToField(rowIndex, colIndex)
                  }
                }
//                  cm.executeCommand('remove_row')
              }
            },
            items: {
              // 'short': {
              //   name: '<i class="bold icon" title="加粗"></i>&nbsp;<i class="theme icon" title="填充"></i>&nbsp;'
              // },
              'hsep1': '---------',
              'copy': {name: '复制'},
              'cut': {name: '剪切'},
              'mergeCells': {
                name: function () {
                  return '合并/拆分单元格'
                }
              },
              'hsep2': '---------',
              'to_field': {
                name: '设置为字段',
                disabled: function () {
                  // if first row, disable this option
                  return thisVue.hot.getSelected()[0] === 0
                }
              },
              'make_read_only': {
                name: '设置为只读'
              },
              'row_above': {
                name: '在上方插入行',
                disabled: function () {
                  // if first row, disable this option
                  return thisVue.hot.getSelected()[0] === 0
                }
              },
              'row_below': {name: '在下方插入行'},
              // 'col_lef': {name: '在左边插入列', disabled: true},
              // 'col_right': {name: '在右边插入列', disabled: true},
              'hsep3': '---------',
              'remove_row': {
                name: '删除行',
                disabled: function () {
                  // if first row, disable this option
                  return thisVue.hot.getSelected()[0] === 0
                }
              }
              // 'remove_col': {
              //   name: '删除列',
              //   disabled: function () {
              //     // if first row, disable this option
              //     // return hot.getSelected()[1] === 0
              //     return true
              //   }
              // }
            }
          },
          manualRowMove: true, // 可手工移动行
          // manualColumnResize: true, // 列拖拽改变大小
          // manualRowResize: true, // 行拖拽改变大小
          // autoColumnSize: true,
          colWidths: thisVue.width / thisVue.colNum,  // colWidths: [100, 200, 300, 200, 100]
          columnSorting: true, // 列排序
          observeChanges: false, // 启用observeChanges插件
          // mergeCells: true, // 合并单元格，
          // mergeCells: [
          //   {row: 0, col: 0, rowspan: 1, colspan: 3},
          //   {row: 0, col: 3, rowspan: 1, colspan: 9},
          //   {row: 0, col: 12, rowspan: 1, colspan: 3},
          //   {row: 0, col: 15, rowspan: 1, colspan: 9}
          // ],
          mergeCells: thisVue.mergeCells || genMergeCells(),
          outsideClickDeselects: false,
          afterOnCellMouseDown: afterOnCellMouseDown
//        editor: 'sui' // 设计单元格的默认编辑器为sui,
        }
      },
      $_resize ({width, colWidths}) {
        // console.log('width:', width)
        if (colWidths !== this.colWidths) {
          this.colWidths = colWidths
          this.hot.updateSettings({
            colWidths: colWidths,
            width: width
          })
          // console.log('updateSettings')
        }
      },
      $_getValue () {
        // console.log('data>', this.hot.getData())
        let mergeCellIntance = this.hot.getPlugin('mergeCells')
        console.log('mergeCellIntance>', mergeCellIntance)
        console.log('mergeCellIntance.mergedCellsCollection>', mergeCellIntance.mergedCellsCollection)
        console.log('this.hot>', this.hot)
        console.log('getSettings>', this.hot.getSettings())
        return {
          width: this.width,
          colNum: this.colNum,
          rowNum: this.rowNum,
          ds: this.hot.getData(),
          mergeCells: mergeCellIntance.mergedCellsCollection.mergedCells
        }
      }
    },
    components: {}
  }
</script>
<style scoped>
  .gl-designer-form .ui.segment {
    padding: 0.1em 0.1em;
    min-height: 460px
  }

  .gl-designer-form.grid > .column {
    padding: 0
  }
</style>
