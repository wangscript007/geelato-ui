/* eslint-disable no-undef */
export function BaiduMap (ak) {
  return new Promise(function (resolve, reject) {
    if (!window.$_initBaiduMap) {
      window.$_initBaiduMap = function () {
        resolve(window.BMap)
      }
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.onerror = reject
      script.src = 'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=$_initBaiduMap'
      document.head.appendChild(script)
    } else {
      // 加上“window.”，确保变量已隐式声明，可检测，否则发报is not defined异常
      // 加上if (window.BMap)，解决页面刷新时BMap未定义或未声明的问题
      if (window.BMap) {
        console.log('window.BMap>', window.BMap)
        resolve(window.BMap)
      }
    }
  })
}
