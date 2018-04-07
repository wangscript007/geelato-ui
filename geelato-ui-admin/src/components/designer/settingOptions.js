class SettingOptions {
  constructor () {
    this.localConst = {}
    this.selector = {
      label: '>label',
      required: {value: 'required', active: 'gl-required'},
      control: '.gl-control',
      checkbox: {
        radio: '.gl-checkbox-radio',
        label: 'div.ui.checkbox>label',
        input: 'div.ui.checkbox>input'
      }
    }
    this.attr = {
      data: {},
      value: {}
    }
    this.const = {}
    this.template = {
      form: {
        inlineHelper: '<span class="help-block"></span>'
      }
    }
  }
}

let instance = new SettingOptions()
export default instance
