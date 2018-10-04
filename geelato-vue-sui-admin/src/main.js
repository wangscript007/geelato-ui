/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue';
import Sui from './components/sui/Index.vue'
import geelato from './geelato'
import './reset'
import GlModal from './components/gl-modal/Index.vue'
import GlGroup from './components/gl-group/Index.vue'
import GlFormSimple from './components/gl-form-simple/Index.vue'
import GlFormBase from './components/gl-form-base/Index.vue'
import GlLayoutPage from './components/gl-layout-page/Index.vue'
import GlMessage from './components/gl-message/Index.vue'
import GlTable from './components/gl-table/Index.vue'
import GLDropdown from './components/gl-dropdown/Index.vue'

Vue.use(SuiVue)
Vue.config.productionTip = false
Vue.prototype.$gl = geelato
Vue.component('sui', Sui)
Vue.component('gl-modal', GlModal)
Vue.component('gl-group', GlGroup)
Vue.component('gl-layout-page', GlLayoutPage)
Vue.component('gl-form-simple', GlFormSimple)
Vue.component('gl-form-base', GlFormBase)
Vue.component('gl-message', GlMessage)
Vue.component('gl-table', GlTable)
Vue.component('gl-dropdown', GLDropdown)

geelato.setRouter(router)
geelato.setStore(store)
// If you want to add more plugin, just need to type "geelato.addPlugin('customPluginName')",
// and the customPluginName is refer to "src/views/customPluginName"
geelato.addPlugin('platform-core')
geelato.addPlugin('platform-monitor')
geelato.addPlugin('platform-meta')
geelato.addPlugin('platform-labs')
geelato.addPlugin('platform-ide')
geelato.addPlugin('geev')
// Set default module for login, and there is a default index href in module.
geelato.setStartModule('ide')

geelato.setServerUrlRoot('http://api.geelato.org:8080')
// geelato.setServerUrlRoot('http://localhost:8080')
geelato.setHelpUrl('http://www.geelato.org')

geelato.setColors({primary: 'blue', secondary: 'teal', positive: '', negative: 'red'})
geelato.setCopyright({text: '2018 &copy;  geelato-vue-sui-admin By geelato', href: 'http://www.geelato.org'})
geelato.run()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
