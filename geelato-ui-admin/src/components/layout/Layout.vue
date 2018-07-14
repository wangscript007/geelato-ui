<template>
  <component v-bind:is="currentView" @changeLayoutMode="$_changeLayoutModeAndReload"
             @changeColor="$_changeColorAndReload">
    <!-- 组件在 vm.currentview 变化时改变！ -->
  </component>
</template>
<script>
  import config from '../../common/config'
  import utils from '../../common/utils'
  import * as session from '../../common/session'

  export default {
    data () {
      return {}
    },
    created () {
      if (!this.$gl.security.isLogged()) {
        console.log('isLogged>', false)
//        window.location.replace('/')
      }
      let layout = utils.session(session.GEELATO_CONFIG_LAYOUT)
      let mode = layout && layout.mode !== undefined ? layout.mode : config.layout.mode
      let color = utils.session(session.GEELATO_CONFIG_COLOR)
      this.$gl.ui.color.primary = color && color.primary ? color.primary : this.$gl.ui.color.primary
      this.$_changeLayoutMode(mode)
    },
    mounted () {
    },
    methods: {
      $_changeLayoutMode (mode) {
//        console.log('       mode>', mode)
        let thisVue = this
        if (mode === 1) {
          thisVue.currentView = resolve => require(['./LayoutLR.vue'], resolve)
        } else if (mode === 0) {
          thisVue.currentView = resolve => require(['./LayoutHMF.vue'], resolve)
        } else {
          console.error('未支持的部署模式：' + mode)
          thisVue.currentView = resolve => require(['./LayoutHMF.vue'], resolve)
        }
        config.layout.mode = mode
        utils.session(session.GEELATO_CONFIG_LAYOUT, config.layout)
      },
      $_changeLayoutModeAndReload (mode) {
        this.$_changeLayoutMode(mode)
        window.location.reload()
//        this.$router.push('/')
      },
      $_changeColorAndReload (value, oldValue) {
        utils.session(session.GEELATO_CONFIG_COLOR, {primary: value})
        window.location.reload()
      }
    },
    components: {}
  }
</script>

<style>
</style>
