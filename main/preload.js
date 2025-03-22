const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => callback(...args));
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },
    openSettingWindow: () => {
        ipcRenderer.send("open-settings");
    },
    openHomeWindow: () => {
        ipcRenderer.send("open-home");
    },
});