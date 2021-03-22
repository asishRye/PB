const electron = require("electron");
const { ipcRenderer } = electron;
const runAutomation = document.getElementById("runAutomation");
const terminateAutomation = document.getElementById("terminateAutomation");

runAutomation.onclick = (e) => {
    // event.preventDefault();
    ipcRenderer.send("runEvent");
    console.log("Event running");
};

terminateAutomation.onclick = (e) => {
    // event.preventDefault();
    ipcRenderer.send("terminateProcess");
    console.log("Event terminating");
};