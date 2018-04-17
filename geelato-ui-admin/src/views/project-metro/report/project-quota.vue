<template>
  <div class="gl-page-content-wrapper">
    <div class="ui mini menu">
      <div class="item">选择年份</div>
      <a v-for="year in years" class="item" style="font-weight: bold" @click="activeYear=year"
         :class="{active:(activeYear===year)}">
        {{year}}
      </a>
    </div>
    <div class="ui mini menu">
      <div class="item">选择月份</div>
      <a v-for="month in months" class="item" style="font-weight: bold" @click="activeMonth=month"
         :class="{active:(activeMonth===month)}">
        {{month}}
      </a>
    </div>
    <div class="ui mini segment">
      选择指标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div v-for="(name,key) in quotaNames" class="ui mini primary button">{{name}}</div>
    </div>
    <div class="ui mini segment">
      选择工点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div v-for="wp in workPoints" class="ui mini primary button">{{wp}}</div>
    </div>
    <div class="ui info message">
      图例：&nbsp;&nbsp;&nbsp;&nbsp;
      进度条表示完成百分比、颜色方面，红色表示延迟、黄红表示预警、绿色表示正常
    </div>
    <table class="ui celled selectable compact table">
      <thead>
      <tr>
        <th>工点</th>
        <template v-for="(name,key) in quotaNames">
          <th>
            {{name}}
          </th>
        </template>
      </tr>
      </thead>
      <tbody>
      <tr v-for="wp in workPoints">
        <td>
          <h4 class="ui image header">
            <div class="content">
              {{wp}}
            </div>
          </h4>
        </td>
        <template v-for="(name,key) in quotaNames">
          <quota-item percent="60" color="yellow"></quota-item>
        </template>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import testData from '../../../mock/project/project-metro/index'
  import QuotaItem from './project-quota-item.vue'
  import utils from '../../../common/utils'

  export default {
    props: {},
    data () {
      return {
        quotas: testData.report.quota,
        activeYear: '2016',
        years: [2016, 2017, 2018],
        months: ['全年', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        activeMonth: '全年',
        workPoints: {},
        quotaNames: {}
      }
    },
    created () {
      this.$_loadData()
    },
    mounted () {
      console.log('groupBy', this.$_groupBy(testData.report.quota, 'wp'))
      this.workPoints = utils.distinct(testData.report.quota, 'wp')
      this.quotaNames = utils.distinct(testData.report.quota, 'name')
      console.log('this.quotaNames>', this.quotaNames)
    },
    updated () {
    },
    methods: {
      $_loadData () {
      },
      $_groupBy (arr, groupName) {
        console.log('arr', arr)
        arr.reduce(function (result, item) {
          if (item[groupName] in result) {
            result[groupName].push(item)
          } else {
            result[groupName] = [item]
          }
          return result
        }, {})
      },
//      $_distinct (arr, col) {
//        console.log('arr', arr)
//        let result = arr.reduce(function (result, item) {
//          if (item[col] in result) {
//          } else {
//            result[item[col]] = ''
//          }
//          return result
//        }, {})
//        console.log('$_distinct result', result)
//      },
      $_uploadPlan (month) {
        console.log('month>', month)
      }
    },
    components: {QuotaItem}
  }
</script>
<style scoped>
  td:not(:first-of-type) {
    text-align: center !important;
  }

  .ui.menu, .ui.segment {
    margin: 0.1em 0;
  }
</style>
