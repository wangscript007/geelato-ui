<template>
  <div class="gl-content-wrapper">
    <layout-lr title="界面" rightTitle="配置和输出" :min="{left: 10, right: 6}">
      <div slot="left">
        <gl-json-editor :json="editor.json" :options="editor.options" :schema="editor.schema"></gl-json-editor>
      </div>
      <div slot="leftAction">
        <div class="item">
        </div>
      </div>
      <div slot="rightAction">
        <div class="item">

        </div>
      </div>
      <div slot="right">
        <sui type="tab">
          <div class="ui pointing secondary menu">
            <a class="active item" data-tab="first">schema</a>
            <a class="item" data-tab="second">Options</a>
            <a class="item" data-tab="third">Output</a>
          </div>
          <div class="ui active tab segment" data-tab="first">
            <div class="ui mini button" @click="editor.schema=JSON.parse(schema)">更新</div>
            <code-mirror-json ref="schema" v-model="schema" class="ui segment" style="padding: 0"></code-mirror-json>
          </div>
          <div class="ui tab segment" data-tab="second">
            <div class="ui mini button" @click="editor.options=JSON.parse(options)">更新</div>
            <code-mirror-json ref="options" v-model="options" class="ui segment" style="padding: 0"></code-mirror-json>
          </div>
          <div class="ui tab segment" data-tab="third">
            <div class="ui mini button" @click="editor.json=json">更新</div>
            <code-mirror-json ref="json" v-model="json" class="ui segment" style="padding: 0"></code-mirror-json>
          </div>
        </sui>
      </div>
    </layout-lr>
  </div>
</template>

<script>
  import GlJsonEditor from '../../../../../components/jsoneditor/jsoneditor.vue'
  import CodeMirrorJson from '../../../../../components/jsoneditor/codemirror-json.vue'

  export default {
    props: {},
    data () {
      return {
        json: '',
        options: '',
        schema: '',
        editor: {
          json: [],
          options: {
            display: 'expand'
          },
          schema: {}
        }
      }
    },
    mounted: function () {
      this.editor.schema = {
        person: {
          'title': 'person',
          'type': 'Object',
          'properties': {
            name: {
              'name': 'name',
              'type': 'String',
              'description': 'First and Last name',
              'minLength': 4,
              'default': 'Jeremy Dorn',
              'required': true
            },
            age: {
              'title': 'age',
              'type': 'Number',
              'default': 25,
              'minimum': 18,
              'maximum': 99,
              'required': true
            },
            favorite_color: {
              'title': 'favorite color',
              'type': 'String',
              'format': 'color',
              'default': '#ffa500',
              'required': false
            },
            gender: {
              'title': 'gender',
              'type': 'String',
              'enum': [
                '男',
                '女'
              ]
            },
            location: {
              'title': 'location',
              'type': 'Object',
              'properties': {
                province: {
                  'title': 'province',
                  'type': 'String',
                  'default': '广东省'
                },
                city: {
                  'title': 'city',
                  'type': 'String',
                  'default': '广州市'
                },
                district: {
                  'title': 'district',
                  'type': 'String',
                  'default': '天河区'
                },
                location_string: {
                  'title': 'location_string',
                  'type': 'String',
                  'description': '这个字段由省市区字段自动组合而成。',
                  'template': '{{province}}{{city}}{{district}}',
                  'watch': {
                    'province': 'location.province',
                    'city': 'location.city',
                    'district': 'location.district'
                  }
                }
              }
            },
            pets: {
              'title': 'pets',
              'type': 'Array',
              'key': 'pet',
              'format': 'table',
              'uniqueItems': true,
              'properties': {
                type: {
                  'titile': 'type',
                  'type': 'String',
                  'enum': [
                    '猫',
                    '狗',
                    '鸟',
                    '其它'
                  ],
                  'default': '狗'
                },
                name: {
                  'title': 'name',
                  'type': 'String'
                }
              },
              'default': [
                {
                  'type': 'dog',
                  'name': 'Walter'
                }
              ]
            }
          }
        }
      }
      this.schema = JSON.stringify(this.editor.schema)
      this.$refs.schema.$_reset(this.schema)
      this.$refs.schema.$_format()
      this.editor.json = {
        name: '张三',
        age: '26',
        favorite_color: '#FFFFFF',
        gender: '男',
        location: {
          province: '广东省',
          city: '广州',
          district: '天河区'
        },
        pets: [
          {
            type: '狗',
            name: 'hensi'
          },
          {
            type: '猫',
            name: 'kity'
          }
        ]
      }
    },
    methods: {},
    components: {GlJsonEditor, CodeMirrorJson}
  }
</script>
<style scoped>

</style>
