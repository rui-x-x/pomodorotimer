document.addEventListener('DOMContentLoaded', () => {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    const pomodoroModeButton = document.getElementById('pomodoro-mode');
    const shortBreakModeButton = document.getElementById('short-break-mode');
    const longBreakModeButton = document.getElementById('long-break-mode');
    const pomodoroCountDisplay = document.getElementById('count');
    const alarmSound = document.getElementById('alarm-sound');

    let timer;
    let timeLeft;
    let currentMode = 'pomodoro';
    let pomodoroCount = 0;

    const pomodoroTime = 25 * 60; // 25 minutes
    const shortBreakTime = 5 * 60; // 5 minutes
    const longBreakTime = 15 * 60; // 15 minutes

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                alarmSound.play();
                if (currentMode === 'pomodoro') {
                    pomodoroCount++;
                    pomodoroCountDisplay.textContent = pomodoroCount;
                    if (pomodoroCount % 4 === 0) {
                        setMode('long-break');
                    } else {
                        setMode('short-break');
                    }
                } else {
                    setMode('pomodoro');
                }
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
    }

    function resetTimer() {
        pauseTimer();
        setMode(currentMode); // Reset to current mode's default time
    }

    function setMode(mode) {
        currentMode = mode;
        document.querySelectorAll('.mode-button').forEach(button => {
            button.classList.remove('active');
        });

        switch (mode) {
            case 'pomodoro':
                timeLeft = pomodoroTime;
                pomodoroModeButton.classList.add('active');
                break;
            case 'short-break':
                timeLeft = shortBreakTime;
                shortBreakModeButton.classList.add('active');
                break;
            case 'long-break':
                timeLeft = longBreakTime;
                longBreakModeButton.classList.add('active');
                break;
        }
        updateDisplay();
    }

    // Event Listeners
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    pomodoroModeButton.addEventListener('click', () => setMode('pomodoro'));
    shortBreakModeButton.addEventListener('click', () => setMode('short-break'));
    longBreakModeButton.addEventListener('click', () => setMode('long-break'));

    // Initial setup
    setMode('pomodoro');
});
