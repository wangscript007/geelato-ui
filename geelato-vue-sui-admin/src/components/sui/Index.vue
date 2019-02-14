<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            type: {
                type: String,
                required: true,
                validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个，即Semantic UI中的Modules
                    return ['accordion', 'checkbox', 'dimmer', 'dropdown', 'embed',
                        'modal', 'popup', 'progress', 'rating', 'search', 'shape',
                        'sidebar', 'sticky', 'tab', 'transition'].indexOf(value) !== -1
                }
            },
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
                id: '',
                val: undefined,
                sui: {}
            }
        },
        updated() {
            // TODO 待观察是否需要this.init()，目前启用该方法时，因handleValue会重复执行
            // this.init()
        },
        mounted: function () {
            this.init()
        },
        methods: {
            init: function () {
                let valueApis = {
                    checkbox: {getValueBehavior: 'is checked', onChange: 'onChange'},
                    dropdown: {getValueBehavior: 'get value', onChange: 'onChange'},
                    progress: {getValueBehavior: 'get value', onChange: 'onChange'},
                    rating: {getValueBehavior: 'get rating', onChange: 'onRate'}
                }
                let theVue = this
                // init
                if (theVue.selector) {
                    theVue.sui = $(theVue.$el).find(theVue.selector)[theVue.type](theVue.opts)
                } else {
                    theVue.sui = $(theVue.$el.childNodes)[theVue.type](theVue.opts)
                }
                let valueApi = valueApis[theVue.type]
                if (valueApi) {
                    // 设置更改事件
                    // there are three ways to bind the event
                    // 1、globally inherited on init
                    // $.fn.dropdown.onChange = function(){...};
                    // 2、during init
                    // $('.myDropdown').dropdown({
                    //    onChange: function() {...}
                    // })
                    // 3、after init
                    // $('.myDropdown').dropdown('setting', 'onChange', function(){...});
                    let opts = {}
                    opts[valueApi['onChange']] = handleValue
                    theVue.sui[theVue.type](opts)
                    theVue.sui[theVue.type]('setting', valueApi['onChange'], handleValue)
                    // 初始化值
                    handleValue()
                }

                function handleValue(val, oval) {
                    theVue.val = theVue.sui[theVue.type](valueApi.getValueBehavior)
                    console.log(theVue.type, 'theVue.value:', theVue.value, 'theVue.val:', theVue.val, 'val:', val, 'oval:', oval)
                    theVue.$emit('input', theVue.val)
                }
            }
        },
        components: {}
    }
</script>
<style>
</style>
