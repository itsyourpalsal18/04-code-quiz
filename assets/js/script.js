const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitBtn = document.getElementById('submit-score');
const timerDisplay = document.getElementById('time-left');

let currentQuestion = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;

const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HyperText Markdown Language", "Hyperloop Machine Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    choices: ["//", "<!-- -->", "#", "/* */"],
    answer: "//"
  },
  {
    question: "Which of the following is a JavaScript data type?",
    choices: ["String", "Float", "Char", "Int"],
    answer: "String"
  }
];

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  startScreen.classList.add('hide');
  questionScreen.classList.remove('hide');
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  choicesContainer.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', checkAnswer);
    choicesContainer.appendChild(btn);
  });
}

function checkAnswer(e) {
  const selected = e.target.textContent;
  if (selected === questions[currentQuestion].answer) {
    score++;
  } else {
    timeLeft -= 10;
  }

  currentQuestion++;
  if (currentQuestion >= questions.length || timeLeft <= 0) {
    endQuiz();
  } else {
    showQuestion();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  questionScreen.classList.add('hide');
  endScreen.classList.remove('hide');
  const percentScore = Math.round((score / questions.length) * 100);
  finalScore.textContent = `${percentScore} / 100`;
}

submitBtn.addEventListener('click', () => {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ initials, score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
    alert("Score saved!");
  }
});