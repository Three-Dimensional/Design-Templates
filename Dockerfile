# FROM node:10
# COPY ./ /app
# WORKDIR /app
# RUN yarn install && yarn build

FROM nginx
RUN mkdir /app
# COPY --from=0 /app/dist /app    
COPY ./dist /app    
# 获取上一步打包生成的dist文件
COPY nginx.conf /etc/nginx/nginx.conf