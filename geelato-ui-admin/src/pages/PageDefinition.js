/**
 *  动态页面结构定义
 */
class PageDefinition {
  constructor (options) {
    this.reset(options)
  }

  reset (options) {
    let params = options || {}
    // 对像数据库中的id(guid)
    this.id = params.id || ''
    // 扩展id，用于关联其它对象
    this.extendId = params.extendId
    // 页面名称 不需要名称字段，从树节点中获取
    // this.name = params.name || ''
    // 类型，唯一，如api、form、table
    this.type = params.type || ''
    // 页面编码，唯一
    this.code = params.code || ''
    // 描述
    this.description = params.description || ''
    // 基于component、opts、params、code等转换过来的内容
    this.content = params.content || {
      code: ''
    }
    // 页面的内容
    // 格式1：'/components/collections/grid'
    // 格式2：vue component对象，{template:''}
    this.component = params.component || ''
    // 用于传递给component的opts，一般用于页面的定义配置
    this.opts = {
      // 页面的配置信息
      // body: {},
      // 页面元素的配置信息
      // elements:{'id1':{'ui':{}},'id2':{}}
      // elements: {},
      // 结构树
      // tree:['id1':['id3','id4'],'id2']
      // tree: {}
    }
    // 默认查询参数，与opts不同，query是同一页面定义下的不同参数
    this.params = {}
    // 源码
    // this.code = params.code || ''
  }

  /**
   * 构造内容字段，将code、component、opts、params等字段转成json格式存在content字段中，便于持久化存储
   */
  generateContent () {
    this.content = JSON.stringify({
      component: this.component,
      opts: this.opts,
      params: this.params,
      code: this.code
    })
    return this.content
  }

  parseContent () {
    if (!this.content && typeof this.content !== 'string') {
      return
    }
    let c = JSON.parse(this.content)
    this.component = c.component
    this.opts = c.opts
    this.params = c.params
    this.code = c.code
  }

  /**
   * 将整个对像转成约定层次结构的json格式，便于持久化存储
   */
  getValueAsJsonString () {
    return JSON.stringify({
      id: this.id,
      extendId: this.extendId,
      code: this.code,
      type: this.type,
      description: this.description,
      content: {
        component: this.component,
        opts: this.opts,
        params: this.params,
        code: this.code
      }
    })
  }
}

export default PageDefinition
