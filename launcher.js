const { app, ipcMain } = require("electron");
const electron = require(`electron`);
const { exec, spawn, fork } = require('child_process');

const { BrowserWindow, ipcRenderer, Menu } = electron;

var processVar;
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

    // a = spawn('cd D:\\accubits\\Electron\\PB\\core\\tagui && tagui D:\\accubits\\Electron\\PB\\core\\tagui\\amazon.tag', { detached: true });
    a = spawn("tagui", ['D:\\accubits\\Electron\\PB\\core\\tagui\\amazon.tag'], { detached: true, env: process.env.PATH }).on('error', function (err) { throw err; });
});

ipcMain.on('terminateProcess', (event) => {
    // a.kill("SIGINT");
    processVar.kill();
    console.log("Process Killed");
});
