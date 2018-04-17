class PageConfig {
  constructor (code, componentPath) {
    this.$ = {}
    this.$.code = code
    this.$.componentPath = componentPath
  }

  // code (code) {
  //   this.$.code = code
  //   return this
  // }
  //
  // /**
  //  * @param componentPath e.g. /components/page/table'
  //  */
  // component (componentPath) {
  //   this.$.component = componentPath
  //   return this
  // }
  //
  // /**
  //  * 页面的详细配置，在各子类中实现
  //  */
  // opts (options) {
  //   return this.opts
  // }

  value () {
    return this.$
  }
}

export default PageConfig
