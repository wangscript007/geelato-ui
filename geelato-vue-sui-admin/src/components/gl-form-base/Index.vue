<!--
  提供基础的功能及api接口，不提供保存操作
  动态表单页面，结合配置的字段（包括字段布局信息）进行渲染
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
        <!--行数据为分组标题，[{'': [24],  $title: '',$style:''}]-->
        <template v-if="row.length===1&&row[0].$title!==undefined">
          <td colspan="24" class="gl-form-group-title" :style="row[0].$style" v-html="row[0].$title">
          </td>
        </template>
        <!--行数据非分组标题-->
        <template v-else>
          <template v-for="(cell,cellIndex) in row"
                    v-if="property=$_getProperty(Object.keys(cell)[0])">
            <td :colspan="Object.values(cell)[0][0]" :rowspan="Object.values(cell)[0][2]">
                        <span v-if="property.tips" :data-tooltip="property.tips">
                            <i class="info circle icon"></i>
                        </span>
              <span class="gl-required">{{$_isRequired(property)?'*':''}}</span>
              {{property.title||Object.keys(cell)[0]}}&nbsp;
            </td>
            <!--v-if="Object.values(cell)[0][1]" 分组时-- Object.values(cell)[0]的值为[24] -->
            <td :colspan="Object.values(cell)[0][1]" :rowspan="Object.values(cell)[0][2]">
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
                              @input='form[Object.keys(cell)[0]]=$event;$_loadRefData(Object.keys(cell)[0], "")'
                              :ref="Object.keys(cell)[0]" :readonly="property.readonly===true"
                              :disabled="property.disabled===true"></sui-dropdown>
              </template>
              <template v-else-if="property.control==='image'">
                <div class="ui fluid  image">
                  <a class="ui red right corner label" @click="$_uploadImage">
                    <i class="upload icon"></i>
                  </a>
                  <img class="ui small rounded image" style=""
                       src="../../assets/images/avatar/large/jenny.jpg">
                </div>
                <!--<div class="ui placeholder">-->
                <!--<a class="ui red right corner label" @click="$_uploadImage">-->
                <!--<i class="upload icon"></i>-->
                <!--</a>-->
                <!--<div class="rectangular image"></div>-->
                <!--</div>-->
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
        </template>
      </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  </div>

</template>
<script>
  let GEELATO_SCRIPT_PREFIX = 'gs:'
  let REGEXP_FORM = /gs[\s]*\:[\s]*\$ctx\.form\.[a-zA-Z]+[a-zA-Z0-9]*/g;
  let REGEXP_CTX = /\$ctx/g
  let REGEXP_DEPEND_PROPERTY = /\$ctx\.[a-zA-Z]+/g
  let CONST_GQL_PARENT = '$parent'

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
        defaultEntity: this.opts.ui.defaultEntity,
        layout: this.opts.ui.layout,
        properties: this.opts.ui.properties,
        ds: this.opts.ui.ds,
        vars: this.opts.ui.vars,
        // 数据源被依赖，格式为：被依赖的属性:[依赖的属性,依赖的属性...]
        dsBeDependentOn: {}
      }
    },
    created: function () {

    },
    mounted: function () {
      console.log('form mounted,opts>', this.opts)
      this.$_reset(this.opts)
    },
    methods: {
      $_reset(opts) {
        if (opts) {
          this.properties = opts.ui.properties
          this.layout = opts.ui.layout
          this.defaultEntity = opts.ui.defaultEntity
          this.ds = opts.ui.ds
          this.vars = opts.ui.vars
          this.dsBeDependentOn = {}
          this.form = {}
          this.init = false
        }
        this.$_initConvertData()
        this.$_loadInitData()
        this.$_initUI()
      },
      /**
       * 1、将简化的配置信息转换成完整的配置信息，如只设置了email类型，则将默认增加email验证规则
       * 2、转换并设置一些默认值
       * 3、分析数据源依赖
       *  */
      $_initConvertData() {
        let thisVue = this
        for (let key in this.properties) {
          // 设置一些默认值，添加默认配置等
          let property = this.properties[key]
          // identifier 是 semantic ui form validate 需用到的属性
          property.identifier = key
          // 未设置实体时，默认为defaultEntity
          property.entity = property.entity || this.defaultEntity
          property.field = property.field || key
          // !!!需采用vm.$set的方式来设置值，确保值变化可被检测 @see https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
          this.$set(this.form, key, property.value === undefined ? '' : property.value)
          this.form[key] = property.value === undefined ? '' : property.value
          // 依据字段类型，自动构建字段验证规则信息，基于semantic ui form validate
          if (property.control === 'email' && (!property.rules)) {
            property.rules = []
            this.properties[key].rules.push({type: 'email'})
          }
        }
        // 3、构建数据源依赖 dsBeDependentOn e.g. {provinceCode: 'gs:$ctx.form.province'}
        for (let propertyName in this.ds) {
          let propertyDs = this.ds[propertyName]
          for (let paramName in propertyDs.params) {
            let paramValue = propertyDs.params[paramName]
            if (REGEXP_FORM.test(paramValue)) {
              paramValue.match(REGEXP_FORM).forEach(function (item, index) {
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
        for (let propertyName in this.properties) {
          let property = this.properties[propertyName]
          // && this.ds[property.ds].lazy !== true
          if (property.ds) {
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
      /**
       * 获取保存操作的gql语句
       */
      $_getGql() {
        // 找出顶层的实体信息
        let thisVue = this
        let gql = {}
        genGql(gql, this.defaultEntity, this.properties)

        function genGql(parent, entityName, properties, confirmedEntityProperties) {
          // console.log('genGql>', parent, entityName, properties)
          parent[entityName] = parent[entityName] || {}
          let toAnalyseProperties = {}
          // 已确认归属实体的属性
          let confirmedProperties = confirmedEntityProperties || {}
          let subEntityNames = []
          for (let propertyName in properties) {
            let property = properties[propertyName]
            console.log(property.entity, entityName, property)
            if (property.entity === entityName) {
              // 该实体的直属属性，直接添加
              parent[entityName][propertyName] = typeof property.value !== 'string' ? property.value : property.value.replace(REGEXP_CTX, CONST_GQL_PARENT)
              confirmedProperties[propertyName] = true
            } else {
              toAnalyseProperties[propertyName] = property
              if (!confirmedProperties[propertyName]) {
                // 构建子entityName，便于发起下一次的分析
                let parseSubEntityNames = parseSubEntity(entityName, property)
                if (parseSubEntityNames === undefined) {
                  // 表示简单的字段，不需要解析
                  // confirmedProperties[propertyName] = true
                } else if (parseSubEntityNames.length > 0) {
                  subEntityNames.push(...parseSubEntityNames)
                  confirmedProperties[propertyName] = true
                } else {
                  // 深层级的依赖，当前层级未能解析出来，不能记录到confirmedProperties中。
                }
                // console.log('分析**entityName>', entityName, '**property>', property, '之后，**subEntityNames>', subEntityNames)
              }
            }
          }
          let dynamicAnalyseProperties = toAnalyseProperties
          subEntityNames.forEach((subEntityName, index) => {
            console.log('subEntityNames', subEntityName, subEntityNames, dynamicAnalyseProperties)
            dynamicAnalyseProperties = genGql(parent[entityName], subEntityName, dynamicAnalyseProperties, confirmedProperties)
          })
          return toAnalyseProperties
        }

        /**
         * TODO 深层依赖的属性，未分析出来时，返回特殊的信息，以便进行一步处理
         * @param entityName
         * @param subEntityProperty
         * @returns {Array}
         */
        function parseSubEntity(entityName, subEntityProperty) {
          // console.log('parseSubEntity >entityName:', entityName, ',subEntityProperty', subEntityProperty.field)
          if (typeof subEntityProperty.value !== 'string') {
            return undefined
          }
          let dependingPropertyNames = subEntityProperty.value.match(REGEXP_DEPEND_PROPERTY)
          let dependEntities = []
          if (dependingPropertyNames) {
            dependingPropertyNames.forEach((item, index, ary) => {
              let dependProperty = thisVue.properties[item.substring(5)]
              if (!dependProperty) {
                console.error('properties内未配置属性：' + item.substring(5), '，解析依赖：', item, '出错，当前property为：', subEntityProperty)
              } else {
                // 检查依赖的这个实体dependProperty.entity是否是entityName直属子级实体，是的话才加入
                let canBeAdd = true
                // if (typeof dependProperty.value === 'string') {
                //     let parentDependingPropertyNames = dependProperty.value.match(REGEXP_DEPEND_PROPERTY)
                //     if (parentDependingPropertyNames) {
                //         // dependProperty还存在依赖信息，需进一步分析
                //         for (let parentIndex in parentDependingPropertyNames) {
                //             let parentItem = parentDependingPropertyNames[parentIndex]
                //             let parentDependProperty = thisVue.properties[parentItem.substring(5)]
                //             if (!parentDependProperty) {
                //                 console.error('properties内未配置属性：' + parentItem.substring(5), '，解析依赖：', parentItem, '出错，当前property为：', subEntityProperty)
                //             } else {
                //                 // 只要有一个依赖不等于entityName，则不能加入
                //                 if (parentDependProperty.entity !== entityName) {
                //                     canBeAdd = false
                //                     break
                //                 }
                //             }
                //         }
                //     }
                // }
                if (dependProperty.entity != entityName) {
                  canBeAdd = false
                }
                if (canBeAdd) {
                  // console.log('dependProperty.entity >', subEntityProperty.entity)
                  dependEntities.push(subEntityProperty.entity)
                }
              }
            })
          }
          return dependEntities
        }

        return gql
      },
      $_validate() {
        $(this.$el).form('validate form')
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
        //         provinceId: 'gs:$ctx.form.province'
        //     }
        // }
        let dsConfig = this.ds[dataSourceName]
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
       * @param gs gs:$ctx.form.province
       */
      $_rungs(str) {
        let thisVue = this
        let $ctx = {form: thisVue.$_getValues(), vars: {}}
        for (let varName in (thisVue.vars || [])) {
          $ctx.vars[varName] = typeof thisVue.vars[varName] === 'object' ? thisVue.vars[varName].value : thisVue.vars[varName]
        }
        if (str.indexOf(GEELATO_SCRIPT_PREFIX) === 0) {
          return this.$gl.utils.eval(str.substring(3), $ctx)
        } else {
          return str
        }
      },
      $_uploadImage() {

      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
