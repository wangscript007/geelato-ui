<template lang="html">
    <div class="gl-page-content-wrapper">
        <gl-layout-page left-title="表单配置(JSON)" right-title="表单预览" :max="{left:8,right:8}" :min="{left:7,right:9}">
            <div slot="left">
                <json-code-mirror ref="jsonCM"
                                  :text="JSON.stringify(configs[current].data)"></json-code-mirror>
            </div>
            <div slot="leftAction">
                <sui-button size="mini" v-for="item in configs" @click="current=item.value">{{item.text}}</sui-button>
                <sui-button size="mini" @click="$_genForm" :class="$gl.ui.color.primary">生成表单</sui-button>
            </div>
            <div slot="right">
                <div class="ui info attached bottom segment" v-if="values" style="word-wrap:break-word">
                    {{values}}
                </div>
                <!--<gl-form-base v-show="current!==null" :opts="formOptions" ref="glForm">-->
                <!--</gl-form-base>-->
                <gl-form v-if="current!==null" :opts="formOptions" ref="glForm">
                </gl-form>
            </div>
            <div slot="rightAction" v-if="current!==null">
                <div class="ui mini button" :class="$gl.ui.color.primary" @click="$_validate">验证表单</div>
                <div class="ui mini button" :class="$gl.ui.color.primary" @click="$_getValues">获取表单值</div>
            </div>
        </gl-layout-page>
    </div>
</template>

<script>
    import GlForm from '../../../components/gl-form-base/Index'
    // import GlForm from '../../platform-labs/bugs/dropdown/DropdownInSlot'
    import JsonCodeMirror from './JsonCodeMirror'
    import configData from './formConfig.js'

    export default {
        name: "FormPreview",
        data() {
            return {
                configs: configData,
                current: 0,
                values: undefined
            }
        },
        computed: {
            formOptions() {
                return {ui: this.configs[this.current].data}
            }
        },
        mounted() {
        },
        methods: {
            $_genForm() {
                this.configs[this.current].data = JSON.parse(this.$refs.jsonCM.$_getValue())
                console.log('this.$refs.jsonCM.$_getValue()', this.configs[this.current].data)
            },
            $_validate() {
                this.$refs.glForm.$_validate()
            },
            $_getValues() {
                this.values = JSON.stringify(this.$refs.glForm.$_getValues())
                console.log('value', this.$refs.glForm.$_getValues())
            }
        },
        components: {JsonCodeMirror, GlForm}
    }
</script>

<style scoped>
</style>
