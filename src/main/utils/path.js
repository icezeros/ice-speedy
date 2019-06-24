import { app } from 'electron';
import is from 'electron-is';
import { resolve } from 'path';
import { existsSync, lstatSync } from 'fs';
import logger from '../logger';
import engineBin from '../config/engine';

export function getLogPath() {
  return logger.transports.file.file;
}

export function getDhtPath(protocol) {
  const name = protocol === 6 ? 'dht6.dat' : 'dht.dat';
  return resolve(app.getPath('userData'), `./${name}`);
}

export function getUserDownloadsPath() {
  return app.getPath('downloads');
}

export function getSessionPath() {
  return resolve(app.getPath('userData'), './download.session');
}

export function getEngineBinPath(platform) {
  let result = engineBin.hasOwnProperty(platform) ? engineBin[platform] : '';
  return result;
}
export function transformConfig(config) {
  let result = [];
  for (const [k, v] of Object.entries(config)) {
    if (v !== '') {
      result.push(`--${k}=${v}`);
    }
  }
  return result;
}
