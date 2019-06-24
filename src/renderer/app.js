// let ipcRenderer;
// let electron;
// if (window.require) {
//   electron = window.require('electron');
//   ipcRenderer = electron.ipcRenderer;
// }
const { ipcRenderer } = require('electron');

export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error(e.message);
    },
  },
  plugins: [require('dva-logger')()],
};
