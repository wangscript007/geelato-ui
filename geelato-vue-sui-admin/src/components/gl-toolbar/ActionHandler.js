export default class ActionHandler {
  constructor(theVue) {
    this.theVue = theVue
    this.$gl = theVue.$gl
  }

  /**
   *
   * @param action
   * @param model key values
   */
  do(action, model = {}) {
    console.log('gl-toolbar > ActionHandler > do > action: ', action)
    switch (action.click) {
      case 'modal':
        let kvs = {}
        $.extend(true, kvs, model)
        // 对modal中的变量进行变换，转换之后才可传参给模态窗口
        let modal = utils.invoke(action.modal, kvs)
        console.log('gl-toolbar > ActionHandler > do > resolved modal: ', modal)
        if (modal.type === 'href' || modal.type === 'page') {
          this.$gl.ui.openVueByPath(this, modal.value, modal)
        } else {
          // TODO
        }
        break
      // case 'deleteOne':
      //   if (rowDataItem) {
      //     let keyValue = {'id|eq': rowDataItem.id}
      //     thisVue.$gl.data.delete(thisVue.opts.ui.entity, keyValue).then(function () {
      //       thisVue.resetCheckbox()
      //       thisVue.submit()
      //     })
      //   }
      //   break
      // case 'deleteMulti':
      //   if (thisVue.checkedIds.length !== 0) {
      //     let keyValue = {'id|in': thisVue.checkedIds.join(',')}
      //     thisVue.$gl.data.delete(thisVue.opts.ui.entity, keyValue).then(function () {
      //       thisVue.resetCheckbox()
      //       thisVue.submit()
      //     })
      //   }
      //   break
      case 'xls':
        console.log('xls')
        break
      case 'word':
        console.log('export:word')
        break
      case 'pdf':
        console.log('pdf')
        break
      case 'print':
        console.log('export:print')
        break
      default:
        if (action.click.indexOf('@:') === 0) {
          console.log('gl-toolbar > ActionHandler > $ctx: ', this.theVue)
          utils.eval(action.click.replace('@:', ''), this.theVue)
          console.log('gl-toolbar > ActionHandler > $ctx: ', this.theVue)
        } else {
          console.error('该操作：' + action.click + '，未配置处理方法')
        }
        break
    }

  }
}
