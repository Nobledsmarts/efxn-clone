//circle start
let progressBar = document.querySelector(".e-c-progress");
let indicator = document.getElementById("e-indicator");
let pointer = document.getElementById("e-pointer");
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
    var offset = -length - (length * value) / timePercent;
    progressBar.style.strokeDashoffset = offset;
    pointer.style.transform = `rotate(${(360 * value) / timePercent}deg)`;
}

//circle ends
const displayOutput = document.querySelector(".display-remain-time");
const pauseBtn = document.getElementById("pause");
const setterBtns = document.querySelectorAll("button[data-setter]");

let intervalTimer;
let timeLeft;
let wholeTime = 10; // manage this to set the whole time
let isPaused = false;
let isStarted = false;

update(wholeTime, wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);

function changeWholeTime(seconds) {
    if (wholeTime + seconds > 0) {
        wholeTime += seconds;
        update(wholeTime, wholeTime);
    } 
}



function countdown(seconds) {
    intervalTimer = setInterval(_ => {
        timeLeft = --seconds;
        if (seconds < 1) {
            reset();
            displayTimeLeft(timeLeft);
            countdown(wholeTime + 1);
            return;
        }
        displayTimeLeft(timeLeft);
    }, 600);
}
function start() {
    isStarted = true;
    countdown(wholeTime + 1);
}
function reset(){
    isStarted = false;
    clearInterval(intervalTimer);
    displayTimeLeft(wholeTime, wholeTime);
}

function displayTimeLeft(timeLeft) {
    let displayString = `${timeLeft < 10 ? "0" : ""}${timeLeft}`;
    displayOutput.textContent = displayString;
    update(timeLeft, wholeTime);
}

const timer = {
    
    start,
    reset,
}
// start();