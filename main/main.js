const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

let win;
let secondaryWindow;
let homeWindow;

// create main window
const createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      enableRemoteModule: false,
    }
  });

  if (app.isPackaged) {
     appServe(win).then(() => {
       win.loadURL("app://-");
     });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  }
}


let createSecondaryWindow = () => {
  if (secondaryWindow) return;  // will prevent multiple windows

  secondaryWindow = new BrowserWindow({
    width: 700,
    height: 600,
    title: "settings",
    parent: win,
    model: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration:false,
      webSecurity: true,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  secondaryWindow.on("closed", () => {
    secondaryWindow = null;
  });

  if (app.isPackaged) {
    appServe(secondaryWindow).then(() => {
      secondaryWindow.loadURL("app://-/settings");
    });
  } else {
    secondaryWindow.loadURL("http://localhost:3000/settings");
    };
  }

  const createHomeWindow = () => {
    if (homeWindow) return;  // will prevent multiple windows
  
    homeWindow = new BrowserWindow({
      width: 700,
      height: 600,
      title: "Home",
      parent: win,
      model: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration:false,
        webSecurity: true,
        contextIsolation: true,
        enableRemoteModule: false,
      },
    });
  
    homeWindow.on("closed", () => {
      homeWindow = null;
    });
    if (app.isPackaged) {
      appServe(homeWindow).then(() => {
        homeWindow.loadURL("app://-/Home");
      });
    } else {
      homeWindow.loadURL("http://localhost:3000/Home");
      };
    }

app.on("ready", () => {
  createWindow();
  ipcMain.on("open-settings", () => {
    createSecondaryWindow();
  });

  ipcMain.on("open-home", () => {
    createHomeWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});