<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
-->
<template>
    <div class="ui small compact form">
        <table v-show="layout.type==='table'||!layout.type"
               class="gl-form gl-col-24">
            <thead>
            <tr>
                <th colspan="24">
                    <div class="ui error message segment"></div>
                </th>
            </tr>
            </thead>
            <tbody v-if="init">
            <tr v-for="(row,index) in layout.data">
                <template v-for="(cell,cellIndex) in row"
                          v-if="property=$_getProperty(Object.keys(cell)[0])">
                    <td :colspan="Object.values(cell)[0][0]">
                        <div :hidden="property.hidden===true">
                        <span v-if="property.tips" :data-tooltip="property.tips">
                            <i class="info circle icon"></i>
                        </span>
                            <span class="gl-required">{{$_isRequired(property)?'*':''}}</span>
                            {{property.title||Object.keys(cell)[0]}}
                        </div>
                    </td>
                    <td :colspan="Object.values(cell)[0][1]">
                        <template v-if="property.control==='input'">
                            <input type="text" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                   v-model="form[Object.keys(cell)[0]]" :readonly="property.readonly===true"
                                   :disabled="property.disabled===true" :hidden="property.hidden===true">
                        </template>
                        <template v-else-if="property.control==='textarea'">
                        <textarea rows="5" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                  v-model="form[Object.keys(cell)[0]]" :readonly="property.readonly===true"
                                  :disabled="property.disabled===true"></textarea>
                        </template>
                        <template v-else-if="property.control==='checkbox'">
                            <sui-checkbox :name="Object.keys(cell)[0]" v-model="form[Object.keys(cell)[0]]"
                                          :readonly="property.readonly===true"
                                          :disabled="property.disabled===true"></sui-checkbox>
                            {{property.placeholder}}
                        </template>
                        <template v-else-if=" property.control==='dropdown'">
                            <sui-dropdown selection :options="property.data"
                                          :name="Object.keys(cell)[0]"
                                          :value="form[Object.keys(cell)[0]]"
                                          @input='form[Object.keys(cell)[0]]=$event;$_loadRefData(Object.keys(cell)[0], "")'
                                          :ref="Object.keys(cell)[0]" :readonly="property.readonly===true"
                                          :disabled="property.disabled===true"></sui-dropdown>
                        </template>
                        <template v-else-if="property.control==='email'">
                            <input type="email" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                   v-model="form[Object.keys(cell)[0]]" :readonly="property.readonly===true"
                                   :disabled="property.disabled===true">
                        </template>
                        <template v-else-if="property.control==='password'">
                            <input type="password" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                   v-model="form[Object.keys(cell)[0]]" :readonly="property.readonly===true"
                                   :disabled="property.disabled===true">
                        </template>
                    </td>
                </template>
            </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
    </div>

</template>
<script>
    export default {
        props: {
            opts: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
                init: false,
                form: {},
                layout: this.opts.ui.layout,
                properties: this.opts.ui.properties,
                ds: this.opts.ui.ds,
                // 数据源被依赖，格式为：被依赖的属性:[依赖的属性,依赖的属性...]
                dsBeDependentOn: {}
            }
        },
        created: function () {

        },
        mounted: function () {
            console.log('form mounted')
            this.$_reset()

        },
        methods: {
            $_reset(opts) {
                if (opts) {
                    this.properties = opts.ui.properties
                    this.layout = opts.ui.layout
                    this.ds = opts.ui.ds
                    this.dsBeDependentOn = {}
                    this.form = {}
                    this.init = false
                }
                this.$_initConvertData()
                this.$_initUI()
                this.$_loadInitData()
            },
            /**
             * 1、将简化的配置信息转换成完整的配置信息，如只设置了email类型，则将默认增加email验证规则
             * 2、转换并设置一些默认值
             * 3、分析数据源依赖
             *  */
            $_initConvertData() {
                let thisVue = this
                for (let key in this.properties) {
                    // identifier 是 semantic ui form validate 需用到的属性
                    this.properties[key].identifier = key
                    let property = this.properties[key]
                    // ！！需采用vm.$set的方式，来设置值，确保值变化可被检测
                    // @see https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
                    this.$set(this.form, key, property.value === undefined ? '' : property.value)
                    // 依据字段类型，自动构建字段验证规则信息，基于semantic ui form validate
                    if (property.control === 'email' && (!property.rules)) {
                        property.rules = []
                        this.properties[key].rules.push({type: 'email'})
                    }
                }
                // 3、构建数据源依赖 dsBeDependentOn
                // e.g. {provinceCode: 'gs:$ctx.province'}
                let pattern = /gs[\s]*\:[\s]*\$ctx\.[a-zA-Z]+[a-zA-Z0-9]*/g;
                for (let propertyName in this.ds) {
                    let propertyDs = this.ds[propertyName]
                    for (let paramName in propertyDs.params) {
                        let paramValue = propertyDs.params[paramName]
                        if (pattern.test(paramValue)) {
                            paramValue.match(pattern).forEach(function (item, index) {
                                let dependPropertyName = item.substring(item.lastIndexOf('\.') + 1)
                                thisVue.dsBeDependentOn[dependPropertyName] = thisVue.dsBeDependentOn[dependPropertyName] || []
                                thisVue.dsBeDependentOn[dependPropertyName].push(propertyName)
                                console.log('dependPropertyName>', dependPropertyName, propertyName, thisVue.dsBeDependentOn)
                            })
                        }
                    }
                }
                this.init = true
            },
            // 加载远程的初始化数据，如字典信息
            $_loadInitData() {
                console.log('property.ds $_loadInitData')
                for (let propertyName in this.properties) {
                    let property = this.properties[propertyName]
                    // && this.ds[property.ds].lazy !== true
                    if (property.ds) {
                        console.log('property.ds', property.ds)
                        this.$_loadData(propertyName, property, property.ds)
                    }
                }
            },
            $_initUI() {
                $(this.$el).form({
                    fields: this.properties,
                    onFailure: function (formErrors, fields) {
                        console.log('onFailure>', formErrors, 'fields>', fields)
                    },
                    onSuccess: function (event, fields) {
                        console.log('onSuccess>', fields)
                    }
                    // inline: false,
                    // on: 'blur'
                })
            },
            /**
             * 检查字段是否必填
             * @param property 字段配置信息
             * @returns {boolean}
             */
            $_isRequired(property) {
                if (!property.rules || property.rules.length === 0) {
                    return false
                } else {
                    return property.rules.filter(item => item.type === 'empty' || item.type === 'checked').length > 0
                }
            },
            $_getValues() {
                return this.form
            },
            $_validate() {
                let $form = $(this.$el)
                $form.form('validate form')
            },
            $_clearValidateMessage() {
                $(this.$el).find('.ui.error.message.segment').html('')
            },
            /**
             * 对于不存在的属性名，则返回默认的空属性
             * */
            $_getProperty(name) {
                if (!name || !this.properties[name]) {
                    return {control: 'null', title: ' '}
                }
                return this.properties[name]
            },
            /**
             * 加载数据源 TODO 改成同时加多个
             * */
            $_loadData(propertyName, property, dataSourceName) {
                let thisVue = this
                if (!dataSourceName) {
                    return
                }
                // ds 示例格式
                // {
                //     entity: 'basedata_city',
                //     lazy: true, // default false
                //     fields: 'name text,id value'
                //     params: {
                //         provinceId: 'gs:$ctx.province'
                //     }
                // }
                let dsConfig = this.opts.ui.ds[dataSourceName]
                if (dsConfig) {
                    let params = {}
                    // 格式如：['name text','id value']
                    if (dsConfig.params) {
                        for (let key in dsConfig.params) {
                            let value = dsConfig.params[key]
                            params[key] = this.$_rungs(value)
                        }
                    }
                    thisVue.$gl.data.query(dsConfig.entity, params, dsConfig.fields).then(function (res) {
                        thisVue.$set(thisVue.properties[propertyName], 'data', res.data)
                        // 触发级联加载数据
                        thisVue.$_loadRefData(propertyName)
                    })
                } else {
                    console.error('未配置数据源', dataSourceName)
                }
            },
            /**
             * 级联加载数据
             * */
            $_loadRefData(propertyName, resetValue) {
                let thisVue = this
                let propertyNames = thisVue.dsBeDependentOn[propertyName] || []
                propertyNames.forEach(function (item, index) {
                    let triggerProperty = thisVue.$_getProperty(item)
                    // if (resetValue !== undefined) {
                    //     // 重置选择的值为空
                    //     triggerProperty.value = resetValue
                    // }
                    if (triggerProperty) {
                        thisVue.$_loadData(item, triggerProperty, triggerProperty.ds)
                    }
                })
                // thisVue.set(thisVue.form, propertyName, property)
            },
            /**
             * gs(geelato script)执行表达式，若非gs表达式则直接返回
             * @param gs gs:$ctx.province
             */
            $_rungs(str) {
                if (str.indexOf('gs:') === 0) {
                    let $ctx = this.$_getValues()
                    return this.$gl.utils.eval(str.substring(3), $ctx)
                } else {
                    return str
                }
            }
        },
        components: {}
    }
</script>
<style scoped>
</style>
