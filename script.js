window.onload = () => {
  const checkbox = document.getElementById("agree");
  const submitButton = document.getElementById("proceed");
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
      const selectedDifficulty =
        document.querySelector(".difficulty-select").value;
      sessionStorage.setItem("difficulty", selectedDifficulty);
      window.location.href = "/questions.html";
    };
  };
};
const selectDifficulty = function () {
  const difficulty = document.createElement("select");
  const content = document.querySelector(".content");
  content.innerHTML = "";
  // start();
  difficulty.innerHTML =
    "<option value='easy'>Easy</option> <option value='medium'>Medium</option> <option value='hard'>Hard</option>";
  difficulty.classList.add("difficulty-select");
  content.appendChild(difficulty);
  const submitButton = document.createElement("button");
  submitButton.innerText = "START";
  submitButton.setAttribute("id", "proceed");
  submitButton.classList.add("active");
  submitButton.classList.add("select-button");
  content.appendChild(submitButton);
};
