<template>
  <div class="ui grid" style="padding: 0;margin: 0">
    <div class="eleven wide column" style="padding: 0;margin: 0">
      <div id="centerMapContainer" :style="{height:$store.state.platform.currentLayout.content.height}"></div>
      <sui id="centerMapContainerMenu" type="tab" selector=".menu .item">
        <div class="ui top attached pointing mini secondary menu" style="background-color: white">
          <a class="active item" data-tab="first">线路</a>
          <a class="item" data-tab="second">图例</a>
        </div>
        <div class="ui bottom attached active tab segment" data-tab="first"
             style="padding: 8px;cursor: pointer;color: #4c4c4c;font-size: 12px">
          <table class="ui selectable compact table gl-compact">
            <thead></thead>
            <tbody>
            <tr>
              <td :class="{warning:!currentGroup.name}" @click="$_selectGroup({},$event)"><i
                class="train icon"></i>全线网概况
              </td>
            </tr>
            <tr v-for="group in projectGroups">
              <td :class="{warning:currentGroup.name===group.name}" @click="$_selectGroup(group,$event)"><i
                class="train icon"></i>{{group.name}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="ui bottom attached tab segment" data-tab="second"
             style="padding: 8px;cursor: pointer;color: #4c4c4c;font-size: 12px">
          <table class="ui selectable compact table gl-compact">
            <thead></thead>
            <tbody>
            <tr>
              <td><i class="circle icon"></i>&nbsp;&nbsp;：车站
              </td>
            </tr>
            <tr>
              <td><i class="window minimize icon"></i>&nbsp;&nbsp;：区间
              </td>
            </tr>
            <tr>
              <td><span style="color:red">红色</span>：异常
              </td>
            </tr>
            <tr>
              <td><span style="color:blue">蓝色</span>：正常
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </sui>
    </div>
    <div class="five wide column" :style="{height:$store.state.platform.currentLayout.content.height}"
         style="overflow-y: scroll">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">{{currentGroup.name||'全线网概况'}} (2018-02-02)
        </div>
        <div class="ui right secondary borderless mini menu">
          <div class="item">
            <a class="ui mini basic button" :class="$GL.ui.color.primary" @click="$_detail">详情</a>
          </div>
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui attached top segment">
        <div v-show="!currentGroup.name">
          <h5>概述</h5>
          目前南宁轨道交通已开通运营两条线路，分别为1号线及2号线。同时在建3条线路，分部为3、4、5号线。
          <h5>进度</h5>
          3号线已完成10座车站主体封顶，占总量50%；……
          <h5>投资</h5>
          <table class="ui basic compact table">
            <tr>
              <td class="five wide">开累/项目投资总额</td>
              <td class="seven wide">
                <sui type="progress" selector=".ui.progress">
                  <div class="ui small blue progress" data-value="120900" data-total="220900">
                    <div class="bar">
                      <div class="progress"></div>
                    </div>
                    <div class="label">120900万/220900万</div>
                  </div>
                </sui>
              </td>
            </tr>
            <tr>
              <td class="six wide">年累/2018内控计划</td>
              <td class="ten wide">
                <sui type="progress" selector=".ui.progress">
                  <div class="ui small blue progress" data-value="1209" data-total="2509">
                    <div class="bar">
                      <div class="progress"></div>
                    </div>
                    <div class="label">1209万/2509万</div>
                  </div>
                </sui>
              </td>
            </tr>
            <tr>
              <td class="six wide">年累/2018城建计划</td>
              <td class="seven wide">
                <sui type="progress" selector=".ui.progress">
                  <div class="ui small blue progress" data-value="1209" data-total="2209">
                    <div class="bar">
                      <div class="progress"></div>
                    </div>
                    <div class="label">1209万/2209万</div>
                  </div>
                </sui>
              </td>
            </tr>
          </table>
          <h5>安全</h5>
          <div id="gis-security-peril" style="width: 320px;height: 300px;text-align: center"></div>
          <div id="gis-security-hidden-peril" style="width: 320px;height: 300px;text-align: center"></div>
        </div>
        <div v-show="currentGroup.name">
          {{currentGroup.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-undef */

  import { BaiduMap } from '../../../common/map'
  import prjCfg from '../../../common/project/config'
  import * as types from '../../../store/types'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {data: {}}
        }
      }
    },
    computed: {
      projectConfig: function () {
        return prjCfg.get(this.$route.query.module)
      },
      projectGroups: function () {
        return this.$mockData.get(this.$route.query.module).projectGroups
      },
      report: function () {
        return this.$mockData.get(this.$route.query.module).report
      },
      workPoints: function () {
        return this.$mockData.get(this.$route.query.module).workPoints
      }
    },
    data () {
      return {
        projects: [],
        currentGroup: {}
      }
    },
    mounted: function () {
      let thisVue = this
      // chart
      let perilChart = this.$echarts.init(document.getElementById('gis-security-peril'))
      perilChart.setOption(this.report.security.peril.option)

      let hiddenPerilChart = this.$echarts.init(document.getElementById('gis-security-hidden-peril'))
      hiddenPerilChart.setOption(this.report.security.hiddenPeril.option)
      console.log('hiddenPerilChart')

      BaiduMap(this.$CFG.mapAK).then(function (BMap) {
        thisVue.$_initMap(BMap)
        console.log('thisVue.$_initMap(BMap)')
      })
    },
    methods: {
      $_initMap (BMap) {
        let thisVue = this
        // 百度地图API功能
        var map = new BMap.Map('centerMapContainer', {enableMapClick: false})
        // 构造底图时，关闭底图可点功能
        var point = new BMap.Point(108.373, 22.822) // 创建点坐标
        // 南宁 108.373454,22.822607
        // 广州 113.275, 23.117
        map.centerAndZoom(point, 12)                 // 初始化地图,设置中心点坐标和地图级别。
        map.enableScrollWheelZoom()
        initMenu()
        initLine()

        function initMenu () {
          // 定义一个控件类,即function
          function ZoomControl () {
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT
            this.defaultOffset = new BMap.Size(10, 10)
          }

          // 通过JavaScript的prototype属性继承于BMap.Control
          ZoomControl.prototype = new BMap.Control()

          // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
          // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
          ZoomControl.prototype.initialize = function (map) {
//            // 创建一个DOM元素
//            var div = document.createElement('div')
//            // 添加文字说明
//            div.appendChild(document.createTextNode('放大2级'))
//            // 设置样式
//            div.style.cursor = 'pointer'
//            div.style.border = '1px solid gray'
//            div.style.backgroundColor = 'white'
//            // 绑定事件,点击一次放大两级
//            div.onclick = function (e) {
//              map.setZoom(map.getZoom() + 2)
//            }
            let div = document.getElementById('centerMapContainerMenu')
            console.log('div>', div)
            // 添加DOM元素到地图中
            map.getContainer().appendChild(div)
            // 将DOM元素返回
            return div
          }
          // 创建控件
          var myZoomCtrl = new ZoomControl()
          // 添加到地图当中
          map.addControl(myZoomCtrl)
        }

        function initLine () {
          // 创建折线
          for (let i in thisVue.projectGroups) {
            // group即是line
            let group = thisVue.projectGroups[i]
            // 线路底线
            if (group.points) {
              let points = []
              for (let p in group.points) {
                let point = group.points[p]
                points.push(new BMap.Point(point.lng, point.lat))
              }
              let polyline = new BMap.Polyline(points, {strokeColor: 'blue', strokeWeight: 4, strokeOpacity: 0.5})
              // 增加折线
              map.addOverlay(polyline)
              polyline.addEventListener('lineupdate', function () {
              })
              polyline.addEventListener('click', function (e) {
                thisVue.$_selectGroup(group)
              })
            }
            // 红色异常线
            if (group.schedulePoints && group.schedulePoints.red) {
              let redPoints = []
              for (let p in group.schedulePoints.red) {
                let point = group.schedulePoints.red[p]
                redPoints.push(new BMap.Point(point.lng, point.lat))
              }
              let redPolyline = new BMap.Polyline(redPoints, {strokeColor: 'red', strokeWeight: 4, strokeOpacity: 1})
              map.addOverlay(redPolyline)
              redPolyline.addEventListener('click', function (e) {
//                console.log('redPolyline click >', e)
              })
              redPolyline.addEventListener('click', function (e) {
                thisVue.$GL.ui.showMsg('进度异常', 'error')
              })
            }
            console.log('group.workPoints>', group.workPoints)

            // 车站
            if (thisVue.workPoints) {
              for (let i in thisVue.workPoints) {
                let point = thisVue.workPoints[i]
                let circle = new BMap.Circle(new BMap.Point(point.lng, point.lat), 200, {
                  strokeColor: point.color,
                  strokeWeight: 1,
                  strokeOpacity: 1,
                  fillColor: point.color
                })
                map.addOverlay(circle)
                circle.addEventListener('click', function (e) {
                  clickPoint(point, e)
                })
              }
            }
//            polyline.enableEditing()
          }
        }

        function clickPoint (point) {
          alert(point.name)
        }
      },
      $_selectGroup (group) {
        this.currentGroup = group
      },
      $_detail () {
        let thisVue = this
        thisVue.$GL.ui.openVueByPath(this, '../views/project-base/center/detail.vue', {title: '项目详情'}, {
          close: function () {
            // 在modal中注册刷新操作
//            thisVue.$_submit()
          }
        })
      },
      $_changeProjectGroup (projectGroup) {
        this.projectGroup = projectGroup
        this.projects = projectGroup.projects
      },
      $_changeProject (project) {
        this.$store.commit(types.CHANGE_PROJECT, project)
        this.$store.commit(types.CHANGE_HEADER_TITLE, '<div style="font-weight: bold">当前项目：' + this.projectGroup.shortName + '>' +
          project.name + '</div>'
        )
        if (project.inited === false) {
          // 若未初始化，进入引导页面
          this.$router.push('/m/project-metro/info/guide')
        } else {
          // 若已初始化，默认进入项目信息视图页面
          this.$router.push('/m/project-metro/report/project-index')
        }
      }
    },
    components: {}
  }
</script>
<style scoped>
  .ui.mini.button {
    margin: 0.5em;
  }

  #centerMapContainer {
    /*width: 100%;*/
    /*height: 100%;*/
    /*min-height: 550px;*/
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
