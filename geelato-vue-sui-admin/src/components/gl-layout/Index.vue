<template>
    <component v-bind:is="currentView" @changeLayoutMode="$_changeLayoutModeAndReload"
               @changeColor="$_changeColorAndReload">
        <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
</template>
<script>
    /* eslint-disable no-unused-vars */
    import utils from '../../assets/script/utils'

    export default {
        data() {
            return {}
        },
        created() {
            if (!this.$gl.security.isLogged()) {
                console.log('isLogged>', false)
                // window.location.replace('/')
            }

            let layout = utils.session(this.$gl.consts.SESSION_GEELATO_CONFIG_LAYOUT)
            let mode = layout && layout.mode !== undefined ? layout.mode : this.$gl.layout.mode
            let color = utils.session(this.$gl.consts.SESSION_GEELATO_CONFIG_COLOR)
            this.$gl.ui.color.primary = color && color.primary ? color.primary : this.$gl.ui.color.primary
            this.$_changeLayoutMode(mode)
        },
        mounted() {
        },
        methods: {
            $_changeLayoutMode(mode) {
//        console.log('       mode>', mode)
                let thisVue = this
                if (mode === 1) {
                    thisVue.currentView = resolve => require(['./LayoutLR.vue'], resolve)
                } else if (mode === 0) {
                    thisVue.currentView = resolve => require(['./LayoutHMF.vue'], resolve)
                } else {
                    console.error('未支持的部局模式：' + mode + '，采用默认部局。')
                    thisVue.currentView = resolve => require(['./LayoutHMF.vue'], resolve)
                }
                this.$gl.layout.mode = mode
                utils.session(this.$gl.consts.SESSION_GEELATO_CONFIG_LAYOUT, this.$gl.layout)
            },
            $_changeLayoutModeAndReload(mode) {
                this.$_changeLayoutMode(mode)
                window.location.reload()
//        this.$router.push('/')
            },
            $_changeColorAndReload(value, oldValue) {
                utils.session(this.$gl.consts.SESSION_GEELATO_CONFIG_COLOR, {primary: value})
                window.location.reload()
            }
        },
        components: {}
    }
</script>

<style>
</style>
