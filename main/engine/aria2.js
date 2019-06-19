'use strict';

import { app } from 'electron';
import is from 'electron-is';
import { existsSync } from 'fs';
import { resolve, join } from 'path';
import forever from 'forever-monitor';
import logger from '../logger';
// import { getI18n } from '@/ui/Locale';
import { getEngineBinPath, getSessionPath, transformConfig } from '../utils/path';

export default class Aria2 {
  static instance = null;

  constructor(options = {}) {
    this.options = options;

    // this.i18n = getI18n();
    this.systemConfig = options.systemConfig;
    this.userConfig = options.userConfig;
  }

  getStartSh() {
    const { platform } = process;
    let basePath = resolve(app.getAppPath(), '..');

    if (is.dev()) {
      basePath = resolve(__dirname, `../external/${platform}`);
    }

    const binName = getEngineBinPath(platform);
    if (!binName) {
      throw new Error('app.engine-damaged-message');
    }

    // const binName = 'aria2c';

    let binPath = join(basePath, `/engine/${binName}`);
    const binIsExist = existsSync(binPath);
    if (!binIsExist) {
      logger.error('[==== ice-speedy ====] engine bin is not exist===>', binPath);
      throw new Error('app.engine-missing-message');
    }

    let confPath = join(basePath, '/engine/aria2.conf');

    let sessionPath = this.userConfig['session-path'] || getSessionPath();
    const sessionIsExist = existsSync(sessionPath);

    let result = [`${binPath}`, `--conf-path=${confPath}`, `--save-session=${sessionPath}`];
    if (sessionIsExist) {
      result = [...result, `--input-file=${sessionPath}`];
    }

    const extraConfig = transformConfig(this.systemConfig);
    result = [...result, ...extraConfig];

    return result;
  }

  start() {
    const sh = this.getStartSh();
    logger.info('[==== ice-speedy ====] Engine start sh===>', sh);
    this.instance = forever.start(sh, {
      max: 10,
      parser: function(command, args) {
        return {
          command: command,
          args: args,
        };
      },
      silent: !is.dev(),
    });

    const { child } = this.instance;
    logger.info('[==== ice-speedy ====] Engine pid===>', child.pid);

    this.instance.on('error', err => {
      logger.info(`[==== ice-speedy ====] Engine error===> ${err}`);
    });

    this.instance.on('start', function(process, data) {
      logger.info(`[==== ice-speedy ====] Engine started===>`);
    });

    this.instance.on('stop', function(process) {
      logger.info(`[==== ice-speedy ====] Engine stopped===>`);
    });

    this.instance.on('restart', function(forever) {
      logger.info(`[==== ice-speedy ====] Engine exit===>`);
    });

    this.instance.on('exit:code', function(code) {
      logger.info(`[==== ice-speedy ====] Engine exit===> ${code}`);
    });

    // this.instance.on('stderr', (data) => {
    //   logger.info(`[==== ice-speedy ====] Engine stderr===> ${data}`)
    // })
  }

  isRunning(pid) {
    try {
      return process.kill(pid, 0);
    } catch (e) {
      return e.code === 'EPERM';
    }
  }

  stop() {
    const { pid } = this.instance.child;
    try {
      logger.info('[==== ice-speedy ====] Engine stopping===>');
      this.instance.stop();
    } catch (err) {
      logger.error('[==== ice-speedy ====] Engine stop fail===>', err.message);
      this.forceStop(pid);
    } finally {
    }
  }

  forceStop(pid) {
    try {
      if (pid && this.isRunning(pid)) {
        process.kill(pid);
      }
    } catch (err) {
      logger.warn('[==== ice-speedy ====] Engine forceStop fail===>', err);
    }
  }

  restart() {
    this.stop();
    this.start();
  }
}
