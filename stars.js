const starsContainer = document.getElementById("stars-container");
const starsRating = [];
const createStars = function () {
  for (let r = 0; r < 10; r++) {
    const star = document.createElement("div");
    star.innerHTML = "<i class='fas fa-star'></i>";
    star.classList.add("feedbackStars");
    starsRating.push(star);
    starsContainer.appendChild(star);
  }

  for (let s = 0; s < starsRating.length; s++) {
    starsRating[s].addEventListener("click", function () {
      for (let v = 0; v <= s; v++) {
        starsRating[v].classList.add("feedbackStarsRating");
      }
      for (let w = s + 1; w < starsRating.length; w++) {
        starsRating[w].classList.remove("feedbackStarsRating");
      }
    });
  }
};
createStars();
