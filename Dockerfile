FROM node:14
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app    
# 获取上一步打包生成的dist文件
COPY nginx.conf /etc/nginx/nginx.conf