<template lang="html">
    <div class="gl-page-content-wrapper">
        <gl-layout-page left-title="表单元数据" right-title="表单配置(JSON)" :max="{left:8,right:8}" :min="{left:7,right:9}">
            <div slot="left">
                <json-code-mirror ref="metaCM" :text="meta"></json-code-mirror>
            </div>
            <div slot="leftAction">
                <sui-button size="mini" @click="$_genFormConfig" :class="$gl.ui.color.primary">生成表单配置</sui-button>
            </div>
            <div slot="right">
                <json-code-mirror ref="configCM" :text="config"></json-code-mirror>
            </div>
            <div slot="rightAction">
                <div class="ui mini button" :class="$gl.ui.color.primary" @click="$_getValues">获取表单配置</div>
            </div>
        </gl-layout-page>
    </div>
</template>

<script>
    import JsonCodeMirror from '../../../components/gl-codemirror/Index'

    export default {
        name: "GenFormConfig",
        data() {
            return {
                meta: '',
                config: ''
            }
        },
        computed: {},
        mounted() {
        },
        methods: {
            $_genFormConfig() {
                // console.log('this.$refs.jsonCM.$_getValue()', JSON.parse(this.$refs.jsonCM.$_getValue()))
            },
            $_getValues() {
                // console.log('value', this.$refs.glForm.$_getValues())
            }
        },
        components: {JsonCodeMirror}
    }
</script>

<style scoped>
</style>
