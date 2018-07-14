<template>
  <div class="dnd-content" data-meta="{type:'layout',ui:'portlet'}" data-id="zsgxBWWT">
    <div class="ui vertical clearing dividing segment">
      <h4 class="ui left floated header" style="padding-left: 2em">
        <i class="fa fa-gift"></i>&nbsp;&nbsp;<span>标题</span>
      </h4>
      <!--<h4 class="ui right floated header">-->
      <!--<div data-dnd-allow="control,field" class="dnd-target">-->
      <!--</div>-->
      <!--</h4>-->
    </div>
    <div>
      <form action="#" class="ui form">
        <div data-dnd-allow="layout,element,divForm,table" class="dnd-target">
        </div>
        <div class="ui center align secondary mini menu">
          <div class="right item">
            <button class="ui teal mini button" @click="submit" @keyup.enter="submit">查询</button>&nbsp;
            <button class="ui teal mini button" @click="reset">重置</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import settingHandler from '../../../../components/designer/SettingHandler'

  export default {
    data () {
      return {}
    },
    created: function () {
    },
    mounted: function () {
      settingHandler.register('portlet', {
        data: {
          name: '.portlet-title>.caption>span'
        },
        facade: {
          icon: '.portlet-title>.caption>i',
          class: '[data-meta*=\'portlet\']',
          style: '[data-meta*=\'portlet\']'
        }
      })
    },
    methods: {
      getType () {
        return 'html5'
      },
      getConfig () {
      },
      submit () {
      },
      reset () {
      }
    },
    components: {}
  }
</script>
<style>
</style>
