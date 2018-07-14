<template>
  <form class="ui small form">
    <div v-for="(item, index) in opts.fields">
      <template v-if="item.type=='string'">
        <label><i class="fa font-green">{{convertLop(item.lop)}}</i> &nbsp; {{item.title}}</label>
        <input @keyup.enter="$_submit" type="text" :placeholder="getPlaceholder(item)" v-model.trim="model[item.field]"/>
      </template>
      <template v-else-if="item.type=='number'">
        <label><i class="fa font-green">{{convertLop(item.lop)}}</i> &nbsp; {{item.title}}</label>
        <input @keyup.enter="$_submit" type="text" :placeholder="getPlaceholder(item)" v-model.number="model[item.field]"/>
      </template>
      <template v-else-if="item.type=='date' || item.type=='time'">
        <label><i class="fa font-green">{{convertLop(item.lop)}}</i> &nbsp; {{item.title}}</label>
        <!--<datetime :format="item.format" :placeholder="getPlaceholder(item)" v-model="model[item.field]"></datetime>-->
      </template>
      <template v-else-if="item.type=='boolean'">
        <div class="mt-checkbox-inline">
          <label><i class="fa font-green">{{convertLop(item.lop)}} &nbsp;</i></label>
          <label class="mt-checkbox">
            <input @keyup.enter="$_submit" type="checkbox" :id="'checkbox_'+item.field" value="false" v-model="model[item.field]">
            {{item.title}}
            <span></span>
          </label>
        </div>
      </template>
      <template v-else-if="item.type=='select'">
        <label><i class="fa font-green">{{convertLop(item.lop)}} &nbsp;</i> {{item.title}}</label>
        <select class="form-control input-sm" v-model="model[item.field]">
          <option v-for="(o,i) in item.options" :value='o.value'>{{o.key}}</option>
        </select>
      </template>
      <template v-else>
        <label>{{item.title}}</label>
        <div class="input-icon input-icon-sm">
          <i class="fa font-green">{{convertLop(item.lop)}}</i>
          <input @keyup.enter="$_submit" type="text" class="form-control input-sm"
                 :placeholder="getPlaceholder(item)"/>
        </div>
      </template>
    </div>
    <div class="ui right align secondary mini menu">
      <div class="item">
      </div>
      <div class="right item">
        <a class="ui mini basic button" :class="$gl.ui.color.primary" @click="$_submit" @keyup.enter="$_submit">查询</a>&nbsp;
        <a class="ui mini basic button" :class="$gl.ui.color.primary" @click="$_reset">重置</a>
      </div>
    </div>
  </form>
</template>
<script>
  /* eslint-disable no-unneeded-ternary */

  import utils from '../../common/utils'
  //  import datetime from '../base/datetime'

  export default {
    props: {
      opts: {
        type: Object,
        default: {},
        required: true
      }
    },
    data () {
      return {
        model: {},
        defaultValue: {},
        dict: {
          eq: '等于',
          neq: '不等于',
          lt: '小于',
          lte: '小于等于',
          gt: '大于',
          gte: '大于等于',
          sw: '开头包括',
          ew: '结尾包括',
          contains: '包括'
        }
      }
    },
    created: function () {
      for (var i in this.opts.fields) {
        let item = this.opts.fields[i]
        if (item.type === 'boolean') {
          this.$set(this.model, item.field, utils.toBoolean(item.default))
        } else {
          this.$set(this.model, item.field, item.default)
        }
      }
      for (let p in this.model) {
        this.defaultValue[p] = this.model[p]
      }
      console.log('model default>', this.defaultValue)
    },
    mounted: function () {
    },
    methods: {
      convertCop (cop) {
        return this.dict[cop]
      },
      convertLop (o) {
        return o === 'or' ? '或' : '且'
      },
      getPlaceholder (item) {
        if (item.placeholder) {
          return item.placeholder
        } else {
          console.log(item.cop, this.dict[item.cop])
          return this.convertCop(item.cop)
        }
      },
      $_submit (e) {
        console.log('model $_submit>', this.model)
        let result = {}
        for (var i in this.opts.fields) {
          let item = this.opts.fields[i]
          // ignore valid field value
          if (this.model[item.field] === undefined || utils.trim(this.model[item.field]) === '') {
            continue
          }
          result[item.field + '|' + item.cop] = this.model[item.field]
        }
        console.log('构建成gql查询条件为 > ', result)
        this.$emit('input', result)
      },
      $_reset () {
        let self = this
        for (let p in this.defaultValue) {
          // notice:the html element can only be change by vm.$set or Vue.set after model created.
          self.$set(self.model, p, self.defaultValue[p])
        }
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
