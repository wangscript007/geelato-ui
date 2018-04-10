/**
 * 用于page模板的常量
 */
export const CLICK = {
  modal: 'modal',
  delete: 'delete',
  // TODO
  js: 'js',
  xls: 'xls',
  pdf: 'pdf',
  print: 'print'
}

export const MODE_PAGE = {
  // 只读状态
  select: 'select'
}
export const TYPE_MODAL = {
  href: 'href',
  page: 'page'
}

// 展示位置：header|footer|none，当为none或空时，则不展示。
export const DISPLAY = {
  none: 'none',
  header: 'header',
  footer: 'footer'
}

export const TYPE_FIELD = {string: 'string'}

export const TYPE_COLUMN = TYPE_FIELD

export const TYPE_UI = {
  checkbox: 'checkbox'
}

export const COP = {
  contains: 'contains',
  eq: 'eq'
}
// 逻辑操作
export const LOP = {
  or: 'or', and: 'and'
}
