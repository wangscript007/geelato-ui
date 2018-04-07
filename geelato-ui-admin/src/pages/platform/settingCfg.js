// import staticCfgManager from '../staticCfgManager'

class SecurityCfg {
  constructor () {
    this.pageCfgs = [
      {
        code: 'sys_dict_list',
        component: '/components/page/table',
        opts: {
          ui: {
            mode: 'select',
            title: '字典信息',
            entity: 'sys_dict',
            query: {
              // 是否隐藏整个查询区域
              show: true,
              // null或''表示不展示tree过滤区域
              tree: {
                title: '字典树',
                treeId: 'sys_dict_tree',
                text: '根'
              },
              // null或''表示不展示常用过滤器区域
              filter: null,
              // null或''表示不展示综合查询区域
              mix: null
              //   {
              //   // 可用于查询的字段
              //   fields: [
              //     // cop：比较操作符，eq：等于；default：默认值
              //     {field: 'name', title: '名称', cop: 'eq', type: 'string', defalut: '张', placeholder: ''},
              //     // cop：比较操作符，contains：包含；lop：逻辑操作符，or：或者
              //     {field: 'code', title: '编码', cop: 'contains', type: 'string', lop: 'or'},
              //     // and：并且
              //     {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
              //   ]
              // }
            },
            // --end query --
            toolbar: {
              title: '',
              dropdown: {
                title: '',
                actions: [
                  {
                    title: '创建',
                    click: 'modal',
                    modal: {
                      title: '字典信息',
                      type: 'href',
                      value: '/views/geemeta/gm-setting/dict.vue',
                      // 内置变量以$开头
                      data: {groupId: '@.$treeNodeId', groupText: '@.$treeNodeText'}
                    }
                  },
                  {title: '删除', click: 'delete', confirm: '确定删除？'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出EXCEL', click: 'xls'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出PDF', click: 'pdf'},
                  // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                  {title: '打印', click: 'print'}
                ]
              }
            },
            tips: {
              // 展示位置：header|footer|none，当为none或空时，则不展示。
              display: 'none',
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
                  {title: '修改', click: 'open', disable: 'javascript:@.id > 0'},
                  {
                    title: '详细',
                    click: 'modal',
                    modal: {
                      type: 'page',
                      value: 'sys_role_list_detail',
                      query: {}
                    }
                  },
                  {title: '直接调用js', click: 'javascript:alert(\'aaaa\')'}]
              },
              columns: [
                {field: 'id', title: '序号', visible: false},
                {field: 'groupCode', title: '编码', type: 'string', format: ''},
                {field: 'name', title: '名称', type: 'string', format: ''},
                {field: 'value', title: '值', type: 'string', format: ''},
                {field: 'seq', title: '次序', type: 'string', format: ''},
                {field: 'enabled', title: '启用状态', type: 'string', format: 'js:{}==1?"是":"否"'},
                {field: 'description', title: '描述', type: 'string', format: ''}
              ],
              p: '1,10',
              order: 'seq|+'
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

let instance = new SecurityCfg()
// staticCfgManager.register(instance)
export default instance
