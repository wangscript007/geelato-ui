import PageManager from './PageManager'

let pageManager = new PageManager()
pageManager.register(require('./platform/securityCfg').default)
pageManager.register(require('./platform/settingCfg').default)
pageManager.register(require('./project/projectCfg').default)
pageManager.register(require('./project-metro/project-info').default)
console.log('pageManager.register(require(\'./project-metro/project-info\').default)')

export default pageManager
