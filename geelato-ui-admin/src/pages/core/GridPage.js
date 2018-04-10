import BasePage from './BasePage'
import Table from './Table'

class GridPage extends BasePage {
  constructor () {
    super()
    this.name = 'gridPage'
  }

  opts () {
    return this
  }

  mode (mode) {
    console.log(mode)
    return this
  }

  title (title) {
    return this
  }

  entity (entity) {
    return this
  }

  newTable () {
    this.table = new Table()
    return this.table
  }
}

export default GridPage
