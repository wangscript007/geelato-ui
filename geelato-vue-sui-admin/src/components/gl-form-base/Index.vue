<!--
  CRUD的动态表单页面，依据实体自动获取元数据，结合配置的字段（包括字段布局信息）进行渲染
-->
<template>
    <div class="ui small compact form">
        <table v-show="opts.ui.layout.type==='table'||!opts.ui.layout.type"
               class="gl-form gl-col-24">
            <thead>
            <tr>
                <th colspan="24">
                    <div class="ui error message segment"></div>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row,index) in opts.ui.layout.data">
                <template v-for="(cell,cellIndex) in row"
                          v-if="property=$_getProperty(Object.keys(cell)[0])">
                    <td :colspan="Object.values(cell)[0][0]">
                        <span v-if="property.tips" :data-tooltip="property.tips">
                            <i class="info circle icon"></i>
                        </span>
                        <span class="gl-required">{{$_isRequired(property)?'*':''}}</span>
                        {{property.title||Object.keys(cell)[0]}}
                    </td>
                    <td :colspan="Object.values(cell)[0][1]">
                        <template v-if="property.control==='input'">
                            <input type="text" :placeholder="property.placeholder" :name="Object.keys(cell)[0]"
                                   v-model="form[Object.keys(cell)[0]]" :readonly="property.readonly===true"
                                   :disabled="property.disabled===true">
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
                                          @input='form[Object.keys(cell)[0]]=$event;$_setDropdownText(Object.keys(cell)[0],$event)'
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
    //  import utils from '../../common/utils'
    export default {
        props: {
            opts: {
                type: Object,
                required: false,
                default: function () {
                    return {
                        defaultEntity: '',
                        properties: {},
                        layout: [
                            //              [{name: [3, 9]}, {name: [3, 9]}],
                            //              [{id: [3, 9]}, {loginName: [3, 9]}],
                            //              [{description: [3, 21]}]
                        ],
                        ds: {}
                    }
                }
            }
        },
        data() {
            return {
                model: {},
                properties: this.opts.ui.properties,
                ds: this.opts.ui.ds,
                // 数据源被依赖，格式为：被依赖的属性:[依赖的属性,依赖的属性...]
                dsBeDependentOn: {}
            }
        },
        computed: {
            form: function () {
                return this.model
            }
        },
        created: function () {
            this.$_initConvertData()
            this.$_loadInitData()
        },
        mounted: function () {
            this.$_initUI()
        },
        methods: {
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
                    this.model[key] = property.value === undefined ? '' : property.value
                    // console.log('this.model', key, property.value)
                    // 依据字段类型，自动构建字段验证规则信息，基于semantic ui form validate
                    if (property.control === 'email' && (!property.rules)) {
                        property.rules = []
                        this.properties[key].rules.push({type: 'email'})
                    }
                }
                // 数据源依赖
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
                                thisVue.dsBeDependentOn[dependPropertyName].push[propertyName]
                                console.log('dependPropertyName>', dependPropertyName, thisVue.dsBeDependentOn)
                            })
                        }
                    }
                }

            },
            // 加载远程的初始化数据，如字典信息
            $_loadInitData() {
                for (let i in this.properties) {
                    let property = this.properties[i]
                    if (property.ds && property.ds.lazy !== true) {
                        this.$_loadData(property, property.ds)
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
            $_getProperty(name) {
                if (name === '$null') {
                    return {control: 'null', title: ' '}
                }
                return this.properties[name]
            },
            $_setDropdownText(name, value) {
                // 动态form[name]属性绑定dropdown，更新值时，未能更新text里的内容，需手动设置
                // 当无初始化值时，无<div role="alert" ... 这个标签，此时用<span class="sizer"></span>来设置text
                // <div role="alert" aria-live="polite" class="text">这里是text的内容</div>
                // <span class="sizer"></span>
                let dropdown = this.$refs[name][0]
                let options = this.$_getProperty(name).data
                for (let i in options) {
                    let option = options[i]
                    if (option.value === value) {
                        let $textA = $(dropdown.$el).find('span.sizer')
                        $textA.text('')
                        let $textDom = $(dropdown.$el).find('[aria-live=polite]')
                        if ($textDom.length > 0) {
                            $textDom.text(option.text)
                        } else {
                            $textA.text(option.text)
                        }
                        break
                    }
                }
            },
            $_loadData(property, dataSourceName) {
                let thisVue = this
                if (!dataSourceName) {
                    return
                }
                // ds e.g.
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
                        // 依据alias的配置，对返回的数据进行重命名
                        property.data = res.data
                        // thisVue.$forceUpdate()
                    })
                } else {
                    console.error('未配置数据源', dataSourceName)
                }

                // function checkFields(fields) {
                //     for(let segment in fields.splice(',')){
                //         let ary = segment.split('[\s]+')
                //         let fieldName = ary[0]
                //     }
                // }
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
