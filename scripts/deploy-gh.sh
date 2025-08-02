#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# 删除现有的 .git 目录，重新初始化
rm -rf .git
git init

git add -A
 
git commit -m '版本发布'

# 推送到目标分支
git push -f https://github.com/aFeiw/comWangXingFei HEAD:deploy-version-20250808

# # 如果发布到 https://<USERNAME>.github.io/<REPO>
# # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -

rm -rf docs/.vitepress/dist
 
rm -rf docs/node_modules