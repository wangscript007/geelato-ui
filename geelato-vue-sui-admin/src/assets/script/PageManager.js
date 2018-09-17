/**
 * 页面配置信息管理
 */
class PageManager {
  constructor () {
    this.pageCfgMap = {}
  }

  get (code) {
    return this.pageCfgMap[code]
  }

  register (cfgInstance) {
    if (!cfgInstance.pageCfgs) {
      console.error('cfgInstance.pageCfgs应是个数组，注册失败。cfgInstance:', cfgInstance)
      return
    }
    for (var i in cfgInstance.pageCfgs) {
      let cfg = cfgInstance.pageCfgs[i]
      if (this.pageCfgMap[cfg.code]) {
        console.error('存在同名的pageCfg code：', cfg.code)
      } else {
        this.pageCfgMap[cfg.code] = cfg
      }
    }
  }
}

export default PageManager
