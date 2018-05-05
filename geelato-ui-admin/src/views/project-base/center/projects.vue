<template>
  <div class="ui padded grid">
    <div class="row">
      <div class="sixteen wid column">
        <h4 class="ui dividing header">我收藏的项目</h4>
      </div>
    </div>
    <div class="row">
      <div class="four wide column">
        <div class="ui gl-fitted segment">
          <div class="ui card">
            <div class="content">
              <!--<i class="right floated like icon"></i>-->
              <!--<i class="right floated star icon"></i>-->
              <div class="header">我的第一个项目</div>
              <div class="meta">示例项目</div>
              <div class="description">
                <p></p>
              </div>
            </div>
            <div class="extra content">
            <span class="left floated like">
              <i class="edit icon"></i>
              编辑
            </span>
              <span class="right floated star">
              <i class="star icon active"></i>
              收藏
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="sixteen wid column">
        <h4 class="ui dividing header">我负责的项目</h4>
      </div>
    </div>
    <div class="row">
      <div class="four wide column">
        <div class="ui gl-fitted segment">
          <div class="ui card">
            <div class="content">
              <!--&lt;!&ndash;<i class="right floated like icon"></i>&ndash;&gt;-->
              <!--&lt;!&ndash;<i class="right floated star icon"></i>&ndash;&gt;-->
              <!--<div class="header">我的第一个项目</div>-->
              <!--<div class="meta">示例项目</div>-->
              <div class="description" style="text-align: center;cursor: pointer" @click="$_toCreateProject($event)">
                <p><i class="plus huge icon"></i>
                </p>
                <p>
                  <span style="font-size: 1.25em">
                    创建新项目
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="four wide column">
        <div class="ui gl-fitted segment">
          <div class="ui card">
            <div class="content">
              <!--<i class="right floated like icon"></i>-->
              <!--<i class="right floated star icon"></i>-->
              <div class="header">白云片区征地拆迁项目</div>
              <div class="meta">前期工程类</div>
              <div class="description">
                <p></p>
              </div>
            </div>
            <div class="extra content">
    <span class="left floated like">
      <i class="edit icon"></i>
      编辑
    </span>
              <span class="right floated star">
      <i class="star icon"></i>
      收藏
    </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="sixteen wid column">
        <h4 class="ui dividing header">我参与的项目</h4>
      </div>
    </div>
    <div class="row">
      <div class="four wide column">
        <div class="ui gl-fitted segment">
          <div class="ui card">
            <div class="content">
              <!--<i class="right floated like icon"></i>-->
              <!--<i class="right floated star icon"></i>-->
              <div class="header">我的第一个项目</div>
              <div class="meta">示例项目</div>
              <div class="description">
                <p></p>
              </div>
            </div>
            <div class="extra content">
            <span class="left floated like">
              <i class="edit icon"></i>
              编辑
            </span>
              <span class="right floated star">
              <i class="star icon"></i>
              收藏
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sui ref="createProjectModal" type="modal" selector=".ui.modal">
      <div class="ui modal">
        <div class="header">创建新项目</div>
        <div class="scrolling content">
          <projects-template></projects-template>
        </div>
      </div>
    </sui>
  </div>
</template>
<script>
  import mockData from '../../../mock/data'
  import prjCfg from '../../../common/project/config'
  import ProjectsTemplate from './projects-template'

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
        return mockData.get(this.$route.query.module).projectGroups
      }
    },
    data () {
      return {
        projects: [],
        currentLine: {}
      }
    },
    mounted: function () {
    },
    methods: {
      $_toCreateProject () {
        this.$refs.createProjectModal.sui.modal('show')
      }
    },
    components: {ProjectsTemplate}
  }
</script>
<style>
</style>
