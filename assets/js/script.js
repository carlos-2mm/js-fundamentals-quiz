// variables for the timer and score
var timerValue = 60;
var score = 0;
var currentQuestionIndex = 0;
var timerInterval;

// DOM elements
var timerElement = document.getElementById('timer');
var container = document.querySelector('.container');
var containerQuestions = document.querySelector('.container-q');
var containerQuizOver = document.querySelector('.container-qo');
var containerHighScores = document.querySelector('.container-hs');

// function to hide and show elements
function toggleDisplay(elements, display) {
  elements.forEach(element => {
    element.style.display = display;
  });
}

// function to start the timer and prepare the quiz
function startTimer() {
  updateTimerText();
  timerInterval = setInterval(decrementTimer, 1000);
  toggleDisplay([containerQuestions], 'block');
  toggleDisplay([containerQuizOver, containerHighScores], 'none');
}

// function to decrement the timer value each second
function decrementTimer() {
  timerValue--;
  if (timerValue <= 0) {
    endQuiz();
    updateTimerText("time's up!");
  } else {
    updateTimerText();
  }
}

// function to udate the timer display text
function updateTimerText(text) {
  timerElement.innerText = text || `time: ${timerValue} seconds`;
}

// event listener to start the timer on button click
var startButton = document.getElementById('start');
startButton.addEventListener('click', startTimer);

// array of quiz questions with their options and correct answer
var quizQuestions = [
  {
    question: 'how do you declare a JavaScript variable?',
    answers: ['var carName', 'v carName', 'var-carName', 'val carName'],
    correctAnswer: "var carName"
  },

  {
      question: 'which operator is used to assign a value to a variable?',
      answers: ['*', '-', '=', 'x'],
      correctAnswer: '='
    },

    {
      question: 'what will console.log(2 + "2") print?',
      answers: ['"4"', '4', '"22"', '22'],
      correctAnswer: '"22"'
    },
 
    {
      question: 'what will console.log(typeof null) print?',
      answers: ['"null"', '"object"', '"undefine"', '"NaN"'],
      correctAnswer: '"object"'
    },

    {
      question: 'how to write an "if" statement for executing some code if "i" is NOT equal to 5?',
      answers: ['if i =! 5 then', 'if i <> 5', 'if (i <> 5)', 'if (i != 5)'],
      correctAnswer: 'if (i != 5)'
    },
];

// function to display the current question and its answer options
function displayQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  var questionTextElement = document.getElementById('questionText');
  var answerOptionsElement = document.getElementById('answerOptions');
  questionTextElement.textContent = currentQuestion.question;
  answerOptionsElement.innerHTML = '';
  currentQuestion.answers.forEach(function (answer) {
    var answerButton = document.createElement('button');
    answerButton.textContent = answer;
    answerButton.addEventListener('click', function () {
      checkAnswer(answer);
    });
    answerOptionsElement.appendChild(answerButton);
  });
}

// function to check the selected answer and display the response
function checkAnswer(selectedAnswer) {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  var responseElement = document.getElementById('response');
  if (selectedAnswer === currentQuestion.correctAnswer) {
    responseElement.textContent = 'correct!';
    score += 10;
  } else {
    responseElement.textContent = 'wrong!';
    timerValue -= 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    setTimeout(function () {
      responseElement.textContent = '';
      displayQuestion();
    }, 1000);
  } else {
    setTimeout(endQuiz, 1000);
  }
}

// function to end the quiz and update the final score
function endQuiz() {
  clearInterval(timerInterval);
  toggleDisplay([containerQuizOver], 'block');
  toggleDisplay([containerQuestions], 'none');
  score += timerValue;
  document.getElementById('finalScore').textContent = 'your final score: ' + score;
}

// event listener to start displaying questions on button click
startButton.addEventListener('click', function () {
  toggleDisplay([container], 'none');
  displayQuestion();
});

// function to display high scores
function showHighScores() {
  var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.sort((a, b) => b.score - a.score);
  var highScoresList = document.getElementById('highScoresList');
  highScoresList.innerHTML = '';
  highScores.forEach((entry) => {
    var li = document.createElement('li');
    li.textContent = `${entry.initials}: ${entry.score}`;
    highScoresList.appendChild(li);
  });
}

// event listener to update the high scores on window load
window.addEventListener('load', showHighScores);

// event listener to save the user's score when submit button is clicked
var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  var initialsInput = document.getElementById('initialsInput');
  var initials = initialsInput.value.trim().toUpperCase();
  if (initials !== '') {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    var newScore = { score: score, initials: initials };
    highScores.push(newScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    initialsInput.value = '';
    showHighScores();
    toggleDisplay([containerQuizOver], 'none');
    toggleDisplay([containerHighScores], 'block');
  }
});

// event listeners to go back to the start and to clear the high scores
var goBackButton = document.getElementById('goBackButton');
var clearHighScoresButton = document.getElementById('clearHighScoresButton');

goBackButton.addEventListener('click', function() {
  toggleDisplay([containerHighScores], 'none');
  toggleDisplay([container], 'block');
  resetQuiz();
});

clearHighScoresButton.addEventListener('click', function() {
  localStorage.removeItem('highScores');
  var highScoresList = document.getElementById('highScoresList');
  highScoresList.innerHTML = '';
});

// event listener to view the high scores
var viewHighScoresLink = document.querySelector('a[href="#scores"]');
viewHighScoresLink.addEventListener('click', function(event) {
  event.preventDefault();
  toggleDisplay([containerHighScores], 'block');
  toggleDisplay([container, containerQuestions, containerQuizOver], 'none');
  document.getElementById('scores').scrollIntoView();
});

// function to reset the quiz to its initial state
function resetQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  timerValue = 60;
  updateTimerText();
}
