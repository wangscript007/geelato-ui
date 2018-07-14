import EditingPageDefinition from '../../pages/EditingPageDefinition'

/**
 * 存储当前设计器的状态数据
 */
class DesignerStore {
  constructor () {
    this.project = {id: ''}
    this.editingPage = new EditingPageDefinition()
    this.history = []
  }

  commit (action, data) {
    this.history.push($(this.editingPage).clone(true))
    console.log('this.history > ', this.history)
    switch (action) {
      case 'field':
        break
      default:
        break
    }
  }
}

// let instance = new DesignerStore()
export default DesignerStore
