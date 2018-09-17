<template>
    <div>
        <div class="ui jtree"></div>
    </div>
</template>
<script>
    //  import utils from '../../common/utils'
    export default {
        props: {
            opts: {
                type: Object,
                default: function () {
                    return {
                        treeId: '',
                        text: '树'
                    }
                },
                required: true
            }
        },
        data() {
            return {
                model: {},
                defaultValue: {}
            }
        },
        created: function () {
        },
        mounted: function () {
            this.$_load(this.opts.treeId)
        },
        methods: {
            $_load(treeId) {
                if (!treeId) {
                    return
                }
                let thisVue = this
                let $tree = $(thisVue.$el).find('.ui.jtree')
//        let types = {
//          default: {
//            icon: 'fa fa-folder icon-state-warning icon-lg'
//          },
//          root: {
//            icon: 'fa fa-folder icon-state-default icon-lg'
//          },
//          plus: {
//            icon: 'fa fa-plus icon-state-default icon-lg'
//          },
//          edit: {
//            icon: 'fa fa-edit icon-state-default icon-lg'
//          },
//          remove: {
//            icon: 'fa fa-remove icon-state-default icon-lg'
//          }
//        }
                // 获取树节点数据，若无，则创建根节点，同时保存到服务端
                thisVue.$gl.data.query(thisVue.$gl.entityNames.platform.common.treeNode, {treeId: treeId}, 'id,parent,type,text').then(function (res) {
                    let treeData = []
                    console.log('res>', res)
                    if (res.total > 0) {
                        var rootId = ''
                        for (var i in res.data) {
                            let item = res.data[i]
                            if (!item.parent) {
                                rootId = item.id
                                item.parent = '#'
                            }
                            treeData.push(item)
                        }
                        createTree(rootId, treeData)
                    } else {
                        thisVue.$gl.data.save(thisVue.$gl.entityNames.platform.common.treeNode, {
                            text: thisVue.opts.text,
                            type: 'root',
                            treeId: thisVue.opts.treeId
                        }).then(function (res) {
                            treeData = [
                                {
                                    id: res.data,
//                  parent: '#',
                                    text: thisVue.opts.text,
                                    type: 'root',
                                    treeId: thisVue.opts.treeId
                                }
                            ]
                            createTree(res.data, treeData)
                        })
                    }
                })

                function createTree(id, treeData) {
                    let rootId = id + '_anchor'
                    let menuItems = $.jstree.defaults.contextmenu.items()
                    menuItems.create.label = '新建'
                    menuItems.rename.label = '重命名'
                    menuItems.remove.label = '删除'
                    menuItems.ccp = null
//          menuItems.ccp.label = '编辑'
//          menuItems.ccp.submenu.copy.label = '复制'
//          menuItems.ccp.submenu.cut.label = '剪切'
//          menuItems.ccp.submenu.paste.label = '粘贴'
                    $tree.jstree({
                        core: {
                            animation: 0,
                            check_callback: true,
                            themes: {stripes: true},
                            data: treeData
                        },
                        types: {
                            '#': {
                                'max_children': 1,
                                'max_depth': 4,
                                'valid_children': ['root']
                            },
                            'root': {
                                'icon': 'fa fa-folder icon-state-default icon-lg',
                                'valid_children': ['default']
                            },
                            'default': {
                                'icon': 'fa fa-folder icon-state-warning icon-lg',
                                'valid_children': ['default', 'file']
                            },
                            'file': {
                                'icon': 'fa fa-file icon-state-warning icon-lg',
                                'valid_children': []
                            }
                        },
                        contextmenu: {
                            items: function (obj) {
                                menuItems.remove._disabled = function (data) {
                                    console.log('contextmenu>', data)
                                    return data.reference[0].id === rootId
                                }
                                menuItems.rename._disabled = function (data) {
                                    return data.reference[0].id === rootId
                                }
                                return menuItems
                            }
                        },
                        plugins: [
                            'contextmenu', 'dnd', 'search',
                            'state', 'types', 'wholerow'
                        ]
                    }).on('create_node.jstree', function (e, data) {
                        console.log('create......', data)
                        thisVue.$gl.data.save(thisVue.$gl.entityNames.platform.common.treeNode, {
                            parent: data.node.parent,
                            text: data.node.text,
                            type: data.node.type,
                            treeId: thisVue.opts.treeId
                        }).then(function (res) {
                            console.log('res save>', res)
                            data.instance.set_id(data.node, res.data)
                        })
                        // fail data.instance.refresh()
                    }).on('delete_node.jstree', function (e, data) {
                        thisVue.$gl.data.delete(thisVue.$gl.entityNames.platform.common.treeNode, {
                            id: data.node.id
                        })
                    }).on('rename_node.jstree', function (e, data) {
                        thisVue.$gl.data.save(thisVue.$gl.entityNames.platform.common.treeNode, {
                            id: data.node.id,
                            text: data.node.text
                        })
                    }).on('activate_node.jstree', function (e, data) {
                        thisVue.$emit('click', data.node)
                    })
                }
            }
//      $_submit (e) {
//        let result = {}
//        this.$emit('input', result)
//      },
//      reset () {
//        let self = this
//        for (let p in this.defaultValue) {
//          // notice:the html element can only be change by vm.$set or Vue.set after model created.
//          self.$set(self.model, p, self.defaultValue[p])
//        }
//      }
        },
        components: {}
    }
</script>
<style scoped>
</style>
