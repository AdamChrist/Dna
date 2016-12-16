#dna
基于dva,node,ant-design 的权限管理框架.

## 环境准备
> node v7.2
> mysql v5.7.13
### 安装依赖

```bash
$ npm install
```

## 启动调试

> 启动api node服务

```bash
$ npm run server
```
> 启动客户端

```bash
$ npm start
$ open http://localhost:8989/
```

## 打包

```bash
$ npm run build
```

> 客户端单独打包

```bash
$ npm run build:client

// 构建但不压缩
$ npm run build:client -- --no-compress
```
> 服务端单独打包

```bash
$ npm run build:server

```
