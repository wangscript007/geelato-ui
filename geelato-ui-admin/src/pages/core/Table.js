class Table {
  constructor () {
    this.name = 'table'
    this.columns = []
  }

  p (p) {
    this.p = p
    return this
  }

  order (order) {
    this.order = order
    return this
  }

  /**
   * @param column
   * @returns {Table}
   */
  addColumn (column) {
    this.columns.push(column)
    return this
  }

  $value () {
    return {
      p: this.p,
      order: this.order,
      columns: this.columns
    }
  }
}

export default Table
