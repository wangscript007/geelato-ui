<template>
  <div class="ui padded grid">
    <div class="ui segment" style="width: 100%">
      <div class="title">tree demo
      </div>
      <div class="ui mini button" @click="treeId++">创建新树</div>
    </div>
    <gl-tree tree-entity-name="platform_module"
             tree-entity-name-field="title"
             node-entity-name="platform_menu_item"
             node-entity-name-field="title"
             :tree-id="treeId"
             tree-name="根目录">
    </gl-tree>
  </div>
</template>
<script>

  export default {
    props: {},
    data() {
      return {
        treeId: 9838743
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>
<style scoped>
</style>
