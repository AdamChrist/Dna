#dna
基于dva,node,ant-design 的权限管理框架.

## 环境准备

### 安装依赖

```bash
$ npm install
```

## 启动调试

> 启动客户端

```bash
$ npm start
$ open http://localhost:8989/
```
> 启动api node服务

```bash
$ npm run server
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

## 目录结构

```
.
├── /dist/                 # 构建输出的文件会在这里
│
├── /logs/                 # 日志
│
├── /node_modules/         # 第三方类库和工具
│
├── /server/               # 服务端源码
│   ├── /api/              # node api
│   ├── /middleware/       # 中间件
│   ├── /models/           # hprose接口、redis配置等
│   ├── /utils/            # 工具类
│   ├── configure.js       # 服务端配置文件
│   ├── index.js           # api入口
│   ├── socker.js          # socket 配置文件
│
├── /src/                  # 应用源码
│   ├── /components/       # React 应用组件
│   ├── /models/           # dva.js models模块,相当于redux-saga的reducers和sagas
│   ├── /public/           # 公共资源
│   ├── /routes/           # 布局与模块
│   ├── /services/         # api
│   ├── /style/            # 自定义样式
│   ├── /utils/            # 工具类
│   ├── config.js          # 客户端配置文件
│   ├── index.html         # 入口html
│   ├── index.js           # 入口js
│   ├── index.less         # 入口less
│   ├── router.js          # 路由
│
├── config.json            # 服务配置文件
├── gulpfile.js            # 自动构建配置文件
├── package.json           # 依赖和 scripts
├── proxy.config.js        # 配置 dora-plugin-proxy，用于 mock 和在线调试
├── server.js              # 服务端入口
├── webpack.config.js      # 客户端扩展 webpack 配置
└── webpack.config.server.js  # 服务端扩展 webpack 配置
```

## 内置类库

- [react](https://github.com/facebook/react)
- [redux](https://github.com/reactjs/redux)
- [dva](https://github.com/dvajs/dva)
- [react-router](https://github.com/reactjs/react-router)
- [classnames](https://github.com/JedWatson/classnames)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- [react-router](https://github.com/reactjs/react-router)
- [react-router-redux](https://github.com/reactjs/react-router-redux)

## 工具特性

热替换和 LiveReload

> 基于 [Webpack Vanilla HMR](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html)，支持 `components`, `reducers`, `routers`, `sagas`, `layouts` 目录的模块热替换，其余目录的修改则会自动刷新页面。

> CSS 的自动刷新需通过 [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) Chrome 插件配合使用。

> - [Why Vanilla HMR](https://github.com/reactjs/redux/pull/1455)

支持 css-modules

> 所有 less 文件会被解析为 css-modules

运行错误和语法错误的提醒

> 通过 [redbox-react](https://github.com/KeywordBrain/redbox-react) 和 webpack hmr overlay 提示运行错误和语法错误

自动引入 `reducer` 和 `saga`

> 通过 webpack 的 `require.context` 黑魔法批量引入 `reducer` 和 `saga`，新增、删除和重命名时会更方便

自动安装 npm 依赖

> ![](https://camo.githubusercontent.com/898e02d6539900efe65fadbfd15e2a1d7ce4dccf/68747470733a2f2f6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f4b6541474f776a70746a6152684d6d2e676966)

数据 mock 和线上调试

> 通过 dora-plugin-proxy 实现，详见：https://github.com/dora-js/dora-plugin-proxy#规则定义

...
