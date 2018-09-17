#!/bin/bash
# 以下脚本采用git bash执行
# 确保脚本抛出遇到的错误
set -e

# 构建
npm run build

# 进入生成的文件夹
cd dist

# 发布到自定义域名
echo showcase.geelato.org > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到 https://geelato-showcase.github.io
git push -f git@github.com:geelato-showcase/geelato-showcase.github.io.git master

pause
