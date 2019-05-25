const VueAxiosPlus = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install (Vue, instance) {
    if (this.installed) {
      return
    }
    this.installed = true

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install axiosPlus')
      return
    }

    Vue.axiosPlus = instance

    Object.defineProperties(Vue.prototype, {
      axiosPlus: {
        get: function get () {
          return instance
        }
      }
      // 在axios中已有https
      // ,
      // $http: {
      //   get: function get () {
      //     return instance
      //   }
      // }
    })
  }
}

export {
  VueAxiosPlus
}
