import { axiosPlus } from '@/utils/requestPlus'

const api = {
  metaList: '/meta/list',
  metaMultiList: '/meta/multiList'
}

export default api

// export function getUserList (parameter) {
//   return axiosPlus({
//     url: api.user,
//     method: 'get',
//     params: parameter
//   })
// }

/**
 * 基于gql对象进行查询
 * @param gql Object or gqlArray
 * @param withMeta 是否需同时查询出各列表字段的元数据信息
 * @returns {*}
 */
export function queryByGql (gql, withMeta) {
  // let url = Array.isArray(gql) ? api.metaMultiList : api.metaList
  // if (withMeta === true) {
  //   url = url + '?withMeta=true'
  // } else {
  //   url = url + '?withMeta=false'
  // }
  return axiosPlus({
    url: Array.isArray(gql) ? api.metaMultiList : api.metaList,
    method: 'POST',
    // responseType: 'json',
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    data: gql
  })
}
