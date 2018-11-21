<template>
    <div class="gl-content-wrapper">
        <div class="ui mini form">
            <div>
                <!--<input type="text" placeholder="输入实体编码或查询KEY..." v-model="form.entity" readonly>-->
                <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="$_addForm"><i class="add icon"></i>表单-->
                <!--</div>-->
                <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="$_addTabs"><i class="add icon"></i>选项卡-->
                <!--</div>-->
                <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="$_addList"><i class="add icon"></i>列表-->
                <!--</div>-->
                <!--<div class="ui mini basic button" :class="$gl.ui.color.primary" @click="$_addToolbar"><i class="add icon"></i>工具条-->
                <!--</div>-->
                <!--<div class="five ui mini icon buttons">-->
                <!--<button class="ui button" @click="$_addHeader">标题</button>-->
                <!--<button class="ui button" @click="$_addForm">表单</button>-->
                <!--<button class="ui button" @click="$_addTabs">选项卡</button>-->
                <!--<button class="ui button" @click="$_addList">列表</button>-->
                <!--<button class="ui button" @click="$_addToolbar">工具条</button>-->
                <!--</div>-->
                <div class="ui basic mini labels" :class="$gl.ui.color.primary">
                    <i class="plus icon" style="margin-left: 0.5em"></i>
                    <a class="ui label" @click="$_addHeader">标题</a>
                    <a class="ui label" @click="$_addForm">表单</a>
                    <a class="ui label" @click="$_addTabs">选项卡</a>
                    <a class="ui label" @click="$_addList">列表</a>
                    <a class="ui label" @click="$_addToolbar">工具条</a>
                </div>
            </div>
            <div class="ui fitted divider" style="margin-top: 0.25em;"></div>
            <draggable :list="cards">
                <transition-group>
                    <div class="ui cards gl-settings" v-if="cards" v-for="(card,index) in cards" :key="index">
                        <div class="ui card">
                            <div class="content gl-hover-header">
                                <div class="right floated gl-hover-content">
                                    <i class="arrow up icon gl-action" title="向上"
                                       @click="$gl.utils.moveup(cards, index)" v-if="index!==0"></i>
                                    <i class="arrow down icon gl-action" title="向下"
                                       @click="$gl.utils.movedown(cards, index)"
                                       v-if="index!==cards.length-1"></i>
                                    &nbsp;&nbsp;
                                    <i class="plus icon gl-action" title="添加" :class="$gl.ui.color.primary"
                                       @click="$_addCardItem(card)" v-if="card.items"></i>
                                    &nbsp;&nbsp;
                                    <i class="remove red icon gl-action" title="删除" :class="$gl.ui.color.negative"
                                       @click="$gl.utils.remove(cards, index,'是否删除')"></i>
                                </div>
                                <div class="">{{dict[card.type]}}</div>
                            </div>
                            <template v-if="card.type==='tab'">
                                <div class="content" v-if="card.items">
                                    <div class="ui fluid action input" style="margin-bottom: 3px"
                                         v-for="(item,index) in card.items">
                                        <label class="ui label">
                                            <!--<i class="arrow up icon"  title="向上"-->
                                            <!--@click="$gl.utils.moveup(card.items, index)" v-if="index!==0"></i>-->
                                            <i class="arrow down icon gl-action" title="向下"
                                               @click="$gl.utils.movedown(card.items, index)"
                                               v-if="index!==card.items.length-1"></i>
                                            <i class="remove red icon gl-action" title="删除"
                                               :class="$gl.ui.color.negative"
                                               @click="$gl.utils.remove(card.items, index,'是否删除')"></i>
                                        </label>
                                        <input type="text" placeholder="未设置..." v-model="item.name" readonly>
                                        <div class="ui mini button" @click="$_loadMeta"><i class="cog icon"
                                                                                           title="设置"></i></div>
                                    </div>
                                </div>
                                <!--<div class="extra content">-->
                                <!--<button class="ui button">xx</button>-->
                                <!--</div>-->
                            </template>
                            <template v-else-if="card.type==='form'">
                                <div class="content">
                                    <div class="ui fluid action input">
                                        <input type="text" placeholder="未设置..." v-model="card.name" readonly>
                                        <div class="ui mini button" @click="$_loadMeta(card)"><i class="cog icon"
                                                                                                 title="设置"></i>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="card.type==='header'">
                                <div class="content">
                                    <div class="ui fluid action input">
                                        <input type="text" placeholder="未设置..." v-model="card.name">
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>
<script>
    import Draggable from 'vuedraggable'

    export default {
        props: {
            editorStore: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                cards: this.editorStore.editingPage.content.opts.ui.cards,
                dict: {
                    header: '标题(header)',
                    list: '列表(List)',
                    form: '表单(Form)',
                    tab: '选项卡(Tab)',
                    toolbar: '工具条(Toolbar)',
                    'ht-table': '表格(Table)'
                }
            }
        },
        watch: {
            'editorStore.editingPage.id': function (val, oval) {
//        this.form.code = this.editingPage.code
//        this.form.description = this.editingPage.description
            }
        },
        mounted: function () {
            // this.$_sortCards()
            // this.$_sortCardItems()
            console.log('editorStore.editingPage>', this.editorStore.editingPage)
        },
        methods: {
            // $_sortCards () {
            //   $(this.$el).find('.ui.cards.sortable').sortable()
            //   // $(this.$el).find('.ui.cards.sortable').disableSelection()
            // },
            // $_sortCardItems () {
            //   $(this.$el).find('.ui.cards.sortable .content.sortable').sortable()
            //   // $(this.$el).find('.ui.cards.sortable').disableSelection()
            // },
            $_addHeader(e) {
                this.cards.push({
                    type: 'header',
                    name: '标题...',
                    opts: {}
                })
            },
            $_addForm(e) {
                this.cards.push({
                    type: 'form',
                    name: '',
                    opts: {
                        layout: '', // html
                        theme: '', // vue file
                        fields: [],
                        rules: [] // validate rules}
                    }
                })
            },
            $_addTabs(e) {
                this.cards.push({
                    type: 'tab',
                    name: '',
                    items: [
                        {
                            type: 'form',
                            name: 'form1',
                            opts: {
                                layout: '', // html
                                theme: '', // vue file
                                fields: [],
                                rules: [] // validate rules
                            }
                        },
                        {
                            type: 'form',
                            name: 'form2',
                            opts: {
                                layout: '', // html
                                theme: '', // vue file
                                fields: [],
                                rules: [] // validate rules
                            }
                        }]
                })
            },
            $_addCardItem(card) {
                card.items.push({
                    type: 'form',
                    name: 'form1',
                    opts: {
                        layout: '', // html
                        theme: '', // vue file
                        fields: [],
                        rules: [] // validate rules
                    }
                })
            },
            $_addList(e) {
                this.cards.push({
                    type: 'list',
                    name: '',
                    opts: {
                        layout: '', // html
                        theme: '', // vue file
                        fields: [],
                        rules: [] // validate rules}
                    }
                })
            },
            $_addToolbar(e) {
                this.cards.push({
                    type: 'toolbar',
                    name: '',
                    opts: {
                        actions: [
                            {
                                title: '创建',
                                click: 'modal',
                                modal: {
                                    title: '编辑示例实体',
                                    type: 'page',
                                    value: '/components/page/PageLoader.vue',
                                    opts: {
                                        code: '',
                                        query: {}
                                        // entityName: 'platform_demo_entity',
                                        // fields: 'id,name,type,code,content,description',
                                        // layout: [
                                        //   [{name: [4, 8]}, {code: [4, 8]}],
                                        //   [{type: [4, 8]}],
                                        //   [{content: [4, 20]}],
                                        //   [{description: [4, 20]}]
                                        // ]
                                    }
                                },
                                color: 'primary'
                            },
                            {title: '删除', click: 'delete', confirm: '确定删除？', color: 'negative'}
                        ]
                    }
                })
            },
            $_loadMeta(card) {
                // console.log('ui.toolbar.dropdown.actions>', this.editorStore.editingPage.content.opts.ui.toolbar.dropdown.actions)
                let thisVue = this
                this.$gl.ui.openVueByPath(this, '/views/platform-ide/plugins/form-combination/FormDesigner',
                    {
                        title: '表单配置',
                        opts: {
                            table: card.opts.table,
                            editorStore: thisVue.editorStore
                        }
                    }, {
                        close: function (e, value) {
                            card.opts.table = value
                            console.log('editorStore', thisVue.editorStore)
                            console.log('value>', value)
                        }
                    }
                )
            },
            $_commit() {
                return {code: 0, msg: ''}
            }
        },
        components: {Draggable}
    }
</script>
<style scoped>
</style>

