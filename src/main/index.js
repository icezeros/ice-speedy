import { app } from 'electron';
import is from 'electron-is';

import logger from './logger';
import Application from './Application';
import handleQuit from './event/quit';
import handleMessage from './event';
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

// if (is.windows()) {
//   app.setAppUserModelId(appId);
// }
const application = new Application();
global.application = application;

function makeSingleInstance(callback) {
  if (is.mas()) {
    callback();
    return;
  }

  const gotSingleLock = app.requestSingleInstanceLock();
  if (!gotSingleLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, argv, workingDirectory) => {
      logger.warn('second-instance====>', argv, workingDirectory);
      application.showPage('main');
      if (!is.macOS() && argv.length > 1) {
        this.handleAppLaunchArgv(argv);
      }
    });

    callback();
  }
}

function init() {
  handelAppReady();
}
function handelAppReady() {
  app.on('ready', () => {
    application.showPage('main');

    global.application.on('ready', () => {
      //   this.sendUrlToApplication();
      //   this.sendFileToApplication();
    });
    handleQuit();
    handleMessage();
  });

  app.on('activate', () => {
    if (global.application) {
      logger.info('[Motrix] activate');
      global.application.showPage('index');
    }
  });
}

function handleAppWillQuit() {
  app.on('will-quit', () => {
    logger.info('[Motrix] will-quit');
    if (global.application) {
      global.application.stop();
    }
  });
}

makeSingleInstance(init);
