var questions = [
  {
    question: "Which is not a type of data?",
    choices: ["strings", "numbers", "binaries", "booleans"],
    answer: "binaries",
  },
  {
    question: "An object can be composed of what?",
    choices: ["strings", "numbers", "arrays", "all of the above"],
    answer: "all of the above"
  },
  {
    question: "What does DOM stand for?",
    choices: ["Document Object Module", "Document Object Model", "Direct Object Multiples", "Direct Object Model"],
    answer: "Document Object Model"
  },
  {
    question: "Conditional statements do NOT include:",
    choices: ["if", "else if", "else", "otherwise"],
    answer: "otherwise"
  },
  {
    question: "In a function, a parameter:",
    choices: ["behaves as a local variable", "is a global variable", "sets a limit on the use of the function", "limits the argument"],
    answer: "behaves as a local variable"
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var startButton = document.getElementById("startBtn");
var startPage = document.getElementById("startPg");
var quizPage = document.getElementById("quizPg");

var questionIndex = 0;
var correctCount = 0;
var time = 60;
var intervalId;

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body
  body.innerHTML = "Game over, You scored " + correctCount;
  setTimeout(showHighScore, 2);
}

function showHighScore() {
  var name = prompt("Please enter your name");

  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  high_scores.push({ name: name, score: correctCount });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var contentUL = document.createElement("ul");

  for (var i = 0; i < high_scores.length; i++) {
    var contentLI = document.createElement("li");
    contentLI.textContent =
      "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
    contentUL.appendChild(contentLI);
  }

  document.body.appendChild(contentUL);
}

function updateTime() {
  time--;
  timerEl.textContent = "Time: " + time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = "Time: " + time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

startButton.addEventListener("click", function () {
  quizPage.classList.remove("d-none");
  startPage.classList.add("d-none");
  renderQuestion();
})




optionListEl.addEventListener("click", checkAnswer);
