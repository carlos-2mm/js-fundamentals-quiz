// variables for the timer
var timerValue = 60;
var timerInterval;

var timerElement = document.getElementById('timer');

// function to start the timer
function startTimer() {
  timerElement.innerText = 'time: ' + (timerValue) + ' seconds';

  timerInterval = setInterval(function() {
    timerValue--;

    if (timerValue <= 0) {
      clearInterval(timerInterval);
      timerElement.innerText = "time's up!";
    } else {
      timerElement.innerText = 'time: ' + (timerValue) + ' seconds';
    }
  }, 1000);
}

// event listener to start the timer when the "start quiz" button is clicked
var startButton = document.getElementById('start');
startButton.addEventListener('click', startTimer);

