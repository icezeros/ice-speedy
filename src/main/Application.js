import { EventEmitter } from 'events';
import { app } from 'electron';
import is from 'electron-is';
import path from 'path';
import url from 'url';

import ConfigManager from './config';

import logger from './logger';
import WindowManager from './window/index';

import Aria2 from './engine/aria2';

import handleQuit from './event/quit';
import handleMessage from './event';
import onCrash from './system/crash';
import createTray from './system/tray';

export default class Application extends EventEmitter {
  constructor() {
    super();
    this.isReady = false;
    this.mainWindow = null;
    this.mainWindows = {};
    this.configManager = new ConfigManager();
    this.windowManager = this.windowManager = new WindowManager({
      userConfig: this.configManager.getUserConfig(),
    });

    this.init();
  }

  init() {
    this.initWindowManager();
    this.initAria2Server();
  }

  initAria2Server() {
    this.configManager.reset();
    this.aria2 = new Aria2({
      systemConfig: this.configManager.getSystemConfig(),
      userConfig: this.configManager.getUserConfig(),
    });
  }

  initWindowManager() {
    this.windowManager.on('window-resized', data => {
      this.storeWindowState(data);
    });
    this.windowManager.on('window-moved', data => {
      this.storeWindowState(data);
    });
    this.windowManager.on('window-closed', data => {
      this.storeWindowState(data);
    });
  }

  storeWindowState(data = {}) {
    const enabled = this.configManager.getUserConfig('keep-window-state');
    if (!enabled) {
      return;
    }

    const state = this.configManager.getUserConfig('window-state', {});
    const { page, bounds } = data;
    const newState = {
      ...state,
      [page]: bounds,
    };
    this.configManager.setUserConfig('window-state', newState);
  }

  start(page, options = {}) {
    this.showPage(page, options);
    this.aria2.start();
  }

  showPage(page, options = {}) {
    const { openedAtLogin } = options;
    const win = this.windowManager.openWindow(page, {
      hidden: openedAtLogin,
    });
    win.once('ready-to-show', () => {
      this.isReady = true;
      this.emit('ready');
    });
    if (is.macOS()) {
      //   this.touchBarManager.setup(page, win);
    }
  }

  show(page = 'main') {
    this.windowManager.showWindow(page);
  }

  hide(page) {
    if (page) {
      this.windowManager.hideWindow(page);
    } else {
      this.windowManager.hideAllWindow();
    }
  }

  toggle(page = 'main') {
    this.windowManager.toggleWindow(page);
  }

  closePage(page) {
    this.windowManager.destroyWindow(page);
  }

  stop() {
    this.aria2.stop();
    // this.energyManager.stopPowerSaveBlocker()
    // this.trayManager.destroy()
  }

  makeSingleInstance(cb) {
    if (is.mas()) {
      cb();
      return;
    }
    const gotSingleLock = app.requestSingleInstanceLock();
    if (!gotSingleLock) {
      app.quit();
    } else {
      app.on('second-instance', (event, argv, workingDirectory) => {
        logger.warn('second-instance====>', argv, workingDirectory);
        global.mainWindow.showWindow();
        if (!is.macOS() && argv.length > 1) {
          this.handleAppLaunchArgv(argv);
        }
      });
      cb();
    }
  }
  //   init2() {
  //     this.handleAppEvents()
  //       .then(() => handleQuit())
  //       .then(() => onCrash())
  //       .then(() => handleMessage());
  //     //   .then(() => createTray());
  //   }
  //   stop() {}

  //   async handleAppEvents() {
  //     return new Promise((resolve, reject) => {
  //       app.on('ready', () => {
  //         const options = {
  //           window: {
  //             title: 'test',
  //             show: false,
  //             width: 1024,
  //             height: 768,
  //             webPreferences: {
  //               nodeIntegration: true,
  //               preload: path.join(__dirname, './preload.js'), // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
  //             },
  //           },
  //         };
  //         if (process.env.NODE_ENV === 'development') {
  //           options.url = 'http://localhost:8000/';
  //         } else {
  //           options.url = url.format({
  //             pathname: path.join(__dirname, './dist/renderer/index.html'),
  //             protocol: 'file:',
  //             slashes: true,
  //           });
  //         }
  //         const mainWindow = new Window(options);
  //         mainWindow.showWindow();
  //         mainWindow.on('ready', () => {
  //           this.sendUrlToApplication();
  //           this.sendFileToApplication();
  //         });
  //         global.mainWindow = mainWindow;
  //         global.mainId = mainWindow.window.id;
  //         this.mainWindow = mainWindow;

  //         return resolve(mainWindow);
  //       });
  //     });
  //   }
}
