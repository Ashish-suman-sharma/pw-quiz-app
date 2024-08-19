const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    answer: "Harper Lee",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    answer: "Au",
  },
  {
    question: "What year did the Titanic sink?",
    options: ["1912", "1905", "1918", "1920"],
    answer: "1912",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: "Diamond",
  },
  {
    question: "In which country would you find the Great Barrier Reef?",
    options: ["Australia", "South Africa", "Mexico", "Brazil"],
    answer: "Australia",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const questionNumber = document.getElementById("question-number");

  questionContainer.textContent = question.question;

  optionsContainer.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className =
      "w-full p-2 mb-2 text-left border border-gray-300 rounded";
    button.onclick = () => checkAnswer(option, button);
    optionsContainer.appendChild(button);
  });

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
}

function checkAnswer(selectedOption, button) {
  const question = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll("#options-container button");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === question.answer) {
      btn.classList.add("correct");
    } else if (btn === button) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedOption === question.answer) {
    score++;
  }

  document.getElementById("score-container").textContent = `Score: ${score}`;
  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    document.getElementById("next-btn").classList.add("hidden");
  } else {
    document.getElementById("quiz-container").innerHTML = `
            <h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p class="text-lg mb-4">Your final score is ${score} out of ${questions.length}.</p>
            <button id="restart-btn" class="bg-green-500 text-white px-4 py-2 rounded" onclick="restartQuiz()">Restart Quiz</button>
        `;
  }
}

function restartQuiz() {
  // Reset the quiz state
  score = 0;
  currentQuestionIndex = 0;

  // Update the UI
  document.getElementById("score-container").textContent = `Score: ${score}`;
  document.getElementById("question-container").innerHTML = '';
  document.getElementById("options-container").innerHTML = '';
  document.getElementById("question-number").textContent = '';

  // Hide the restart button and show the next button
  document.getElementById("restart-btn").classList.add("hidden");
  document.getElementById("next-btn").classList.remove("hidden");

  // Show the first question
  showQuestion();
}

showQuestion();
