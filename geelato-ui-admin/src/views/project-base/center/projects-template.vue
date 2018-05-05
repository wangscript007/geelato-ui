<template>
  <div class="ui padded grid gl-select-projects">
    <div class="sixteen wide column" v-if="!nextStep">
      <div class="ui grid">
        <div class="row">
          <div class="sixteen wide column">
            <h4 class="ui dividing header">
              <i class="product hunt icon"></i>
              <div class="content">
                一般项目
              </div>
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="four wide column">
            <div class="ui gl-fitted segment">
              <h4 class="ui header">空白项目</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="sixteen wide column">
            <h4 class="ui dividing header">
              <i class="product hunt icon"></i>
              <div class="content">
                新线工程项目模板
              </div>
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted red segment">
              <h4 class="ui header">勘察设计类</h4>
            </div>
          </div>
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted blue segment">
              <h4 class="ui header">前期工程类</h4>
            </div>
          </div>
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted teal segment" @click="nextStep='土建工程类'">
              <h4 class="ui header">土建工程类</h4>
            </div>
          </div>
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted yellow segment">
              <h4 class="ui header">机电设备工程类</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="sixteen wid column">
            <h4 class="ui dividing header">
              <i class="product hunt icon"></i>
              <div class="content">
                房产类项目模板
              </div>
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted red segment">
              <h4 class="ui header">房产类</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="sixteen wide column">
            <h4 class="ui dividing header">
              <i class="product hunt icon"></i>
              <div class="content">
                IT类项目模板
              </div>
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted red segment" @click="nextStep='IT类项目'">
              <h4 class="ui header">咨询类项目</h4>
            </div>
          </div>
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted orange segment" @click="nextStep='IT类项目'">
              <h4 class="ui header">建设类项目</h4>
            </div>
          </div>
          <div class="four wide column">
            <div class="ui gl-fitted tertiary inverted yellow segment" @click="nextStep='IT类项目'">
              <h4 class="ui header">运维类项目</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sixteen wide column" v-if="nextStep==='IT类项目'">
      <div class="ui form">
        <h4 class="ui dividing header">项目信息</h4>
        <div class="two fields">
          <div class="field">
            项目名称
            <input type="text" name="projectName">
          </div>
          <div class="field">
            项目负责人
            <input type="text" name="projectName">
          </div>
        </div>
        <div class="field">
          项目描述
          <textarea rows="2"></textarea>
        </div>
        <div class="ui mini button" @click="$_createProject('itxm','it')">创建</div>
      </div>
    </div>
    <div class="sixteen wide column" v-if="nextStep==='土建工程类'">
      <div class="ui form">
        <h4 class="ui dividing header">项目信息</h4>
        <div class="two fields">
          <div class="field">
            项目名称
            <input type="text" name="projectName">
          </div>
          <div class="field">
            项目负责人
            <input type="text" name="projectName">
          </div>
        </div>
        <div class="field">
          项目描述
          <textarea rows="2"></textarea>
        </div>
        <projects-template-tjgc module="tjgc"></projects-template-tjgc>
      </div>
    </div>
  </div>
</template>
<script>
  import * as types from '../../../store/types'
  import ProjectsTemplateTjgc from './projects-template-tjgc'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {data: {}}
        }
      }
    },
    computed: {},
    data () {
      return {
        nextStep: ''
      }
    },
    mounted: function () {
    },
    methods: {
      $_createProject (moduleCode, projectTypeCode) {
        // 通知更改模块，以便更改菜单
        this.$store.commit(types.CHANGE_MODULE, this.$CFG.getModule(moduleCode))
        this.$router.push('/m/project-' + projectTypeCode + '/info/project-info')
        this.$parent.sui.modal('hide')
      }
    },
    components: {ProjectsTemplateTjgc}
  }
</script>
<style>
  .gl-select-projects .ui.gl-fitted.segment {
    cursor: pointer;
  }
</style>
