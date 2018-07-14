<template>
  <div style="padding:0.5em 1em">
    <div v-if="pageStage==='querying'" class="ui padded grid task-list">
      <div class="sixteen wide column task-topbar">
        <div class="ui mini menu">
          <a class="item">
            <div class="ui teal icon button" @click="$_edit('','bug')"><i class="plus icon"></i>创建</div>
          </a>
          <div class="item" style="width: 85%">
            <div class="ui icon input" style="width: 100%">
              <input type="text" placeholder="Search..." style="width: 100%">
              <i class="search icon"></i>
            </div>
          </div>
          <div class="right menu">
            <div class="item">
              <div class="ui teal button">报告</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isMax" class="three wide column task-list-query">
        <div class="task-projects">
        </div>
      </div>
      <div class="thirteen wide column task-list-result">
        <div class="ui mini borderless secondary menu task-list-toolbar gl-header">
          <!--<a class="item gl-page-sidebar-toggle" @click="$_toggleSidebar">-->
          <!--<i class="sidebar icon"></i>-->
          <!--</a>-->
          <!--<div class="item">-->
          <!--<div class="ui teal icon button"><i class="plus icon"></i>创建</div>-->
          <!--</div>-->
          <div class="item">
            <div class="ui checkbox" style="margin-left: 3.2em">
              <input type="checkbox" name="example">
              <label class="ui teal">选择</label>
            </div>
          </div>
          <div class="ui dropdown item">
            指派 <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">给我</a>
              <a class="item">给其它人</a>
            </div>
          </div>
          <div class="ui dropdown item">
            关联 <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">依赖于...</a>
              <a class="item">被...依赖</a>
              <a class="item">作为...的子项</a>
              <a class="item">作为...的父项</a>
            </div>
          </div>
          <div class="right menu">
            <div class="ui dropdown item">
              单行视图 <i class="dropdown icon"></i>
              <div class="menu">
                <a class="item">单行视图</a>
                <a class="item">多行视图</a>
                <a class="item">详情视图</a>
              </div>
            </div>
            <div class="ui dropdown item">
              导出 <i class="dropdown icon"></i>
              <div class="menu">
                <a class="item">Excel</a>
                <a class="item">Word</a>
                <a class="item">Pdf</a>
              </div>
            </div>
            <div class="item">
              <div class="ui teal button">设置</div>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="ui divided small items">
          <div class="item">
            <div class="ui mini image">
              <img src="/static/images/avatar/large/jenny.jpg">
            </div>
            <div class="content">
              <h4 class="ui teal header">
                <div class="ui checkbox">
                  <input type="checkbox" name="example">
                  <label class="ui teal">合同系统-129 保存用户信息失败</label>
                </div>
              </h4>
              <div class="task-datetime">2017-12-12 20:25</div>
              <div class="description">
                保存用户信息时，提示用户名不能为空。保存用户信息时，提示用户名不能为空。保存用户信息时，提示用户名不能为空。
              </div>
              <div class="task-action">
                <div style="float: right;display: inline-block">
                  <div class="ui inline basic icon mini button">
                    <i class="teal comment outline icon" title="评论"></i>&nbsp;
                    <i class="teal expand icon" title="展开"></i>
                    <!--<i class="teal compress icon" title="收缩"></i>-->
                  </div>
                </div>
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">一般</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      优先级
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">问题</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      类型
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">待处理</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      状态
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">V1.1.1</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      优先级
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="ui mini image">
              <img src="/static/images/avatar/large/jenny.jpg">
            </div>
            <div class="content">
              <h4 class="ui teal header">Veronika Ossi</h4>
              <div class="description">
                <p></p>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="ui mini image">
              <img src="/static/images/avatar/large/jenny.jpg">
            </div>
            <div class="content">
              <h4 class="ui teal header">Jenny Hess</h4>
              <div class="description">
                <p></p>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="align right content">
              一页<50>条记录
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pageStage==='editing'" class="task-form">
      <!--<task-form></task-form>-->
    </div>
  </div>
</template>
<script>
//  import taskForm from './form'
  import entityNames from '../../../pages/entities'

  export default {
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        // 页面状态
        pageStage: 'querying'
      }
    },
    mounted: function () {
      this.$_initUi()
    },
    methods: {
      $_initUi: function () {
        $(this.$el).find('.ui.accordion').accordion()
        $(this.$el).find('.ui.dropdown').dropdown()
//        $(this.$el).find('.ui.menu>.item[data-tab]').tab()
//        $(this.$el).find('.ui.menu>.item[data-tab*="designer-sub-tab"]').tab()
        this.$_initProjects()
      },
      $_toggleSidebar () {
        this.isMax = !this.isMax
      },
      $_initProjects () {
        let thisVue = this
        $.jstree.defaults.contextmenu.select_node = false
        $.jstree.defaults.contextmenu.show_at_node = true
        let projectTreeData = [{
          id: '876251651961815736',
          text: '需求',
          type: 'root'
        }]
        let $tree = $(this.$el)
        // 如果已初始化则更新数据
        if ($tree.jstree(true).settings) {
          $tree.jstree(true).settings.core.data = projectTreeData
          $tree.jstree(true).refresh()
        }
        let types = {
          default: {
            icon: 'fa fa-folder icon-state-warning icon-lg'
          },
          root: {
            icon: 'fa fa-folder icon-state-default icon-lg'
          },
          plus: {
            icon: 'fa fa-plus icon-state-default icon-lg'
          },
          edit: {
            icon: 'fa fa-edit icon-state-default icon-lg'
          },
          remove: {
            icon: 'fa fa-remove icon-state-default icon-lg'
          }
        }
        let $projectTree = $(this.$el).find('.task-projects')
        $projectTree.jstree({
          core: {
            themes: {
              responsive: false
            },
            data: projectTreeData
          },
          types: types,
          state: {},
          plugins: ['contextmenu', 'dnd', 'state', 'types'],
          contextmenu: {
            items: function (obj) {
              let disable = isFile(obj.type)
              let items = {
                create: {
                  // 解决第一下action，默认是false，移动之后才按_disabled生效的问题
                  separator_before: true,
                  label: createIconLabel('新建', 'plus'),
                  action: false,
                  _disabled: disable,
                  submenu: disable ? false : {
                    create_html5: createNode('普通页面', 'default', function (nodeId) {
//                      self.newPage({id: nodeId, text: '普通页面', type: 'default'})
                    }),
                    create_folder: createNode('目录', 'default')
                  }
                },
                rename: {
                  label: createIconLabel('重命名', 'edit'),
                  _disabled: false,
                  action: function (data) {
                    $.jstree.reference(data.reference).edit(data.reference, undefined, thisVue.$_updateNode)
                  }
                },
                remove: {
                  label: createIconLabel('删除', 'remove'),
                  _disabled: function (data) {
                    let node = $.jstree.reference(data.reference).get_node(data.reference)
                    if (node.type === 'root') {
                      // node.parent === '#' || !node.parent
//                    alert('根节点不能删除！')
                      return true
                    }
                    return false
                  },
                  action: function (data) {
                    $.jstree.reference(data.reference).delete_node(data.reference)
                  }
                },
                ccp: null
              }
              return items
            }
          }
        })
        function isFile (type) {
          return type === 'default'
        }

        function createIconLabel (label, typeName) {
          let type = types[typeName]
          return '<span class="' + type.icon + '"></span>' + label
        }

        function createNode (label, typeName, callback) {
          let type = types[typeName]
          return {
            label: createIconLabel(label, typeName),
            action: function (data) {
              let treeNode = {
                text: '新' + label,
                icon: type.icon,
                type: typeName,
                treeId: '876251651961815736'
              }
              thisVue.$gl.data.save(entityNames.platform.common.treeNode, treeNode).then(function (res) {
                treeNode.id = res.data
                let $ref = $.jstree.reference(data.reference)
                console.log('$ref>', $ref)
                console.log('data.reference>', data.reference)
                console.log('treeNode>', treeNode)
                let nodeId = $ref.create_node(data.reference, treeNode, 'last')
                if (nodeId === false) {
                  console.error('创建失败，nodeId>', nodeId)
                }
                $ref.select_node(nodeId)
                $ref.edit(nodeId, undefined, thisVue.updateNode)
                if ($.isFunction(callback)) callback(nodeId)
              })
            }
          }
        }
      },
      $_save () {
        this.$_query()
      },
      $_edit (id, type, to) {
        this.pageStage = 'editing'
      },
      $_query () {
        this.pageStage = 'querying'
      },
      $_updateNode (node, status, cancelled) {
        if (cancelled) {
          return false
        }
        let thisVue = this
        if (node.parent === '#') {
          // 如果是根节点，则更改项目名称
          let project = {id: node.id, name: node.text}
          thisVue.$gl.data.save(entityNames.platform.dev.project, project).then(function (res) {
            console.log('更新项目名称为' + node.text + ',更新返回：', res)
          })
        } else {
          // 如果是叶节点，则更改文件或目录名称
          let treeNode = {
            id: node.id,
            text: node.text,
            type: node.type,
            treeId: '876251651961815736'
          }
          thisVue.$gl.data.save(entityNames.platform.common.treeNode, treeNode).then(function (res) {
            console.log('更新节点名称为' + node.text + ',更新返回：', res)
          })
        }
//        console.log('node>', node)
//        console.log('status>', status)
//        console.log('cancelled>', cancelled)
      }

    },
    components: {}
  }
</script>
<style>

  .items > .item .image > img {
    /*width: 50% !important;*/
    /*height: 80%;*/
  }

  .task-topbar.sixteen.wide.column {
    padding-bottom: 0 !important;
  }

  .items > .item > .content > .task-action {
    margin-top: 0.5em;
  }

  .items > .item .task-datetime {
    font-size: 0.8em;
    font-weight: bold;
    float: right;
    margin-right: 1em;
    display: inline-block;
  }

  .items > .item > .content > .task-action .mini.button {
    padding: 0.35em 0.6em 0.35em;
  }

  .items > .item > .content > .description {
    font-size: 0.9em !important;
  }

  .menu.task-list-toolbar {
    border: 0;
  }

  /*.task-list-area > .ui.divider {*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*}*/
</style>
