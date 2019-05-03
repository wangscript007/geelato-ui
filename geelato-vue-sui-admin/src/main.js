/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import geelato from './geelato'
import './reset'
import VueResize from 'vue-resize'

Vue.use(VueResize)
Vue.config.productionTip = false
geelato.setRouter(router)
geelato.setStore(store)
// If you want to add more plugin, just need to type "geelato.addPlugin('customPluginName')",
// and the customPluginName is refer to "src/views/customPluginName"
geelato.addPlugin('platform-core')
geelato.addPlugin('platform-monitor')
geelato.addPlugin('platform-meta')
geelato.addPlugin('platform-docs')
geelato.addPlugin('platform-labs')
geelato.addPlugin('platform-ide')
// Set default module for login, and there is a default index href in module.
geelato.setStartModule('ide')

geelato.setHelpUrl('https://www.geelato.org')
let isRunInServer = window.location.href.match(/[\.]*geelato\.org/) != null
if (isRunInServer) {
    geelato.setServerUrlRoot('https://api.geelato.org:8080')
} else {
    geelato.setServerUrlRoot('http://localhost:8080')
    // geelato.setServerUrlRoot('https://api.geelato.org:8080')
}

geelato.setColors({primary: 'blue', secondary: 'teal', positive: '', negative: 'red'})
geelato.setCopyright({text: '2018 &copy;  geelato-vue-sui-admin By geelato', href: 'http://www.geelato.org'})
geelato.run()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
