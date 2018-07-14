<template>
  <div class="content active">
    <!--<div class="dnd-item">-->
    <!--<div class="dnd-dsc">-->
    <!--<span class="dnd-title"><label>部局容器</label></span>-->
    <!--</div>-->
    <!--<toolbar></toolbar>-->
    <!--<div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">-->
    <!--<div class="ui padded grid gl-utils-no-mp dnd-target" data-dnd-allow="collection,divForm,table,field">-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>一列</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="sixteen wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>两列 3-13</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="three wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="thirteen wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>两列 4-12</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="four wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="twelve wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>两列 5-11</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="five wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="eleven wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>两列 6-10</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="six wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="ten wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>两列 7-9</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="seven wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="nine wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>两列 8-8</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="eight wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="eight wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>三列均分 1-1-1</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui three column padded grid gl-utils-no-mp">
          <div class="column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>三列 4-8-4</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="four wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="eight wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="four wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
    <div class="dnd-item">
      <div class="dnd-dsc">
        <span class="dnd-title"><label>三列 3-10-3</label></span>
      </div>
      <toolbar></toolbar>
      <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
        <div class="ui padded grid gl-utils-no-mp">
          <div class="three wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="ten wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
          <div class="three wide column dnd-target" data-dnd-allow="collection,divForm,table,field">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dndHandler from '../../../components/designer/dndHandler'
  import toolbar from './stage/stage-toolbar'

  export default {
    data () {
      return {}
    },
    mounted: function () {
      let $items = $(this.$el).find('.dnd-item')
//      $items.mouseover(function (e) {
//        $(e.target).addClass('active')
//      })
//      $items.mouseout(function (e) {
//        $(e.target).removeClass('active')
//      })
      dndHandler.bindDragObjects($items)
      $(this.$el).find('.ui.accordion').accordion()
    },
    methods: {},
    components: {toolbar}
  }
</script>
<style scoped>

</style>
