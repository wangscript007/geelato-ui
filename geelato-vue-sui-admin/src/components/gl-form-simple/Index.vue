<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
  基于简单表单的信息可以转换成高级表单
-->
<template>
    <!---->
    <table class="ui small compact form gl-form gl-col-24" style="table-layout: fixed">
        <thead></thead>
        <tbody>
        <tr v-for="(row,index) in opts.layout">
            <template v-for="(cell,cellIndex) in row" v-if="item=metaMap[Object.keys(cell)[0]]">
                <td :colspan="Object.values(cell)[0][0]">{{item.title}}</td>
                <td :colspan="Object.values(cell)[0][1]">
                    <template v-if="item.type==='String'&&item.charMaxLength<255">
                        <input type="text" v-model=" form[Object.keys(cell)[0]]">
                    </template>
                    <template v-else-if="item.type==='String'&&item.charMaxLength>255">
                        <textarea rows="5" v-model="form[Object.keys(cell)[0]]"></textarea>
                    </template>
                    <template v-else-if="item.type==='Boolean'">
                        <sui type="checkbox" v-model="form[Object.keys(cell)[0]]">
                            <div class="ui checkbox">
                                <input type="checkbox">
                                <label></label>
                            </div>
                        </sui>
                    </template>
                </td>
            </template>
        </tr>
        </tbody>
        <tfoot>
        </tfoot>
    </table>
</template>
<script>
    //  import utils from '../../common/utils'
    export default {
        props: {
            opts: {
                type: Object,
                required: false,
                default: function () {
                    return {
                        entityName: '',
                        fields: '',
                        layout: [
//              [{name: [3, 9]}, {name: [3, 9]}],
//              [{id: [3, 9]}, {loginName: [3, 9]}],
//              [{description: [3, 21]}]
                        ],
                        model: {}
                    }
                }
            }
        },
        data() {
            return {
                meta: [],
                form: {}
            }
        },
        computed: {
            /**
             * 将元数据数组转成对象格式，如 {id: {…}, name: {…}, loginName: {…}, description: {…}}
             * */
            metaMap: function () {
                let result = {}
                for (let i in this.meta) {
                    let field = this.meta[i]
                    result[field.name] = field
                }
//        console.log('元数据：', result)
                return result
            }
            /**
             * 解决析开modal时，传过来的参数带多了一层opts的问题
             * */
            // options: function () {
            //     if (this.opts && this.opts.opts) {
            //         return this.opts.opts
            //     } else {
            //         return this.opts
            //     }
            // }
        },
        created: function () {
            this.loadData()
            this.setModal()
        },
        mounted: function () {
        },
        methods: {
            loadData() {
                console.log('基于以下参数，构建表单>', this.opts)
                let theVue = this
                let id = theVue.opts.model && theVue.opts.model.id ? theVue.opts.model.id : -1
                this.$gl.data.query(theVue.opts.entityName, {id: id}, theVue.opts.fields, true).then(function (res) {
                    console.log('基于主键(id:' + id + ')获取表单信息及其元数据信息>', res)
                    theVue.form = res.data && res.data.length > 0 ? res.data[0] : {}
                    theVue.meta = res.meta
                })
            },
            save() {
                let thisVue = this
                if (typeof this.$parent.close === 'function') {
                    this.$gl.data.save(this.opts.entityName, this.form).then(function (res) {
//            console.log('save form res>', res)
                        thisVue.$parent.close()
                    })
                }
            },
            /**
             * 设置弹层的操作按钮及操作事件
             */
            setModal() {
                let modal = this.$parent
                if (!modal.addAction) {
                    return
                }
                modal.addAction({name: 'save', title: '保存', fn: this.save})
                // cancel是modal内容的方法，这里可以简写成：{name: 'cancel'}
                modal.addAction({name: 'cancel', title: '取消', fn: modal.cancel})
                modal.updateActions()
            }
        },
        components: {}
    }
</script>
<style scoped>
</style>
