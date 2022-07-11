#!/usr/bin/env sh
# sudo chmod -R 777 ./deploy.sh 给予权限
# 当发生错误时中止脚本
set -e
# yarn build
docker build --platform linux/amd64 -t design-templates:1.0.1  .
docker tag design-templates:1.0.1 zxlcoder/design-templates
docker push zxlcoder/design-templates


# 服务端脚本
# docker pull zxlcoder/design-templates
# docker stop design-templates
# docker rm design-templates
# docker run --name design-templates  -d -p 8081:80 zxlcoder/design-templates
# docker image prune -f --filter "until=24h"
# docker container prune -f --filter "until=24h"