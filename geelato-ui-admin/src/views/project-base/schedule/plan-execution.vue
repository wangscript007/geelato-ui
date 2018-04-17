<template>
  <div class="gl-page-content-wrapper">
    <div class="ui menu">
      <a v-for="year in years" class="item" style="font-weight: bold" @click="activeYear=year" :class="{active:(activeYear===year)}">
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
      <tr v-for="wp in planWorkPoint">
        <td>
          <h4 class="ui image header">
            <div class="content">
              {{wp.name}}
              <div class="sub header">{{wp.lastUpdateAt}}更新
              </div>
            </div>
          </h4>
        </td>
        <td-item :year="wp.y" :month="wp.m1" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m2" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m3" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m4" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m5" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m6" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m7" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m8" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m9" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m10" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m11" :activeYear="activeYear"></td-item>
        <td-item :year="wp.y" :month="wp.m12" :activeYear="activeYear"></td-item>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import testData from '../../../mock/project/project-metro/index'
  import TdItem from './plan-work-point-item.vue'

  export default {
    props: {},
    data () {
      return {
        planWorkPoint: testData.plan.yearItems,
        activeYear: '',
        years: [2016, 2017, 2018]
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
      $_uploadPlan (month) {
        console.log('month>', month)
      }
    },
    components: {TdItem}
  }
</script>
<style scoped>
  td:not(:first-of-type) {
    text-align: center !important;
  }
</style>
