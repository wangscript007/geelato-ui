/* eslint-disable no-undef */
let inited = false

export function BaiduMap (ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
    if (!inited) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=init'
      script.onerror = reject
      document.head.appendChild(script)
      inited = true
    } else {
      resolve(BMap)
    }
  })
}
