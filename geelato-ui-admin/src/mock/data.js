import tjgc from './project/project-metro/tjgc.js'
import xxgh from './project/project-metro/xxgh.js'
import itxm from './project/project-it/index.js'

class Data {
  constructor () {
    this.description = '数据中心'
    this.currentModule = {}
    this.module = {}
    this.module.tjgc = tjgc
    this.module.xxgh = xxgh
    this.module.itxm = itxm
    this.module.itxmzx = itxm
  }

  /**
   * 设置当前模块
   * @param store src/store/store.js
   */
  setStore (store) {
    this.store = store
  }

  get () {
    let module = this.module[this.store.state.platform.currentModule.code]
    if (!module) {
      console.error('未配置模块：' + this.store.state.platform.currentModule.code + '，请检查mock下的配置！')
      return {}
    }
    return module
  }
}

let instance = new Data()
export default instance
