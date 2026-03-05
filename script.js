
const minimizeBtn = document.getElementById('minimize-btn');
const closeBtn = document.getElementById('close-btn');

if (typeof require !== 'undefined') {
   
    const { ipcRenderer } = require('electron');
    
    minimizeBtn.addEventListener('click', () => {
        ipcRenderer.send('minimize-app');   
    });

 closeBtn.addEventListener('click', () => { 
    clickSound.play();
    clickSound.onended = () => ipcRenderer.send('close-app');
});

} else {
    console.log("Running in Chrome! Buttons are in web-display mode.");
    
    minimizeBtn.addEventListener('click', () => {
        alert("You are viewing the web version! Download the desktop app to minimize.");
    });

    closeBtn.addEventListener('click', () => {
        alert("You are viewing the web version! Close this browser tab to exit.");
    });
}


const startScreen = document.getElementById('start-screen');
const selectionScreen = document.getElementById('selection-screen'); 
const timerScreen = document.getElementById('timer-screen');

const startBtn = document.getElementById('start-button');
const timerDisplay = document.getElementById('time-display'); 

const softEggButton = document.getElementById('soft-egg-btn');
const poachedEggButton = document.getElementById('poached-egg-btn');

let countdownInterval;

function showScreen(screenToShow) {
    startScreen.classList.remove('active');
    selectionScreen.classList.remove('active');
    timerScreen.classList.remove('active');
    
    screenToShow.classList.add('active');
}

startBtn.addEventListener('click', () => {
    showScreen(selectionScreen);
});

function startTimer(totalSeconds) {
    showScreen(timerScreen);
    clearInterval(countdownInterval); 
    
    let remainingSeconds = totalSeconds;
    
    updateDisplay(remainingSeconds);
    
    countdownInterval = setInterval(() => {
        remainingSeconds--; 
        updateDisplay(remainingSeconds); 
        
        if (remainingSeconds <= 0) {
            clearInterval(countdownInterval); 
            alert('Time is up! Your egg is ready!'); 
            showScreen(startScreen); 
        }
    }, 1000); 
}

function updateDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

if (softEggButton) {
    softEggButton.addEventListener('click', () => {
        const time = parseInt(softEggButton.getAttribute('data-time'));
        startTimer(time);
    });
}

if (poachedEggButton) {
    poachedEggButton.addEventListener('click', () => {
        const time = parseInt(poachedEggButton.getAttribute('data-time'));
        startTimer(time);
    });
}

const buttons = document.querySelectorAll('.sound-btn');
const clickSound = new Audio('sound/click-sound.mp3');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});