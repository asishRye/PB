const { app, ipcMain } = require("electron");
const electron = require(`electron`);
const { exec, spawn, fork } = require('child_process');
const { BrowserWindow, ipcRenderer, Menu } = electron;

var childProcess;
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
    console.log(process.cwd());
    // a = spawn('cd D:\\accubits\\Electron\\PB\\core\\tagui && tagui D:\\accubits\\Electron\\PB\\core\\tagui\\amazon.tag', { detached: true });
    childProcess = exec("tagui D:\\accubits\\Electron\\PB\\core\\tagui\\amazon.tag", { cwd: 'D:\\accubits\\Electron\\PB\\cache' }).on('error', function (err) { throw err; });
});

ipcMain.on('terminateProcess', (event) => {
    // a.kill("SIGINT");
    process.kill(childProcess.pid);
    console.log("Process Killed");
    cleanAll = exec("C:\\tagui\\src\\end_processes.cmd");
});
