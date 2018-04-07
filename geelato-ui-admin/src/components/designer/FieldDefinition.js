/**
 * 字段信息
 * 由字段的通用信息和字段对应ui的专用信息组成
 * 通用信息：data、facade、rule、auth
 * 专用信息：ui，不同的ui，配置方式呼有差异
 */
class FieldDefinition {
  constructor (options) {
    // ui组件专有的配置信息
    this.ui = options && options.ui ? options.ui : {}
    this.data = options && options.data ? options.data : {
      // 字段名称（中文）
      name: '',
      // 字段名（英文）
      field: '',
      // 初始值
      defaultValue: '',
      // 占位提示信息
      placeholder: '',
      // 默认为'local'，即为本地静态数据，'local'|'remote'
      type: 'local',
      // ''|[]|{}
      value: ''
    }
    this.facade = options && options.facade ? options.facade : {
      icons: [], // fa fa-file
      tip: '',
      format: '',
      class: '',
      style: '',
      display: ''
    }
    this.rule = options && options.rule ? options.rule : {
      required: {
        value: '',
        active: ''
      }
    }
    this.auth = options && options.auth ? options.auth : {
      role: '',
      permission: ''
    }
  }

  // 依据数据的值，自动更新数据类型
  setDataValue (dataValue) {
    if (dataValue.gql) {
    }
    this.data.value = dataValue
    this.data.type = 'local'
    return this
  }
}

export default FieldDefinition
