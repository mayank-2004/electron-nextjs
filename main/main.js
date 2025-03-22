const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

let win;
let secondaryWindow;

// create main window
const createWindow = async () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (app.isPackaged) {
    await appServe(win);
    win.loadURL("app://-");
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
}


let createSecondaryWindow = () => {
  if (secondaryWindow) return;  // will prevent multiple windows

  secondaryWindow = new BrowserWindow({
    width: 600,
    height: 400,
    parent: win,
    modal: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
  });

  secondaryWindow.loadURL("http://localhost:3000/open-settings");

  secondaryWindow.on("closed", () => {
    secondaryWindow = null;
  });
}

ipcMain.on("open-settings", () => {
  console.log("opening secondary window");
  createSecondaryWindow();
});

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});