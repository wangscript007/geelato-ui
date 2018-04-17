/**
 *  项目管理平台的配置，该配置信息后续可以改成在系统中实现
 */
class Config {
  constructor () {
    this.module = {}
    // 基础、共性
    this.module.base = {
      dict: {
        '组': '组',
        '项目': '项目'
      },
      plan: {
        // 各类计划需要哪些属性 此为最完整的信息，各类计划可选取其中部分
        properties: ['优先级', 'state', '指派给', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12']
      }
    }
    // 土建工程
    this.module.tjgc = {
      dict: {
        '组': '线路',
        '项目': '标段'
      }
    }
    // it项目
    this.module.itxm = {
      dict: {
        '组': '类型',
        '项目': '项目'
      },
      quota: {
        unit: {
          ge: '个', chang: '场', chi: '次'
        }
      },
      plan: {
        properties: ['优先级', 'state', '指派给']
      }
    }
    this.module.itxmzx = this.module.itxm
  }

  /**
   * 设置当前模块
   * @param store src/store/store.js
   */
  setStore (store) {
    this.store = store
  }

  /**
   * @param moduleCode 模块编码code，若为空，默认从$store.state.platform.currentModule.code中获取
   * @returns {*}
   */
  get (moduleCode) {
    console.log('get by moduleCode: ' + moduleCode, this.module)
    if (moduleCode) {
      return this.module[moduleCode]
    } else {
      return this.module[this.store.state.platform.currentModule.code]
    }
    // console.log('this.store.state.platform.currentModule.code>', this.store.state.platform.currentModule.code)
  }
}

let instance = new Config()
export default instance
