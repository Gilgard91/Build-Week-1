const container = document.getElementById("container");

const segment = document.getElementsByClassName("segment")[0];

let totalPoints = 29;
// questions.length

let wrongAnswers = 20;
let result = 9;

let varPercent1 = (result / totalPoints) * 100;

let varPercent2 = (wrongAnswers / totalPoints) * 100;

// segment.setattr = `${var1} ${var2}`;

console.log(segment);
segment.setAttribute("stroke-dasharray", `${varPercent1} ${varPercent2}`);
