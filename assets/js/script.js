// variables for the timer and score
var timerValue = 60;
var timerInterval;
var score = 0;

var timerElement = document.getElementById('timer');
var scoreElement = document.getElementById('scores');

// function to start the timer
function startTimer() {

  timerElement.innerText = 'time: ' + (timerValue) + ' seconds';
  timerInterval = setInterval(function() {
    timerValue--;

    if (timerValue <= 0) {
      clearInterval(timerInterval);
      timerElement.innerText = "time's up!";
      endQuiz();
    } else {
      timerElement.innerText = 'time: ' + (timerValue) + ' seconds';
    }
  }, 1000);

  // Show the container-q, container-qo, and container hs elements
    document.querySelector('.container-q').style.display = 'block';
    document.querySelector('.container-qo').style.display = 'none';
    document.querySelector('.container-hs').style.display = 'none';
}

// event listener to start the timer when the "start quiz" button is clicked
var startButton = document.getElementById('start');
startButton.addEventListener('click', startTimer);


// array of quiz questions and their corresponding answer options
var quizQuestions = [
    {
      question: 'commonly used data types DO NOT include:',
      answers: ['strings', 'booleans', 'alerts', 'numbers'],
      correctAnswer: "alerts"
    },

    {
        question: 'the condition in an if/else statement is enclosed with ___________.',
        answers: ['parenthesis', 'curly brackets', 'quotes', 'square brackets'],
        correctAnswer: 'parenthesis'
      },

      {
        question: 'arrays in JavaScript can be used to store ___________.',
        answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer: 'all of the above'
      },
   
      {
        question: 'strings values must be enclosed within ___________ when being assigned to variables',
        answers: ['quotes', 'curly brackets', 'comma', 'parenthesis'],
        correctAnswer: 'quotes'
      },

      {
        question: 'a very useful tool used during development and debugging for printing content to the debugger is',
        answers: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: 'console.log'
      },
  ];

  var currentQuestionIndex = 0;
  
  // function to display the current question and its answer options
  function displayQuestion() {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var questionTextElement = document.getElementById('questionText');
    var answerOptionsElement = document.getElementById('answerOptions');
  
    // display the question text
    questionTextElement.textContent = currentQuestion.question;
  
    answerOptionsElement.innerHTML = '';
  
    // create the answer option buttons
    currentQuestion.answers.forEach(function (answer) {
      var answerButton = document.createElement('button');
      answerButton.textContent = answer;
      answerButton.addEventListener('click', function () {
        checkAnswer(answer);
      });
      answerOptionsElement.appendChild(answerButton);
    });
  }
  
  // function to check the selected answer and show the response
  function checkAnswer(selectedAnswer) {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var responseElement = document.getElementById('response');
  
    // check if the selected answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      responseElement.textContent = 'correct!';
      score += 10;
    } else {
      responseElement.textContent = 'wrong!';
      timerValue -= 10;
    }

  
  
    // move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      setTimeout(function () {
        responseElement.textContent = '';
        displayQuestion();
      }, 1000);
    } else {
      // display the quiz over message
      setTimeout(function () {
        endQuiz();
      }, 1000);
    }
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    document.querySelector('.container-q').style.display = 'none';
    document.querySelector('.container-qo').style.display = 'block';
    score += timerValue;
    document.getElementById('finalScore').textContent = 'your final score: ' + score;
  }
  
  // event listener to start the quiz
  var startButton = document.getElementById('start');
  startButton.addEventListener('click', function () {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.container-q').style.display = 'block';
    displayQuestion();
  });

// function to show high scores
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

// call showHighScores when the page loads
window.addEventListener('load', showHighScores);

var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function() {
  var initialsInput = document.getElementById('initialsInput');
  var initials = initialsInput.value.trim().toUpperCase(); // Convert to uppercase

  if (initials !== '') {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    var newScore = {
      score: score,
      initials: initials
    };

    highScores.push(newScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    initialsInput.value = '';
    showHighScores();  // Call your showHighScores function here to update the displayed high scores
    document.querySelector('.container-qo').style.display = 'none';
    
    // Show the high scores container
    document.querySelector('.container-hs').style.display = 'block';
  }
});

submitButton.addEventListener('click', function(event) {
  event.preventDefault();
});

var goBackButton = document.getElementById('goBackButton');
var clearHighScoresButton = document.getElementById('clearHighScoresButton');

goBackButton.addEventListener('click', function() {
  // Ocultar la sección de puntuaciones altas
  document.querySelector('.container-hs').style.display = 'none';

  // Mostrar la sección de inicio
  document.querySelector('.container').style.display = 'block';

  // También puedes querer resetear el estado del cuestionario
  // como el puntaje, el índice de la pregunta actual, etc.
  score = 0;
  currentQuestionIndex = 0;
  timerValue = 60;
  document.getElementById('timer').innerText = 'time: ' + timerValue + ' seconds';
  // Aquí el código para manejar el click de "go back"
});

clearHighScoresButton.addEventListener('click', function() {
  localStorage.removeItem('highScores');

  // Borrar las puntuaciones altas de la lista en la pantalla
  var highScoresList = document.getElementById('highScoresList');
  highScoresList.innerHTML = '';
  // Aquí el código para manejar el click de "clear high scores"
});