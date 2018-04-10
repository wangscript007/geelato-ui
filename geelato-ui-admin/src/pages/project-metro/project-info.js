import * as C from '../../pages/constants'
import ENTITY from '../../pages/entities'
import GridPage from '../../pages/core/GridPage'
import Column from '../../pages/core/Column'

class ProjectCfg {
  constructor () {
    let page = new GridPage()
    page.code('prj-mtr-project-info-list').component('/components/page/table')
    page.mode(C.MODE_PAGE.select).title('项目信息')
    page.entity(ENTITY.project.projectInfo)
    // page.newTable().addColumn(new Column().title('序号').field('id').visible(false).format(''))
    page.newTable().addColumn(new Column('name', '名称', C.TYPE_COLUMN.string, false, ''))
    //   .addColumn(new Column(''))
    console.log('page>>>', page.value())
    this.pageCfgs = [
      // 项目管理
      {
        code: 'prj-mtr-project-info-list',
        component: '/components/page/table',
        opts: {
          ui: {
            mode: C.MODE_PAGE.select,
            title: '项目信息',
            entity: ENTITY.project.projectInfo,
            query: {
              // 是否隐藏整个查询区域
              show: true,
              // null或''表示不展示tree过滤区域
              tree: null,
              // null或''表示不展示常用过滤器区域
              filter: null,
              // null或''表示不展示综合查询区域
              mix: {
                // 可用于查询的字段
                fields: [
                  // cop：比较操作符，eq：等于；default：默认值
                  {field: 'name', title: '名称', cop: C.COP.contains, type: C.TYPE_FIELD.string, defalut: '张'},
                  // cop：比较操作符，contains：包含；lop：逻辑操作符，or：或者
                  {field: 'code', title: '编码', cop: C.COP.contains, type: C.TYPE_FIELD.string, lop: C.LOP.or},
                  // and：并且
                  {field: 'description', title: '描述', cop: C.COP.contains, type: C.TYPE_FIELD.string, lop: C.LOP.and}
                ]
              }
            },
            // --end query --
            toolbar: {
              title: '',
              dropdown: {
                title: '',
                actions: [
                  {
                    title: '创建',
                    click: C.CLICK.modal,
                    modal: {title: '项目信息', type: C.TYPE_MODAL.href, value: '/views/project-metro/info/project_info.vue'}
                  },
                  {title: '删除', click: C.CLICK.delete, confirm: '确定删除？'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出EXCEL', click: C.CLICK.xls},
                  // 弹出页面提示导出多少条记录
                  {title: '导出PDF', click: C.CLICK.pdf},
                  // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                  {title: '打印', click: C.CLICK.print}
                ]
              }
            },
            tips: {
              // 展示位置：header|footer|none，当为none或空时，则不展示。
              display: C.DISPLAY.none,
              // 提示内容，html格式
              html: '<div>这是提示内容<div>'
            },
            // 选择的行数据
            selected: [],
            table: {
              // type：checkbox、radio；title默认为空，可选。
              select: {field: 'id', title: '选择', type: 'checkbox'},
              dropdown: {
                title: '操作',
                actions: [
                  {
                    title: '详细',
                    click: C.CLICK.modal,
                    modal: {
                      type: C.TYPE_MODAL.page,
                      value: 'sys_role_list_detail',
                      query: {}
                    }
                  },
                  {
                    title: '修改',
                    click: C.CLICK.modal,
                    modal: {
                      title: '项目信息',
                      type: C.TYPE_MODAL.href,
                      value: '/views/project/info/project_info.vue',
                      data: {id: '@.id', name: '@.name'}
                    },
                    hidden: 'js:@.id < 0'
                  },
                  {title: '删除', click: C.CLICK.delete, hidden: 'js:@.id > 0', confirm: '确定删除？'},
                  {title: '直接调用js', click: 'js:alert(\'aaaa\')'}]
              },
              columns: [
                {field: 'id', title: '序号', visible: false},
                {field: 'name', title: '名称', type: 'string', format: ''},
                {field: 'code', title: '编码', type: 'string', format: ''},
                {field: 'description', title: '描述', type: 'string', format: ''}
              ],
              p: '1,10',
              order: 'name|+'
            },
            stat: '',
            // 状态
            state: {
              selectedRows: {},
              clickedRow: {}
            }
          }
        }
      }
    ]
  }
}

let instance = new ProjectCfg()
export default instance
