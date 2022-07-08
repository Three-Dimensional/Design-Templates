#!/usr/bin/env sh
# sudo chmod -R 777 ./deploy.sh 给予权限
# 当发生错误时中止脚本
set -e
yarn build
docker  build  --platform linux/amd64 -t  design-templates:1.0.0  .
docker tag design-templates:1.0.0  zxlcoder/zxlcoder
docker push zxlcoder/zxlcoder
