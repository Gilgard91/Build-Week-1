const container = document.getElementById("container");

const segment = document.getElementsByClassName("segment")[0];

let totalPoints = 10;
// questions.length


let varPercent1 = (result / totalPoints) * 100;

let varPercent2 = (10 - result / totalPoints) * 100;

// segment.setattr = `${var1} ${var2}`;

console.log(segment);
segment.setAttribute("stroke-dasharray", `${varPercent1} ${varPercent2}`);

// let wrongAnswers = 0;
// let result = 10;