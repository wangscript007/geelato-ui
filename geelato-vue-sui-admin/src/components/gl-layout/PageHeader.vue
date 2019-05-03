<template>
  <div class="ui top borderless menu gm-layout-header" :class="headerClass">
    <div class="left menu">
      <div class="ui item dropdown" :style="{width:logoWidth}" v-if="isShowLogo()">
        <div class="text" style="text-align: center">
          <img class="ui image" src="/logo_blue.svg">
          <span style="font-weight: bold;text-align: center">Geelato</span>
        </div>
      </div>
      <!--<div class="item" :style="{width:logoWidth}" style="font-weight: bold;font-size: 1.25em;text-align: center">-->
      <!--DEMO-->
      <!--</div>-->
      <a class="gl-layout-sidebar-toggle item">
        <i class="sidebar icon"></i>
      </a>
      <div class="item">
        <div v-html="titleHtml"></div>
      </div>
    </div>
    <div class="right menu">
      <a class="item">
        <i class="icon mail"></i>
        <div class="floating ui circular mini red label" style="margin:0 0 0 -2.5em!important;top:0.5em">22
        </div>
      </a>

      <div class="ui right item inline dropdown" @click="profile">
        <div class="text">
          <img class="ui avatar image" src="../../assets/images/avatar/large/jenny.jpg">
          {{user.name}}
        </div>
      </div>
      <sui type="popup" selector=".item" :opts="{
          inline: true,
          hoverable: true,
          position: 'bottom center',
          delay: {
            show: 100,
            hide: 100
          }
        }">
        <a class="item" @click="toggleFullScreen"><i class="window maximize icon"></i></a>
        <div class="ui flowing popup top left transition hidden">
          按ESC键即可退出全屏
        </div>
      </sui>
      <sui type="popup" selector=".item" :opts="{
          inline: true,
          hoverable: true,
          position: 'bottom center',
          delay: {
            show: 100,
            hide: 100
          }
        }">
        <a class="item"><i class="theme icon"></i></a>
        <div class="ui flowing popup top left transition hidden">
          <div v-for="(hex,key) in $gl.ui.colorHex" class="ui mini button" :class="{[key]:true}"
               @click="changeColor(key)" :key="key"></div>
        </div>
      </sui>
      <!--<a class="item" title="mode" @click="changeTheme"><i class="paint-brush icon"></i></a>-->
      <a class="item" title="更改部局" @click="changeLayoutMode"><i class="exchange alternate icon"></i></a>
      <a class="item" title="帮助" target="_blank" :href="$gl.url.help"><i class="question circle outline icon"></i></a>
      <a class="item" title="退出" @click="logout"><i class="sign out icon"></i></a>
      <sui v-if="modules&&modules.length>0" type="popup" selector=".modules-selector" :opts="{
          inline: true,
          hoverable: true,
          position: 'bottom left',
          delay: {
            show: 100,
            hide: 100
          }
        }">
        <a class="item modules-selector"><i class="ellipsis vertical icon"></i></a>
        <div class="ui flowing popup top left transition hidden">
          <div :class="moduleGroup.clazz"
               :style="'max-width:'+moduleGroup.maxWidth">
            <div class="column" v-for="(item,key) in modules" :key="key" style="padding:0.125em">
              <div class="ui button" @click="changeModule(item)" style="width: 9em">
                {{item.title}}
              </div>
            </div>
          </div>
        </div>
      </sui>
    </div>
  </div>
</template>

<script>
  import utils from '../../assets/script/utils'
  import {types} from '../../store'
  import screenfull from 'screenfull'

  export default {
    props: {
      mode: Number,
      size: String
    },
    data() {
      return {
        color: this.$gl.ui.color.primary,
        user: this.$gl.security.profile().user,
        logoWidth: this.$gl.layout.logo.width,
        modules: this.$gl.modules,
        showModuleSelect: false
      }
    },
    computed: {
      titleHtml: function () {
        return this.$store.state.platform.headerTitle
      },
      // 依据模块的数量，展示不同的下拉分组
      moduleGroup: function () {
        if (!this.modules) {
          return {clazz: 'ui column divided left aligned grid', maxWidth: '0px'}
        } else if (this.modules.length <= 5) {
          return {clazz: 'ui one column divided left aligned grid', maxWidth: '133px'}
        } else if (this.modules.length <= 8) {
          return {clazz: 'ui two column divided left aligned grid', maxWidth: '266px'}
        } else {
          return {clazz: 'ui three column divided left aligned grid', maxWidth: '390px'}
        }
      },
      headerClass: function () {
        return this.mode === 1 ? '' : 'inverted ' + this.$store.state.profile.userConfig['layout_color'].value
      }
    },
    created: function () {
      // 首次加载切换到角色的默认模块
      // TODO 改从当前用户信息中获取
      let currentRole = 'admin'
      let path = this.$route.path
      console.log('gl-layout > PageHeader > path: ', path)
      if (path === '/#/' || path === '/m/') {
        // 加载时，若path是默认的'/#/'，则按默认模块的配置登录默认首页
        for (let m in this.modules) {
          let module = this.modules[m]
          if (module.code === this.$gl.defaultModule) {
            // 不按角色区分默认模块 typeof defaultModule is string
            this.changeModule(module)
            break
          } else if (typeof this.$gl.defaultModule === 'object' && module.code === this.$gl.defaultModule[currentRole]) {
            // 按角色区分默认模块
            this.changeModule(module)
            break
          }
        }
      } else {
        // 加载时，若path中已指定了地址，不是默认的'/#/'，则需进行自动切换
        // 从url中获取模块编码
        let redirectModuleCode = this.$route.query._m
        for (let i in this.$gl.modules) {
          let module = this.$gl.modules[i]
          if (module.code === redirectModuleCode) {
            this.changeModule(module, this.$route.path)
          }
        }
      }
    },
    mounted: function () {
    },
    methods: {
      isShowLogo: function () {
        return this.mode === 0
      },
      /**
       * 检查跳转的页面所在的模块
       * @param module 指定跳转的模块
       * @param toPath 指定跳转的页面
       */
      changeModule: function (module, toPath) {
        console.log('layout > change to module: ', module.title, module)
        // 通知更改模块，以便更改菜单
        this.$store.commit(types.CHANGE_MODULE, module)
        this.$emit('changeModule', module)
        // 如果有指定加载的path，则按指定
        let redirectPath = toPath || module.index
        // 更改模块首页面
        if (redirectPath) {
          // 如将：'/#/m/project-metro/info/select-project',改为'/m/project-metro/info/select-project',
          let path = redirectPath.replace('/#', '').replace('#', '')
//          path = path + '?' + 'module=' + module.code + '&t=' + utils.uuid(16)
          this.$store.commit(types.ROUTE_VIEW_KEY, utils.uuid(16))
          this.$router.push(this.addQueryToPath(path, {_m: module.code}))
        } else {
          console.error('layout > 未配置模块[' + module.title + ']首页面！')
        }
      },
      addQueryToPath(path, params) {
        // return path.indexOf('\?') !== -1 ? path + '&' + this.$gl.utils.param(param) : path + '?' + this.$gl.utils.param(param)
        return utils.addParamToPath(path, params)
      },
      changeColor: function (newColor) {
        let lastColor = this.color + ''
        this.color = newColor
        this.$emit('changeColor', this.color, lastColor)
      },
      changeLayoutMode: function () {
        this.$emit('changeLayoutMode', (this.mode + 1) % 2)
      },
      profile: function () {
        this.$router.push('/m/platform-core/profile/UserProfile')
      },
      help: function () {
      },
      // color: function (color) {
      //   console.log(color)
      // },
      logout: function () {
        this.$gl.security.logout()
      },
      toggleFullScreen() {
        screenfull.toggle()
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
