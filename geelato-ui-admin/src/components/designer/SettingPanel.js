/**
 * 定义配置面板的展示信息，如通过rule.required.active值为控制是否展示必填项配置功能，不同于当前页面的配置信息@see FieldDefinition
 */
class SettingPanel {
  constructor () {
    this.ui = {}
    this.data = {
      // 字段名称（中文）
      name: '',
      // 字段名（英文）
      field: '',
      // 初始值
      defaultValue: '',
      // 占位提示信息
      placeholder: '',
      // 默认为'local'，即为本地静态数据，'local'|'remote'|'empty'
      type: 'local',
      // ''|[]|{}
      value: ''
    }
    this.facade = {
      icons: [], // fa fa-file
      tip: '',
      format: '',
      class: '',
      style: '',
      display: ''
    }
    this.rule = {
      required: {
        value: '',
        active: ''
      }
    }
    this.auth = {
      role: '',
      permission: ''
    }
    this.cfg = {
      ui: this.ui,
      data: this.data,
      facade: this.facade,
      rule: this.rule,
      auth: this.auth
    }
  }
}

export default SettingPanel
