<template>
  <div :style="{height:height}" style="padding-right: 1px">
    <!--最小化的模式-->
    <div class="ui vertical small menu" :class="minSideBarClass" :style="{width:width}" v-show="size==='min'">
      <div class="ui item dropdown" :style="{width:logoWidth,height:headerHeight}" v-if="isShowLogo()">
        <div class="text">
          <img class="ui avatar image" src="../../../static/images/logo/48x48.png">
        </div>
      </div>
      <div v-for="subMenu in menu" class="ui left pointing dropdown link item" :title="subMenu.title"
           v-show="size==='min'">
        <i class="dropdown icon" style="margin: 0;padding: 0"></i>{{subMenu.title.substr(0, 1)}}
        <div class="menu">
          <a v-for="item in subMenu.items" class="item" :href="item.href" :target="item.target">{{item.title}}</a>
        </div>
      </div>
    </div>
    <!--最大化的模式 该模式下才会展示配置插入的html-->
    <div class="ui vertical following accordion small menu" :class="minSideBarClass" style="border: 0px;margin-top: 0;"
         v-show="size==='max'">
      <div class="ui item dropdown" :style="{width:logoWidth,height:headerHeight}" v-if="isShowLogo()">
        <div class="text">
          <img class="ui avatar image" src="../../../static/images/logo/48x48.png">
          <span style="font-weight: bold;font-size: 1.25em;margin-left: -13px;">eelato</span>
        </div>
      </div>
      <!--提示配置菜单-->
      <div class="ui error message" v-if="!menu||menu.length===0">
        未配置菜单，请到/src/common/config.js中配置
      </div>
      <div v-html="html"></div>
      <div v-for="(subMenu,menuItemIndex) in menu" class="item" v-if="size==='max'">
        <a class="title active">
          <i class="dropdown icon"></i>
          {{subMenu.title}}
        </a>
        <div class="content menu" style="border: 0px;padding-left: 0.5em">
          <a v-for="(item,subMenuItemIndex) in subMenu.items" class="item" :href="item.href" :target="item.target"
             @click="$_selectMenuItem(menuItemIndex,subMenuItemIndex)"><i class="icon"
                                                                          v-show="activeMenuItem==menuItemIndex+'_'+subMenuItemIndex">▌</i>
            {{item.title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../common/config'
  import * as types from '../../store/types'
  //  import utils from '../../common/utils'

  export default {
    props: {
      mode: Number,
      width: String,
      height: String,
      size: String,
      headerHeight: String
    },
    data () {
      return {
        html: '',
        msg: '',
        logoWidth: config.layout.logo.width,
        activeMenuItem: ''
      }
    },
    computed: {
      menu () {
        for (var i in config.modules) {
          var module = config.modules[i]
          if (module.code === this.$store.state.platform.currentModule.code) {
            this.html = module.html
            return module.menu
          }
        }
        console.error('模块未配置菜单！')
        return []
      }
    },
//    watch: {
//      'state.platform.currentModule.code': function (val, oldVal) {
//        console.log(val)
//      }
//    },
    created: function () {
//      let layout = utils.session('geelato.config.layout')
      this.minSideBarClass = this.mode === 1 ? 'inverted ' + this.$GL.ui.color.primary : ''

      // 从配置中读取默认active的菜单
      for (var i in config.modules) {
        var module = config.modules[i]
        if (module.active) {
          this.html = module.html
          this.$store.commit(types.CHANGE_MODULE, module)
          break
        }
      }
    },
    methods: {
      $_selectMenuItem (menuItemIndex, subMenuItemIndex) {
        this.activeMenuItem = menuItemIndex + '_' + subMenuItemIndex
      },
      isShowLogo () {
//        let layout = utils.session('geelato.config.layout')
//        let mode = layout.mode ? layout.mode : config.layout.mode
        return this.mode === 1
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui.vertical.menu .menu .item {
    padding-top: .3em;
    padding-bottom: .3em;
    font-size: 1em;
  }
</style>
