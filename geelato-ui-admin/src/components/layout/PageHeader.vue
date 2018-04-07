<template>
  <div class="ui top borderless menu gm-layout-header" :class="headerClass">
    <div class="left menu">
      <div class="ui item dropdown" :style="{width:logoWidth}" v-if="isShowLogo()">
        <div class="text">
          <img class="ui avatar image" src="../../../static/assets/images/logo/48x48.png">
          <span style="font-weight: bold;font-size: 1.25em;margin-left: -13px;">eelato</span>
        </div>
      </div>
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
          <img class="ui avatar image" src="../../../static/assets/images/avatar/large/jenny.jpg">
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
        <a class="item"><i class="theme icon"></i></a>
        <div class="ui flowing popup top left transition hidden">
          <div v-for="color in colors" class="ui mini button" :class="{[Object.keys(color)[0]]:true}"
               @click="$_changeColor(color)"></div>
        </div>
      </sui>
      <!--<a class="item" title="mode" @click="$_changeTheme"><i class="paint-brush icon"></i></a>-->
      <a class="item" title="更改部局" @click="$_changeLayoutMode"><i class="exchange alternate icon"></i></a>
      <a class="item" title="帮助" @click="$_help"><i class="question circle outline icon"></i></a>
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
          <div class="ui three column divided left aligned grid" style="max-width: 400px">
            <div class="column" v-for="item in modules">
              <div class="ui button" @click="$_changeModule(item)">{{item.title}}</div>
            </div>
          </div>
        </div>
      </sui>
    </div>
  </div>
</template>

<script>
  import config from '../../common/config'
  import * as types from '../../store/types'
  import Sui from '../../components/sui/index.vue'

  export default {
    props: {
      mode: Number,
      size: String
    },
    data () {
      return {
        colors: this.$GL.ui.theme.colors,
        color: this.$GL.ui.theme.color.primary,
        user: this.$GL.security.profile().user,
        logoWidth: config.layout.logo.width,
        modules: config.modules
      }
    },
    computed: {
      titleHtml: function () {
        return this.$store.state.platform.headerTitle
      }
    },
    created: function () {
      this.headerClass = this.mode === 1 ? '' : 'inverted ' + this.$GL.ui.theme.color.primary
    },
    mounted: function () {
    },
    methods: {
      isShowLogo: function () {
        return this.mode === 0
      },
      $_changeModule: function (module) {
        console.log(this.$store.state.platform.currentModule.code)
        this.$store.commit(types.CHANGE_MODULE, module)
        console.log(this.$store.state.platform.currentModule.code)
      },
      $_changeColor: function (newColor) {
        let lastColor = this.color + ''
        this.color = Object.keys(newColor)[0]
        console.log(lastColor, this.color)
        this.$emit('changeColor', this.color, lastColor)
      },
      $_changeLayoutMode: function () {
        this.$emit('changeLayoutMode', (this.mode + 1) % 2)
      },
      $_profile: function () {
//        this.$store.state.user
        this.$router.push('/m/platform/profile/user-profile')
      },
      $_help: function () {
      },
      $_color: function (color) {
      },
      logout: function () {
        this.$GL.security.logout()
      }
    },
    components: {Sui}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
