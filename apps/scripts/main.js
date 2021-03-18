const electron = require("electron");
const { ipcRenderer } = electron;
const runAutomation = document.getElementById("runAutomation");

runAutomation.onclick = (e) => {
    // event.preventDefault();
    ipcRenderer.send("runEvent");
    console.log("Something happened");
};