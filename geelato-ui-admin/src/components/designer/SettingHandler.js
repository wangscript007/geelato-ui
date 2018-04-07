// import opt from './settingOptions'

import SettingPanel from './SettingPanel'
import settingOptions from './settingOptions'

class SettingHandler {
  constructor () {
    this.localConst = {}
    this.selector = {}
    this.attr = {
      data: {},
      value: {}
    }
    this.handlers = {}
    // html模板片段，如{'radio-checkbox','<div class="ui radio checkbox">xx</div>'}
    // 模板参数，如$title、$name
    this.templates = {}
  }

  // registerSelector (uiType, path, selector) {
  //   let ary = (uiType + '.' + path).split('.')
  //   // var root = this.selector[uiType] || (this.selector[uiType] = {})
  //   let key = 'this.selector'
  //   for (var i in ary) {
  //     key = key + '[\'' + ary[i] + '\']'
  //     console.log(ary, key)
  //     var obj = this.eval(key)
  //     if (obj === undefined) {
  //       this.eval(key + '={}')
  //     }
  //   }
  //   this.eval(key + '=\'' + selector + '\'')
  //   console.log('this.selector>', this.selector)
  // }

  // TODO extSettingHandler
  register (uiTypes, baseSetting, extSettingHandler) {
    let uiTypeAry = uiTypes.split(',')
    for (let i in uiTypeAry) {
      let uiType = uiTypeAry[i]
      if (!this.handlers[uiType]) {
        this.handlers[uiType] = new BaseConfigurator(baseSetting)
      } else {
        // 有一个uiType已注册，说明uiTypes下的每一个都已注册，直接返回
        return this
      }
    }
    return this
  }

  getHandler (uiType) {
    if (this.handlers[uiType]) {
      console.log('通过ui:' + uiType + '获取一个handler：', this.handlers[uiType])
      return this.handlers[uiType]
    }
    console.error('通过ui:' + uiType + '找不到配置处理器(handler)')
  }
}

class BaseConfigurator {
  constructor (selector) {
    this.selector = selector
    // this.selector = new SettingPanel().cfg
    // $.extend(this.selector, selector, true)
  }

  setConfig (cfg, $content) {
    console.log('setConfig> $content> ', $content)
    console.log('setConfig> cfg', cfg)
    console.log('setConfig> this.selector', this.selector.data.name)
    console.log('setConfig> find length', $content.find(this.selector.data.name).length)
    // .field
    let data = this.selector.data
    if (data) {
      if (data.name) { cfg.data.name = $content.find(data.name).text() }
      if (data.defaultValue) { cfg.data.defaultValue = $content.find(data.defaultValue).val() }
      if (data.placeholder) { cfg.data.placeholder = $content.find(data.placeholder).attr('placeholder') }
    }
    let facade = this.selector.facade
    if (facade) {
      if (facade.tip) { cfg.facade.tip = $content.find(facade.tip).attr('title') }
      // TODO icon
      if (facade.icon) { cfg.facade.icon = $content.find(facade.icon).attr('class') }
      if (facade.class) { cfg.facade.class = $content.find(facade.class).attr('class') }
      if (facade.style) { cfg.facade.style = $content.find(facade.style).attr('style') }
    }
    // console.log('addBack>', $content.find(facade.class).attr('class'))
    let rule = this.selector.rule
    if (rule && rule.required) {
      cfg.rule.required = {
        value: $content.hasClass(rule.required.value),
        active: $content.hasClass(rule.required.active)
      }
    }
  }

  updateView (propPath) {
    propPath.split('.')
  }
}

class LayoutSetting {
  setConfig (cfg, $content) {
    // cfg.data.name = $content.findIncludeSelf(opt.selector.label).text()
    // cfg.data.defaultValue = $content.findIncludeSelf(opt.selector.control).val()
    // cfg.data.placeholder = $content.findIncludeSelf(opt.selector.control).attr('placeholder')
    // cfg.facade.tip = $content.findIncludeSelf(opt.selector.label).attr('title')
    // cfg.auth.required = $content.findIncludeSelf(opt.selector.required).hasClass('required')
  }
}

// class FieldSetting {
//   constructor (selector) {
//     this.baseSetting = new BaseConfigurator(selector)
//   }
//
//   setConfig (cfg, $content) {
//     this.baseSetting.setConfig(cfg, $content)
//     // cfg.data.name = $content.findIncludeSelf(opt.selector.label).text()
//     // cfg.data.defaultValue = $content.findIncludeSelf(opt.selector.control).val()
//     // cfg.data.placeholder = $content.findIncludeSelf(opt.selector.control).attr('placeholder')
//     // cfg.facade.tip = $content.findIncludeSelf(opt.selector.label).attr('title')
//     // cfg.auth.required = $content.findIncludeSelf(opt.selector.required).hasClass('required')
//   }
// }

// class Form {
//   constructor () {
//     this.fields = []
//   }
// }
//
// class Field {
//   constructor () {
//     this.name
//     this.code
//     this.class
//     this.style
//     this.id
//     this.tip
//     this.auth
//   }
//   display () {
//   }
// }

let instance = new SettingHandler()

instance.register('form-section', {
  data: {
    name: '.form-section'
  }
})

instance.register('layout', new SettingPanel().cfg, new LayoutSetting())

instance.register('field,singleText,multiText,email,phone,date,time', {
  data: {
    name: settingOptions.selector.label,
    defaultValue: settingOptions.selector.control,
    placeholder: settingOptions.selector.control
  },
  facade: {tip: 'label>span'},
  rule: {
    required: {
      value: settingOptions.selector.required.value,
      active: settingOptions.selector.required.active
    }
  }
}, null)

instance.register('ui-radio-checkbox,radio,checkbox', {
  data: {
    name: settingOptions.selector.label,
    defaultValue: settingOptions.selector.control,
    value: true
  },
  facade: {tip: 'label>span'},
  rule: {
    required: {
      value: settingOptions.selector.required.value,
      active: settingOptions.selector.required.active
    }
  }
}, null)

instance.register('header', {
  data: {
    name: settingOptions.selector.label
  }
}, null)
export default instance
