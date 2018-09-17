<template>
    <div class="gl-tree">
    </div>
</template>

<script>
    // import SimplePageDefinition from '../../assets/script/SimplePageDefinition'

    export default {
        props: {
            entity: {
                type: Object,
                required: true
            },
            fileTypes: {},
            extendEntityId: [Number, String]
        },
        data() {
            return {}
        },
        watch: {
            'extendEntityId': function (val, oval) {
                let thisVue = this
                let project = this.editorStore.project
                var treeData = [{
                    id: project.id,
                    text: project.name || '新项目',
                    parent: '#',
                    type: 'root'
                }]
                thisVue.$gl.data.query(thisVue.entityNames.platform.common.treeNode, {treeId: project.id}, 'id,parent,text,type').then(function (res) {
                    console.log('res>', res)
                    thisVue.$_newTree(treeData.concat(res.data))
                })
            }
        },
        mounted: function () {
        },
        methods: {
            $_newTree(treeData) {
                console.log('treeData>', treeData)
                let thisVue = this
                $.jstree.defaults.contextmenu.select_node = false
                $.jstree.defaults.contextmenu.show_at_node = true
                let $tree = $(this.$el)
                // 如果已初始化则更新数据
                if ($tree.jstree(true).settings) {
                    $tree.jstree(true).settings.core.data = treeData
                    $tree.jstree(true).refresh()
                }
                let types = {
                    default: {
                        icon: 'folder icon'
                    },
                    root: {
                        icon: 'folder icon'
                    },
                    plus: {
                        icon: 'plus icon'
                    },
                    edit: {
//            icon: 'fa fa-edit icon-state-default icon-lg'
                        icon: 'edit icon'
                    },
                    remove: {
                        icon: 'remove icon'
                    }
                }
                $.extend(types, thisVue.fileTypes)
                $tree.jstree({
                    core: {
                        themes: {
                            responsive: false
                        },
                        check_callback: function (operation, node, nodeParent, nodePosition, more) {
                            // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
                            // in case of 'rename_node' node_position is filled with the new node name
                            if (operation === 'move_node') {
//              console.log('node_parent.original.type === "html5" >' + (nodeParent.original.type === 'html5') + '>', nodeParent.original)
                                if (nodeParent.original && isFile(nodeParent.original.type)) {
                                    // 不能移动到html5等文件节点下
                                    return false
                                } else if (!nodeParent.parent) {
                                    // 必须有父节点，即限制只有一个根节点
                                    return false
                                }
                            } else if (operation === 'delete_node') {
                                if (node.parent === '#' || !node.parent) {
                                    thisVue.$gl.ui.showMsg('根节点不能删除！', 'warning')
                                    return false
                                }
                            }
                            return true // allow all other operations
                        },
                        data: treeData
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
                                    submenu: disable ? false : createSubmenuItems()
                                },
                                rename: {
                                    label: createIconLabel('重命名', 'edit'),
                                    _disabled: false,
                                    action: function (data) {
                                        console.log('rename>', data)
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
                                        // TODO 删除成功，才删除前端节点
                                        let node = $.jstree.reference(data.reference).get_node(data.reference)
                                        console.log('removing node>', node)
                                        thisVue.$_removePage(node.id)
                                        $.jstree.reference(data.reference).delete_node(data.reference)
                                    }
                                },
                                ccp: null
                            }
                            return items
                        }
                    }
                })
                $tree.bind('dblclick.jstree', function (event) {
                    // jstree的双击事件针对整个jstree对象，不区分是否为节点。这里对叶子节点的双击事件生效
                    if (!$(event.target).parent().hasClass('jstree-leaf')) {
                        return
                    }
                    var $node = $(event.target).closest('li')
                    let data = getFileNodeData($node)
                    // 且叶子节点为文件类型才生效
                    if (data.type) {
                        thisVue.$emit('open_node', {node: data})
                    }
                })
                $tree.jstree(true).open_all()

                function getFileNodeData($node) {
                    for (var type in thisVue.fileTypes) {
                        let selector = '.' + thisVue.fileTypes[type].icon.split(' ').join('.').replace(/\s+/g, '')
                        let data = $.jstree.reference($tree).get_node($node.find(selector))
                        if (data.type) {
                            return data
                        }
                    }
                    return {}
                }

                function isFile(type) {
                    return !!thisVue.fileTypes[type]
                }

                function createIconLabel(label, typeName) {
                    let type = types[typeName]
                    return '<span class="' + type.icon + '"></span>' + label
                }

                /**
                 *  返回结果如：
                 *  create_html5: createNode('普通页面', 'html5', function (nodeId) {
                 *    thisVue.$_newPage({id: nodeId, text: '普通页面', type: 'html5'})
                 *  }),
                 *  create_folder: createNode('目录', 'default')
                 */
                function createSubmenuItems() {
                    let items = {}
                    console.log('thisVue.fileTypes>', thisVue.fileTypes)
                    for (let fileType in thisVue.fileTypes) {
                        let item = thisVue.fileTypes[fileType]
                        items['create_' + fileType] = createNode(item.name, fileType, function (nodeId) {
                            thisVue.$_newPage({id: nodeId, text: item.name, type: fileType})
                        })
                    }
                    items.create_folder = createNode('目录', 'default')
                    return items
                }

                function createNode(label, typeName, callback) {
                    // console.log($(thisVue.$el))
                    let type = types[typeName]
                    return {
                        label: createIconLabel(label, typeName),
                        action: function (data) {
                            let treeNode = {
                                text: '新' + label,
                                icon: type.icon,
                                type: typeName,
                                treeId: thisVue.editorStore.project.id
                            }
                            thisVue.$gl.data.save(thisVue.entityNames.platform.common.treeNode, treeNode).then(function (res) {
                                treeNode.id = res.data
                                let $ref = $.jstree.reference(data.reference)
//                console.log('$ref>', $ref)
//                console.log('data.reference>', data.reference)
//                console.log('treeNode>', treeNode)
                                let nodeId = $ref.create_node(data.reference, treeNode, 'last')
//                console.log('nodeId>', nodeId)
                                $ref.deselect_all()
                                $ref.select_node(nodeId)
                                // TODO 这里无需用edit，改成弹出页面录入节点名称
                                $ref.edit(nodeId, undefined, thisVue.$_updateNode)
                                if ($.isFunction(callback)) callback(nodeId)
                            })
                        }
                    }
                }
            },
            $_newPage(data) {
//        let obj = data
                // TODO是否保存旧的page
//        this.$emit('newPage', {id: obj.id, text: obj.text, type: obj.type})
//        console.log('newPage with params >', {id: obj.id, text: obj.text, type: obj.type})
//        this.editorStore.editingPage.reset({extendId: data.id, name: data.text, type: data.type})
//                 this.editorStore.reset(new SimplePageDefinition({
//                     extendId: data.id,
//                     name: data.text,
//                     type: data.type,
//                     code: data.type + '_' + this.$utils.uuid(8)
//                 }))
                // console.log('thisVue.editorStore1>', this.editorStore)
                this.$_savePage()
//        this.$_openTemplatePage()
            },
            /**
             * 加入本地缓存
             * 保存到服务端
             * 记录保存更新状态
             */
            $_savePage: function () {
                let thisVue = this
                console.log('thisVue.editorStore.editingPage>save>', thisVue.editorStore.editingPage)
//        editorStore.editingPage.component = editorStore.editingPage.component.outerHTML || editorStore.editingPage.component
                thisVue.$gl.data.save(thisVue.entityNames.platform.dev.pageConfig, {
                    id: thisVue.editorStore.editingPage.id,
                    extendId: thisVue.editorStore.editingPage.extendId,
                    type: thisVue.editorStore.editingPage.type,
                    code: thisVue.editorStore.editingPage.code,
                    description: thisVue.editorStore.editingPage.description,
                    content: thisVue.editorStore.editingPage.content
                }).then(function (res) {
                    thisVue.editorStore.editingPage.id = res.data
//          thisVue.$gl.ui.showMsg('页面保存成功', 'success', '')
                }).catch(function (e) {
//          thisVue.$gl.ui.showMsg('页面保存失败', 'fail', '')
                })
            },
            /**
             *
             * @param event
             * @param nodeId 节点树id，对应页面实体的extend_id
             */
            $_removePage(nodeId) {
                let thisVue = this
                // 两张表的删除，合在一个事务中
                thisVue.$gl.data.delete(thisVue.entityNames.platform.dev.pageConfig, {extendId: nodeId})
                thisVue.$gl.data.delete(thisVue.entityNames.platform.common.treeNode, {id: nodeId})
            },
            $_loadCachePage: function (extendId) {
                let thisVue = this
                console.log('$_loadCachePage extendId>' + extendId + '>', this.loadedPages[extendId])
                thisVue.editorStore.editingPage = this.loadedPages[extendId]
                thisVue.editorStore.editingPage.extendId = extendId
            },
            $_updateNode(node, status, cancelled) {
                if (cancelled) {
                    return false
                }
                let thisVue = this
                if (node.parent === '#') {
                    // 如果是根节点，则更改项目名称
                    let project = {id: node.id, name: node.text}
                    thisVue.$gl.data.save(thisVue.entityNames.platform.dev.project, project).then(function (res) {
                        console.log('更新项目名称为' + node.text + ',更新返回：', res)
                    })
                } else {
                    // 如果是叶节点，则更改文件或目录名称
                    let treeNode = {
                        id: node.id,
                        parent: node.parent,
                        text: node.text,
                        type: node.type,
                        treeId: thisVue.editorStore.project.id
                    }
                    thisVue.$gl.data.save(thisVue.entityNames.platform.common.treeNode, treeNode).then(function (res) {
                        console.log('更新节点名称为“' + node.text + '”,更新返回：', res)
                    })
                }
                console.log('node>', node)
//        console.log('status>', status)
//        console.log('cancelled>', cancelled)
            }
        },
        components: {}
    }
</script>
<style scoped>

</style>
