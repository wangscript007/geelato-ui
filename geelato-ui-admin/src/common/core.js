/* eslint-disable no-throw-literal */
import Vue from 'vue'
import config from './config'
import utils from './utils'
import router from '../router/index'
// import jsonp from '../common/jsonp'
// import staticCfgManager from './staticCfgManager'
import pageManager from '../pages/index'

let componentType = {
  checkbox: 'modules',
  HandsonTable: 'modules'
}
/**
 * 在使用之前需选设置$root {@link #ctx}
 */
let core = {
  data: {
    /**
     * 通过页面id获取页面配置
     * @param pageCode pageCode
     * @returns promise
     */
    getPageCfg: function (pageCode) {
      // 先从本地获取静态的，若本地无则从远程获取
      let pageCfg = pageManager.get(pageCode)
      console.log('通过页面编码' + pageCode + '尝试从本地获取配置信息为：', pageCfg)
      if (!pageCfg) {
        // 远程获取
        return core.data.getPageByCode(pageCode)
      } else {
        return new Promise((resolve, reject) => {
          resolve({
            code: '0',
            msg: '',
            data: pageCfg
          })
        })
      }
    },
    /**
     * 加载组件文件并创建实例
     * @param componentName
     * @param opts 组件实例的propsData.opts
     * @returns {Promise}
     */
    getComponent: function (componentName, opts) {
      return new Promise((resolve, reject) => {
        let lazyLoad = (fileName, resolve) => { require(['../components/' + componentType[componentName] + '/' + componentName + '.vue'], resolve) }
        lazyLoad(componentName, data => {
          if (data.default.propsData) {
            data.default.propsData.opts = opts
          } else {
            data.default.propsData = {opts: opts}
          }
          console.log('vue.default>', data.default)
          resolve(new Vue(data.default).$mount())
        })
      })
    },
    /**
     *  vue文件模板
     * @param fileName
     * @returns {Promise}
     */
    getFileTemplate: function (fileName) {
      return new Promise((resolve, reject) => {
        console.log('resolve>', resolve)
        // let lazyLoadFn = (fileName, resolve) => { require(['../views/geemeta/gm-designer/file-template/' + fileName + '.vue'], resolve) }
        // resolve(new Vue(lazyLoadFn).$mount())
        let lazyLoad = (fileName, resolve) => { require(['../views/platform/file/designer-template/' + fileName + '.vue'], resolve) }
        lazyLoad(fileName, data => { resolve(new Vue(data.default).$mount()) })
      })
    },
    getPageByCode: function (pageCode) {
      let df = $.Deferred()
      // gql查询语句
      let gql = {
        'platform_page_config': {
          '@p': '1,1',
          '@fs': 'id,code,content',
          'code': pageCode
        }
      }
      $.ajax(config.url.apiMetaList, {
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(gql),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          // 通常 textStatus 和 errorThrown 之中
          // 只有一个会包含信息
          var options = this // 调用本次AJAX请求时传递的options参数
          console.error({
            XMLHttpRequest: XMLHttpRequest,
            textStatus: textStatus,
            errorThrown: errorThrown,
            options: options
          })
        },
        success: function (data) {
          console.log('request end>>', data)
          df.resolve(data)
          // if ($.isFunction(callback))callback(data)
        }
      })
      return df.promise()
    },
    savePage: function (page) {
      var df = $.Deferred()
      $.ajax(config.url.apiMetaSave, {
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(page),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          // 通常 textStatus 和 errorThrown 之中
          // 只有一个会包含信息
          var options = this // 调用本次AJAX请求时传递的options参数
          console.error({
            XMLHttpRequest: XMLHttpRequest,
            textStatus: textStatus,
            errorThrown: errorThrown,
            options: options
          })
        },
        success: function (data) {
          console.debug('request end>>', data)
          df.resolve(data)
          // if ($.isFunction(callback))callback(data)
        }
      })
      return df.promise()
    },
    /**
     * @param entityName 实体名称
     * @param keyValues Object类型
     * @returns {*}
     */
    save: function (entityName, keyValues, successMsg) {
      return core.data.update(config.url.apiMetaSave, entityName, keyValues, successMsg || '保存成功')
    },
    delete: function (entityName, keyValues, successMsg) {
      return core.data.update(config.url.apiMetaDelete, entityName, keyValues, successMsg || '删除成功')
    },
    update: function (url, entityName, keyValues, successMsg) {
      let data = {
        '@biz': 'x'
      }
      let biz = '0'
      data[entityName] = keyValues || {}
      // $.extend(data[entityName], keyValues)
      var df = $.Deferred()
      $.ajax(url + '/' + biz, {
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(data),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          // 通常 textStatus 和 errorThrown 之中
          // 只有一个会包含信息
          var options = this // 调用本次AJAX请求时传递的options参数
          console.error({
            XMLHttpRequest: XMLHttpRequest,
            textStatus: textStatus,
            errorThrown: errorThrown,
            options: options
          })
        },
        success: function (data) {
          console.debug('request end>>', data)
          df.resolve(data)
          core.ui.showMsg(successMsg, 'success')
        }
      })
      return df.promise()
    },
    /**
     * 实体查询，内部依据参数构建gql对象进行查询
     * 更复杂、高级的查询@see queryByGql
     * @param entityName e.g. platform_dev_project
     * @param keyValues 查询要件键值对 e.g. {id:123456,name:'张三'}
     * @param fieldNames 查询的列字段 e.g. id,name
     */
    query: function (entityName, keyValues, fieldNames, withMeta) {
      if (!fieldNames) {
        throw '查询列（fieldNames）不能为空。'
      }
      // gql查询语句
      let gql = {}
      gql[entityName] = {
        '@fs': fieldNames || '*'
      }
      $.extend(gql[entityName], keyValues)
      return core.data.queryByGql(gql, withMeta)
    },
    /**
     * 批量查询
     * @param queryParamArray [{entityName:String,keyValues:{key1:value1,key2:value2,...},fieldNames:'id,name,...'},...]
     *        @see query
     */
    queryBatch: function (queryParamArray, withMeta) {
      let gqlAry = []
      for (var i in queryParamArray) {
        let queryParam = queryParamArray[i]
        let gql = {}
        gql[queryParam.entityName] = {
          '@fs': queryParam.fieldNames || '*'
        }
        $.extend(gql[queryParam.entityName], queryParam.keyValues)
        gqlAry.push(gql)
      }
      return core.data.queryByGql(gqlAry, withMeta)
    },
    /**
     * 基于gql对象进行查询
     * @param gqlObject or gqlArray
     * @param withMeta 是否需同时查询出各列表字段的元数据信息
     * @returns {*}
     */
    queryByGql: function (gql, withMeta) {
      let df = $.Deferred()
      var url = Array.isArray(gql) ? config.url.apiMetaMultiList : config.url.apiMetaList
      if (withMeta === true) {
        url = url + '?withMeta=true'
      } else {
        url = url + '?withMeta=false'
      }
      $.ajax(url, {
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(gql),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          // 通常 textStatus 和 errorThrown 之中
          // 只有一个会包含信息
          var options = this // 调用本次AJAX请求时传递的options参数
          console.error({
            XMLHttpRequest: XMLHttpRequest,
            textStatus: textStatus,
            errorThrown: errorThrown,
            options: options
          })
        },
        success: function (data) {
          console.log('request end>>', data)
          df.resolve(data)
          // if ($.isFunction(callback))callback(data)
        }
      })
      return df.promise()
    },
    /**
     * 查询数据定义信息，即元数据信息
     * @param gqlObject or gqlArray
     * @param withMeta 是否需同时查询出各列表字段的元数据信息
     * @returns {*}
     */
    queryMeta: function (entityName) {
      let df = $.Deferred()
      var url = config.url.apiMetaDefined + '/' + entityName
      $.ajax(url, {
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          var options = this // 调用本次AJAX请求时传递的options参数
          console.error({
            XMLHttpRequest: XMLHttpRequest,
            textStatus: textStatus,
            errorThrown: errorThrown,
            options: options
          })
        },
        success: function (data) {
          df.resolve(data)
        }
      })
      return df.promise()
    },
    queryEntityNames: function () {
      let df = $.Deferred()
      var url = config.url.apiMetaEntityNames + '/'
      $.ajax(url, {
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          var options = this // 调用本次AJAX请求时传递的options参数
          console.error({
            XMLHttpRequest: XMLHttpRequest,
            textStatus: textStatus,
            errorThrown: errorThrown,
            options: options
          })
        },
        success: function (data) {
          df.resolve(data)
        }
      })
      return df.promise()
    }
  },
  url: {
    getList: function (options) {
      return config.url.api + '/meta/list?' + utils.param(options)
    },
    getPageConfig: function (options) {
      return config.url.api + '/page/' + utils.param(options)
    }
  },
  ui: {
    /**
     *
     * @param pageCode 配置的页面
     * @param query
     * @param data
     */
    openPage: function (srcVue, pageCode, query, data) {
      core.data.getPageConfig(pageCode).then(res => {
        console.debug('res>', res)
        var pageConfig = {}
        if (res.code === '0') {
          if (res.data) {
            pageConfig = res.data
          } else {
            console.error('返回数据res.data为空！')
          }
        }
        let path = '../components/page/' + pageConfig.content.component + '.vue'
        core.ui.openVueByPath(srcVue, path, {title: '', opts: pageConfig}, data)
      })
    },
    /**
     * 打开modal
     * @param srcVue 打开页面的源vue
     * @param vuePath 相对路径，可以带.vue的后缀或不带，如'../views/xx.vue'、'../views/xx'、'../components/xx.vue'、'../components/xx'
     * @param vueConfig modalOpts的值
     * @param callbackSet 回调事件集合，如：{onSelected:function(){}}
     */
    openVueByPath: function (srcVue, vuePath, vueConfig, callbackSet) {
      let path = vuePath.indexOf('.vue') > 0 ? vuePath : vuePath + '.vue'
      path = path.replace('../', '')
      if (path.startsWith('/')) {
        path = path.substring(1)
      }
      console.log('path>', path)
      // path = '../views/geemeta/gm-designer/setting/icon-field-setting.vue'
      let vueComponent = resolve => require(['../' + path], resolve)
      core.ui.openVue(srcVue, vueComponent, vueConfig, callbackSet)
    },
    /**
     * @param srcVue
     * @param vueComponent
     * @param vueConfig
     * @param vueData
     */
    openVue: function (srcVue, vueComponent, vueConfig, callbackSet) {
      console.log('openVue > vueComponent >', vueComponent)
      console.log('openVue > vueConfig >', vueConfig)
      console.log('openVue > callbackSet >', callbackSet)
      // $root对应App.vue的上线，srcVue.$root.$children[0]才对应APP.vue
      Vue.set(srcVue.$root.$children[0].$refs.appRootModalView, 'modalBody', vueComponent)
      Vue.set(srcVue.$root.$children[0].$refs.appRootModalView, 'modalOpts', vueConfig)
      // Vue.set(srcVue.$root.$children[0].$refs.appRootModalView, 'modalOpts', {
      //   title: '',
      //   actions: [],
      //   opts: vueConfig
      // })
      Vue.set(srcVue.$root.$children[0].$refs.appRootModalView, 'callbackSet', callbackSet || {})
      // $('#app-root-modal').modal('setting', 'transition', 'fade').modal('show')
      //  TODO 改成动态创建，并将ID传给modalOpts
      $('#app-root-modal').modal({duration: 200, closable: false, allowMultiple: true}).modal('show')
    },
    /**
     *
     * @param msg
     * @param type warning、info、positive|success、negative|error
     * @param title
     * @param timeout 自动关闭时间，单位毫秒，默认2000
     */
    showMsg (msg, type = 'info', title = '', timeout = 1500) {
      $('#rootMessageTarget').popup(
        {
          position: 'top center',
          target: '#rootMessageTarget',
          variation: 'basic',
          title: title,
          html: document.getElementById('rootMessageTemplate').innerHTML.replace('{msg}', msg).replace('{title}', title).replace('{type}', type),
          delay: {show: 100, hide: 0}
        }
      ).popup('show')
      window.setTimeout(hide, timeout)

      function hide () {
        $('#rootMessageTarget').popup('hide')
      }
    },
    color: config.color,
    colorHex: config.colorHex
  },
  security: {
    loginDemo (user, remember, success) {
      success({
        'sysConfig': [{
          'creator': 1,
          'code': 'START_APP',
          'businessUnit': null,
          'description': '平台启动时触发的应用',
          'updateAt': '2018-04-14T23:57:15.000+0000',
          'dept': null,
          'createAt': '2018-04-14T23:57:15.000+0000',
          'updater': 1,
          'checkStatus': 0,
          'name': '平台启动应用',
          'id': 1,
          'value': 'dev',
          'seq': 1
        }],
        'user': {
          'id': 1,
          'createAt': '2018-04-14T23:57:15.000+0000',
          'updateAt': '2018-04-14T23:57:15.000+0000',
          'creator': 1,
          'updater': 1,
          'checkStatus': 0,
          'businessUnit': null,
          'dept': null,
          'name': '超级管理员',
          'loginName': 'super_admin',
          'password': '',
          'salt': '',
          'avatar': null,
          'description': null,
          'plainPassword': ''
        },
        'userConfig': []
      })
    },
    login (user, remember, success) {
      // core.security.loginDemo(user, remember, success)
      return $.ajax(config.url.root + '/api/sys/auth/login?remember=' + remember, {
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: user,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          core.ui.showMsg('账号或密码不正确！', 'error')
        },
        success: success
      })
    },
    logout () {
      // router.push('/login')
      $.ajax(config.url.root + '/api/sys/auth/logout', {
        // type: 'POST',
        // dataType: 'json',
        // contentType: 'application/json',
        // processData: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          core.ui.showMsg('暂时不能注销！', 'warning')
        },
        success: function (data) {
          console.debug('request end>>', data)
          core.security.profile(null)
          router.push('/login')
          // var reloadURL = 'index.html' + window.location.search
          // window.location.replace(reloadURL, true)
        }
      })
    },
    /**
     * 同步方法，验证是否已登录
     * @returns {boolean} true or false
     */
    isLogged () {
      // return false
      let result = false
      let self = this
      $.ajax(config.url.root + '/api/sys/auth/isLogged', {
        async: false,
        // dataType: 'json',
        // contentType: 'application/json',
        // processData: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          self.showMsg('暂未能检查是否已登录！')
        },
        success: function (data) {
          if (data) {
            result = true
          }
          console.log('isLogged success')
        }
      })
      return result
    },
    profile (jsonProflie) {
      if (jsonProflie) {
        utils.session('geelatoProfile', jsonProflie)
      }
      let profile = utils.session('geelatoProfile')
      // console.log('profile', profile)
      if (profile === undefined) return {}
      else return profile
    }
  },
  ctx: {
    $root: undefined
  }
}
export default core
