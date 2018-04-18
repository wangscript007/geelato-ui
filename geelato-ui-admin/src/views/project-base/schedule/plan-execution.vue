<template>
  <div class="gl-page-content-wrapper">
    <div class="ui menu">
      <a v-for="year in years" class="item" style="font-weight: bold" @click="activeYear=year"
         :class="{active:(activeYear===year)}">
        {{year}}
      </a>
    </div>
    <div class="ui info message">
      图例：&nbsp;&nbsp;
      <i class="eye icon"></i>已提交可查看
      <i class="arrow up icon"></i>待提交
      <i class="window minimize icon"></i>无需提交
    </div>
    <table class="ui celled selectable compact table">
      <thead>
      <tr>
        <th>计划名称</th>
        <th>一月</th>
        <th>二月</th>
        <th>三月</th>
        <th>四月</th>
        <th>五月</th>
        <th>六月</th>
        <th>七月</th>
        <th>八月</th>
        <th>九月</th>
        <th>十月</th>
        <th>十一月</th>
        <th>十二月</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in plan.yearItems">
        <td>
          <h4 class="ui image header">
            <div class="content">
              {{item.name}}
              <div class="sub header">{{item.lastUpdateAt}}更新
              </div>
            </div>
          </h4>
        </td>
        <plan-item :year="item.y" :month="item.m1" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:1})"></plan-item>
        <plan-item :year="item.y" :month="item.m2" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:2})"></plan-item>
        <plan-item :year="item.y" :month="item.m3" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:3})"></plan-item>
        <plan-item :year="item.y" :month="item.m4" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:4})"></plan-item>
        <plan-item :year="item.y" :month="item.m5" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:5})"></plan-item>
        <plan-item :year="item.y" :month="item.m6" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:6})"></plan-item>
        <plan-item :year="item.y" :month="item.m7" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:7})"></plan-item>
        <plan-item :year="item.y" :month="item.m8" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:8})"></plan-item>
        <plan-item :year="item.y" :month="item.m9" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:9})"></plan-item>
        <plan-item :year="item.y" :month="item.m10" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:10})"></plan-item>
        <plan-item :year="item.y" :month="item.m11" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:11})"></plan-item>
        <plan-item :year="item.y" :month="item.m12" :activeYear="activeYear"
                   @upload="$_uploadPlan({id:item.id,name:item.name,year:item.y,month:12})"></plan-item>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import PlanItem from './plan-execution-item.vue'

  export default {
    props: {},
    data () {
      return {
        activeYear: '',
        years: [2016, 2017, 2018]
      }
    },
    computed: {
      projectConfig: function () {
        return this.$mockData.get(this.$route.query.module)
      },
      projectGroups: function () {
        return this.$mockData.get(this.$route.query.module).projectGroups
      },
      plan: function () {
        return this.$mockData.get(this.$route.query.module).plan
      }
    },
    created () {
      this.$_loadData()
    },
    mounted () {
    },
    updated () {
    },
    methods: {
      $_loadData () {
      },
      $_uploadPlan (item) {
        this.$router.push({path: '/m/project-base/schedule/plan-task', query: item})
      }
    },
    components: {PlanItem: PlanItem}
  }
</script>
<style scoped>
  td:not(:first-of-type) {
    text-align: center !important;
  }
</style>
