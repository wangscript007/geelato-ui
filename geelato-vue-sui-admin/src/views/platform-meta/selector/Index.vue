<template>
  <div class="gl-page-content-wrapper">
    <gl-layout-page title="实体列表" right-title="实体详情">
      <div slot="left">
        <gl-group item=".list>.item">
          <div class="ui middle aligned divided selection animated list">
            <div class="item" v-for="item in entityNames" @click="loadMeta(item)">
              <div class="description" :class="{header:currentEntityName===item}">
                {{item}}
              </div>
            </div>
          </div>
        </gl-group>
      </div>
      <div slot="leftAction">
        <div class="item">
          <!--<a class="ui mini button" :class="$gl.ui.color.primary" @click="newPlan.state='editing'">新增</a>-->
        </div>
      </div>
      <div slot="rightAction">
        <div class="item">
          <!--<router-link-->
          <!--:to="{ path: '/m/project-base/schedule/'+projectConfig.page.planConfig, query: { id: currentPlan.id,name: currentPlan.name }}"-->
          <!--class="ui mini button" :class="$gl.ui.color.primary">编制计划-->
          <!--</router-link>-->
        </div>
      </div>
      <div slot="right">
        <table class="ui fluid compact celled table gl-compact">
          <thead>
          <tr>
            <th>序号</th>
            <th>列名</th>
            <th>标题</th>
            <th>类型</th>
            <th>可空</th>
            <th>最大长度</th>
            <th>精度（precision）</th>
            <th>小数位数（scale）</th>
          </tr>
          </thead>
          <tr v-for="(item,index) in meta">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.title}}</td>
            <td>{{item.type}}</td>
            <td>{{item.nullable}}</td>
            <td>{{item.charMaxLength}}</td>
            <td>{{item.precision}}</td>
            <td>{{item.scale}}</td>
          </tr>
        </table>
      </div>
    </gl-layout-page>
  </div>
</template>
<script>

  export default {
    props: {
      defaultEntity: {
        type: String
      }
    },
    data() {
      return {
        // 当前实体名称
        currentEntityName: '',
        // 实体名称列表
        entityNames: [],
        // 一个实体的元数据信息
        meta: []
      }
    },
    computed: {},
    created() {
      this.loadEntityNames()
      this.loadMeta(this.defaultEntity)
    },
    watch: {
      'defaultEntity': function (val, oval) {
        this.loadMeta(this.defaultEntity)
      }
    },
    mounted() {
    },
    updated() {
    },
    methods: {
      loadEntityNames() {
        let thisVue = this
        thisVue.$gl.data.queryEntityNames().then(function (res) {
          console.log(res)
          thisVue.entityNames = res.data.sort()
        })
      },
      loadMeta(entityName) {
        if (!entityName) {
          return
        }
        let thisVue = this
        thisVue.currentEntityName = entityName
        thisVue.$gl.data.queryMeta(thisVue.currentEntityName).then(function (res) {
          thisVue.meta = res.meta
          thisVue.$emit('select', {name: entityName, meta: thisVue.meta})
        })
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
