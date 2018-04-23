<template>
  <div class="ui grid">
    <div class="eleven wide column">
      <div id="centerMapContainer"></div>
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
    <div class="five wide column">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">概况
        </div>
        <div class="ui right secondary borderless mini menu">
          <div class="item">
            <a class="ui mini basic button" :class="$GL.ui.color.primary" @click="$_detail">详情</a>
          </div>
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui attached top segment">
        1、主体结构
      </div>
    </div>
  </div>
</template>
<script>
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
      BaiduMap(this.$CFG.mapAK).then(function (BMap) {
        thisVue.$_initMap(BMap)
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
//                console.log('polyline>', polyline.getPath())
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
//                  console.log('circle click >', e)
                })
              }
            }
//            polyline.enableEditing()
          }
        }
      },
      $_selectGroup (group) {
        this.currentGroup = group
      },
      $_detail () {
        let thisVue = this
        thisVue.$GL.ui.openVueByPath(this, '../views/project-base/center/detail.vue', {title: '项目中心'}, {
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
    min-height: 550px;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
