import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxiosPlus } from './axiosPlus'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  baseURL: 'http://localhost:8080/api',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
	console.log('requestPlus > error.response :', error.response)
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: '禁止访问（Forbidden）',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: '验证失败',
        description: data
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
console.log('requestPlus > response :', response)
  // 处理response.data，若该格式为ApiResult，则转换格式
  if (response.data) {
    // response.data 的格式：{
    //   msg:'',
    //   code: '',
    //   data:{},
    //   meta:{} // 可选
    // }
    if ('msg' in response.data && 'code' in response.data && 'data' in response.data) {
      if (isLogin(response)) {
        const user = response.data.data.user
        return builder({
          'id': user.id,
          'name': user.name,
          'username': user.LoginName,
          'password': user.password,
          'avatar': user.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
          'status': 1,
          'telephone': user.telephone,
          'lastLoginIp': '27.154.74.117',
          'lastLoginTime': 1534837621348,
          'creatorId': user.creator,
          'createTime': user.createAt, // 1497160610259
          'deleted': 0,
          'roleId': 'admin',
          'lang': 'zh-CN',
          'token': '4291d7da9005377ec9aec4a71ea837f'
        }, response.data.msg, parseInt(response.data.code))
      } else if (isPageResult(response)) {
        const res = {}
        res.data = response.data.data
        res.pageSize = parseInt(response.data.size)
        res.pageNo = parseInt(response.data.page)
        res.totalPage = parseInt(response.data.total)
        res.totalCount = parseInt(response.data.dataSize)
        console.log('res >', res)
        return res
      } else {
        return builder(response.data.data, response.data.msg, parseInt(response.data.code))
      }
    }
    if (isLogout(response)) {
      return builder({}, '注销成功')
    }
  }
  return response.data
}, errorHandler)

const isLogin = function (response) {
  return response.request.responseURL.indexOf('sys/auth/loginSecurity') !== -1
}
const isLogout = function (response) {
  return response.request.responseURL.indexOf('sys/auth/logout') !== -1
}
// 是否为分页列表数据
const isPageResult = function (response) {
  return 'page' in response.data && 'size' in response.data && 'total' in response.data
}

const builder = (data, message, code = 0, headers = {}) => {
  const responseBody = {
    message: '',
    timestamp: 0,
    result: null,
    code: 0
  }
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxiosPlus, request)
  }
}

export default request

export {
  installer as VueAxiosPlus,
  request as axios
}
