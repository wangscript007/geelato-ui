/**
 * 点击设置按钮时，传递的内容信息
 */
class DndContent {
  constructor () {
    // 内容元素上的data-id值
    this.id = ''
    this.meta = {
      // 内容的归类，如customer、field，用于区分是否可以拖动到某些目标区域
      type: '',
      // ui组件名称，如checkbox、grid不同的ui组件，设置页面的元素有所区分
      ui: ''
    }
    // 源内容信息
    this.content = ''
  }
}

export default DndContent
