<template>
  <div class="ui middle aligned center aligned grid gl-home-bg" :style="winHeightStyle" style="margin-top: 0">
    <div class="login column" style="padding-top: 0em;width: 24em">
      <form class="ui large form login-form">
        <div class="ui top attached segment " style="background-color: rgba(255, 255, 255, 0.2)">
          <!--<h2 class="ui image header" style="height: 200px;color: white;font-size: 1.75em;text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">-->
          <!--&lt;!&ndash;<img src="../../static/assets/images/logo/48x48_teal.png" class="image">&ndash;&gt;-->
          <!--<div class="content">-->
          <!---->
          <!--&lt;!&ndash;登录 GEELATO-ADMIN&ndash;&gt;-->
          <!--</div>-->
          <!--</h2>-->
          <br/>
          <h2 class="ui image header">
            <img src="logo_blue.svg" class="image" style="width: 150px;height: 150px;box-shadow: 0 0 30px #2185d0">
          </h2>
          <!--<i class="massive google icon" style="text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2)"-->
          <!--:style="'color:'+$gl.ui.colorHex[$gl.ui.color.primary]"-->
          <!--aria-readonly="true"></i>-->
          <br/>
        </div>
        <div class="ui stacked attached segment" style="background-color: rgba(255, 255, 255, 0.2)">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" v-model="loginName" name="loginName" placeholder="登录名">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" v-model="password" name="password" placeholder="密码">
            </div>
          </div>
          <div class="ui fluid large button" @click="submit" :class="color">登录</div>
        </div>
        <div class="ui error message"></div>
      </form>
      <div class="ui message" v-if="$gl.login.registerEnable">
        加入我们<a href="#">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../../assets/script/utils'

  export default {
    data() {
      return {
        loginName: '',
        password: '',
        remember: false,
        winHeightStyle: {}
      }
    },
    computed: {
      color: function () {
        // let color = utils.session(this.$gl.consts.SESSION_GEELATO_CONFIG_COLOR)
        // return color && color.primary ? color.primary : this.$gl.ui.color.primary
        return 'blue'
      }
    },
    created() {
    },
    mounted() {
      let thisVue = this
      $('.ui.login-form').form({
        fields: {
          loginName: {
            identifier: 'loginName',
            rules: [
              {
                type: 'empty',
                prompt: '登录名不允许为空'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'empty',
                prompt: '请输入您的密码'
              },
              {
                type: 'length[6]',
                prompt: '密码必须至少6个字符'
              }
            ]
          }
        },
        onSuccess: thisVue.login
      })
      thisVue.resize()
      $(window).resize(function () {
        thisVue.resize()
      })
    },
    methods: {
      login: function () {
        let thisVue = this
//        console.log('login')
        let user = '{"loginName": "@loginName", "password": "@password"}'
        user = user.replace('@loginName', thisVue.loginName)
        user = user.replace('@password', thisVue.password)
        thisVue.$gl.security.login(user, thisVue.remember, function (data) {
          console.log('success....login....', data)
          thisVue.$gl.security.profile(data)
          // 改用了$gl存储状态数据，不用$store
          // thisVue.$store.commit(types.LOGIN, data)
          // $router.push('/m/')的方式不会刷新页面，导致后续异步组件加载展示时，样式信息不全，未知什么原因，先改用window.location.replace的方式
          // thisVue.$router.push('/m/')
          window.location.replace('/')
        })
      },
      submit: function () {
        $('.ui.login-form').form('validate form')
      },

      resize: function () {
        this.winHeightStyle = {height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 'px'}
      }
    }
  }
</script>

<style>
  body {
    /*background-color: #DADADA;*/
  }

  body > .grid {
    height: 100%;
  }

  .login.column .image {
    margin-top: -100px;
  }

  .login.column {
    max-width: 450px;
  }
</style>
