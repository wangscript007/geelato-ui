module.exports = (api, opts, rootOptions) => {
	
  api.extendPackage({
    dependencies: {
      'semantic-ui': '^2.3.3'
    }
  })
  api.render('./template')
}
