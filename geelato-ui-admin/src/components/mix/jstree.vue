<template>
  <div class="ui jstree">
  </div>
</template>
<script>
  export default {
    props: {
      opts: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        theme: this.$GL.ui.theme.color.primary,
        types: {
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
      }
    },
    mounted () {
      this.$_initUi()
    },
    updated () {
    },
    methods: {
      $_initUi () {
        let thisVue = this
        let contextmenu = {
          items: function (obj) {
            let disable = thisVue.$_isFile(obj.type)
            let items = {
              create: {
                // 解决第一下action，默认是false，移动之后才按_disabled生效的问题
                separator_before: true,
                label: thisVue.$_createIconLabel('新建', 'plus'),
                action: false,
                _disabled: disable,
                submenu: disable ? false : {
                  create_html5: thisVue.$_createNode('普通页面', 'default', function (nodeId) {
//                      self.newPage({id: nodeId, text: '普通页面', type: 'default'})
                  }),
                  create_folder: thisVue.$_createNode('目录', 'default')
                }
              },
              rename: {
                label: thisVue.$_createIconLabel('重命名', 'edit'),
                _disabled: false,
                action: function (data) {
                  $.jstree.reference(data.reference).edit(data.reference, undefined, thisVue.$_updateNode)
                }
              },
              remove: {
                label: thisVue.$_createIconLabel('删除', 'remove'),
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
        let config = {
          contextmenu: contextmenu,
          types: thisVue.types,
          plugins: ['types']
        }
        $.extend(config, this.opts, true)
        $(this.$el).jstree(config)
      },
      $_createNode (label, typeName, callback) {
//        let type = this.types[typeName]
        return {
          label: this.$_createIconLabel(label, typeName),
          action: function (data) {
//            let treeNode = {
//              text: '新' + label,
//              icon: type.icon,
//              type: typeName,
//              treeId: '876251651961815736'
//            }
//            thisVue.$GL.data.save(entityNames.platform.common.treeNode, treeNode).then(function (res) {
//              treeNode.id = res.data
//              let $ref = $.jstree.reference(data.reference)
//              console.log('$ref>', $ref)
//              console.log('data.reference>', data.reference)
//              console.log('treeNode>', treeNode)
//              let nodeId = $ref.create_node(data.reference, treeNode, 'last')
//              if (nodeId === false) {
//                console.error('创建失败，nodeId>', nodeId)
//              }
//              $ref.select_node(nodeId)
//              $ref.edit(nodeId, undefined, thisVue.updateNode)
//              if ($.isFunction(callback)) callback(nodeId)
//            })
          }
        }
      },
      $_createIconLabel (label, typeName) {
        let type = this.types[typeName]
        return '<span class="' + type.icon + '"></span>' + label
      },
      $_isFile (type) {
        return type === 'default'
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
