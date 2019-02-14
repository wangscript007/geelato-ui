<template>
  <div :style="{height:height}" style="padding-right: 1px">
    <!--最小化的模式-->
    <div class="ui vertical small menu" :class="minSideBarClass" :style="{width:width}" v-show="size==='min'">
      <div class="ui item dropdown" :style="{width:logoWidth,height:headerHeight}" v-if="isShowLogo()">
        <div class="text">
          <img class="ui avatar image" src="../../assets/images/logo/48x48.png">
        </div>
      </div>
      <div v-for="(subMenu,subMenuIndex) in menu" class="ui left pointing dropdown link item" :key="subMenuIndex"
           :title="subMenu.title"
           v-show="size==='min'">
        <i class="dropdown icon" style="margin: 0;padding: 0"></i>{{subMenu.title.substr(0, 1)}}
        <div class="menu">
          <a v-for="(item,index) in subMenu.items" class="item" :key="index" :href="item.href"
             :target="item.target">{{item.title}}</a>
        </div>
      </div>
    </div>
    <!--最大化的模式 该模式下才会展示配置插入的html-->
    <div class="ui vertical following accordion small menu" :class="minSideBarClass"
         style="border: 0px;margin-top: 0;"
         v-show="size==='max'">
      <div class="ui item dropdown" :style="{width:logoWidth,height:headerHeight}" v-if="isShowLogo()">
        <div class="text">
          <img class="ui image" src="/logo_blue.svg">
          <span style="font-weight: bold;text-align: center">Geelato</span>
          <!--<img class="ui avatar image" src="../../assets/images/logo/48x48.png">-->
          <!--<span style="font-weight: bold;font-size: 1.25em;margin-left: -13px;">eelato</span>-->
        </div>
      </div>
      <!--提示配置菜单-->
      <div class="ui error message" v-if="!menu||menu.length===0">
        未配置菜单
      </div>
      <div v-html="html"></div>
      <div v-for="(subMenu,menuItemIndex) in menu" class="item" :key="menuItemIndex" v-if="size==='max'">
        <i class="icon gl-menu-icon" :class="subMenu.clazz"></i>
        <a class="title" :class="{active:menuItemIndex===0}">
          <i class="dropdown icon"></i>
          {{subMenu.title}}
        </a>
        <div class="content menu" style="border: 0px;padding-left: 0.5em" :class="{active:menuItemIndex===0}">
          <a v-for="(item,subMenuItemIndex) in subMenu.items" :key="subMenuItemIndex" class="item"
             style="background-color:rgba(248,248,248,0.8)"
             :href="$gl.utils.addParamToPath(item.href,{_m:$store.state.platform.currentModule.code})"
             :target="item.target"
             @click="selectMenuItem(menuItemIndex,subMenuItemIndex)"><i class="icon"
                                                                          v-show="activeMenuItem==menuItemIndex+'_'+subMenuItemIndex">▌</i>
            {{item.title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    props: {
      mode: Number,
      width: String,
      height: String,
      size: String,
      headerHeight: String
    },
    data() {
      return {
        html: '',
        msg: '',
        logoWidth: this.$gl.layout.logo.width,
        activeMenuItem: ''
      }
    },
    computed: {
      menu() {
        for (let i in this.$gl.modules) {
          let module = this.$gl.modules[i]
          if (module.code === this.$store.state.platform.currentModule.code) {
            console.log('this.$store.state.platform.currentModule.code>', this.$store.state.platform.currentModule.code)
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
//      let layout = utils.session('geelato.this.$gl.layout')
      this.minSideBarClass = this.mode === 1 ? 'inverted ' + this.$gl.ui.color.primary : ''

      // 从配置中读取默认active的菜单
//      for (let i in this.$gl.modules) {
//        let module = this.$gl.modules[i]
//        if (module.active) {
//          this.html = module.html
//          this.$store.commit(types.CHANGE_MODULE, module)
//          break
//        }
//      }
    },
    methods: {
      selectMenuItem(menuItemIndex, subMenuItemIndex) {
        this.activeMenuItem = menuItemIndex + '_' + subMenuItemIndex
      },
      isShowLogo() {
//        let layout = utils.session('geelato.this.$gl.layout')
//        let mode = layout.mode ? layout.mode : this.$gl.layout.mode
        return this.mode === 1
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui.vertical.menu .menu .item {
    padding-top: .3em;
    padding-bottom: .4em;
    font-size: 1em;
    padding-left: 2.8em !important;
  }

  .gl-menu-icon {
    float: left !important;
    margin: 0.2em 0.5em 0.2em !important;
  }
</style>
