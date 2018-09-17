/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import geelato from './geelato'
import Sui from './components/sui'
import GlModal from './components/gl-modal'
import GlMessage from './components/gl-message'
import GlTable from './components/gl-table/Index.vue'

Vue.config.productionTip = false
Vue.prototype.$gl = geelato
Vue.component('sui', Sui)
Vue.component('gl-modal', GlModal)
Vue.component('gl-Message', GlMessage)
Vue.component('gl-table', GlTable)

geelato.setRouter(router)
geelato.setStore(store)
geelato.setServerUrlRoot('http://demo.geelato.org:8080')
// geelato.setColors({primary: 'blue', secondary: 'teal', positive: '', negative: 'red'})
geelato.addPlugin('platform')
geelato.addPlugin('geev')
// add more plugin here e.g. src/views/customPluginName
// geelato.addPlugin('customPluginName')
geelato.setCopyright({
    text: '2018 &copy;  geelato-vue-sui-admin By geelato',
    href: 'http://www.geelato.org'
})
geelato.run()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

