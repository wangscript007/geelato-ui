class PageConfig {
  constructor () {
    this.config = {}
    this.opts = {}
  }

  code (code) {
    this.config.code = code
    return this
  }

  /**
   * @param componentPath e.g. /components/page/table'
   */
  component (componentPath) {
    this.config.component = componentPath
    return this
  }

  /**
   * 页面的详细配置，在各子类中实现
   */
  opts (options) {
    return this.opts
  }

  value () {
    return this.config
  }
}

export default PageConfig
