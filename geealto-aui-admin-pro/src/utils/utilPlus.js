export function trim (str) {
  return str ? str.replace(/(^\s*)|(\s*$)/g, '') : ''
}

export function toBoolean (v) {
  if (typeof v === 'string' && 'false|0'.indexOf(trim(v.toLowerCase())) !== -1) {
    return false
  } else {
    return !!v
  }
}
