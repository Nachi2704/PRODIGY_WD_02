let startTime = 0;
let running = false;
let timerInterval;
let laps = [];

const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / (1000 * 60));
    const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function startStop() {
    if (!running) {
        startTime = Date.now() - (startTime > 0 ? (Date.now() - startTime) : 0); // Handle resuming
        timerInterval = setInterval(updateDisplay, 10); // Update every 10ms for smoother timer
        startStopButton.textContent = "Stop";
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    running = false;
    startTime = 0;
    laps = []; // Clear laps
    lapsList.innerHTML = ''; // Clear displayed laps
}

function lap() {
    if (running) {
      const currentTime = Date.now() - startTime;
      laps.push(currentTime);
      const lapTime = formatTime(currentTime); // Helper function (see below)
      const lapItem = document.createElement('li');
      lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
      lapsList.appendChild(lapItem);
    }
}

// Helper function to format time (for laps)
function formatTime(ms) {
  const minutes = Math.floor(ms / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);