/* eslint-disable no-console */
import utils from './utils'

export default class PageManager {

  constructor(GlModal) {
    this.GlModal = GlModal
  }

  setModal(GlModal) {
    this.GlModal = GlModal
  }

  /**
   * 打开modal
   * @param opener 打开页面的源vue
   * @param vuePath src下的绝对路径，可以带.vue的后缀或不带，如'/@/views/xx.vue'、'/@/views/xx'、'/@/components/xx.vue'、'/@/components/xx'
   * @param vueConfig modalOpts的值 e.g. {title: '', actions: [], padding: '1.5em'}
   * @param callbackSet 回调事件集合，如：{onSelected:function(){}}
   */

  // modal: {
  //   title: '编辑用户信息',
  //   width: '1000px',
  //   height: '480px',
  //   okText: '',
  //   cancelText: '',
  //   body: {
  //     type: 'staticPage',
  //     component: '/components/gl-form-simple/Index.vue',
  //     opts: {
  //       ui: {
  //         entityName: 'platform_user',
  //         fields: 'id,name,loginName,description',
  //         layout: [
  //           [{loginName: [4, 8]}, {name: [4, 8]}],
  //           [{description: [4, 20]}]
  //           ],
  //         model: {id: '@.id'}
  //       }
  //     }
  //   }
  // }
  openModal(opener, modalConfig, callbackSet) {
    if (modalConfig.body.type === 'staticPage') {
      return openStaticPage()
    } else {
      return openDynamicPage()
    }

    // modalConfig.body.component的值是程序包组件地址，或组件对象
    function openStaticPage() {
      // console.log('modalConfig.body.component>', typeof modalConfig.body.component)
      if (typeof modalConfig.body.component === 'string' && modalConfig.body.component.startsWith('/')) {
        let vuePath = modalConfig.body.component
        let path = modalConfig.body.component.indexOf('.vue') > 0 ? vuePath : vuePath + '.vue'
        path = path.replace('/@/', '').substring(1)
        // path = './views/aa/bb/cc.vue'
        console.log('PageManager > openPage > path: ', path)
        // fixed :webpack 打包报 Cyclic dependency，
        // 出错的写法： let vueComponent = resolve => require(['.' + path], resolve)
        let vueComponent = (resolve) => (require['./' + path], resolve)
        return this.openVue(opener, modalConfig, callbackSet, vueComponent)
      } else if (typeof modalConfig.body.component === 'object') {
        return this.openVue(opener, modalConfig, callbackSet, modalConfig.body.component)
      }
    }

    // modalConfig.body.component的值是页面编码
    function openDynamicPage() {

    }
  }

  /**
   * @param opener
   * @param vueComponent
   * @param vueConfig e.g. {title: '', actions: [], padding: '1.5em'}
   * @param vueData
   */
  openVue(opener, modalConfig, callbackSet, vueComponent) {
    console.log('geelato > openVue > opener >', opener)
    console.log('geelato > openVue > modalBody >', vueComponent)
    console.log('geelato > openVue > modalConfig >', modalConfig)
    console.log('geelato > openVue > callbackSet >', callbackSet)

    let id = utils.uuid(16)
    let el = document.createElement('div')
    el.setAttribute('id', id)
    document.getElementById('app').appendChild(el)
    // let GLGlModal = this.Vue.component('gl-modal')
    console.log('GLGlModal>', this.GlModal)
    let modalView = new this.GlModal({
      propsData: {
        modalId: id,
        opener: opener,
        body: vueComponent,
        callbackSet: callbackSet,
        modalConfig: modalConfig
      }
    })
    modalView.$mount(document.getElementById(id));
    // let $modal = $(modalView.$el).modal({duration: 100, closable: false, allowMultiple: true})
    // $modal.modal('show')
    return modalView
  }

}
