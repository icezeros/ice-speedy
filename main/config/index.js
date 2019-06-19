import init from './init';
const Store = require('electron-store');
export default class ConfigManager {
  constructor() {
    this.systemConfig = {};
    this.userConfig = {};
    this.init();
  }

  init() {
    this.systemConfig = new Store(init.system);
    this.userConfig = new Store(init.user);
  }

  fixUserConfig() {
    const openAtLogin = app.getLoginItemSettings().openAtLogin;
    if (this.getUserConfig('open-at-login') !== openAtLogin) {
      this.setUserConfig('open-at-login', openAtLogin);
    }
  }

  getSystemConfig(key, defaultValue) {
    if (typeof key === 'undefined' && typeof defaultValue === 'undefined') {
      return this.systemConfig.store;
    }

    return this.systemConfig.get(key, defaultValue);
  }

  getUserConfig(key, defaultValue) {
    if (typeof key === 'undefined' && typeof defaultValue === 'undefined') {
      return this.userConfig.store;
    }

    return this.userConfig.get(key, defaultValue);
  }

  getLocale() {
    return this.getUserConfig('locale') || app.getLocale();
  }

  setSystemConfig(...args) {
    this.systemConfig.set(...args);
  }

  setUserConfig(...args) {
    this.userConfig.set(...args);
  }

  reset() {
    this.systemConfig.clear();
    this.userConfig.clear();
  }
}
