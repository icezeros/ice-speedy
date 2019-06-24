import { app } from 'electron';
import is from 'electron-is';
import {
  getDhtPath,
  getLogPath,
  getSessionPath,
  getUserDownloadsPath,
} from '../utils/path';

export default {
  system: {
    name: 'system',
    defaults: {
      continue: true,
      'dht-file-path': getDhtPath(4),
      'dht-file-path6': getDhtPath(6),
      dir: getUserDownloadsPath(),
      'max-concurrent-downloads': 5,
      'max-connection-per-server': is.macOS() ? 64 : 16,
      'max-download-limit': 0,
      'max-overall-download-limit': 0,
      'max-overall-upload-limit': '128K',
      'min-split-size': '1M',
      pause: true,
      'rpc-listen-port': 16800,
      'rpc-secret': '',
      'seed-time': 60,
      split: 16,
      'user-agent': 'Transmission/2.94',
    },
  },
  user: {
    name: 'user',
    defaults: {
      'all-proxy-backup': '',
      'auto-check-update': is.macOS(),
      'hide-app-menu': is.windows() || is.linux(),
      'last-check-update-time': 0,
      locale: app.getLocale(),
      'log-path': getLogPath(),
      'new-task-show-downloading': true,
      'open-at-login': false,
      protocols: { magnet: true, thunder: false },
      'resume-all-when-app-launched': false,
      'keep-window-state': false,
      'session-path': getSessionPath(),
      'task-notification': true,
      theme: 'auto',
      'update-channel': 'latest',
      'use-proxy': false,
      'window-state': {},
    },
  },
};
