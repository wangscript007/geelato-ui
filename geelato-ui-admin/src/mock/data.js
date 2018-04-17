import tjgc from './project/project-metro/index.js'
import itxm from './project/project-it/index.js'

class Data {
  constructor () {
    this.description = '数据中心'
    this.currentModule = {}
    this.module = {}
    this.module.tjgc = tjgc
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
    return this.module[this.store.state.platform.currentModule.code]
  }
}

let instance = new Data()
export default instance
