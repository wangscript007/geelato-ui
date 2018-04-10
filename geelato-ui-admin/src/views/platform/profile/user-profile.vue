<template>
  <div class="ui padded grid">
    <div class="five wide column">
      <!--<h4 class="ui dividing header">基础信息</h4>-->
      <div class="ui segment">
        <div class="ui card">
          <div class="ui image">
            <img src="/static/images/avatar/large/jenny.jpg" class="visible content">
          </div>
          <div class="content">
            <a class="header">超级管理员</a>
            <div class="meta">
              <span class="date">注册日期 2018-02-02</span>
            </div>
          </div>
          <div class="extra content">
            <a>
              <i class="users icon"></i>
              参与6个项目
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="ui clearing vertical divider">
      +
    </div>
    <div class="eleven wide column">
      <sui :type="'tab'" :selector="'.menu .item'">
        <div class="ui top attached tabular pointing secondary fruit menu">
          <a class="active item" data-tab="first">基本信息</a>
          <a class="item" data-tab="second">修改密码</a>
          <a class="item" data-tab="third">个性设置</a>
        </div>
        <div class="ui bottom attached active tab segment" data-tab="first">
          <user-info></user-info>
        </div>
        <div class="ui bottom attached tab segment" data-tab="second">
          <change-password></change-password>
        </div>
        <div class="ui bottom attached tab segment" data-tab="third">
          设置初始展示模块
        </div>
      </sui>
    </div>
  </div>
</template>
<script>
  import Sui from '../../../components/sui/index.vue'
  import ChangePassword from './change-password.vue'
  import UserInfo from './user-info.vue'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {data: {}}
        }
      }
    },
    data () {
      return {
        theme: this.$GL.ui.color.primary
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {Sui, UserInfo, ChangePassword}
  }
</script>
<style scoped>
  /*five wide column 为 31.25% 修复divider在chrome的bug,@see https://github.com/Semantic-Org/Semantic-UI/issues/4342*/
  .ui.grid > .column + .divider, .ui.grid > .row > .column + .divider {
    left: 31.25% !important;
  }
</style>
