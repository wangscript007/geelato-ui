import Column from './Column'

class Table {
  constructor () {
    this.$ = {}
    this.columns = []
  }

  p (p) {
    this.$.p = p
    return this
  }

  order (order) {
    this.$.order = order
    return this
  }

  select (select) {
    this.$.select = select
    return this
  }

  dropdown (title, actions) {
    return this
  }

  /**
   * @param field
   * @param title
   * @param type
   * @param visible
   * @param format
   * @returns {Table}
   */
  addColumn (field, title, type, visible, format) {
    this.columns.push(new Column(field, title, type, visible, format))
    return this
  }

  value () {
    return this.$
  }
}

export default Table
