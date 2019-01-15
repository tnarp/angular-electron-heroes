import {app, BrowserWindow, screen} from 'electron';

let window;

function createWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({x: 0, y: 0, width: size.width, height: size.height});
  window.loadURL(`file://${__dirname}/dist/angular-election-heroes/index.html`);
  window.webContents.openDevTools();
  window.on('closed', () => {
    window = null;
  });
}

try {
  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (window === null) {
      createWindow();
    }
  });
} catch (e) {
  console.log(e);
}
