import BasePage from './BasePage'
import Table from './Table'

class GridPage extends BasePage {
  constructor (code, componentPath) {
    let s = super(code, componentPath)
    // console.log('super.$>', s.$)
    this.$ = s.$
    this.$.opts = {
      ui: {}
    }
    this.Table = Table
  }

  mode (mode) {
    this.$.opts.ui.mode = mode
    return this
  }

  title (title) {
    this.$.opts.ui.title = title
    return this
  }

  entity (entity) {
    this.$.opts.ui.entity = entity
    return this
  }

  table (table) {
    this.$.opts.ui.table = new Table()
    return this.$.opts.ui.table
  }
}

export default GridPage
