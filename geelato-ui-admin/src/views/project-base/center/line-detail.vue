<template>
  <div style="min-height: 500px">
    <layout-lr title="项目简报" :rightTitle="rightTitle" :leftActions="leftActions">
      <div slot="left">
        <gl-group item=".list>.item" index="-1">
          <div class="ui middle aligned divided selection animated list">
            <div class="item" v-for="item in projectShortReport.items"
                 @click="currentPlan=item;rightTitle=item.name;pdfSrc=testPdfSrc">
              <div class="description" :class="{header:currentPlan.id===item.id}">
                {{item.name}}
              </div>
            </div>
          </div>
        </gl-group>
      </div>
      <div slot="rightAction">
        <div class="item">
          <a :href="testPdfSrc" target="_blank" download="201802.pdf"
             class="ui mini button"
             :class="$GL.ui.color.primary">下载</a>
        </div>
      </div>
      <div slot="right">
        <pdf :src="pdfSrc" :page="1"></pdf>
      </div>
    </layout-lr>
  </div>
</template>
<script>
  import Pdf from 'vue-pdf'
  import Jstree from '../../../components/mix/jstree'
  import GlTable from '../../../components/collections/table/index'
  import mockData from '../../../mock/data'
  import prjCfg from '../../../common/project/config'

  export default {
    props: {},
    data () {
      return {
//        testPdfSrc: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
        testPdfSrc: '/static/doc/report/201802.pdf',
        pdfSrc: '',
        rightTitle: '',
        listItemClass: 'header',
        currentPlan: {},
        // 最大时，不展示查询区
        isMax: false,
        leftActions: [
//          {
//          title: '新增',
//          click: 'modal',
//          modal: {
//            type: 'page',
//            value: 'sys_role_list_detail',
//            query: {}
//          }
//        }
        ],
        treeConfig: {},
        // 任务列表
        taskData: {
          columns: [
//            {field: 'id', title: 'ID', type: 'string'},
//            {field: 'pid', title: '父ID', type: 'string'},
            {field: 'level', title: '层级', type: 'string'},
            {field: 'name', title: '任务名称x', type: 'string', format: '', editable: true},
            {field: 'type', title: '类型', type: 'string'}
//            {field: 'res', title: '资源', type: 'string', format: '', editable: true},
//            {field: 'planFinishDate', title: '计划完成时间', type: 'string', format: ''}
          ],
          dataSource: [
            {id: '100000000', pid: '', level: 1, name: '计量支付信息打印格式有误，字体存在问题。', res: '张三', planFinishDate: '2018-3-26'},
            {
              id: '100000001',
              pid: '100000000',
              level: 2,
              name: '计量支付信息打印格式有误，字体存在问题。',
              type: '分部',
              res: '李四',
              planFinishDate: '2018-3-26'
            },
            {
              id: '100000002',
              pid: '100000000',
              level: 2,
              name: '计量支付信息打印格式有误，字体存在问题。',
              type: '分部',
              res: '李四',
              planFinishDate: '2018-3-26'
            },
            {
              id: '100000003',
              pid: '100000002',
              level: 3,
              name: '计量支付信息打印格式有误，字体存在问题。',
              type: '分项',
              res: '王五2',
              planFinishDate: '2018-3-26'
            }
          ]
        }
      }
    },
    computed: {
      projectConfig: function () {
        return prjCfg.get(this.$route.query.module)
      },
      projectGroups: function () {
        return mockData.get(this.$route.query.module).projectGroups
      },
      projectShortReport: function () {
        return mockData.get(this.$route.query.module).report.projectShortReport
      }
    },
    created () {
      this.$_loadData()
    },
    mounted () {
      this.currentPlan = this.projectShortReport.items[0]
    },
    updated () {
    },
    methods: {
      $_loadData () {
        this.treeConfig = {
          core: {
            data: [
              {
                text: '轨道交通',
                state: {
                  'opened': true,
                  'selected': true
                },
                children: [
                  {text: '明挖'},
                  {text: '暗挖'},
                  {text: '高架'},
                  {text: '机电'},
                  {
                    text: '土建', children: [{text: '明挖'}, {text: '暗挖'}]
                  }
                ]
              }
            ]
          },
          plugins: ['contextmenu', 'dnd', 'state', 'types']
        }
      }
    },
    components: {Jstree, GlTable, Pdf}
  }
</script>
<style scoped>
</style>
