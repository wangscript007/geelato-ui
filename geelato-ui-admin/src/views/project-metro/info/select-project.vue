<template>
  <div class="ui padded grid">
    <div class="sixteen wide column">
      <message :header="'说明'">
        选择线路>标段，进行该标段项目管理视图。
      </message>
    </div>
    <div class="six wide column">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">选择线路
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui middle aligned divided  selection list">
        <div class="item" v-for="line in lines" @click="$_changeLine(line)">
          <div class="content">
            <div class="description">{{line.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ten wide column">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">选择标段
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui segment">
        <div class="ui mini button" :class="theme" v-for="segment in segments" @click="$_changeSegment(segment)">
          {{segment.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Message from '../../../components/message/index.vue'
  import testData from '../../../mock/project-metro/index'
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
    data () {
      return {
        theme: this.$GL.ui.theme.color.primary,
        lines: testData.metroLine,
        segments: [],
        currentLine: {}
      }
    },
    mounted: function () {
    },
    methods: {
      $_changeLine (line) {
        this.currentLine = line
        this.segments = line.segments
      },
      $_changeSegment (segment) {
        this.$store.commit(types.CHANGE_PROJECT, segment)
        this.$store.commit(types.CHANGE_HEADER_TITLE, '<div style="font-weight: bold">当前项目：' + this.currentLine.shortName + '>' +
          segment.name + '</div>'
        )
        console.log(this.$store.state.platform.headerTitle)
      }
    },
    components: {Message}
  }
</script>
<style scoped>
  .ui.mini.button {
    margin: 0.5em;
  }
</style>
