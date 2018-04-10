class Column {
  constructor (field, title, type, visible, format) {
    this.name = 'column'
    this.field(field)
    this.title(title)
    this.type = type
    this.visible(visible)
    this.format(format)
    // {field: 'id', title: '序号', visible: false},
    // {field: 'name', title: '名称', type: 'string', format: ''},
  }

  field (field) {
    this.field = field
    return this
  }

  // id (id) {
  //   this.id = id
  //   return this
  // }
  title (title) {
    this.title = title
    return this
  }

  visible (visible) {
    this.visible = visible
    return this
  }

  /**
   * @param format
   * @returns {Column}
   */
  format (format) {
    this.format = format
    return this
  }

  $value () {
    return {
      field: this.field,
      title: this.title,
      visible: this.visible,
      format: this.format
    }
  }
}

export default Column
