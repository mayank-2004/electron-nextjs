const { app, BrowserWindow, ipcMain, BrowserView } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

let win;
// let secondaryWindow;
// let homeWindow;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      enableRemoteModule: false,
    }
  });

  // if (app.isPackaged) {
  if (app.isPackaged && appServe) {
    appServe(win)
    win.loadURL("app://-");
  } else {
    win.loadURL("http://localhost:3000/");
    win.webContents.openDevTools();
  }
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});