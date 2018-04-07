/**
 *  动态页面结构定义
 */
class PageDefinition {
  constructor (options) {
    let params = options || {}
    // 对像数据库中的id(guid)
    this.id = params.id || ''
    // 扩展id，用于关联其它对象
    this.extendId = params.extendId
    // 页面编码，唯一
    this.code = params.code || ''
    // 页面的内容
    // 格式1：'/components/collections/grid'
    // 格式2：vue component对象，{template:''}
    this.component = params.component || ''
    // 用于传递给component的opts，一般用于页面的定义配置
    this.opts = {
      // 页面的配置信息
      body: {},
      // 页面元素的配置信息
      // elements:{'id1':{'ui':{}},'id2':{}}
      elements: {},
      // 结构树
      // tree:['id1':['id3','id4'],'id2']
      tree: {}
    }
    // 默认查询参数，与opts不同，query是同一页面定义下的不同参数
    this.params = {}
  }
}

export default PageDefinition
