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

      <div class="ui right item inline dropdown" @click="$_profile">
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
        <a class="item" @click="$_toggleFullScreen"><i class="window maximize icon"></i></a>
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
               @click="$_changeColor(key)" :key="key"></div>
        </div>
      </sui>
      <!--<a class="item" title="mode" @click="$_changeTheme"><i class="paint-brush icon"></i></a>-->
      <a class="item" title="更改部局" @click="$_changeLayoutMode"><i class="exchange alternate icon"></i></a>
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
              <div class="ui button" @click="$_changeModule(item)" style="width: 9em">
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
      }
    },
    created: function () {
      this.headerClass = this.mode === 1 ? '' : 'inverted ' + this.$gl.ui.color.primary
      // 首次加载切换到角色的默认模块
      // TODO 改从当前用户信息中获取
      let currentRole = 'admin'
      for (let m in this.modules) {
        let module = this.modules[m]
        // console.log(module, this.$gl.defaultModule[currentRole])

        if (module.code === this.$gl.defaultModule) {
          // 不按角色区分默认模块 typeof defaultModule is string
          this.$_changeModule(module)
          break
        } else if (typeof this.$gl.defaultModule === 'object' && module.code === this.$gl.defaultModule[currentRole]) {
          // 按角色区分默认模块
          this.$_changeModule(module)
          break
        }
      }
    },
    mounted: function () {
    },
    methods: {
      isShowLogo: function () {
        return this.mode === 0
      },
      $_changeModule: function (module) {
        console.log('module>', module)
        // 通知更改模块，以便更改菜单
        this.$store.commit(types.CHANGE_MODULE, module)
        this.$emit('changeModule', module)
        // 更改模块首页面
        if (module.index) {
          // 如将：'/#/m/project-metro/info/select-project',改为'/m/project-metro/info/select-project',
          let path = module.index.replace('/#', '').replace('#', '')
//          path = path + '?' + 'module=' + module.code + '&t=' + utils.uuid(16)
          this.$store.commit(types.ROUTE_VIEW_KEY, utils.uuid(16))
          this.$router.push(path)
        } else {
          console.error('未配置模块[' + module.title + ']首页面！')
        }
      },
      $_changeColor: function (newColor) {
        let lastColor = this.color + ''
        this.color = newColor
        this.$emit('changeColor', this.color, lastColor)
      },
      $_changeLayoutMode: function () {
        this.$emit('changeLayoutMode', (this.mode + 1) % 2)
      },
      $_profile: function () {
        this.$router.push('/m/platform-core/profile/UserProfile')
      },
      $_help: function () {
      },
      $_color: function (color) {
        console.log(color)
      },
      logout: function () {
        this.$gl.security.logout()
      },
      $_toggleFullScreen() {
        screenfull.toggle()
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
