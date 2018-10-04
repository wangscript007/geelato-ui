<template>
    <select class="ui dropdown">
        <option v-for="item in dataset" :key="item.value"
                :value="item.value">{{item.text}}
        </option>
    </select>
</template>
<script>
    export default {
        props: {
            dataset: Array,
            /**
             * 若未设置，则默认选择slot的内容
             */
            selector: {
                type: String,
                required: false
            },
            /**
             * 对于checkbox有值，其它类型值为undefined
             */
            value: [String, Number, Object, Array, Boolean],
            opts: {
                type: Object,
                required: false,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {
                type: 'dropdown',
                id: '',
                val: undefined,
                sui: {}
            }
        },
        mounted: function () {
            this.$_init()
        },
        updated: function () {
            let theVue = this
            $(theVue.$el).dropdown('setting', 'onChange', this.$_handleValue);
        },
        methods: {
            $_init: function () {
                let theVue = this
                console.log('innerHTML', $(theVue.$el).get(0).innerHTML)
                let opts = {'onChange': this.$_handleValue}
                $.extend(opts, theVue.opts)
                theVue.sui = $(theVue.$el).dropdown(opts)
                console.log('opts2>', opts)

                // 设置更改事件
                // theVue.sui[theVue.type]({onChange: handleValue})
                // 初始化值
                this.$_handleValue()

                console.log('this.value>', theVue.value)


                console.log('theVue.sui>', theVue.sui)
            },
            $_handleValue(val, oval) {
                let theVue = this
                // theVue.sui[theVue.type]({values: [theVue.value]})
                theVue.val = theVue.sui[theVue.type]('get value')
                console.log(theVue.type, 'theVue.value:', theVue.value, 'theVue.val:', theVue.val, 'val:', val, 'oval:', oval)
                theVue.$emit('input', theVue.val)
                return theVue.val
            }
        },
        components: {}
    }
</script>
<style>
</style>
