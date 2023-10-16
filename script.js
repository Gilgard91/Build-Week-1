window.onload = () => {
  const checkbox = document.getElementById("agree");
  const submitButton = document.getElementById("proceed");
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("checkedButton");
    } else {
      submitButton.setAttribute("disabled", "disabled");
    }
  });
};
