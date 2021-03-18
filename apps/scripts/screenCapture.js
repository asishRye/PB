const { desktopCapturer, remote } = require('electron');
const { writeFile } = require('fs');
const { dialog, Menu } = remote;

let mediaRecorder;

var recordedChunks = [];

const videoElement = document.querySelector("video");
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.onclick = e => {
    mediaRecorder.start();
    startButton.classList.remove('btn-succes');
    startButton.classList.add('btn-danger');
    startButton.innerText = 'Recording';
};

stopButton.onclick = e => {
    mediaRecorder.stop();
    startButton.classList.remove('btn-danger');
    startButton.classList.add('btn-success');
    startButton.innerText = 'Start Recording';
};


const videoSelectButton = document.getElementById('videoSelectButton');

videoSelectButton.onclick = getVideoSources;

async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });
    const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map(source => {
            return {
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );

    videoOptionsMenu.popup();

}

async function selectSource(source) {
    console.log(source);
    videoSelectButton.innerText = source.name;
    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.play();


    const options = {
        mimeType: 'video/webm;codecs=vp9'
    };
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
}

function handleDataAvailable(e) {
    console.log('video data available');
    recordedChunks.push(e.data);
}


async function handleStop(e) {
    const blob = new Blob(recordedChunks, {
        type: 'video/webm;codecs=vp9'
    });
    const buffer = Buffer.from(await blob.arrayBuffer());
    const { filePath } = await dialog.showSaveDialog({
        buttonLabel: 'Save Video',
        defaultPath: `vid-${Date.now()}.webm`
    });

    if (filePath) {
        writeFile(filePath, buffer, () => {
            console.log("File saved successfully");
        });
    }
}