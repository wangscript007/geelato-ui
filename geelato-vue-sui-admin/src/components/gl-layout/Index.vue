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
      return {
        profile: {}
      }
    },
    created() {
      // if (!this.$gl.security.isLogged()) {
      //   console.log('isLogged>', false)
      //   window.location.replace('/')
      // }
      // 基于服务端个性化配置
      let color = 'blue'
      let mode = 0
      this.profile = this.$gl.security.profile()
      // for (let index in this.userConfig) {
      //   let item = this.userConfig[index]
      //   if (item.code == 'layout_color') {
      //     color = item.value
      //   } else if (item.code = 'layout_mode') {
      //     mode = parseInt(item.value)
      //   }
      // }
      // console.log('security.profile>', this.$gl.security.profile())

      // 基于客户端缓存
      // let layout = utils.session(this.$gl.consts.SESSION_GEELATO_CONFIG_LAYOUT)
      // let mode = layout && layout.mode !== undefined ? layout.mode : this.$gl.layout.mode
      // let color = utils.session(this.$gl.consts.SESSION_GEELATO_CONFIG_COLOR)
      // this.$gl.ui.color.primary = color && color.primary ? color.primary : this.$gl.ui.color.primary
      console.log('this.profile >', this.profile)
      this.$gl.ui.color.primary = this.$_getConfigItem('layout_color').value || this.$gl.ui.color.primary
      mode = this.$_getConfigItem('layout_mode').value || this.$gl.layout.mode || 0
      this.$_changeLayoutMode(mode)
    },
    mounted() {
    },
    methods: {
      $_changeLayoutMode(mode) {
        let thisVue = this
        if (mode == 1) {
          thisVue.currentView = resolve => require(['./LayoutLR.vue'], resolve)
        } else if (mode == 0) {
          thisVue.currentView = resolve => require(['./LayoutHMF.vue'], resolve)
        } else {
          console.error('未支持的部局模式：' + mode + '，采用默认部局。')
          thisVue.currentView = resolve => require(['./LayoutHMF.vue'], resolve)
        }
        this.$gl.layout.mode = mode
      },
      $_changeLayoutModeAndReload(mode) {
        this.$_changeLayoutMode(mode)
        let item = this.$_getConfigItem('layout_mode')
        this.$gl.data.save('platform_user_config', {
          code: 'layout_mode',
          value: mode,
          id: item.id
        }, 'platform_user_config', '保存成功', '保存失败')
        item.value = mode
        this.$gl.security.profile(this.profile)
        window.location.reload()
      },
      $_changeColorAndReload(color, oldValue) {
        let item = this.$_getConfigItem('layout_color')
        this.$gl.data.save('platform_user_config', {
          code: 'layout_color',
          value: color,
          id: item.id
        }, 'platform_user_config', '保存成功', '保存失败')
        item.value = color
        this.$gl.security.profile(this.profile)
        window.location.reload()
        // this.$router.push('/')
      },
      $_getConfigItem(code) {
        for (let index in this.profile.userConfig.value) {
          let item = this.profile.userConfig.value[index]
          if (item.code == code) {
            return item
          }
        }
        return {}
      }
    },
    components: {}
  }
</script>

<style>
</style>
