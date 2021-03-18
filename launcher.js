const { app, ipcMain } = require("electron");
const electron = require(`electron`);
const exec = require('child_process').exec;

const { BrowserWindow, ipcRenderer, Menu } = electron;

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true

        }
    });
    mainWindow.loadURL(`file://${__dirname}/apps/index.html`);
});

ipcMain.on('runEvent', (event) => {
    console.log("Event caught");

    exec('cd D:\\accubits\\Electron\\PB\\core\\tagui && tagui D:\\accubits\\Electron\\PB\\core\\tagui\\amazon.tag ', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(err);
        console.log(stderr);
    });
});