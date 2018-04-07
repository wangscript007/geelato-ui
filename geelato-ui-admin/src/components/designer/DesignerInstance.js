import options from './dndOptions'
import dndHandler from './dndHandler'
import utils from '../../common/utils'
import DndContent from './DndContent'
import core from '../../common/core'
import FieldDefinition from './FieldDefinition'

class Designer {
  constructor () {
    this.controlContainer = 'field'
    this.controlOverlay = '.dnd-control.mt-element-overlay'
    this.overlayToolbarTemplate = $(this.controlOverlay)
    this.eventBus = {}
    this.eventName = {onSetting: 'onSetting', onBindControl: 'onBindControl'}
    this.settingHandlers = {}
    this.editingPage = {}
  }

  registerSettingHandler (handler) {
    this.settingHandlers[handler.getType()] = handler
  }

  getSettingHandler (type) {
    return this.settingHandlers[type]
  }

  init () {
    // bind all dragTarget
    $(options.selector.designer + ' ' + options.selector.stage + ' ' + options.selector.target).each(function () {
      // console.log('init bind target>', this)
      instance.bindDragTarget($(this))
    })
    $(options.selector.designer + ' ' + options.selector.stage + ' ' + options.selector.content).each(function () {
      // console.log('init bind content>', this)
      instance.warpToolbarOnMouseEnter($(this))
    })
  }

  /**
   * @param dragTarget
   */
  bindDragTarget (dragTargetSelector) {
    // var target = dragTargetSelector
    var $target = dragTargetSelector
    if (!(dragTargetSelector instanceof jQuery)) {
      $target = $(dragTargetSelector)
    }
    let allowTypes = $target.attr(options.attr.data.allowTypes)
    // console.log('dndHandler.bindDragTarget > allowTypes:' + allowTypes + ' > ', $target)
    dndHandler.bindDragTarget($target, allowTypes, ondrag, ondragover)

    /**
     * 对拖动的对象进行添加事件、添加配置工具条等处理，并加到拖动的目标对象内
     * @param isAllow 是否允许拖动，基于target中的allow-type及dragObject的type自动计算得出见类@DndHandler
     * @param dragObject
     * @param dragTarget
     * @param lastPlaceholder
     * @param ev
     */
    function ondrag (isAllow, dragObject, dragTarget, lastPlaceholder, ev) {
      // console.log(ev.ctrlKey)
      if (isAllow) {
        // 解析被拖动的对像 获取相应的配置值、dom对像
        // 是移动，还是新建
        // 拖动对象是怎么类型，采用相应的handler处理
        if (dragObject.isNew) {
          // 新建
          onDragForNew(dragObject, dragTarget, lastPlaceholder)
        } else {
          // 存在id，说明是移动
          onDragForMove(dragObject, dragTarget, lastPlaceholder)
        }
      }
    }

    function onDragForNew (dragObject, dragTarget, lastPlaceholder) {
      let $dragElement = $(dragObject.target)
      let $contentWrapClone = $dragElement.find(options.selector.content).clone()
      // !!!只获取.dnd-content下的第一个子元素的内容作为加入dnd-target的内容
      let $contentClone = $contentWrapClone.children().first()
      let contentMetaString = $contentWrapClone.attr(options.attr.data.meta)
      $contentClone.addClass(options.selector.content.substring(1))
      $contentClone.attr(options.attr.data.meta, contentMetaString)
      // 从工具栏拖动新添加的对像，需添加data-id
      let dataId = utils.uuid(8)
      $contentClone.attr(options.attr.data.id, dataId)
      // 解析编译动态组件
      compileScript()
      // 处理子拖放区域：模板数据内，存在拖放区域dragTarget，该操作需在$dragTarget.prepend之前执行
      let $subDragTarget = $contentWrapClone.find(options.selector.target)
      $subDragTarget.each(function () {
        instance.bindDragTarget($(this))
      })
      // 完成以上处理之后开始加入文档流
      let $dragTarget = $(dragTarget)
      let $appendedContent
      if (lastPlaceholder.index === 0) {
        $dragTarget.prepend($contentClone)
        $appendedContent = $dragTarget.children().first()
        instance.warpToolbarOnMouseEnter($appendedContent)
      } else {
        $dragTarget.children().eq(lastPlaceholder.index - 1).after($contentClone)
        $appendedContent = $dragTarget.children().eq(lastPlaceholder.index)
        instance.warpToolbarOnMouseEnter($appendedContent)
      }
      // console.log('isTableLayout>', dragObject)
      if (dragObject.isTableLayout) {
        // 对于table tr的场景，为table添加拖动事件后；对于table内的下tr,若其有.dnd-content
        let $subContent = $appendedContent.find(options.selector.content)
        if ($subContent.length > 0) {
          // $subContent.addClass(options.selector.content.substring(1))
          $subContent.attr(options.attr.data.id, utils.uuid(8))
          // 没有date-meta的话则，设置默认data-meta="{type:'tr'}"
          if (!$subContent.attr(options.attr.data.meta)) {
            $subContent.attr(options.attr.data.meta, options.attr.value.meta.tr)
          }
          instance.warpTrToolbarOnMouseEnter($subContent)
        }
      } else {
        // .dnd-content
        console.log('$appendedContent>', $appendedContent)
        let $subContent = $appendedContent.find(options.selector.content)
        if ($subContent.length > 0) {
          // $subContent.addClass(options.selector.content.substring(1))
          $subContent.attr(options.attr.data.id, utils.uuid(8))
          // 没有date-meta的话则，设置默认data-meta="{type:'layout'}"
          if (!$subContent.attr(options.attr.data.meta)) {
            $subContent.attr(options.attr.data.meta, options.attr.value.meta.layout)
          }
          instance.warpDivToolbarOnMouseEnter($subContent)
        }
      }

      if ($dragTarget.hasClass(instance.controlContainer)) {
        // 当前为controller
        // $target.append($contentClone[0])
        // handleControlTarget(dataEle)
        // let controlData = {
        //   key: $dragElement.attr(dndHandler.attr.data.meta)
        // }
        // instance.emit(instance.eventName.onBindControl, controlData)
      } else {
        // 移动到控件上时，生成overlay-toolbar
        // let dataEle = $contentClone[0]
        // handleLayoutTarget(dataEle)
      }
      // 通知设置新拖到页面的对象
      instance.doEmitSetting($appendedContent)

      /**
       *  解析添加对象中动态组件（用script包裹动态组件的配置信息）部分
       */
      function compileScript () {
        let $script = $contentClone.find('script')
        // console.log('$script>', $script)
        if ($script.length === 1) {
          let scriptId = utils.uuid(8)
          // $script.replaceWith('<div id="' + dataId + '"></div>')
          let componentOpts = JSON.parse($script.text())
          instance.editingPage.opts.elements[scriptId] = new FieldDefinition({ui: componentOpts}).setDataValue(componentOpts.data)
          let contentMeta = contentMetaString ? utils.eval(contentMetaString) : {}
          core.data.getComponent(contentMeta.ui, componentOpts).then(function (component) {
            component.$el.setAttribute(options.attr.data.prefix + scriptId, '')
            // console.log('componentOpts', componentOpts)
            $script.replaceWith(component.$el)
            // console.log('component', component)
            // instance.editingPage.opts.elements[scriptId].type = 'radio'
          })
          console.log('componentOpts>', componentOpts)
          console.log('contentMeta>', contentMeta)
        } else if ($script.length > 1) {
          console.error('只能有一个script', $script)
        }
      }
    }

    function onDragForMove (dragObject, dragTarget, lastPlaceholder) {
      let $dragElement = $(dragObject.target)
      let $dragTarget = $(dragTarget)
      if (dragObject.isTableLayout) {
        // onTrDragForMove(dragObject, dragTarget, lastPlaceholder)
        // dragObject是tr时
        let $content = $dragElement.find(options.selector.contentTr).eq(0)
        if ($content.length === 0) {
          // dragObject是table时
          $content = $dragElement.children(options.selector.content)
        }
        move($dragTarget, $dragElement, $content, lastPlaceholder)
      } else {
        // onDivDragForMove(dragObject, dragTarget, lastPlaceholder)
        let $content = $dragElement.children(options.selector.content)
        move($dragTarget, $dragElement, $content, lastPlaceholder)
      }
    }

    function move ($dragTarget, $dragElement, $content, lastPlaceholder) {
      if ($content.length === 0) {
        console.error('拖动的$content.length为0，取消拖动操作！$dragElement>', $dragElement)
      } else {
        let allowCheck = isDropAllow($dragTarget, $content)
        if (allowCheck.value) {
          if (lastPlaceholder.index === 0) {
            $dragTarget.prepend($content)
          } else {
            $dragTarget.children().eq(lastPlaceholder.index - 1).after($content)
          }
          $dragElement.remove()
        } else {
          console.log(allowCheck.msg)
        }
      }
    }

    /**
     * 在即将删除时，再做一次检查，避免鼠标操作太快引起的状态异常
     */
    function isDropAllow ($dragTarget, $content) {
      let typeAry = $dragTarget.attr(options.attr.data.allowTypes).split(',')
      let currentType = utils.eval($content.attr(options.attr.data.meta)).type
      for (var i in typeAry) {
        if (currentType === typeAry[i]) {
          return {value: true, msg: ''}
        }
      }
      return {
        value: false,
        msg: '!!allowTypes:' + $dragTarget.attr(options.attr.data.allowTypes) + ',current:' + currentType + '。append前再检查，不符，取消拖放操作。'
      }
    }

    function ondragover (ev, pos) {
      // console.log('pos>', pos)
    }

    // function handleLayoutTarget (dataEle) {
    //
    // }

    // function handleControlTarget (dataEle) {
    //   let $control = $target.children().last()
    //   $control.popover({
    //     template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    //     trigger: 'focus',
    //     html: 'true',
    //     placement: 'top',
    //     content: '<div style="font-size: 0.8em"><button>设置</button>&nbsp;<button>删除</button></div>'
    //   })
    //   // mouseover时，才展示工具条，点击工具条中的按钮，则关闭
    //   $control.mouseenter(function () {
    //     // 先清除同下存放目标区域内的其它control popover
    //     $target.find('.popover').popover('hide')
    //     $control.popover('show')
    //     $target.find('.popover button').click(function () {
    //       if ($(this).text() === '设置') {
    //         instance.emit(instance.eventName.onSetting, {value: 'abc'})
    //       } else {
    //         console.log('delete...')
    //         $control.popover('hide')
    //         $control.remove()
    //       }
    //     })
    //     $(document).click(function () {
    //       $control.popover('hide')
    //     })
    //   })
    //   $target.mouseleave(function () {
    //     $control.popover('hide')
    //   })
    // }
  }

  warpToolbarOnMouseEnter ($appendedContent) {
    // // console.log('$appendedContent>', $appendedContent)
    // var isTableLayout = $appendedContent.get(0).localName === 'tr'
    // if (isTableLayout) {
    //   return instance.warpTrToolbarOnMouseEnter($appendedContent)
    // } else {
    //   return instance.warpDivToolbarOnMouseEnter($appendedContent)
    // }
    let tagName = $appendedContent.get(0).localName
    switch (tagName) {
      case 'tr' :
        // 内容为基于table部局
        return instance.warpTrToolbarOnMouseEnter($appendedContent)
      case 'script':
        // 内容为动态vue模板时
        return 'TODO'
      default:
        // 内容为静态的div时
        return instance.warpDivToolbarOnMouseEnter($appendedContent)
    }
  }

  warpTrToolbarOnMouseEnter ($appendedContent) {
    let dataId = utils.uuid(8)
    // console.log('$appendedContent>', $appendedContent)
    $appendedContent.mouseenter(function () {
      if ($appendedContent.prev().hasClass(options.selector.toolbar.substring(1))) {
        return
      }
      $appendedContent.wrap($(options.template.toolbarWrapTr).attr(options.attr.data.id, dataId))
      // console.log('wrap item  > ', $appendedContent)
      $appendedContent.before(options.template.toolbarTr)

      // <tr><td><table><tbody>$appendedContent</tbody></table></td></tr>
      let $wrapEl = $appendedContent.parent().parent().parent().parent()
      // console.log('$wrapEl>', $wrapEl.get(0))
      $appendedContent.prev().find(options.selector.action).click(function () {
        let action = utils.trim($(this).text())
        if (action === '设置') {
          instance.emit(instance.eventName.onSetting, {
            value: 'abc',
            meta: utils.eval($appendedContent.attr(options.attr.data.meta))
          })
        } else if (action === '删除') {
          if ($wrapEl.parent().children().length === 1) {
            alert('表格必须至少保留一行！')
          } else {
            $wrapEl.remove()
          }
        } else if (action === '复制') {
          console.log('复制>', $wrapEl)
        }
      })
      $wrapEl.mouseleave(function () {
        // 删除toolbar
        $appendedContent.prev().remove()
        // 去除外壳td-tr-tbody-table
        $appendedContent.unwrap().unwrap().unwrap().unwrap()
      })
      dndHandler.bindDragObject($wrapEl, 'tr')
    })
    return $appendedContent
  }

  /**
   * 格式 1 基于div
   * <div class="dnd-item">
   *   <span class="toolbar">
   *     <button class="btn btn-xs">设置</button>
   *   </span>
   *   <div class="content" data-id="xxxxxxxx" draggable="true">
   *     xxx
   *   </div>
   * </div>
   * @param $appendedContent 已经加载到dragTarget中的content
   * @returns {*}
   */
  warpDivToolbarOnMouseEnter ($appendedContent) {
    let dataId = utils.uuid(8)
    $appendedContent.mouseenter(function (e) {
      if ($appendedContent.prev().hasClass(options.selector.toolbar.substring(1))) {
        return
      }
      $appendedContent.wrap($(options.template.toolbarWrap).attr(options.attr.data.id, dataId))
      let contentType = utils.trim(utils.eval($appendedContent[0].attributes[options.attr.data.meta].value).type)
      // let contentType = JSON.parse($appendedContent.attr(options.attr.data.meta)).type
      let $toolbar = $(options.template.toolbar).clone()
      $toolbar.find(options.selector.contentType).text(contentType)
      $appendedContent.before($toolbar.get(0).outerHTML)

      let $wrapEl = $appendedContent.parent()
      $appendedContent.prev().find(options.selector.action).click(function () {
        let action = utils.trim($(this).text())
        instance.doAction(action, $wrapEl, $appendedContent)
      })
      $wrapEl.mouseleave(function () {
        // 删除toolbar
        $appendedContent.prev().remove()
        // 去除外壳dnd-item
        $appendedContent.unwrap()
      })
      dndHandler.bindDragObject($wrapEl, 'layout')
      // e.stopPropagation()
    })
    return $appendedContent
  }

  doAction (action, $wrapEl, $appendedContent) {
    if (action === '设置') {
      instance.doEmitSetting($appendedContent)
    } else if (action === '删除') {
      $wrapEl.remove()
    } else if (action === '复制') {
      console.log('复制>', $wrapEl)
    }
  }

  /**
   * 解析页面中，需设置内容中的元数据信息，构建成配置对象cfg，通过事件instance.eventName.onSetting分发出去
   * 可用于更新设置页面中的值，便于开展属性、参数的设置工作
   * @param $appendedContent
   */
  doEmitSetting ($appendedContent) {
    let dndContent = new DndContent()
    dndContent.meta = utils.eval($appendedContent.attr(options.attr.data.meta))
    dndContent.id = $appendedContent.attr(options.attr.data.id)
    dndContent.content = $appendedContent[0]
    // 数据驱动，更新当前操作对像
    instance.editingPage.setEditingElement(dndContent)
    instance.emit(instance.eventName.onSetting, dndContent)
    // 这里暂不对内容做分类处理，交由最终接收到内容的环节处理，故先注掉以下的语句，同理下方的几个XXXXSettingHandler，如LayoutSettingHandler，不起作用
    // instance.emit(instance.eventName.onSetting, instance.getSettingHandler(dndContent.meta.type).doSetting($appendedContent, dndContent))
  }

  emit (event, data) {
    let events = this.eventBus[event]
    if (events) {
      for (var i in events) {
        events[i](data)
      }
    }
  }

  onBindControl (callback) {
    this.on(instance.eventName.onBindControl, callback)
  }

  /**
   * 绑定设置事件，在点击了工具体的设置操作时回调
   * @param callback
   */
  onSetting (callback) {
    this.on(instance.eventName.onSetting, callback)
  }

  on (event, callback) {
    if (!this.eventBus[event]) {
      this.eventBus[event] = []
    }
    this.eventBus[event].push(callback)
  }

  hasAttr ($target, attr) {
    return typeof $target.attr(attr) !== 'undefined'
  }

  preview () {
  }

  /**
   * 加载页面
   * @param page @see pageDefinition
   */
  load (page) {
    let html = page.component.template
    let $dndTarget = $(options.selector.designer).find(options.selector.stage).children(options.selector.target).eq(0)
    $dndTarget.html(html)
    this.editingPage = page
    this.doEmitSetting($dndTarget.children())
  }

  renderToSrc () {
    // gl组件的配置，转成script格式
  }

  renderToReleaseOrPreview () {
  }

  render () {
    let $stage = $(options.selector.designer).find(options.selector.stage)
    let pageHtml = $stage.children(options.selector.target).html()

    function removeAttr (htmlString) {
      // remove ' data-v-xxx="" ' that created by vue
      return htmlString.replace(/\sdata-v-\w{8}=""\s+/g, ' ')
    }

    return removeAttr(pageHtml)
  }

  html () {
    let $stage = $(options.selector.designer).find(options.selector.stage)
    return $stage.find(options.selector.target).html()
  }
}

class LayoutSettingHandler {
  constructor () {
    this.type = 'layout'
  }

  getType () {
    return this.type
  }

  doSetting ($appendedContent, cfg) {
    // console.log('doSetting', $appendedContent.find('.control-label'))
    // cfg.value = $appendedContent.find('.control-label').text().replace('*', '')
    cfg.content = $appendedContent[0]
    cfg.value = 'layout'
    return cfg
  }

  onDrag () {

  }
}

class FieldSettingHandler {
  constructor () {
    this.type = 'field'
  }

  getType () {
    return this.type
  }

  doSetting ($appendedContent, cfg) {
    console.log('doSetting', $appendedContent.find('.control-label'))
    cfg.value = $appendedContent.find('.control-label').text().replace('*', '')
    cfg.content = $appendedContent[0]
    return cfg
  }

  onDrag () {

  }
}

class ControlSettingHandler {
  constructor () {
    this.type = 'control'
  }

  getType () {
    return this.type
  }

  doSetting ($appendedContent, cfg) {
    cfg.value = 'control'
    return cfg
  }

  onDrag () {
  }
}

let instance = new Designer()
instance.registerSettingHandler(new LayoutSettingHandler())
instance.registerSettingHandler(new ControlSettingHandler())
instance.registerSettingHandler(new FieldSettingHandler())
window.designer = instance
export default instance
