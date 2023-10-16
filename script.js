window.onload = () => {
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
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

  // const checkbox = document.getElementById("agree");
  // const submitButton = document.getElementById("proceed");
  // checkbox.addEventListener("change", function () {
  //   if (checkbox.checked) {
  //     submitButton.removeAttribute("disabled");
  //     submitButton.classList.add("active");
  //   } else {
  //     submitButton.setAttribute("disabled", "disabled");
  //     submitButton.classList.remove("active");
  //   }
  // });

  const newQuestion = function () {
    const questionContainer = document.getElementById("question-container");
    const buttonContainer = document.getElementById("buttons-container");
    for (let i = 0; i < questions.length; i++) {
      const questionText = document.createElement("h3");
      questionText.innerText = questions[i].question;
      questionContainer.appendChild(questionText);
      if (questions[i].type === "multiple") {
        const correctButtons = document.createElement("button");
        correctButtons.innerText = questions[i].correct_answer;
        buttonContainer.appendChild(correctButtons);
        for (let j = 0; j < questions[i].incorrect_answers.length; j++) {
          const incorrectAnswerButton = document.createElement("button");
          incorrectAnswerButton.innerText = questions[i].incorrect_answers[j];
          buttonContainer.appendChild(incorrectAnswerButton);
        }
      } else if (questions[i].type === "boolean") {
        const booleanButton1 = document.createElement("button");
        booleanButton1.innerText = "True";
        const booleanButton2 = document.createElement("button");
        booleanButton2.innerText = "False";
        buttonContainer.appendChild(booleanButton1);
        buttonContainer.appendChild(booleanButton2);
      }
    }
  };
  newQuestion();
};
