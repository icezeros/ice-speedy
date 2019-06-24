import url from 'url';
import path from 'path';
import { ipcMain, BrowserWindow } from 'electron';

const html = url.format({
  protocol: 'file:',
  pathname: path.join(__dirname, '../pages/window.html'),
  slashes: true,
});

const draghtml = url.format({
  protocol: 'file:',
  pathname: path.join(__dirname, '../pages/window_drag.html'),
  slashes: true,
});

const transhtml = url.format({
  protocol: 'file:',
  pathname: path.join(__dirname, '../pages/window_trans.html'),
  slashes: true,
});

export default function handleWindowMessage() {
  ipcMain.on('window-inited', (event, data) => {
    Object.assign(global, data);
  });

  ipcMain.on('window-close', (event, data) => {
    const mainWindow = BrowserWindow.fromId(global.mainId);
    mainWindow.close();
  });

  ipcMain.on('create-window', (event, data) => {
    global.application.windowManager.openWindow('creat-window', {
      window: {
        width: 800,
        height: 600,
      },
      url: 'http://www.baidu.com/',
    });
    // let win = new BrowserWindow({
    //   width: 800,
    //   height: 600,
    // });
    // win.on('close', () => {
    //   win = null;
    // });
    // win.loadURL('http://www.baidu.com/');
  });

  ipcMain.on('create-nobar-window', (event, data) => {
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
    });
    win.on('close', () => {
      win = null;
    });
    win.loadURL(html);
  });

  ipcMain.on('create-nobar-window-button', (event, data) => {
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      titleBarStyle: 'hidden',
    });
    win.on('close', () => {
      win = null;
    });
    win.loadURL(html);
  });

  ipcMain.on('create-nobar-window-drag', (event, data) => {
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      titleBarStyle: 'hidden',
    });
    win.on('close', () => {
      win = null;
    });
    win.loadURL(draghtml);
  });

  ipcMain.on('create-window-trans', (event, data) => {
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      transparent: true,
      frame: false,
      titleBarStyle: 'hidden',
    });
    win.on('close', () => {
      win = null;
    });
    win.loadURL(transhtml);
  });

  ipcMain.on('sync-render', (event, data) => {
    console.log(data);
    event.sender.send('main-msg', '主进程收到了渲染进程的【异步】消息！');
  });

  ipcMain.on('async-render', (event, data) => {
    console.log(data);
    event.returnValue = '主进程收到了渲染进程的【同步】消息！';
  });

  let i = 0;
  //   const mainWindow = BrowserWindow.fromId(global.mainId);
  const mainWindow = global.application.windowManager.getWindow('main');
  ipcMain.on('start-msg', (event, data) => {
    console.log('开始定时向渲染进程发送消息！');
    global.sendMsg = true;
  });

  ipcMain.on('end-msg', (event, data) => {
    console.log('结束向渲染进程发送消息！');
    global.sendMsg = false;
  });

  setInterval(() => {
    if (global.sendMsg) {
      mainWindow.webContents.send('main-msg', `ConardLi【${i++}】`);
    }
  }, 200);
}
