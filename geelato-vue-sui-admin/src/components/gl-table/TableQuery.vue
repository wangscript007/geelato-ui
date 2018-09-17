<template>
    <form class="ui small form">
        <div v-for="(item, index) in opts.fields">
            <template v-if="item.type=='string'||item.type=='String'">
                <label><i class="fa font-green">{{convertLop(item.lop)}}</i> &nbsp; {{item.title}}</label>
                <input @keyup.enter="$_submit" type="text" :placeholder="getPlaceholder(item)"
                       v-model.trim="entity[index]"/>
            </template>
            <template v-else-if="item.type=='number'||item.type=='Number'||item.type=='int'||item.type=='Long'">
                <label><i class="fa font-green">{{convertLop(item.lop)}}</i> &nbsp; {{item.title}}</label>
                <input @keyup.enter="$_submit" type="text" :placeholder="getPlaceholder(item)"
                       v-model.number="entity[index]"/>
            </template>
            <template v-else-if="item.type=='date'||item.type=='Date' || item.type=='time'||item.type=='Time'">
                <label><i class="fa font-green">{{convertLop(item.lop)}}</i> &nbsp; {{item.title}}</label>
                <!--<datetime :format="item.format" :placeholder="getPlaceholder(item)" v-model="entity[index]"></datetime>-->
            </template>
            <template v-else-if="item.type=='boolean'||item.type=='Boolean'">
                <div class="mt-checkbox-inline">
                    <label><i class="fa font-green">{{convertLop(item.lop)}} &nbsp;</i></label>
                    <label class="mt-checkbox">
                        <input @keyup.enter="$_submit" type="checkbox" :id="'checkbox_'+index" value="false"
                               v-model="entity[index]">
                        {{item.title}}
                        <span></span>
                    </label>
                </div>
            </template>
            <template v-else-if="item.type=='select'">
                <label><i class="fa font-green">{{convertLop(item.lop)}} &nbsp;</i> {{item.title}}</label>
                <select class="form-control input-sm" v-model="entity[index]">
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

    import utils from '../../assets/script/utils'
    //  import datetime from '../base/datetime'

    export default {
        props: {
            opts: {
                type: Object,
                default: function () {
                    return {}
                },
                required: true
            }
        },
        data() {
            return {
                // model: {},
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
        computed: {
            /**
             * 查询条件中，可能存在同一个字段，多种条件的情况，故model中用索引作为key，页不用字段名
             */
            entity: function () {
                let model = {}
                for (let index in this.opts.fields) {
                    let item = this.opts.fields[index]
                    if (item.type === 'boolean') {
                        this.$set(model, index, utils.toBoolean(item.default))
                    } else {
                        this.$set(model, index, item.default)
                    }
                }
                for (let p in model) {
                    this.defaultValue[p] = model[p]
                }
                console.log('model default>', this.defaultValue)
                return model
            }
        },
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            convertCop(cop) {
                return this.dict[cop]
            },
            convertLop(o) {
                return o === 'or' ? '或' : '且'
            },
            getPlaceholder(item) {
                if (item.placeholder) {
                    return item.placeholder
                } else {
                    console.log(item.cop, this.dict[item.cop])
                    return this.convertCop(item.cop)
                }
            },
            $_submit(e) {
                console.log('model $_submit>', e, this.model)
                let result = {}
                for (var index in this.opts.fields) {
                    let item = this.opts.fields[index]
                    // ignore valid field value
                    if (this.entity[index] === undefined || utils.trim(this.entity[index]) === '') {
                        continue
                    }
                    result[item.field + '|' + item.cop] = this.entity[index]
                }
                console.log('构建成gql查询条件为 > ', result)
                this.$emit('input', result)
            },
            $_reset() {
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
