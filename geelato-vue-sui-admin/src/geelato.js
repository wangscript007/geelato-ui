import Vue from "vue";
import utils from "./assets/script/utils";
import PageManager from './assets/script/PageManager.js'
import GlLayout from './components/gl-layout/Index.vue'

/**
 *  geelato框架的配置，不包括vue中router、store的配置
 */
const BASE_DIR = './views'
const pageManager = new PageManager()
const CONSTS = {
    SESSION_GEELATO_CONFIG_LAYOUT: 'geelato.config.layout',
    SESSION_GEELATO_CONFIG_COLOR: 'geelato.config.color'
}

class Geelato {
    constructor() {
        this.appBase = '/m/'
        this.modules = []
        this.entityNames = {}
        // 角色登录后的默认首模块
        this.defaultModule = {
            admin: 'geev'
        }
        this.vueFiles = []
        this.url = {}
        this.consts = CONSTS
        this.layout = {
            logo: {width: '170px'},
            // 值0即为HM[MC]F：上、中（左菜单 右内容）、下
            // 值1即为LLR[HCF]，结构为左右，即左（菜单）、右（上-头部、中-内容）、下）
            // mode变化PageSidebar的背景色也调整
            mode: 0,
            header: {maxHeight: '44px', minHeight: '44px'},
            // miniWidth
            sidebar: {maxWidth: '170px', minWidth: '0px', miniWidth: '70px'},
            // footer: {maxHeight: '22px', minHeight: '22px'}
            footer: {maxHeight: '0px', minHeight: '0px'}
        }
        // 还未开发该功能，暂禁用
        this.login = {registerEnable: false}
        this.mapAK = 'sIKTgNAqvT9Uo0yQMlr3H9B6dZADzhfT'
        this.router = undefined
        this.store = undefined
        this.data = {
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
                    return instance.data.getPageByCode(pageCode)
                } else {
                    return new Promise((resolve, reject) => {
                        console.log('reject', reject)
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
                    let lazyLoad = (fileName, resolve) => {
                        require(['./components/' + componentName + '/index.vue'], resolve)
                    }
                    lazyLoad(componentName, data => {
                        if (data.default.propsData) {
                            data.default.propsData.opts = opts
                        } else {
                            data.default.propsData = {opts: opts}
                        }
                        console.log('vue.default>', data.default)
                        resolve(new Vue(data.default).$mount())
                    })
                    console.log('reject', reject)
                })
            },

            /**
             *  vue文件模板
             * @param fileName
             * @returns {Promise}
             */
            // getFileTemplate: function (fileName) {
            //     return new Promise((resolve, reject) => {
            //         console.log('resolve>', resolve, reject)
            //         // let lazyLoadFn = (fileName, resolve) => { require(['../views/geemeta/gm-designer/file-template/' + fileName + '.vue'], resolve) }
            //         // resolve(new Vue(lazyLoadFn).$mount())
            //         let lazyLoad = (fileName, resolve) => {
            //             require(['./views/platform/file/designer-template/' + fileName + '.vue'], resolve)
            //         }
            //         lazyLoad(fileName, data => {
            //             resolve(new Vue(data.default).$mount())
            //         })
            //     })
            // },
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
                $.ajax(instance.url.apiMetaList, {
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
                $.ajax(instance.url.apiMetaSave, {
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
                return instance.data.update(instance.url.apiMetaSave, entityName, keyValues, successMsg || '保存成功')
            },
            delete: function (entityName, keyValues, successMsg) {
                return instance.data.update(instance.url.apiMetaDelete, entityName, keyValues, successMsg || '删除成功')
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
                        instance.ui.showMsg(successMsg, 'success')
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
                return instance.data.queryByGql(gql, withMeta)
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
                return instance.data.queryByGql(gqlAry, withMeta)
            },
            /**
             * 基于gql对象进行查询
             * @param gqlObject or gqlArray
             * @param withMeta 是否需同时查询出各列表字段的元数据信息
             * @returns {*}
             */
            queryByGql: function (gql, withMeta) {
                let df = $.Deferred()
                var url = Array.isArray(gql) ? instance.url.apiMetaMultiList : instance.url.apiMetaList
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
                var url = instance.url.apiMetaDefined + '/' + entityName
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
                var url = instance.url.apiMetaEntityNames + '/'
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
        }
        this.ui = {
            /**
             *
             * @param pageCode 配置的页面
             * @param query
             * @param data
             */
            openPage: function (srcVue, pageCode, query, data) {
                instance.data.getPageConfig(pageCode).then(res => {
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
                    instance.ui.openVueByPath(srcVue, path, {title: '', opts: pageConfig}, data)
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
                path = path.replace('../views', '')
                if (path.startsWith('/views')) {
                    path = path.substring(1)
                }
                console.log('path>', path)
                // path = './views/geemeta/gm-designer/setting/icon-field-setting.vue'
                let vueComponent = resolve => require(['./views' + path], resolve)
                return instance.ui.openVue(srcVue, vueComponent, vueConfig, callbackSet)
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
                let modalView = srcVue.$root.$children[0].$refs.appRootModalView
                Vue.set(modalView, 'modalBody', vueComponent)
                Vue.set(modalView, 'modalOpts', vueConfig)
                // Vue.set(modalView, 'modalOpts', {
                //   title: '',
                //   actions: [],
                //   opts: vueConfig
                // })
                Vue.set(modalView, 'callbackSet', callbackSet || {})
                // $('modalView.$el).modal('setting', 'transition', 'fade').modal('show')
                let $modal = $(modalView.$el).modal({duration: 200, closable: false, allowMultiple: true})
                $modal.modal('show')
                return $modal
            },
            /**
             *
             * @param msg
             * @param type warning、info、positive|success、negative|error
             * @param title
             * @param timeout 自动关闭时间，单位毫秒，默认2000
             */
            showMsg(msg, type = 'info', title = '', timeout = 1500) {
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

                function hide() {
                    $('#rootMessageTarget').popup('hide')
                }
            },
            color: {
                primary: 'blue',
                secondary: 'teal',
                positive: '',
                negative: 'red'
            },
            colorHex: {
                blue: '#2185d0',
                teal: '#00b5ad',
                red: '#db2828',
                orange: '#fe9a76',
                black: '#000000',
                pink: '#FF1493'
            }

        }
        this.security = {
            loginDemo(user, remember, success) {
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
            login(user, remember, success) {
                // instance.security.loginDemo(user, remember, success)
                return $.ajax(instance.url.root + '/api/sys/auth/login?remember=' + remember, {
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false,
                    data: user,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        instance.ui.showMsg('账号或密码不正确！', 'error')
                        console.log(errorThrown)
                    },
                    success: success
                })
            },
            logout() {
                // instance.router.push('/login')
                $.ajax(instance.url.root + '/api/sys/auth/logout', {
                    // type: 'POST',
                    // dataType: 'json',
                    // contentType: 'application/json',
                    // processData: false,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        instance.ui.showMsg('暂时不能注销！', 'warning')
                        console.log(errorThrown)
                    },
                    success: function (data) {
                        console.debug('request end>>', data)
                        instance.security.profile(null)
                        instance.router.push('/login')
                        // var reloadURL = 'index.html' + window.location.search
                        // window.location.replace(reloadURL, true)
                    }
                })
            },
            /**
             * 同步方法，验证是否已登录
             * @returns {boolean} true or false
             */
            isLogged() {
                // return false
                let result = false
                let self = this
                $.ajax(instance.url.root + '/api/sys/auth/isLogged', {
                    async: false,
                    // dataType: 'json',
                    // contentType: 'application/json',
                    // processData: false,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        self.showMsg('暂未能检查是否已登录！')
                        console.log(errorThrown)
                    },
                    success: function (data) {
                        if (data) {
                            result = true
                        }
                        console.log('isLogged success', data)
                    }
                })
                return result
            },
            profile(jsonProflie) {
                if (jsonProflie) {
                    utils.session('geelatoProfile', jsonProflie)
                }
                let profile = utils.session('geelatoProfile')
                // console.log('profile', profile)
                if (profile === undefined) return {}
                else return profile
            }
        }
        this.ctx = {
            $root: undefined
        }
        this.copyright = {}
        this.utils = utils
        this.plugins = {}
    }

    addPlugin(name) {
        let pluginConfig = this.getPlugin(name)
        pluginConfig.modules ? this.modules.push(...pluginConfig.modules) : null
        pluginConfig.vueFiles ? this.vueFiles.push(...pluginConfig.vueFiles) : null
        this.plugins[name] = pluginConfig
        this.entityNames[name] = pluginConfig.entityNames
    }

    getPlugin(name) {
        let jsPath = BASE_DIR + '/' + name + '/config.js'
        return require('' + jsPath).default
    }

    setRouter(router) {
        this.router = router
    }

    setStore(store) {
        this.store = store
    }

    setServerUrlRoot(serverUrlRoot) {
        this.url.root = serverUrlRoot
        this.url.api = this.url.root + '/api'
        this.url.apiMetaDefined = this.url.api + '/meta/defined'
        this.url.apiMetaEntityNames = this.url.api + '/meta/entityNames'
        this.url.apiMetaList = this.url.api + '/meta/list'
        this.url.apiMetaMultiList = this.url.api + '/meta/multiList'
        this.url.apiMetaSave = this.url.api + '/meta/save'
        this.url.apiMetaDelete = this.url.api + '/meta/delete'
    }

    setCopyright(copyright) {
        this.copyright = copyright
    }

    setColors(primary = 'blue', secondary = 'teal', positive = '', negative = 'red') {
        this.ui.color = {
            primary: primary,
            secondary: secondary,
            positive: positive,
            negative: negative
        }
    }

    /**
     * addRoutes
     */
    run() {
        let appBase = this.appBase
        let pluginRootRoute = undefined
        for (let index in this.router.options.routes) {
            let route = this.router.options.routes[index]
            console.log('path', route.path, 'appbase', this.appBase)
            if (route.path === this.appBase) {
                pluginRootRoute = route
            }
        }
        let routeConfig = {
            path: appBase,
            component: GlLayout,
            meta: {
                requireAuth: true
            },
            children: []
        }
        for (let name in this.plugins) {
            routeConfig.children.push(...createModuleRoutes(this.plugins[name].modules))
        }
        this.router.addRoutes([routeConfig])
        console.log('this.router>', this.router)

        /**
         * 将url与文件地址一致的文件添加到路由表中，来源：
         * 1、/api/config.js 中的菜单链接href
         * 2、/router/vue-files.js 中的文件
         */
        function createModuleRoutes(modules) {
            if (!modules || modules.length === undefined || modules.length <= 0) {
                return []
            }
            // 从配置的菜单中，添加路由
            let routeConfigs = []
            for (let j in modules) {
                if (modules[j].index) {
                    routeConfigs.push(createVueFileRoute(modules[j].index))
                }
                if (modules[j].menu) {
                    for (let k in modules[j].menu) {
                        let menuItemGroup = modules[j].menu[k]
                        for (let l in menuItemGroup.items) {
                            routeConfigs.push(createVueFileRoute(menuItemGroup.items[l].href))
                        }
                    }
                }
            }

            function createVueFileRoute(url) {
                console.log('url', url)
                if (url) {
                    let startIndex = url.indexOf('/#' + appBase)
                    startIndex = startIndex > -1 ? startIndex + 5 : 0
                    let queryIndex = url.indexOf('?')
                    queryIndex = queryIndex > 0 ? queryIndex : url.length
                    let path = url.substring(startIndex, queryIndex)
                    console.log('push path>', path + '  >   ' + '../views/' + path + '.vue')
                    return {
                        path: path,
                        component: resolve => require(['./views/' + path + '.vue'], resolve)
                    }
                }
            }

            console.log('routeConfigs>', routeConfigs)
            return routeConfigs
        }
    }

    getModule(moduleCode) {
        for (let i in this.modules) {
            let module = this.modules[i]
            if (module.code === moduleCode) {
                return module
            }
        }
        console.error('getModule by code :' + moduleCode + ',return {}.')
        return {}
    }


}

let instance = new Geelato()
export default instance
