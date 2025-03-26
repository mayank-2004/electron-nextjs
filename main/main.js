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

  // if (app.isPackaged) {
  if (app.isPackaged && appServe) {
    appServe(win)
    win.loadURL("app://-");
  } else {
    win.loadURL("http://localhost:3000/");
    win.webContents.openDevTools();
  }
}

// let createSecondaryWindow = () => {
//   if (secondaryWindow) return;  // will prevent multiple windows

//   secondaryWindow = new BrowserWindow({
//     width: 700,
//     height: 600,
//     title: "settings",
//     parent: win,
//     model: true,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration:false,
//       webSecurity: true,
//       contextIsolation: true,
//       enableRemoteModule: false,
//     },
//   });

// secondaryWindow.on("closed", () => {
//   secondaryWindow = null;
// });

// if (app.isPackaged) {
//   appServe(secondaryWindow).then(() => {
//     secondaryWindow.loadURL("app://-/settings");
//   });
// } else {
//   secondaryWindow.loadURL("http://localhost:3000/settings");
//   };
// }

// const createHomeWindow = () => {
//   if (homeWindow) return;  // will prevent multiple windows

//   homeWindow = new BrowserWindow({
//     width: 700,
//     height: 600,
//     title: "Home",
//     parent: win,
//     model: true,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration:false,
//       webSecurity: true,
//       contextIsolation: true,
//       enableRemoteModule: false,
//     },
//   });

//   homeWindow.on("closed", () => {
//     homeWindow = null;
//   });
//   if (app.isPackaged) {
//     appServe(homeWindow).then(() => {
//       homeWindow.loadURL("app://-/Home");
//     });
//   } else {
//     homeWindow.loadURL("http://localhost:3000/Home");
//     };
//   }

app.on("ready", () => {
  createWindow();

  // Create first frame (left panel)
  // const leftView = new BrowserView();
  // win.setBrowserView(leftView);
  // leftView.setBounds({ x: 0, y: 0, width: 400, height: 800 });
  // // leftView.webContents.loadURL('http://localhost:3000/');

  // Create second frame (middle panel)
  // const middleView = new BrowserView();
  // win.addBrowserView(middleView);
  // middleView.setBounds({ x: 200, y: 0, width: 800, height: 800 });
  // middleView.webContents.loadURL('http://localhost:3000/settings');

  // Create second frame (right panel)
  // const rightView = new BrowserView();
  // win.addBrowserView(rightView);
  // rightView.setBounds({ x: 800, y: 300, width: 800, height: 800 });
  // rightView.webContents.loadURL('http://localhost:3000/Home');

  //   ipcMain.on("open-settings", () => {
  //     createSecondaryWindow();
  //   });

  //   ipcMain.on("open-home", () => {
  //     createHomeWindow();
  //   });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});