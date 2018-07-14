<template>
  <div class="gl-table-form-designer">
    <div class="ui small borderless menu" style="margin: 0 0 1px 0;padding: 0;background-color: #f1f1f1">
      <a class="item">文件</a>
      <a class="item">B</a>
      <a class="item"><i class="theme icon"></i></a>
    </div>
    <div class="ui grid" style="margin: 0;padding: 0">
      <div class="three wide column" style="margin: 0;padding: 0">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular mini menu">
            <a class="item active" data-tab="first">项目</a>
            <a class="item" data-tab="second">工具</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="first">
            <project :ds="ds.project" @openPage="onOpenPage"
                     @newPage="onNewPage"></project>
          </div>
          <div class="ui bottom attached tab segment" data-tab="second">
            <toolbox-element></toolbox-element>
            <div class="element" draggable>
              <input type="checkbox" name="xx">sss
            </div>
          </div>
        </sui>
      </div>
      <div class="nine wide column" style="margin: 0;padding: 0 1px">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular mini menu">
            <a class="item active" data-tab="stage-ui">界面</a>
            <a class="item" data-tab="stage-code">代码</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="stage-ui" style="margin: 0;padding: 1px">
            <div id="gl-table-form"></div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="stage-code">
            Code
          </div>
        </sui>
      </div>
      <div class="four wide column" style="margin: 0;padding: 0">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular mini menu">
            <a class="item active" data-tab="first">字段</a>
            <a class="item" data-tab="second">Second</a>
            <a class="item" data-tab="third">Third</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="first">
            First
          </div>
          <div class="ui bottom attached tab segment" data-tab="second">
            Second
          </div>
          <div class="ui bottom attached tab segment" data-tab="third">
            Third
          </div>
        </sui>
      </div>
    </div>
  </div>
</template>

<script>
  import Handsontable from 'handsontable'
  import 'handsontable/dist/handsontable.full.min.css'
  import Project from '../gm-designer/toolbox-project.vue'
  import ToolboxElement from './toolbox-element.vue'

  export default {
    data () {
      return {
        ds: {
          project: {id: ''}
        }
      }
    },
    mounted () {
      this.$_initTable()
    },
    methods: {
      $_initTable () {
//        let thisVue = this
        var data = [
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', '']
        ]

        let columns = [
          {
            renderer: suiRenderer
//            editor: false
          },
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer},
          {renderer: suiRenderer}
        ]

        var container = document.getElementById('gl-table-form')
        let hot = new Handsontable(container, {
          data: data,
          columns: columns,
          rowHeaders: true,
          colHeaders: true,
          contextMenu: true, // 右键单元格菜单
          manualRowMove: true, // 可手工移动行
          manualColumnResize: true, // 列拖拽改变大小
          manualRowResize: true, // 行拖拽改变大小
          columnSorting: true, // 列排序
          observeChanges: false, // 启用observeChanges插件
          mergeCells: true, // 合并单元格，
          outsideClickDeselects: false,
          afterOnCellMouseDown: afterOnCellMouseDown
//        editor: 'sui' // 设计单元格的默认编辑器为sui
        })
        console.log(hot)
        console.log('contextMenu', hot.getPlugin('contextMenu'))

        // 自定义菜单
        function updateContextMenu () {
          hot.updateSettings({
            contextMenu: {
              callback: function (key, options) {
//                let cm = hot.getPlugin('contextMenu')
                if (key === 'short') {
                  console.log('options', options)
                } else if (key === 'to_field') {
                  let selected = hot.getSelected() ? hot.getSelected()[0] : []
                  for (let rowIndex = selected[0]; rowIndex <= selected[2]; rowIndex++) {
                    for (let colIndex = selected[1]; colIndex <= selected[3]; colIndex++) {
                      setCellToField(rowIndex, colIndex)
                    }
                  }
//                  cm.executeCommand('remove_row')
                }
              },
              items: {
                'short': {
                  name: '<i class="bold icon" title="加粗"></i>&nbsp;<i class="theme icon" title="填充"></i>&nbsp;'
                },
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
                    return hot.getSelected()[0] === 0
                  }
                },
                'make_read_only': {
                  name: '设置为只读'
                },
                'row_above': {
                  name: '在上方插入行',
                  disabled: function () {
                    // if first row, disable this option
                    return hot.getSelected()[0] === 0
                  }
                },
                'row_below': {name: '在下方插入行'},
                'col_lef': {name: '在左边插入列'},
                'col_right': {name: '在右边插入列'},
                'hsep3': '---------',
                'remove_row': {
                  name: '删除行',
                  disabled: function () {
                    // if first row, disable this option
                    return hot.getSelected()[0] === 0
                  }
                },
                'remove_col': {
                  name: '删除列',
                  disabled: function () {
                    // if first row, disable this option
                    return hot.getSelected()[1] === 0
                  }
                }
              }
            }
          })
        }

        updateContextMenu()
        bindDragStart()

        /**
         * 将单元格转成字段格式
         * @param row
         * @param col
         */
        function setCellToField (row, col) {
          let cell = hot.getCell(row, col)
//          $(cell).addClass('field')
          $(cell).attr('gl-field', true)
          hot.setCellMeta(row, col, 'readOnly', true)
        }

        function suiRenderer (instance, td, row, col, prop, value, cellProperties) {
          td.innerHTML = value
          // 设置为可拖放
          td.ondragover = function (e) {
            e.preventDefault()
          }
          // 拖放后
          td.ondrop = function (e) {
            e.preventDefault()
            hot.setDataAtCell(row, col, e.dataTransfer.getData('suiHTML'))
            setCellToField(row, col)
//            console.log('drop>', e)
          }
          return td
        }

        function bindDragStart () {
          $('.gl-table-form-designer .element').each(function (index, item) {
            item.ondragstart = function (e) {
              e.dataTransfer.setData('suiHTML', e.target.innerHTML)
            }
          })
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
      }
    },
    components: {Project, ToolboxElement}
  }
</script>

<style>
  .gl-table-form-designer td[gl-field] {
    background-color: #b4e7ff;
  }
</style>
