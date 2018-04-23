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
      // 加上“window.”，确保变量已隐式声明，可检测，否则发报is not defined异常
      // 加上if (window.BMap)，解决页面刷新时BMap未定义或未声明的问题
      if (window.BMap) {
        resolve(window.BMap)
      }
    }
  })
}
