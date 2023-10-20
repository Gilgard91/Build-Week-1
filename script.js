document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("agree");
  const submitButton = document.getElementById("proceed");
  console.log(checkbox);
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("active");
    } else {
      submitButton.setAttribute("disabled", "disabled");
      submitButton.classList.remove("active");
    }
  });

  submitButton.onclick = function () {
    selectDifficulty();
    const selectButton = document.querySelector(".select-button");
    selectButton.onclick = function () {
      const selectedDifficulty = document.querySelector(".custom-select").value;
      sessionStorage.setItem("difficulty", selectedDifficulty);
      window.location.href = "/questions.html";
    };
  };
});

const selectDifficulty = function () {
  const difficulty = document.createElement("select");
  const content = document.querySelector(".content");
  content.setAttribute("id", "difficulty-div");
  content.innerHTML = "";
  difficulty.innerHTML =
    "<option value='easy'>Easy</option> <option value='medium'>Medium</option> <option value='hard'>Hard</option>";
  difficulty.classList.add("custom-select");
  const h1Difficulty = document.createElement("h1");
  h1Difficulty.setAttribute("id", "h1-difficulty");
  h1Difficulty.innerText = "Please choose the difficulty:";
  content.appendChild(h1Difficulty);
  content.appendChild(difficulty);
  const submitButton = document.createElement("button");
  submitButton.innerText = "START";
  submitButton.setAttribute("id", "proceed");
  submitButton.classList.add("active");
  submitButton.classList.add("select-button");
  const submitButtonDiv = document.createElement("div");
  submitButtonDiv.setAttribute("id", "difficulty-button-div");
  submitButtonDiv.appendChild(submitButton);
  content.appendChild(submitButtonDiv);
  document
    .getElementById("main-content")
    .classList.add("main-content-difficulty");
  document.getElementsByTagName("nav")[0].setAttribute("id", "nav-difficulty");
};

// QUESTIONS PAGE

let questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

window.onload = async function () {
  hideContent();
  const difficulty = sessionStorage.getItem("difficulty");
  const jsonDomande = await pullQuestions(difficulty);
  if (jsonDomande.response_code == 0) {
    questions = jsonDomande.results;
  }
  start();
};

const pullQuestions = async function (difficulty) {
  const fetchDomande = await fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=" + difficulty
  );
  const jsonDomande = await fetchDomande.json();
  return jsonDomande;
};

const formatText = function (text) {
  console.log(text);
  const rules = [
    { expression: /&quot;/g, replacement: '"' },
    { expression: /&#039;/g, replacement: "'" },
    { expression: /&lt;/g, replacement: "<" },
    { expression: /&gt;/g, replacement: ">" },
    { expression: /&amp;/g, replacement: "&" },
  ];

  let result;
  rules.forEach((rule) => {
    result = text.replaceAll(rule.expression, rule.replacement);
  });
  console.log(result);
  return result;
};

const hideContent = function () {
  document.getElementById("results-div").style.display = "none";
  document.getElementById("correct-div").style.display = "none";
  document.getElementById("wrong-div").style.display = "none";
  document.getElementById("rateus-button").style.display = "none";
  document.getElementById("result-text-div").style.display = "none";
  let mainContent = document.getElementById("box-domanda");
  mainContent.innerHTML = "";
};

let result = 0; //variabile che aumenta di 1 ad ogni risposta corretta
let timerInterval = null; //salvo la variabile per utilizzarla come parametro di clearInterval
let selectedAnswer = null; //salvo la risposta che viene cliccata

const createQuestion = function (questionObj) {
  const answers = questionObj.incorrect_answers; //creo array con tutte le risposte sbagliate e pusho quella giusta dentro lo stesso array per avercele tutte insieme
  answers.push(questionObj.correct_answer);
  const shuffledAnswers = shuffleArray(answers);
  let mainContent = document.getElementById("box-domanda");
  // const loader = document.querySelector(".loader");
  // document.getElementById("loader").classList.remove("loader");
  mainContent.innerHTML = ""; //pulisco il container delle domande
  clearInterval(timerInterval); //se c'è un setInterval attivo, la funziona clearInterval lo stoppa
  const circleTimer = document.getElementById("circle");
  const newCircle = circleTimer.cloneNode(true);
  circleTimer.parentNode.replaceChild(newCircle, circleTimer);
  let questionContainer = document.createElement("div");
  questionContainer.innerHTML = `<h1 id='question'>${formatText(
    questionObj.question
  )}</h1>`; //cambio l'innertext del container con la stringa relativa alla domanda
  let answersContainer = document.createElement("div");
  answersContainer.setAttribute("id", "buttons");

  // shuffledAnswers.forEach(answer => answersContainer.appendChild(generateAnswerBtn(answer)));

  for (let i = 0; i < shuffledAnswers.length; i++) {
    //faccio un for per leggere tutti gli elementi dall'array delle risposte
    let answerBtn = generateAnswerBtn(shuffledAnswers[i]);
    answersContainer.appendChild(answerBtn); //appendo il bottone al container delle risposte
  }

  let timer = 30;
  let divTimer = document.getElementById("timer");
  divTimer.style.right = "0.5rem";
  divTimer.innerText = timer; //cambio l'innertext in modo che parta sempre da 30
  timerInterval = setInterval(() => {
    //questo setInterval esegue tutto il codice ogni 1000ms (1 secondo)
    timer--;
    divTimer.innerText = timer;
    if (("" + timer).includes("1") && timer >= 10) {
      //faccio diventare timer una stringa per usare il metodo includes()
      divTimer.style.right = "0.8rem";
    } else if (("" + timer).includes("1") && timer < 10) {
      divTimer.style.right = "1.5rem";
    } else if (timer < 10) {
      divTimer.style.right = "1.3rem";
    } else if (timer >= 10) {
      divTimer.style.right = "0.5rem";
    }
    if (timer < 1) {
      //se il timer scade, manda la risposta selezionata e passa alla domanda successiva
      submitAnswer(questionObj);
    }
  }, 1000);

  mainContent.appendChild(questionContainer);
  mainContent.appendChild(answersContainer);

  const submitBtn = document.getElementById("next-question-button");
  submitBtn.type = "button";
  submitBtn.onclick = () => {
    submitAnswer(questionObj); //passo l'oggetto al metodo submitAnswer che si occuperà di controllare che la risposta sia corretta o sbagliata
  };
};

const generateAnswerBtn = function (shuffledAnswer) {
  let answerBtn = document.createElement("button"); //per ogni possibile risposta creo un bottone
  answerBtn.classList.add("answer-button");
  answerBtn.type = "button";
  answerBtn.innerHTML = `${formatText(shuffledAnswer)}`; //assegno all'innertext del bottone la stringa corrispondente alla risposta
  answerBtn.onclick = (e) => {
    //ad ognuno dei bottoni assegno una funzione onclick
    selectedAnswer = shuffledAnswer; //salvo la risposta data in selectedAnswer
    console.log(selectedAnswer);
    unselectPreviousButton();
    e.currentTarget.classList.add("selected"); //assegno lo stile al bottone selezionato
  };
  return answerBtn;
};

let i = 0;
const start = function () {
  // console.log(jsonDomande);
  //start() controlla che ci siano domande disponibili
  if (i > questions.length - 1) {
    generateResult();
    clearInterval(timerInterval);
  } else {
    createQuestion(questions[i]); //chiamo il metodo createQuestion passandogli la domanda
    i++;
    const questionNumber = document.querySelector(".counter");
    questionNumber.innerText = i;
  }
};

const unselectPreviousButton = function () {
  const previouslySelectedAnswer = document.querySelector(".selected");
  if (previouslySelectedAnswer) {
    previouslySelectedAnswer.classList.remove("selected");
  }
};

const shuffleArray = function (array) {
  //creo una funzione shuffle per randomizzare la disposizione delle risposte
  if (array.length > 2) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array;
};

const submitAnswer = function (question) {
  if (question.correct_answer === selectedAnswer) {
    result++;
  }
  start();
};

let correctColor = "#00FFFF";
let incorrectColor = "#D20094";
let correctSegment = document.querySelector(".segment");
let incorrectSegment = document.querySelector(".ring");

function animateColors() {
  correctSegment.style.opacity = 0;
  incorrectSegment.style.opacity = 0;
  setTimeout(function () {
    correctSegment.style.opacity = 1;
    incorrectSegment.style.opacity = 1;
  }, 250);
}

const generateResult = function () {
  let mainContent = document.getElementById("box-domanda");
  mainContent.remove();
  mainContent.removeAttribute("min-height");
  let timerContainer = document.getElementById("countdown");
  timerContainer.remove();
  let footerContent = document.getElementsByTagName("footer")[0];
  footerContent.remove();
  let nav = document.getElementById("questions-nav");
  nav.style.marginBottom = "0";
  document.getElementById("chart-container").style.display = "block";
  animateColors();
  let rightAnswers = document.getElementById("right-answers");
  rightAnswers.innerText = result + "/10 questions";
  let wrongAnswers = document.getElementById("wrong-answers");
  wrongAnswers.innerText = 10 - result + "/10 questions";
  let rightPercent = document.getElementById("correct-percent");
  rightPercent.innerText = result * 10 + "%";
  let wrongPercent = document.getElementById("wrong-percent");
  wrongPercent.innerText = (10 - result) * 10 + "%";
  document.getElementById("results-div").style.display = "block";
  document.getElementById("correct-div").style.display = "block";
  document.getElementById("wrong-div").style.display = "block";
  document.getElementById("rateus-button").style.display = "block";
  document.getElementById("result-text-div").style.display = "block";

  if (result < 6) {
    //Si rende dinamico il testo a seconda del risultato del test
    document.getElementById(
      "result-text-div"
    ).innerHTML = `<h3 id='result-text-title'>
    We are sorry! <br /><span id='result-text-span-failed'
      >You failed the exam.</span
    >
  </h3>
  <p id='result-text-p'>
  Thank you for participating. <br> We are sure you will <br> get through it next time
  </p>`;
  }

  const segment = document.getElementsByClassName("ring")[0]; //Qui la svg viene modellata in base al risultato
  let totalPoints = questions.length;
  let varPercent2 = (result / totalPoints) * 100;
  let varPercent1 = ((totalPoints - result) / totalPoints) * 100;
  segment.setAttribute("stroke-dasharray", `${varPercent1} ${varPercent2}`);
};
const starsContainer = document.getElementById("stars-container");
const starsRating = [];
const createStars = function () {
  for (let r = 0; r < 10; r++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("width", "47");
    star.setAttribute("height", "46");
    star.setAttribute("viewBox", "0 0 47 46");
    star.classList.add("starBeforeClick");
    starsRating.push(star);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M22.2044 1.55551C22.6143 0.569963 24.0104 0.569964 24.4203 1.55552L29.9874 14.9402C30.1602 15.3557 30.5509 15.6396 30.9994 15.6756L45.4494 16.834C46.5134 16.9193 46.9448 18.2471 46.1341 18.9415L35.1248 28.3722C34.7831 28.6649 34.6338 29.1242 34.7382 29.5619L38.1018 43.6626C38.3494 44.7009 37.2199 45.5215 36.309 44.9651L23.9379 37.4089C23.5538 37.1743 23.0709 37.1743 22.6868 37.4089L10.3157 44.9651C9.40478 45.5215 8.27528 44.7009 8.52295 43.6626L11.8865 29.5619C11.9909 29.1242 11.8416 28.6649 11.4999 28.3722L0.490575 18.9415C-0.320069 18.2471 0.111362 16.9193 1.17535 16.834L15.6253 15.6756C16.0738 15.6396 16.4645 15.3557 16.6374 14.9402L22.2044 1.55551Z"
    );
    path.setAttribute("fill", "#00FFFF");
    star.appendChild(path);
    starsContainer.appendChild(star);
  }
  const starsRatingReverse = starsRating.reverse();

  for (let s = 0; s < starsRatingReverse.length; s++) {
    starsRatingReverse[s].addEventListener("click", function () {
      for (let v = 0; v <= s; v++) {
        starsRatingReverse[v].classList.add("starAfterClick");
      }
      for (let w = s + 1; w < starsRatingReverse.length; w++) {
        starsRatingReverse[w].classList.remove("starAfterClick");
      }
    });
  }
};
createStars();
