# Setup Guide
> install node (版本参考 package.json -> engines -> node)
-

> install git
- [key-questions](https://github.com/inetfuture/technote/blob/master/git.md#key-questions)

> install vscode

> install vscode extension

# [Training](./docs/training.md)

# [Code Style](./docs/code-style.md)

# [Contributing](./docs/get-start.md)

# Development
> 启动 dev server

```sh
# 获取代码
git clone $repoURL
cd vips-frontend

# 安装依赖
npm install

# 启动 dev server
npm start
```
> npm start 参数
- PORT: 指定端口, 默认为 8080

> 常见问题
- 依赖安装失败, 检查 node 版本,建议参照 `package.json->engines`
- 依赖安装慢, 使用淘宝源 `npm install --registry=https://registry.npm.taobao.org`
- 默认端口 8080 被占用, 使用 `PORT=xxx npm start` 启动 dev server

# Deployment
> 编译代码

```sh
# 获取代码
git clone $repoURL
cd vips-frontend

# 安装依赖
npm install

# build 代码并输出到 /build 文件夹
npm run build
```
> npm run build 参数
- ENV: `dev|prod` 默认值 `dev`
- BACKEND_PROTOCOL: `http|https` 默认值 `http`
- BACKEND_DOMAIN:

> 常见问题
- 依赖安装失败, 检查 node 版本,建议参照 `package.json->engines`
- 依赖安装慢, 使用淘宝源 `npm install --registry=https://registry.npm.taobao.org`
- 依赖找不到, 需要运行 `npm install`. 建议每次 build 前运行 `npm install`.

# Maintenance
