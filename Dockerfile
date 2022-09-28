FROM registry.cn-hangzhou.aliyuncs.com/zhangbo007/node:14.18.0-alpine
# 设置镜像作者
LABEL MAINTAINER="mwq"

# 设置工作目录
WORKDIR /app

# 清除npm缓存文件
RUN npm cache clean --force && npm cache verify

# 设置环境变量
ENV NODE_ENV prd

# 设置yuan
RUN npm config set registry https://registry.npm.taobao.org

# 复制文件
COPY . .

# 安装依赖
RUN npm install
RUN npm install -g pm2


# 暴露端口
EXPOSE 8000

CMD [ "npm", "run", "prd" ]
