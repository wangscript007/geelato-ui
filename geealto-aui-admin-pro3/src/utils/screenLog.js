/* eslint-disable */
export const printANSI = () => {
  // console.clear()
  console.log('[geelato pro] created()')
  // ASCII - ANSI Shadow
  let text = `
 _____           _       _         ______          
|  __ \\         | |     | |        | ___ \\         
| |  \\/ ___  ___| | __ _| |_ ___   | |_/ / __ ___  
| | __ / _ \\/ _ \\ |/ _\` | __/ _ \\  |  __/ '__/ _ \\ 
| |_\\ \\  __/  __/ | (_| | || (_) | | |  | | | (_) |
 \\____/\\___|\\___|_|\\__,_|\\__\\___/  \\_|  |_|  \\___/ 

\t\t\t\t\tPublished ${APP_VERSION}-${GIT_HASH} @ geelato.org
\t\t\t\t\tBuild date: ${BUILD_DATE}`
  console.log(`%c${text}`, 'color: #fc4d50')
  console.log('%c感谢使用 Geelato Pro!', 'color: #000; font-size: 14px;    font-family: Hiragino Sans GB,Microsoft YaHei,\\\\5FAE\\8F6F\\96C5\\9ED1,Droid Sans Fallback,Source Sans,Wenquanyi Micro Hei,WenQuanYi Micro Hei Mono,WenQuanYi Zen Hei,Apple LiGothic Medium,SimHei,ST Heiti,WenQuanYi Zen Hei Sharp,sans-serif;')
  console.log('%cThanks for using geelato pro!', 'color: #fff; font-size: 14px; font-weight: 300; text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;')
}
