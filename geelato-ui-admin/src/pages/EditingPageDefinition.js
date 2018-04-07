import PageDefinition from './PageDefinition'
import DndContent from '../components/designer/DndContent'

/**
 *  正在编辑的动态页面
 */
class EditingPageDefinition extends PageDefinition {
  constructor (options) {
    super(options)
    this.editingElement = new DndContent()
    this.settingActionSeq = ''
  }

  // editingElement为空时，默认设置为DndContent
  setEditingElement (editingElement) {
    this.editingElement = editingElement || new DndContent()
  }

  /**
   * 记录设置操作，便于监控对同一对象的不同操作
   * @param settingActionSeq
   */
  setSettingActionSeq (actionSeq) {
  }

  getPageCopy () {
    let page = $(this).clone(true)
    return page
  }
}

export default EditingPageDefinition
