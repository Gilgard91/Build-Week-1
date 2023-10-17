const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit"
    ]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"]
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
      "Computer Style Sheet"
    ]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"]
  }
];

window.onload = function () {
  start();
};

let result = 0; //variabile che aumenta di 1 ad ogni risposta corretta
let timerInterval; //salvo la variabile per utilizzarla come parametro di clearInterval
let rispostaSelezionata; //salvo la risposta che viene cliccata

const creaDomanda = function (questionObj) {
  const answers = questionObj.incorrect_answers; //creo array con tutte le risposte sbagliate e pusho quella giusta dentro lo stesso array per avercele tutte insieme
  answers.push(questionObj.correct_answer);
  const shuffledAnswers = shuffleArray(answers);
  let mainContent = document.getElementById("box-domanda");
  mainContent.innerHTML = ""; //pulisco il container delle domande
  clearInterval(timerInterval); //se c'è un setInterval attivo, la funziona clearInterval lo stoppa
  const circleTimer = document.getElementById("circle");
  const newCircle = circleTimer.cloneNode(true);
  circleTimer.parentNode.replaceChild(newCircle, circleTimer);
  let containerDomanda = document.createElement("h1");
  containerDomanda.setAttribute("id", "question");
  containerDomanda.innerText = questionObj.question; //cambio l'innertext del container con la stringa relativa alla domanda
  let containerRisposte = document.createElement("div");
  containerRisposte.setAttribute("id", "buttons");

  for (let i = 0; i < shuffledAnswers.length; i++) {
    //faccio un for per leggere tutti gli elementi dall'array delle risposte
    let bottoneRisposta = document.createElement("button"); //per ogni possibile risposta creo un bottone
    bottoneRisposta.classList.add("answer-button");
    bottoneRisposta.type = "button";
    bottoneRisposta.innerText = shuffledAnswers[i]; //assegno all'innertext del bottone la stringa corrispondente alla risposta
    bottoneRisposta.onclick = (e) => {
      //ad ognuno dei bottoni assegno una funzione onclick
      rispostaSelezionata = shuffledAnswers[i]; //salvo la risposta data in rispostaSelezionata
      console.log(rispostaSelezionata);
      unselectPreviousButton();
      e.currentTarget.classList.add("selected"); //assegno lo stile al bottone selezionato
    };
    containerRisposte.appendChild(bottoneRisposta); //appendo il bottone al container delle risposte
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
      submitRisposta(questionObj);
    }
  }, 1000);

  mainContent.appendChild(containerDomanda);
  mainContent.appendChild(containerRisposte);

  const bottoneSubmit = document.getElementById("next-question-button");
  bottoneSubmit.type = "button";
  bottoneSubmit.onclick = () => {
    submitRisposta(questionObj); //passo l'oggetto al metodo submitRisposta che si occuperà di controllare che la risposta sia corretta o sbagliata
  };
};

let i = 0;
const start = function () {
  //start() controlla che ci siano domande disponibili
  if (i > questions.length) {
    // funzione per pagina grafico
  } else {
    creaDomanda(questions[i]); //chiamo il metodo creaDomanda passandogli la domanda
    i++;
    const questionNumber = document.getElementById("counter");
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
  if (array.type === "multiple") {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array;
};

const submitRisposta = function (question) {
  if (question.correct_answer === rispostaSelezionata) {
    result++;
  }
  start();
};
