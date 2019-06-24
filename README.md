# umi-electron-javecript

### 一个基于 umijs + electron + javecript 的模板

[![Umi](https://img.souche.com/f2e/a92fc3dfdb4918578861c42bbfcfaf7f.png)](https://umijs.org/)
[![Webpack](https://img.souche.com/f2e/cdc96229f3f9b7068a9b13f7658a9b0e.png)](https://webpack.js.org/)
[![Electron](https://img.souche.com/f2e/4f18b23a82d106ce023cdaf17c6dfd51.png)](https://electronjs.org/)

## 主要特性

- 支持整个应用的热重载

## 项目目录

```
.
├── build
│   └── ...                         // webpack 配置文件
├── dist
│   └── ...                         // 打包文件夹
├── src                             // 源代码文件
│   ├── main                        // 主进程代码
│   │   ├── Application.js          // application 类
│   │   ├── config
│   │   │   └── ...                 // 配置文件
│   │   ├── event
│   │   │   └── ...                 // IPC通信 监听事件
│   │   ├── index.js                // 入口文件
│   │   ├── logger
│   │   │   └── index.js            // 日志封装
│   │   ├── pages
│   │   │   ├── window.html         // 子窗口 html 模板文件
│   │   │   └── ...
│   │   ├── system
│   │   │   ├── crash.js
│   │   │   ├── tray.js
│   │   │   └── ...                 // 系统模块
│   │   ├── utils
│   │   │   ├── deviceid.js
│   │   │   ├── download.js
│   │   │   ├── path.js
│   │   │   └── ...                 // 工具类
│   │   └── window
│   │       └── index.js            // 渲染窗口封装
│   └── renderer                    // 渲染进程代码
│       ├── app.js
│       ├── assets                  // 静态文件
│       │   └── yay.jpg
│       ├── config                  // 配置
│       │   ├── config.js
│       │   └── ...
│       ├── global.js
│       ├── layouts                 // layout 模板
│       │   ├── index.css
│       │   ├── index.js
│       │   └── ...
│       ├── models
│       │   ├── global.js
│       │   └── ...
│       └── pages
│           └── ...
└── package.json
```

## 安装

然后通过 yarn 下载依赖

```javascript
  $ yarn
```

## 开发

首先通过以下命令启动渲染进程(默认端口：8000)

### 一条命令启动

```javascript
  $ yarn start:dev
```

### 分开启动

首先通过以下命令启动渲染进程(默认端口：8000)

```javascript
  $ yarn start:renderer
```

然后启动主进程

```javascript
  $ yarn start:main
```

## 打包

```javascript
  $ npm run pack
```

如果想把代码打包成一个 dmg 文件或者 zip 文件，可以执行以下命令

```javascript
  $ npm run dist
```

## 致谢

- [@williamnie](https://github.com/williamnie)提供的模板([umi-electron](https://github.com/williamnie/umi-electron))
- [@agalwood](https://github.com/agalwood/Motrix)提供的项目([Motrix](https://github.com/agalwood/Motrix))
- [@ConardLi](https://github.com/ConardLi)提供的模板([electron-react](https://github.com/ConardLi/electron-react))，本项目是根据这些项目修改而来。
- [Electron](https://github.com/electron/electron), [Umi](https://github.com/umijs/umi), [Dva](https://github.com/dvajs/dva), [Antd](https://github.com/ant-design/ant-design)等框架的开发者们。
